import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { format } from 'date-fns'

// Helper function to send email notification
async function sendBookingEmail(booking: any, room: any) {
  // Using Resend API for email notifications
  // You'll need to sign up at resend.com and add RESEND_API_KEY to .env.local
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured - skipping email notification')
    return
  }

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .booking-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #666; }
            .value { color: #333; }
            .total { font-size: 1.2em; font-weight: bold; color: #D4AF37; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
              <p>Signature Int'l Hotel Royal Ltd</p>
            </div>
            <div class="content">
              <p>Dear ${booking.guest_name},</p>
              <p>Thank you for choosing Signature Int'l Hotel Royal Ltd. Your booking has been confirmed!</p>
              
              <div class="booking-details">
                <h2 style="color: #D4AF37; margin-top: 0;">Booking Details</h2>
                <div class="detail-row">
                  <span class="label">Booking Reference:</span>
                  <span class="value">${booking.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Room:</span>
                  <span class="value">${room.name}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Check-in:</span>
                  <span class="value">${format(new Date(booking.check_in), 'EEEE, MMMM d, yyyy')} (After 2:00 PM)</span>
                </div>
                <div class="detail-row">
                  <span class="label">Check-out:</span>
                  <span class="value">${format(new Date(booking.check_out), 'EEEE, MMMM d, yyyy')} (Before 12:00 PM)</span>
                </div>
                <div class="detail-row">
                  <span class="label">Guests:</span>
                  <span class="value">${booking.num_guests}</span>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span class="label">Total Amount:</span>
                  <span class="total">₦${booking.total_price.toLocaleString()}</span>
                </div>
              </div>

              <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1976d2;">Important Information</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Please bring a valid ID for check-in</li>
                  <li>Check-in time is after 2:00 PM, check-out is before 12:00 PM</li>
                  <li>Payment can be made at the hotel upon arrival</li>
                  <li>For changes or cancellations, contact us at least 24 hours in advance</li>
                </ul>
              </div>

              <p>We look forward to welcoming you!</p>
              <p>If you have any questions, please contact us at signaturehotelroyalint@gmail.com</p>
            </div>
            <div class="footer">
              <p>Signature Int'l Hotel Royal Ltd</p>
              <p>This is an automated confirmation email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Signature Hotel <bookings@signaturehotel.com>',
        to: [booking.guest_email],
        subject: `Booking Confirmation - ${booking.id.slice(0, 8).toUpperCase()}`,
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      console.error('Failed to send email:', await response.text())
    } else {
      console.log('Booking confirmation email sent successfully')
    }
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// Helper function to check room availability
async function checkRoomAvailability(
  supabase: any,
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  // Check if there are any overlapping bookings for this room
  const { data: overlappingBookings, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .neq('status', 'cancelled')
    .or(`and(check_in.lte.${checkOut},check_out.gte.${checkIn})`)

  if (error) {
    console.error('Error checking availability:', error)
    return false
  }

  return overlappingBookings.length === 0
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Check room availability first
    const isAvailable = await checkRoomAvailability(
      supabase,
      body.room_id,
      body.checkIn,
      body.checkOut
    )

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'This room is not available for the selected dates. Please choose different dates or another room.' },
        { status: 409 }
      )
    }

    // Get room details for email
    const { data: room } = await supabase
      .from('rooms')
      .select('name, price_per_night')
      .eq('id', body.room_id)
      .single()

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          room_id: body.room_id,
          guest_name: body.guestName,
          guest_email: body.guestEmail,
          guest_phone: body.guestPhone,
          check_in: body.checkIn,
          check_out: body.checkOut,
          num_guests: body.numGuests,
          total_price: body.total_price,
          special_requests: body.specialRequests || null,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Booking error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Send confirmation email (non-blocking)
    if (room) {
      sendBookingEmail(data, room).catch(err => 
        console.error('Email sending failed:', err)
      )
    }

    return NextResponse.json({ booking: data }, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        rooms (
          name,
          price_per_night
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ bookings: data }, { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
