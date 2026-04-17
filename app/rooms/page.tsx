import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import RoomCard from '@/components/RoomCard'

export default async function RoomsPage() {
  const supabase = await createClient()
  
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_available', true)
    .order('price_per_night', { ascending: true })

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-gilda mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-xl text-gray-300">
              From Signature Superior to Business Class - Choose your perfect accommodation
            </p>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            {error ? (
              <div className="text-center text-red-600">
                <p>Error loading rooms. Please try again later.</p>
              </div>
            ) : rooms && rooms.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p>No rooms available at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
