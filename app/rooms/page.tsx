import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import RoomCard from '@/components/RoomCard'

// Cache this page for 60 seconds
export const revalidate = 60

export default async function RoomsPage() {
  const supabase = await createClient()
  
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_available', true)
    .order('price_per_night', { ascending: true })

  // Group rooms by category and get one representative from each
  const roomCategories = rooms?.reduce((acc: any[], room: any) => {
    if (!acc.find(r => r.name === room.name)) {
      // Get all room numbers for this category
      const categoryRooms = rooms.filter(r => r.name === room.name && r.is_available)
      acc.push({
        ...room,
        availableCount: categoryRooms.length,
        roomNumbers: categoryRooms.map(r => r.room_number).sort()
      })
    }
    return acc
  }, [])

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="luxury-page-header text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-gilda mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-xl text-[#f1dfb8]">
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
            ) : roomCategories && roomCategories.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {roomCategories.map((room) => (
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
