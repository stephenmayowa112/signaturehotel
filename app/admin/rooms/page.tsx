import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminHeader from '@/components/AdminHeader'
import RoomsManagementTable from '@/components/RoomsManagementTable'

export default async function AdminRoomsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .order('price_per_night', { ascending: true })

  return (
    <div className="min-h-screen luxury-soft-section">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-gilda mb-2 text-[#2d2211]">Room Management</h1>
          <p className="text-[#6a5431]">Manage room inventory and availability</p>
        </div>

        {/* Rooms Table */}
        <div className="luxury-card">
          <div className="p-6 border-b border-primary/25">
            <h2 className="text-xl font-semibold">All Rooms</h2>
          </div>
          <RoomsManagementTable rooms={rooms || []} />
        </div>
      </main>
    </div>
  )
}
