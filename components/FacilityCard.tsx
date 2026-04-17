'use client'

import { FaSwimmingPool, FaCouch, FaFutbol, FaUtensils, FaBuilding, FaGlassCheers } from 'react-icons/fa'

interface FacilityCardProps {
  icon: string
  title: string
  description: string
  delay: string
}

export default function FacilityCard({ icon, title, description, delay }: FacilityCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'pool':
        return <FaSwimmingPool className="text-primary" size={32} />
      case 'lounge':
        return <FaCouch className="text-primary" size={32} />
      case 'football':
        return <FaFutbol className="text-primary" size={32} />
      case 'restaurant':
        return <FaUtensils className="text-primary" size={32} />
      case 'conference':
        return <FaBuilding className="text-primary" size={32} />
      case 'club':
        return <FaGlassCheers className="text-primary" size={32} />
      default:
        return null
    }
  }

  return (
    <div className={`bg-white p-8 rounded-lg text-center hover-lift animate-fade-in-up ${delay}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
