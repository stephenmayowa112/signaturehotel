'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
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
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/rooms" className="text-gray-700 hover:text-primary transition-colors duration-300 relative group">
              Rooms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/facilities" className="text-gray-700 hover:text-primary transition-colors duration-300 relative group">
              Facilities
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary transition-colors duration-300 relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/rooms#book" 
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors duration-300">
                Home
              </Link>
              <Link href="/rooms" className="text-gray-700 hover:text-primary transition-colors duration-300">
                Rooms
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary transition-colors duration-300">
                About
              </Link>
              <Link href="/facilities" className="text-gray-700 hover:text-primary transition-colors duration-300">
                Facilities
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-primary transition-colors duration-300">
                Gallery
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors duration-300">
                Contact
              </Link>
              <Link 
                href="/rooms#book" 
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-all duration-300 text-center"
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
