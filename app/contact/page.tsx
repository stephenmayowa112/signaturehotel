import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="luxury-page-header text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-gilda mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-[#f1dfb8]">
              We'd love to hear from you
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-gilda mb-6">Get in Touch</h2>
                <p className="text-[#5a482a] mb-8">
                  Have questions about your stay or need assistance with your booking? Our team is here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-[#5f4b2b]">
                        123 Hotel Street<br />
                        City, State 12345<br />
                        Country
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-[#5f4b2b]">+1 234 567 8900</p>
                      <p className="text-[#5f4b2b]">+1 234 567 8901</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-[#5f4b2b]">info@rivora.com</p>
                      <p className="text-[#5f4b2b]">reservations@rivora.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Reception Hours</h3>
                      <p className="text-[#5f4b2b]">24/7 - We're always here for you</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="luxury-card p-8">
                <h2 className="text-2xl font-gilda mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      required
                      className="luxury-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="luxury-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      className="luxury-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      rows={5}
                      required
                      className="luxury-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full luxury-button py-3 rounded-md font-semibold transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
