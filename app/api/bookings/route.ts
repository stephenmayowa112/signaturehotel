import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

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
