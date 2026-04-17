import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Wifi, Coffee, Car, Utensils, Dumbbell, Waves } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-gilda mb-6">
              Signature Int'l Hotel Royal Ltd
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Experience world-class hospitality with premium accommodations and exceptional service designed for discerning guests.
            </p>
            <Link 
              href="/rooms" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded text-lg hover:bg-opacity-90 transition"
            >
              Explore Rooms <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-gilda mb-6 text-gray-900">
                  Welcome to Signature Int'l Hotel
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Discover our carefully curated selection of premium rooms, from Signature Superior to Business Class accommodations. Each room is designed with your comfort and productivity in mind.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Whether you're here for business or leisure, Signature Int'l Hotel Royal Ltd offers world-class facilities including a swimming pool, restaurant, conference hall, and more.
                </p>
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all"
                >
                  Learn More <ArrowRight size={18} />
                </Link>
              </div>
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-gilda mb-4 text-gray-900">
                Our Facilities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience world-class amenities designed to make your stay comfortable and memorable
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
                  <Waves className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Swimming Pool</h3>
                <p className="text-gray-600">Relax and unwind in our pristine swimming pool</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
                  <Coffee className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Open Lounge</h3>
                <p className="text-gray-600">Comfortable lounge area for relaxation and socializing</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
                  <Dumbbell className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Football Pitch</h3>
                <p className="text-gray-600">Full-size football pitch for sports enthusiasts</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
                  <Utensils className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Restaurant</h3>
                <p className="text-gray-600">Fine dining with exquisite local and international cuisine</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
                  <Wifi className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conference Hall</h3>
                <p className="text-gray-600">Modern conference facilities for business meetings and events</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4">
                  <Car className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Club</h3>
                <p className="text-gray-600">Exclusive club for entertainment and leisure</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-gilda mb-6">
              Ready to Book Your Stay?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Experience luxury and comfort like never before. Book your room today and enjoy exclusive benefits.
            </p>
            <Link 
              href="/rooms" 
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded text-lg hover:bg-gray-100 transition"
            >
              View Available Rooms <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
