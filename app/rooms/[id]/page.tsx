import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/BookingForm'
import { Users, Bed } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: room, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !room) {
    notFound()
  }

  // Map room names to image files
  const roomImageMap: { [key: string]: string } = {
    'Signature Superior': '/images/2026/01/room-1.webp',
    'Signature Royale': '/images/2026/01/room-2.webp',
    'Signature Executive': '/images/2026/01/room-3.webp',
    'Signature Business Class': '/images/2026/01/room-4.webp',
  }

  const roomImage = roomImageMap[room.name] || '/images/2026/01/room-1.webp'

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Room Header */}
        <section className="luxury-page-header text-white py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-gilda mb-2">{room.name}</h1>
            <p className="text-xl text-[#f1dfb8]">{room.bed_type}</p>
          </div>
        </section>

        {/* Room Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Room Details */}
              <div className="lg:col-span-2">
                {/* Room Image */}
                <div className="relative h-96 rounded-2xl mb-8 overflow-hidden border border-primary/30 shadow-[0_22px_46px_-24px_rgba(116,79,12,0.5)]">
                  <img 
                    src={roomImage} 
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-gilda mb-4">About This Room</h2>
                  <p className="text-[#5c4828] leading-relaxed">{room.description}</p>
                </div>

                {/* Room Info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="luxury-card p-4 text-center">
                    <Users className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-sm text-[#6a5432]">Max Guests</p>
                    <p className="font-semibold">{room.max_guests}</p>
                  </div>
                  <div className="luxury-card p-4 text-center">
                    <Bed className="mx-auto mb-2 text-primary" size={24} />
                    <p className="text-sm text-[#6a5432]">Bed Type</p>
                    <p className="font-semibold text-sm">{room.bed_type}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-2xl font-gilda mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-[#574526]">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="luxury-card p-6 sticky top-24">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {formatCurrency(room.price_per_night)}
                    </div>
                    <div className="text-[#6b5635]">per night</div>
                  </div>
                  
                  <BookingForm room={room} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
