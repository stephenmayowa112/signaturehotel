import Link from 'next/link'
import { Users, Maximize } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Room {
  id: string
  name: string
  description: string
  price_per_night: number
  max_guests: number
  size_sqm: number
  bed_type: string
  amenities: string[]
  images: string[]
}

export default function RoomCard({ room }: { room: Room }) {
  // Map room names to image files
  const roomImageMap: { [key: string]: string } = {
    'Signature Superior': '/images/2026/01/room-1.webp',
    'Signature Royale': '/images/2026/01/room-2.webp',
    'Signature Executive': '/images/2026/01/room-3.webp',
    'Signature Business Class': '/images/2026/01/room-4.webp',
  }

  const roomImage = roomImageMap[room.name] || '/images/2026/01/room-1.webp'

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      {/* Room Image */}
      <div className="relative h-64 bg-gray-200">
        <img 
          src={roomImage} 
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Details */}
      <div className="p-6">
        <h3 className="text-2xl font-gilda mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

        {/* Room Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{room.max_guests} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{room.size_sqm} m²</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs text-gray-500">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(room.price_per_night)}
            </span>
            <span className="text-gray-600 text-sm"> / night</span>
          </div>
          <Link 
            href={`/rooms/${room.id}`}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
