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
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No bookings yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-out</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{booking.guest_name}</div>
                  <div className="text-sm text-gray-500">{booking.guest_email}</div>
                  <div className="text-sm text-gray-500">{booking.guest_phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{booking.rooms.name}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{formatDate(booking.check_in)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{formatDate(booking.check_out)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{booking.num_guests}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {formatCurrency(parseFloat(booking.total_price.toString()))}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4">
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      disabled={updating === booking.id}
                      className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      disabled={updating === booking.id}
                      className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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
