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
    <header className="luxury-nav-shell">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center transition-transform duration-300 hover:scale-105">
              <img 
                src="/images/signatureLogo.png" 
                alt="Signature Int'l Hotel Admin" 
                className="h-12"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="luxury-nav-link">
                Dashboard
              </Link>
              <Link href="/admin/bookings" className="luxury-nav-link">
                Bookings
              </Link>
              <Link href="/admin/rooms" className="luxury-nav-link">
                Rooms
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-[#3d2e14] hover:text-primary-dark transition"
            >
              <Home size={18} />
              <span className="hidden md:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#3d2e14] hover:text-red-700 transition"
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
