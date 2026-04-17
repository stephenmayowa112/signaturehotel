'use client'

import { formatCurrency } from '@/lib/utils'
import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Users, Filter, CheckSquare, Square, X } from 'lucide-react'

interface Room {
  id: string
  created_at: string
  name: string
  room_number: string
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
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set())
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [bulkUpdating, setBulkUpdating] = useState(false)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(rooms.map(r => r.name)))
    return cats.sort()
  }, [rooms])

  // Filter rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesCategory = categoryFilter === 'all' || room.name === categoryFilter
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'available' && room.is_available) ||
        (statusFilter === 'unavailable' && !room.is_available)
      return matchesCategory && matchesStatus
    })
  }, [rooms, categoryFilter, statusFilter])

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

  const toggleSelectRoom = (roomId: string) => {
    const newSelected = new Set(selectedRooms)
    if (newSelected.has(roomId)) {
      newSelected.delete(roomId)
    } else {
      newSelected.add(roomId)
    }
    setSelectedRooms(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedRooms.size === filteredRooms.length) {
      setSelectedRooms(new Set())
    } else {
      setSelectedRooms(new Set(filteredRooms.map(r => r.id)))
    }
  }

  const bulkUpdateAvailability = async (makeAvailable: boolean) => {
    if (selectedRooms.size === 0) return
    
    setBulkUpdating(true)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('rooms')
      .update({ is_available: makeAvailable })
      .in('id', Array.from(selectedRooms))

    if (!error) {
      setSelectedRooms(new Set())
      router.refresh()
    }
    setBulkUpdating(false)
  }

  const clearFilters = () => {
    setCategoryFilter('all')
    setStatusFilter('all')
  }

  if (rooms.length === 0) {
    return (
      <div className="p-8 text-center text-[#7a623b]">
        No rooms found
      </div>
    )
  }

  const hasActiveFilters = categoryFilter !== 'all' || statusFilter !== 'all'

  return (
    <div>
      {/* Filters and Bulk Actions Bar */}
      <div className="p-6 border-b border-primary/25 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-primary" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-primary/25 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Categories ({rooms.length})</option>
              {categories.map(cat => {
                const count = rooms.filter(r => r.name === cat).length
                return (
                  <option key={cat} value={cat}>{cat} ({count})</option>
                )
              })}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-primary/25 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Status</option>
              <option value="available">Available Only</option>
              <option value="unavailable">Unavailable Only</option>
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-[#8a2d2d] hover:bg-[#fde7e7] rounded-md transition-colors"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}

          {/* Results Count */}
          <div className="ml-auto text-sm text-[#7a623b]">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRooms.size > 0 && (
          <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border border-primary/25">
            <span className="text-sm font-medium text-[#2d2211]">
              {selectedRooms.size} room{selectedRooms.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => bulkUpdateAvailability(true)}
                disabled={bulkUpdating}
                className="px-4 py-1.5 text-sm bg-[#1f7a3f] text-white rounded-md hover:bg-[#185f32] transition-colors disabled:opacity-50"
              >
                {bulkUpdating ? 'Updating...' : 'Enable All'}
              </button>
              <button
                onClick={() => bulkUpdateAvailability(false)}
                disabled={bulkUpdating}
                className="px-4 py-1.5 text-sm bg-[#a33f3f] text-white rounded-md hover:bg-[#853333] transition-colors disabled:opacity-50"
              >
                {bulkUpdating ? 'Updating...' : 'Disable All'}
              </button>
              <button
                onClick={() => setSelectedRooms(new Set())}
                className="px-4 py-1.5 text-sm border border-primary/25 text-[#6a5431] rounded-md hover:bg-primary/5 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/10 border-b border-primary/25">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 text-xs font-medium text-[#6a5431] uppercase hover:text-primary transition-colors"
                >
                  {selectedRooms.size === filteredRooms.length && filteredRooms.length > 0 ? (
                    <CheckSquare size={18} className="text-primary" />
                  ) : (
                    <Square size={18} />
                  )}
                  Select
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Room Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Amenities</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6a5431] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/15">
            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-[#7a623b]">
                  No rooms match the selected filters
                </td>
              </tr>
            ) : (
              filteredRooms.map((room) => (
                <tr 
                  key={room.id} 
                  className={`hover:bg-primary/5 transition-colors ${
                    selectedRooms.has(room.id) ? 'bg-primary/10' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSelectRoom(room.id)}
                      className="text-primary hover:text-primary/70 transition-colors"
                    >
                      {selectedRooms.has(room.id) ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-lg text-primary">{room.room_number}</div>
                  </td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
