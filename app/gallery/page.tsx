import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GalleryPage() {
  const galleryImages = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-gilda mb-4">
              Gallery
            </h1>
            <p className="text-xl text-gray-300">
              Explore our beautiful hotel through images
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((num, index) => (
                <div 
                  key={num} 
                  className={`relative h-80 overflow-hidden rounded-lg group cursor-pointer hover-lift animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={`/images/2026/01/gallery-${num}.webp`}
                    alt={`Gallery ${num}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
