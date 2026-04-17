'use client'

import { formatDate, formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Booking {
  id: string
  created_at: string
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string
  check_out: string
  num_guests: number
  total_price: number
  status: string
  special_requests: string | null
  rooms: {
    name: string
  }
}

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdating(bookingId)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId)

    if (!error) {
      router.refresh()
    }
    setUpdating(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#fff1cf] text-[#7b5c19] border border-[#f0dca7]'
      case 'confirmed': return 'bg-[#dff4e3] text-[#185433] border border-[#b9dfc2]'
      case 'cancelled': return 'bg-[#fde7e7] text-[#8a2d2d] border border-[#f5c5c5]'
      case 'completed': return 'bg-[#e4eefc] text-[#254f8a] border border-[#c2d7f8]'
      default: return 'bg-primary/10 text-[#6a5431] border border-primary/25'
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="p-8 text-center text-[#7a623b]">
        No bookings yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary/10 border-b border-primary/25">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Guest</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Check-in</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Check-out</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Guests</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/15">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-primary/5 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-[#2d2211]">{booking.guest_name}</div>
                  <div className="text-sm text-[#6e5a37]">{booking.guest_email}</div>
                  <div className="text-sm text-[#6e5a37]">{booking.guest_phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-[#2d2211]">{booking.rooms.name}</td>
              <td className="px-6 py-4 text-sm text-[#2d2211]">{formatDate(booking.check_in)}</td>
              <td className="px-6 py-4 text-sm text-[#2d2211]">{formatDate(booking.check_out)}</td>
              <td className="px-6 py-4 text-sm text-[#2d2211]">{booking.num_guests}</td>
              <td className="px-6 py-4 text-sm font-medium text-[#2d2211]">
                {formatCurrency(parseFloat(booking.total_price.toString()))}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      disabled={updating === booking.id}
                      className="text-xs bg-[#1f7a3f] text-white px-3 py-1.5 rounded-full hover:bg-[#185f32] transition-colors disabled:opacity-50"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      disabled={updating === booking.id}
                      className="text-xs bg-[#a33f3f] text-white px-3 py-1.5 rounded-full hover:bg-[#853333] transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
