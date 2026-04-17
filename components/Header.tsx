'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 luxury-nav-shell transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <img 
              src="/images/signatureLogo.png" 
              alt="Signature Int'l Hotel" 
              className="h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="luxury-nav-link">Home</Link>
            <Link href="/rooms" className="luxury-nav-link">Rooms</Link>
            <Link href="/about" className="luxury-nav-link">About</Link>
            <Link href="/facilities" className="luxury-nav-link">Facilities</Link>
            <Link href="/gallery" className="luxury-nav-link">Gallery</Link>
            <Link href="/contact" className="luxury-nav-link">Contact</Link>
            <Link 
              href="/rooms#book" 
              className="luxury-button px-6 py-2 rounded-md font-semibold transition-all duration-300 hover:scale-105"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-dark transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/30 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="luxury-nav-link">
                Home
              </Link>
              <Link href="/rooms" className="luxury-nav-link">
                Rooms
              </Link>
              <Link href="/about" className="luxury-nav-link">
                About
              </Link>
              <Link href="/facilities" className="luxury-nav-link">
                Facilities
              </Link>
              <Link href="/gallery" className="luxury-nav-link">
                Gallery
              </Link>
              <Link href="/contact" className="luxury-nav-link">
                Contact
              </Link>
              <Link 
                href="/rooms#book" 
                className="luxury-button px-6 py-2 rounded-md font-semibold transition-all duration-300 text-center"
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
