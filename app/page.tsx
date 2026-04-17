import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Waves, Coffee, Dumbbell, Utensils, Building2, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-screen flex items-center justify-center bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/images/45788.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-gilda mb-6 animate-fade-in-up">
              Signature Int'l Hotel Royal Ltd
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animate-delay-200">
              Experience world-class hospitality with premium accommodations and exceptional service designed for discerning guests.
            </p>
            <Link 
              href="/rooms" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-400"
            >
              Explore Rooms <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
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
                  className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-semibold"
                >
                  Learn More <ArrowRight size={18} />
                </Link>
              </div>
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden animate-slide-in-right hover-lift">
                <img 
                  src="/images/2026/01/welcome-1.webp" 
                  alt="Hotel Interior" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-gilda mb-4 text-gray-900">
                Our Facilities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience world-class amenities designed to make your stay comfortable and memorable
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up animate-delay-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Waves className="text-primary" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Swimming Pool</h3>
                <p className="text-gray-600">Relax and unwind in our pristine swimming pool</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up animate-delay-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Coffee className="text-primary" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Open Lounge</h3>
                <p className="text-gray-600">Comfortable lounge area for relaxation and socializing</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up animate-delay-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Dumbbell className="text-primary" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Football Pitch</h3>
                <p className="text-gray-600">Full-size football pitch for sports enthusiasts</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up animate-delay-400">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Utensils className="text-primary" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Restaurant</h3>
                <p className="text-gray-600">Fine dining with exquisite local and international cuisine</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up animate-delay-500">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Building2 className="text-primary" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conference Hall</h3>
                <p className="text-gray-600">Modern conference facilities for business meetings and events</p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up animate-delay-600">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Users className="text-primary" size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Club</h3>
                <p className="text-gray-600">Exclusive club for entertainment and leisure</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gold-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-gilda mb-6 animate-fade-in-up">
              Ready to Book Your Stay?
            </h2>
            <p className="text-xl mb-8 animate-fade-in-up animate-delay-200">
              Experience luxury and comfort like never before. Book your room today and enjoy exclusive benefits.
            </p>
            <Link 
              href="/rooms" 
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in-up animate-delay-400"
            >
              View Available Rooms <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Gallery Preview Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-gilda mb-4 text-gray-900">
                Gallery
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Take a visual tour of our beautiful hotel and facilities
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
                <div 
                  key={num} 
                  className={`relative h-48 overflow-hidden rounded-lg group hover-lift animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={`/images/2026/01/gallery-${num}.webp`}
                    alt={`Gallery ${num}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 animate-fade-in-up animate-delay-600">
              <Link 
                href="/gallery" 
                className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-semibold"
              >
                View Full Gallery <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
