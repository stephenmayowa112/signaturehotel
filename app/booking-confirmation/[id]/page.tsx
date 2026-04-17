import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { formatCurrency, calculateNights } from '@/lib/utils'
import { format } from 'date-fns'
import { CheckCircle, Calendar, Users, Mail, Phone, Home } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BookingConfirmationPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms (
        name,
        room_number,
        price_per_night,
        bed_type
      )
    `)
    .eq('id', id)
    .single()

  if (error || !booking) {
    notFound()
  }

  const nights = calculateNights(booking.check_in, booking.check_out)

  return (
    <>
      <Header />
      
      <main className="min-h-screen luxury-soft-section py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Success Header */}
          <div className="luxury-card p-8 mb-6 text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h1 className="text-3xl md:text-4xl font-gilda mb-2 text-gray-900">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Thank you for choosing Signature Int'l Hotel Royal Ltd
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Booking Reference: <span className="font-mono font-semibold">{booking.id.slice(0, 8).toUpperCase()}</span>
            </p>
          </div>

          {/* Booking Details */}
          <div className="luxury-card p-8 mb-6 animate-fade-in-up animate-delay-200">
            <h2 className="text-2xl font-gilda mb-6 text-gray-900">Booking Details</h2>
            
            <div className="space-y-4">
              {/* Room Information */}
              <div className="flex items-start gap-3 pb-4 border-b">
                <Home className="text-primary mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="font-semibold text-gray-900">{booking.rooms.name}</p>
                  <p className="text-sm text-gray-600">Room {booking.rooms.room_number} • {booking.rooms.bed_type}</p>
                </div>
              </div>

              {/* Check-in/Check-out */}
              <div className="flex items-start gap-3 pb-4 border-b">
                <Calendar className="text-primary mt-1" size={20} />
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-semibold text-gray-900">
                        {format(new Date(booking.check_in), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600">After 2:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-semibold text-gray-900">
                        {format(new Date(booking.check_out), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600">Before 12:00 PM</p>
                    </div>
                  </div>
                  <p className="text-sm text-primary mt-2">{nights} night{nights > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Guest Information */}
              <div className="flex items-start gap-3 pb-4 border-b">
                <Users className="text-primary mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Guest Information</p>
                  <p className="font-semibold text-gray-900">{booking.guest_name}</p>
                  <p className="text-sm text-gray-600">{booking.num_guests} guest{booking.num_guests > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex items-start gap-3 pb-4 border-b">
                <Mail className="text-primary mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Contact Details</p>
                  <p className="text-gray-900">{booking.guest_email}</p>
                  <p className="text-gray-900 flex items-center gap-2 mt-1">
                    <Phone size={14} />
                    {booking.guest_phone}
                  </p>
                </div>
              </div>

              {/* Special Requests */}
              {booking.special_requests && (
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                  <p className="text-gray-900">{booking.special_requests}</p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="luxury-soft-section border border-primary/25 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    {formatCurrency(booking.rooms.price_per_night)} × {nights} night{nights > 1 ? 's' : ''}
                  </span>
                  <span className="font-semibold">{formatCurrency(booking.total_price)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-primary">{formatCurrency(booking.total_price)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 animate-fade-in-up animate-delay-400">
            <h3 className="font-semibold text-blue-900 mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• A confirmation email has been sent to {booking.guest_email}</li>
              <li>• Please bring a valid ID for check-in</li>
              <li>• Check-in time is after 2:00 PM, check-out is before 12:00 PM</li>
              <li>• Payment can be made at the hotel upon arrival</li>
              <li>• For any changes or cancellations, please contact us at least 24 hours in advance</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-600">
            <Link 
              href="/"
              className="flex-1 text-center luxury-button-light px-6 py-3 rounded-md font-semibold transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link 
              href="/rooms"
              className="flex-1 text-center luxury-button px-6 py-3 rounded-md font-semibold transition-all duration-300"
            >
              Book Another Room
            </Link>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-8 text-gray-600 animate-fade-in-up animate-delay-800">
            <p className="mb-2">Need assistance? Contact us:</p>
            <p className="font-semibold text-gray-900">signaturehotelroyalint@gmail.com</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
