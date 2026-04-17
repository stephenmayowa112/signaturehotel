'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { calculateNights, formatCurrency } from '@/lib/utils'

interface Room {
  id: string
  name: string
  price_per_night: number
  max_guests: number
}

export default function BookingForm({ room }: { room: Room }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: room.id,
          ...formData,
          total_price: totalPrice
        })
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/booking-confirmation/${data.booking.id}`)
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Check-in Date</label>
        <input
          type="date"
          required
          min={new Date().toISOString().split('T')[0]}
          value={formData.checkIn}
          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          className="luxury-input"
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
          className="luxury-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Number of Guests</label>
        <select
          required
          value={formData.numGuests}
          onChange={(e) => setFormData({ ...formData, numGuests: parseInt(e.target.value) })}
          className="luxury-input"
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
          className="luxury-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.guestEmail}
          onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
          className="luxury-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          required
          value={formData.guestPhone}
          onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
          className="luxury-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Special Requests (Optional)</label>
        <textarea
          rows={3}
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="luxury-input"
        />
      </div>

      {nights > 0 && (
        <div className="luxury-soft-section border border-primary/25 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-[#6b5635]">{nights} night{nights > 1 ? 's' : ''}</span>
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
        disabled={loading || nights === 0}
        className="w-full luxury-button py-3 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  )
}
