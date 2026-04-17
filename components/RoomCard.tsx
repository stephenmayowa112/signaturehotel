import Link from 'next/link'
import { Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Room {
  id: string
  name: string
  room_number: string
  description: string
  price_per_night: number
  max_guests: number
  size_sqm: number
  bed_type: string
  amenities: string[]
  images: string[]
  availableCount?: number
  roomNumbers?: string[]
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
    <div className="luxury-card overflow-hidden hover-lift transition-all duration-300">
      {/* Room Image */}
      <div className="relative h-64 overflow-hidden group border-b border-primary/25">
        <img 
          src={roomImage} 
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Room Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-gilda">{room.name}</h3>
          {room.availableCount && (
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
              {room.availableCount} Available
            </span>
          )}
        </div>
        <p className="text-[#5e4a2a] mb-4 line-clamp-2">{room.description}</p>

        {/* Room Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-[#5f4d2f]">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{room.max_guests} Guests</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="text-xs bg-primary/10 border border-primary/25 text-[#564225] px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs text-[#7f6640]">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/25">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(room.price_per_night)}
            </span>
            <span className="text-[#6d5735] text-sm"> / night</span>
          </div>
          <Link 
            href={`/rooms/${room.id}`}
            className="luxury-button px-6 py-2 rounded-md font-semibold transition-all duration-300 hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
