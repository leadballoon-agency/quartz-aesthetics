'use client'

import { useState } from 'react'
import ModelDayModal from './ModelDayModal'
import { trackModelDayCardClick } from './FacebookPixel'

interface ResultsGalleryProps {
  onBookingClick?: () => void
}

export default function ResultsGallery({ onBookingClick }: ResultsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showModelDayModal, setShowModelDayModal] = useState(false)

  const results = [
    {
      image: '/images/bum-before and after multi session.png',
      title: 'Bum Lift & Tighten',
      description: 'Visible lifting and skin tightening after course of treatments',
      time: 'Multi-Session Results',
      isAvailable: true,
      featured: true
    },
    {
      image: '/images/tummy tightening.webp',
      title: 'Tummy Tightening',
      description: 'Firm loose abdominal skin after weight loss',
      time: 'Results Vary',
      isAvailable: true,
      featured: false
    },
    {
      title: 'Arm Sculpting',
      description: 'Reduced bingo wings and tighter skin',
      time: 'Coming Soon',
      isAvailable: true,
      featured: false
    },
    {
      title: 'Thigh Contouring',
      description: 'Smoother, firmer thigh appearance',
      time: 'Coming Soon',
      isAvailable: true,
      featured: false
    },
    {
      title: 'Become a Model',
      description: 'Get exclusive rates in exchange for before & after photos',
      isAvailable: true,
      featured: false,
      isModelDay: true
    }
  ]

  return (
    <section id="results" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-xs sm:text-sm">Real Results</span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mt-2 sm:mt-3">
            Transformations That
            <span className="block gradient-text">Speak For Themselves</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
            Browse our gallery of real client results
          </p>
        </div>

        {/* Premium Results Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {results.map((result: any, index) => (
            result.isModelDay ? (
              /* Model Day Card - Special Styling */
              <div
                key={index}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-premium transition-all duration-300 sm:hover:shadow-premium-lg cursor-pointer bg-gradient-to-br from-primary-500 to-primary-600 hover:scale-[1.02]"
                onClick={() => {
                  trackModelDayCardClick()
                  setShowModelDayModal(true)
                }}
              >
                {/* LIMITED SPOTS Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
                  <span className="bg-white/90 backdrop-blur px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-primary-600">
                    LIMITED SPOTS
                  </span>
                </div>

                {/* Card Content */}
                <div className="aspect-[4/3] flex flex-col items-center justify-center text-center text-white p-6 sm:p-8">
                  {/* Camera Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3">{result.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/90 mb-4 sm:mb-6 max-w-[200px]">
                    {result.description}
                  </p>

                  <div className="inline-flex items-center bg-white text-primary-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base group-hover:shadow-lg transition-shadow">
                    Apply Now
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              /* Regular Result Card */
              <div
                key={index}
                className={`group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-premium transition-all duration-300 ${
                  result.isAvailable ? 'sm:hover:shadow-premium-lg cursor-pointer' : 'opacity-90 cursor-not-allowed'
                } ${result.featured ? 'md:col-span-2' : ''}`}
                onClick={() => result.isAvailable && result.image && setSelectedImage(index)}
              >
                {/* Before/After Label - Only show for available results */}
                {result.isAvailable && result.image && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex gap-1.5 sm:gap-2">
                    <span className="bg-white/90 backdrop-blur px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
                      Before
                    </span>
                    <span className="bg-primary-500/90 backdrop-blur text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
                      After
                    </span>
                  </div>
                )}

                {/* Time Badge or FULL Badge */}
                {result.time && (
                  <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 z-10 backdrop-blur rounded-full px-2 sm:px-3 py-0.5 sm:py-1 ${
                    result.isAvailable ? 'bg-white/90' : 'bg-red-500/90'
                  }`}>
                    <span className={`text-[10px] sm:text-xs font-medium ${
                      result.isAvailable ? 'text-neutral-700' : 'text-white'
                    }`}>{result.time}</span>
                  </div>
                )}

                {/* Image Container */}
                {result.image ? (
                  <div className={`relative overflow-hidden ${result.featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 sm:from-black/50 via-transparent to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className={`relative overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 ${result.featured ? 'aspect-video' : 'aspect-[4/3]'} flex items-center justify-center`}>
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-primary-600 font-medium">Results coming soon</p>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{result.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{result.description}</p>

                  {result.image && (
                    <div className="mt-3 sm:mt-4 flex items-center text-primary-600 font-medium text-sm">
                      <span>View Details</span>
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Clinic Section - Mobile Optimized */}
        <div className="mt-8 sm:mt-12">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-premium">
            <img
              src="/images/quartz-aesthetics-clinic-landscape.webp"
              alt="Quartz Aesthetics Clinic in Banbury"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="p-6 sm:p-8 md:p-12">
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                  Welcome to Quartz Aesthetics
                </h3>
                <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-lg">
                  Visit our clinic at The Wellness Centre in Banbury for your skin tightening treatment. Professional, comfortable, and results-focused.
                </p>
                <button
                  onClick={onBookingClick}
                  className="inline-flex items-center bg-white text-primary-600 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:shadow-lg transition-all duration-300"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Mobile Optimized */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { number: 'Expert', label: 'Practitioner' },
            { number: '100+', label: 'Treatments Completed' },
            { number: '£770', label: 'Full Course (8)' },
            { number: '0', label: 'Downtime' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xl sm:text-2xl font-bold gradient-text mb-1 sm:mb-2">{stat.number}</p>
              <p className="text-xs sm:text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Lightbox Modal - Mobile Optimized */}
        {selectedImage !== null && results[selectedImage]?.image && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={results[selectedImage].image}
                alt={results[selectedImage].title}
                className="w-full rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur rounded-full p-1.5 sm:p-2 hover:bg-white transition"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Model Day Modal */}
        <ModelDayModal
          isOpen={showModelDayModal}
          onClose={() => setShowModelDayModal(false)}
        />
      </div>
    </section>
  )
}
