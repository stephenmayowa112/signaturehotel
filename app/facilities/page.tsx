import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Wifi, Utensils, Car, Dumbbell, Waves, Coffee, Tv, Wind, Shield, Clock } from 'lucide-react'

export default function FacilitiesPage() {
  const facilities = [
    {
      icon: Waves,
      title: 'Swimming Pool',
      description: 'Relax and unwind in our pristine swimming pool with comfortable lounging areas'
    },
    {
      icon: Coffee,
      title: 'Open Lounge',
      description: 'Spacious and comfortable lounge area perfect for relaxation and socializing'
    },
    {
      icon: Dumbbell,
      title: 'Football Pitch',
      description: 'Full-size football pitch for sports enthusiasts and team activities'
    },
    {
      icon: Utensils,
      title: 'Restaurant',
      description: 'Fine dining restaurant serving exquisite local and international cuisine'
    },
    {
      icon: Tv,
      title: 'Conference Hall',
      description: 'Modern conference facilities equipped for business meetings and events'
    },
    {
      icon: Shield,
      title: 'Club',
      description: 'Exclusive club facilities for entertainment, leisure, and networking'
    },
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'High-speed internet access throughout the property for all guests'
    },
    {
      icon: Wind,
      title: 'Air Conditioning',
      description: 'Climate-controlled rooms for optimal comfort year-round'
    },
    {
      icon: Car,
      title: 'Parking',
      description: 'Secure parking facilities available for all guests'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Round-the-clock reception and room service for your convenience'
    }
  ]

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="luxury-page-header text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-gilda mb-4">
              Our Facilities
            </h1>
            <p className="text-xl text-[#f1dfb8]">
              World-class amenities designed for your comfort
            </p>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => {
                const Icon = facility.icon
                return (
                  <div key={index} className="luxury-card p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                    <p className="text-[#5e4a2a]">{facility.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 px-4 luxury-soft-section">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-gilda mb-6">More Than Just Amenities</h2>
            <p className="text-[#5b4728] leading-relaxed mb-8">
              At Signature Int'l Hotel Royal Ltd, we believe in providing experiences that go beyond standard hotel amenities. 
              Our facilities are designed to cater to both business and leisure travelers, ensuring a comfortable and productive stay.
            </p>
            <p className="text-[#5b4728] leading-relaxed">
              From our swimming pool and football pitch to our modern conference hall and fine dining restaurant, 
              every facility is maintained to the highest standards. Our dedicated staff is always available to ensure 
              you make the most of your stay with us.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
