'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/2026/01/logo-black.webp" 
              alt="Signature Int'l Hotel" 
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link href="/rooms" className="text-gray-700 hover:text-primary transition">
              Rooms
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition">
              About
            </Link>
            <Link href="/facilities" className="text-gray-700 hover:text-primary transition">
              Facilities
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary transition">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition">
              Contact
            </Link>
            <Link 
              href="/rooms#book" 
              className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary transition">
                Home
              </Link>
              <Link href="/rooms" className="text-gray-700 hover:text-primary transition">
                Rooms
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition">
                About
              </Link>
              <Link href="/facilities" className="text-gray-700 hover:text-primary transition">
                Facilities
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-primary transition">
                Gallery
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition">
                Contact
              </Link>
              <Link 
                href="/rooms#book" 
                className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition text-center"
              >
                Book Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
