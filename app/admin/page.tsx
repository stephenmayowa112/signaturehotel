import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminHeader from '@/components/AdminHeader'
import BookingsTable from '@/components/BookingsTable'

export default async function AdminDashboard() {
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

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')

  // Calculate stats
  const totalBookings = bookings?.length || 0
  const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0
  const confirmedBookings = bookings?.filter(b => b.status === 'confirmed').length || 0
  const totalRevenue = bookings?.reduce((sum, b) => sum + parseFloat(b.total_price), 0) || 0

  return (
    <div className="min-h-screen luxury-soft-section pt-20">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-gilda mb-8 text-[#2d2211]">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="luxury-card p-6">
            <p className="text-[#6c5733] text-sm mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-primary">{totalBookings}</p>
          </div>
          <div className="luxury-card p-6">
            <p className="text-[#6c5733] text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{pendingBookings}</p>
          </div>
          <div className="luxury-card p-6">
            <p className="text-[#6c5733] text-sm mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">{confirmedBookings}</p>
          </div>
          <div className="luxury-card p-6">
            <p className="text-[#6c5733] text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ₦{totalRevenue.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="luxury-card">
          <div className="p-6 border-b border-primary/25">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
          </div>
          <BookingsTable bookings={bookings || []} />
        </div>
      </main>
    </div>
  )
}
