import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Award, Users, Heart, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="luxury-page-header text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-gilda mb-4">
              About Signature Int'l Hotel
            </h1>
            <p className="text-xl text-[#f1dfb8]">
              Where world-class hospitality meets exceptional service
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-gilda mb-6 text-center">Our Story</h2>
            <p className="text-[#554224] leading-relaxed mb-4">
              Signature Int'l Hotel Royal Ltd was established with a vision to provide world-class hospitality that combines comfort, luxury, and exceptional service. We pride ourselves on offering premium accommodations that cater to both business and leisure travelers.
            </p>
            <p className="text-[#554224] leading-relaxed mb-4">
              Our hotel features four distinct room categories - from Signature Superior to Business Class - each designed to meet the unique needs of our discerning guests. With modern amenities, elegant furnishings, and attention to detail, we ensure every stay is memorable.
            </p>
            <p className="text-[#554224] leading-relaxed">
              Beyond our rooms, we offer comprehensive facilities including a swimming pool, football pitch, fine dining restaurant, conference hall, and exclusive club. Our dedicated team is committed to providing personalized service that exceeds expectations.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 luxury-soft-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-gilda mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center luxury-card p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Award className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-[#5d4a2a]">
                  We strive for excellence in every aspect of our service
                </p>
              </div>

              <div className="text-center luxury-card p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Heart className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hospitality</h3>
                <p className="text-[#5d4a2a]">
                  Warm, genuine hospitality is at the heart of everything we do
                </p>
              </div>

              <div className="text-center luxury-card p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Star className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-[#5d4a2a]">
                  Premium quality in our facilities, services, and experiences
                </p>
              </div>

              <div className="text-center luxury-card p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-[#5d4a2a]">
                  Building lasting relationships with our guests and community
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
