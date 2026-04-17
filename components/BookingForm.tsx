'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { calculateNights, formatCurrency } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Room {
  id: string
  name: string
  price_per_night: number
  max_guests: number
}

interface AvailableRoom {
  id: string
  room_number: string
  is_available: boolean
}

export default function BookingForm({ 
  room, 
  availableRooms 
}: { 
  room: Room
  availableRooms: AvailableRoom[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [availableRoomsForDates, setAvailableRoomsForDates] = useState<AvailableRoom[]>(availableRooms)
  const [formData, setFormData] = useState({
    selectedRoomId: availableRooms[0]?.id || '',
    checkIn: '',
    checkOut: '',
    numGuests: 1,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: ''
  })

  const nights = formData.checkIn && formData.checkOut 
    ? calculateNights(formData.checkIn, formData.checkOut)
    : 0
  const totalPrice = nights * room.price_per_night

  // Check availability when dates change
  useEffect(() => {
    const checkAvailability = async () => {
      if (!formData.checkIn || !formData.checkOut) {
        setAvailableRoomsForDates(availableRooms)
        return
      }

      setCheckingAvailability(true)
      const supabase = createClient()

      // Get all rooms in this category
      const { data: allCategoryRooms } = await supabase
        .from('rooms')
        .select('id, room_number, is_available')
        .eq('name', room.name)
        .eq('is_available', true)
        .order('room_number', { ascending: true })

      if (!allCategoryRooms) {
        setAvailableRoomsForDates([])
        setCheckingAvailability(false)
        return
      }

      // Check which rooms have overlapping bookings
      const { data: overlappingBookings } = await supabase
        .from('bookings')
        .select('room_id')
        .in('room_id', allCategoryRooms.map(r => r.id))
        .neq('status', 'cancelled')
        .or(`and(check_in.lte.${formData.checkOut},check_out.gte.${formData.checkIn})`)

      const bookedRoomIds = new Set(overlappingBookings?.map(b => b.room_id) || [])
      const available = allCategoryRooms.filter(r => !bookedRoomIds.has(r.id))

      setAvailableRoomsForDates(available)
      
      // If currently selected room is not available, select first available
      if (formData.selectedRoomId && !available.find(r => r.id === formData.selectedRoomId)) {
        setFormData(prev => ({ ...prev, selectedRoomId: available[0]?.id || '' }))
      }

      setCheckingAvailability(false)
    }

    checkAvailability()
  }, [formData.checkIn, formData.checkOut, room.name, availableRooms])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.selectedRoomId) {
      alert('Please select a room')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: formData.selectedRoomId,
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          numGuests: formData.numGuests,
          total_price: totalPrice,
          specialRequests: formData.specialRequests
        })
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/booking-confirmation/${data.booking.id}`)
      } else if (response.status === 409) {
        alert(data.error || 'This room is not available for the selected dates. Please choose different dates or another room.')
      } else {
        alert(data.error || 'Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedRoomNumber = availableRoomsForDates.find(r => r.id === formData.selectedRoomId)?.room_number

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Room Selection */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Room Number</label>
        <select
          required
          value={formData.selectedRoomId}
          onChange={(e) => setFormData({ ...formData, selectedRoomId: e.target.value })}
          disabled={checkingAvailability}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {availableRoomsForDates.length === 0 ? (
            <option value="">No rooms available for selected dates</option>
          ) : (
            availableRoomsForDates.map((r) => (
              <option key={r.id} value={r.id}>
                Room {r.room_number}
              </option>
            ))
          )}
        </select>
        {checkingAvailability && (
          <p className="text-xs text-gray-500 mt-1">Checking availability...</p>
        )}
        {formData.checkIn && formData.checkOut && availableRoomsForDates.length > 0 && (
          <p className="text-xs text-green-600 mt-1">
            {availableRoomsForDates.length} room{availableRoomsForDates.length > 1 ? 's' : ''} available for your dates
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Check-in Date</label>
        <input
          type="date"
          required
          min={new Date().toISOString().split('T')[0]}
          value={formData.checkIn}
          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Check-out Date</label>
        <input
          type="date"
          required
          min={formData.checkIn || new Date().toISOString().split('T')[0]}
          value={formData.checkOut}
          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Number of Guests</label>
        <select
          required
          value={formData.numGuests}
          onChange={(e) => setFormData({ ...formData, numGuests: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {Array.from({ length: room.max_guests }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          required
          value={formData.guestName}
          onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.guestEmail}
          onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          required
          value={formData.guestPhone}
          onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Special Requests (Optional)</label>
        <textarea
          rows={3}
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {nights > 0 && selectedRoomNumber && (
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-sm text-gray-600 mb-2">
            Room {selectedRoomNumber} • {nights} night{nights > 1 ? 's' : ''}
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{formatCurrency(room.price_per_night)} × {nights}</span>
            <span className="font-semibold">{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || nights === 0 || !formData.selectedRoomId || availableRoomsForDates.length === 0}
        className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  )
}
