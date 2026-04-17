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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Room Management</h1>
          <p className="text-gray-600">Manage room inventory and availability</p>
        </div>

        {/* Rooms Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">All Rooms</h2>
          </div>
          <RoomsManagementTable rooms={rooms || []} />
        </div>
      </main>
    </div>
  )
}
