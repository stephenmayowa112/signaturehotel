import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminHeader from '@/components/AdminHeader'
import BookingsTable from '@/components/BookingsTable'

export default async function AdminBookingsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms (
        name,
        price_per_night
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
          <p className="text-gray-600">Manage and track all hotel reservations</p>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Booking List</h2>
          </div>
          <BookingsTable bookings={bookings || []} />
        </div>
      </main>
    </div>
  )
}
