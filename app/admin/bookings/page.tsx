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
    <div className="min-h-screen luxury-soft-section">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-gilda mb-2 text-[#2d2211]">All Bookings</h1>
          <p className="text-[#6a5431]">Manage and track all hotel reservations</p>
        </div>

        {/* Bookings Table */}
        <div className="luxury-card">
          <div className="p-6 border-b border-primary/25">
            <h2 className="text-xl font-semibold">Booking List</h2>
          </div>
          <BookingsTable bookings={bookings || []} />
        </div>
      </main>
    </div>
  )
}
