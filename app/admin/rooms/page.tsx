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
    .order('room_number', { ascending: true })

  // Group rooms by category for stats
  const roomsByCategory = rooms?.reduce((acc: any, room: any) => {
    if (!acc[room.name]) {
      acc[room.name] = { total: 0, available: 0 }
    }
    acc[room.name].total++
    if (room.is_available) acc[room.name].available++
    return acc
  }, {})

  return (
    <div className="min-h-screen luxury-soft-section">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-gilda mb-2 text-[#2d2211]">Room Management</h1>
          <p className="text-[#6a5431]">Manage room inventory and availability</p>
        </div>

        {/* Room Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {roomsByCategory && Object.entries(roomsByCategory).map(([category, stats]: [string, any]) => (
            <div key={category} className="luxury-card p-4">
              <h3 className="text-sm font-medium text-[#6a5431] mb-1">{category}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">{stats.available}</span>
                <span className="text-sm text-[#7a623b]">/ {stats.total} available</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rooms Table */}
        <div className="luxury-card">
          <RoomsManagementTable rooms={rooms || []} />
        </div>
      </main>
    </div>
  )
}
