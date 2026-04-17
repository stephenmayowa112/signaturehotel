'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Home } from 'lucide-react'

export default function AdminHeader({ user }: { user: any }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-xl font-gilda text-primary">
              Signature Int'l Hotel Admin
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="text-gray-700 hover:text-primary transition">
                Dashboard
              </Link>
              <Link href="/admin/bookings" className="text-gray-700 hover:text-primary transition">
                Bookings
              </Link>
              <Link href="/admin/rooms" className="text-gray-700 hover:text-primary transition">
                Rooms
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
            >
              <Home size={18} />
              <span className="hidden md:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
