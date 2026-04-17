'use client'

import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Users, Maximize } from 'lucide-react'

interface Room {
  id: string
  created_at: string
  name: string
  description: string
  price_per_night: number
  max_guests: number
  size_sqm: number
  bed_type: string
  amenities: string[]
  images: string[]
  is_available: boolean
}

export default function RoomsManagementTable({ rooms }: { rooms: Room[] }) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)

  const toggleAvailability = async (roomId: string, currentStatus: boolean) => {
    setUpdating(roomId)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('rooms')
      .update({ is_available: !currentStatus })
      .eq('id', roomId)

    if (!error) {
      router.refresh()
    }
    setUpdating(null)
  }

  if (rooms.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No rooms found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amenities</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{room.name}</div>
                  <div className="text-sm text-gray-500">{room.bed_type}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{room.max_guests} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize size={16} />
                    <span>{room.size_sqm} m²</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {formatCurrency(parseFloat(room.price_per_night.toString()))}
                <div className="text-xs text-gray-500">per night</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600">
                  {room.amenities.length} amenities
                  <div className="text-xs text-gray-500 mt-1">
                    {room.amenities.slice(0, 2).join(', ')}
                    {room.amenities.length > 2 && '...'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  room.is_available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {room.is_available ? 'Available' : 'Unavailable'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleAvailability(room.id, room.is_available)}
                  disabled={updating === room.id}
                  className={`text-xs px-3 py-1 rounded transition disabled:opacity-50 ${
                    room.is_available
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {updating === room.id 
                    ? 'Updating...' 
                    : room.is_available 
                      ? 'Disable' 
                      : 'Enable'
                  }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
