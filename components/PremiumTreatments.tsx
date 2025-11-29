import { trackPRPDealView } from './FacebookPixel'

interface PremiumTreatmentsProps {
  onBookingClick?: () => void
}

export default function PremiumTreatments({ onBookingClick }: PremiumTreatmentsProps) {
  const treatments = [
    {
      icon: '✦',
      title: 'Single Lipofirm Session',
      description: 'Try RF skin tightening',
      features: ['One area treatment', 'Skin tightening & firming', 'No downtime required', 'Feel results immediately'],
      price: '£99',
      gradient: 'from-primary-400 to-primary-600',
      popular: false,
      badge: 'TASTER'
    },
    {
      icon: '✨',
      title: 'Course of 6 Sessions',
      description: 'Best results for post-weight loss skin',
      features: ['6 full sessions', 'Maximum skin tightening', 'Collagen stimulation', 'Payment plans available'],
      price: '£480',
      oldPrice: '£600',
      gradient: 'from-primary-500 to-primary-700',
      popular: true,
      badge: 'BEST VALUE'
    },
    {
      icon: '💎',
      title: 'Course of 12 Sessions',
      description: 'Complete skin transformation',
      features: ['12 full sessions', 'Full body skin tightening', 'Best value per session', 'Ideal for significant weight loss'],
      price: '£900',
      oldPrice: '£1200',
      gradient: 'from-green-400 to-emerald-600',
      popular: false,
      badge: 'SAVE £300'
    }
  ]

  return (
    <section id="treatments" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 space-y-2 sm:space-y-3">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-xs sm:text-sm">Skin Tightening Packages</span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Tighten & Firm
            <span className="gradient-text"> Loose Skin</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600 max-w-2xl mx-auto px-4">
            RF technology to tighten skin after weight loss - perfect for post-Ozempic, Wegovy or Mounjaro
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-500 flex flex-col h-full ${
                treatment.popular ? 'shadow-premium-lg sm:scale-105 border-2 border-primary-200' : 'shadow-premium hover:shadow-premium-lg'
              } sm:hover:scale-105`}
            >
              {treatment.badge && (
                <div className={`absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 ${
                  treatment.badge === 'TASTER'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : treatment.badge === 'BEST VALUE'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                } px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium`}>
                  {treatment.badge}
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient} opacity-5 rounded-2xl sm:rounded-3xl transition-opacity group-hover:opacity-10`}></div>

              <div className="relative flex flex-col h-full">
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <div className={`text-3xl sm:text-4xl lg:text-5xl p-2.5 sm:p-3 lg:p-4 bg-gradient-to-br ${treatment.gradient} rounded-xl sm:rounded-2xl bg-opacity-10 inline-block`}>
                    {treatment.icon}
                  </div>
                </div>

                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1.5 sm:mb-2">{treatment.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{treatment.description}</p>
                </div>

                <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                  {treatment.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start sm:items-center text-sm leading-relaxed text-neutral-700">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-neutral-100 mt-auto">
                  <div>
                    {treatment.oldPrice && (
                      <p className="text-xs sm:text-sm text-neutral-400 line-through mb-1">{treatment.oldPrice}</p>
                    )}
                    <p className="text-xl sm:text-2xl font-bold gradient-text">{treatment.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (treatment.title === 'Course of 6 Sessions') {
                        trackPRPDealView()
                      }
                      onBookingClick?.()
                    }}
                    className={`px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r ${treatment.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 sm:hover:scale-105 text-sm sm:text-base`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Call-to-Action */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-sm text-neutral-600 mb-3">Not sure which is right for you?</p>
          <a href="#assessment" className="text-primary-600 font-medium text-sm">
            Take our skin assessment →
          </a>
        </div>
      </div>
    </section>
  )
}
