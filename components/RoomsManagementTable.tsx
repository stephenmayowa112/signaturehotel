'use client'

import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Users } from 'lucide-react'

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
      <div className="p-8 text-center text-[#7a623b]">
        No rooms found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary/10 border-b border-primary/25">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Details</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Amenities</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/15">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-primary/5 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-[#2d2211]">{room.name}</div>
                  <div className="text-sm text-[#6e5a37]">{room.bed_type}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-4 text-sm text-[#5e4a2a]">
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-primary" />
                    <span>{room.max_guests} guests</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#2d2211]">
                {formatCurrency(parseFloat(room.price_per_night.toString()))}
                <div className="text-xs text-[#7a623b]">per night</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-[#5e4a2a]">
                  {room.amenities.length} amenities
                  <div className="text-xs text-[#7a623b] mt-1">
                    {room.amenities.slice(0, 2).join(', ')}
                    {room.amenities.length > 2 && '...'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                  room.is_available 
                    ? 'bg-[#dff4e3] text-[#185433] border-[#b9dfc2]' 
                    : 'bg-[#fde7e7] text-[#8a2d2d] border-[#f5c5c5]'
                }`}>
                  {room.is_available ? 'Available' : 'Unavailable'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleAvailability(room.id, room.is_available)}
                  disabled={updating === room.id}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 ${
                    room.is_available
                      ? 'bg-[#a33f3f] text-white hover:bg-[#853333]'
                      : 'bg-[#1f7a3f] text-white hover:bg-[#185f32]'
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
