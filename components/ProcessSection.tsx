interface ProcessSectionProps {
  onBookingClick?: () => void
}

export default function ProcessSection({ onBookingClick }: ProcessSectionProps) {
  const steps = [
    {
      number: '01',
      title: 'Free Consultation',
      description: 'Skin assessment to understand your concerns and goals',
      icon: '💬',
      duration: '20 mins'
    },
    {
      number: '02',
      title: 'RF Skin Tightening',
      description: 'Advanced radiofrequency technology stimulates collagen production',
      icon: '🔬',
      duration: '30-45 mins'
    },
    {
      number: '03',
      title: 'Immediate Tightening',
      description: 'Walk out with visibly firmer skin - no downtime needed',
      icon: '✨',
      duration: 'Same day'
    },
    {
      number: '04',
      title: 'Collagen Rebuilding',
      description: 'Skin continues to tighten as new collagen forms over weeks',
      icon: '📈',
      duration: '6-12 sessions'
    }
  ]

  return (
    <section id="process" className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-xs sm:text-sm">How It Works</span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mt-2 sm:mt-3">
            Your Skin Tightening
            <span className="block gradient-text">Journey</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600 mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
            RF technology that stimulates your body's natural collagen production
          </p>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200"></div>

            <div className="space-y-6 sm:space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-4 sm:gap-6">
                  {/* Step number circle */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <h3 className="font-bold text-base sm:text-lg">{step.title}</h3>
                      <span className="text-2xl sm:text-3xl ml-2 sm:ml-3">{step.icon}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-600 mb-1.5 sm:mb-2">{step.description}</p>
                    <div className="text-[11px] sm:text-xs text-primary-600 font-medium">
                      {step.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal Steps */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-2 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl">{step.icon}</span>
                    <span className="text-primary-600 font-bold text-2xl">{step.number}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600 mb-3">{step.description}</p>
                  <div className="text-xs text-primary-600 font-medium">
                    {step.duration}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-br from-primary-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="bg-gradient-to-r from-primary-100 to-primary-50 rounded-xl p-4 mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">✨</span>
                  <h4 className="font-bold text-primary-800">Non-Surgical Skin Tightening</h4>
                </div>
                <p className="text-sm leading-relaxed text-primary-700">Unlike surgical procedures, Lipofirm RF requires no recovery time. Perfect for tightening loose skin after weight loss from Ozempic, Wegovy or Mounjaro.</p>
              </div>

              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                How Your Skin Transforms
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1">✓</span>
                  <span className="text-sm sm:text-base leading-relaxed text-neutral-700">Immediately: Visible skin tightening, warm sensation in treated area</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1">✓</span>
                  <span className="text-sm sm:text-base leading-relaxed text-neutral-700">Week 1-2: Collagen production begins, skin feels firmer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1">✓</span>
                  <span className="text-sm sm:text-base leading-relaxed text-neutral-700">Sessions 3-4: Noticeable tightening as new collagen forms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1">✓</span>
                  <span className="text-sm sm:text-base leading-relaxed text-neutral-700">Course complete: Firmer, tighter skin with lasting results</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-premium mt-4 lg:mt-0">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-xl sm:text-2xl">🏥</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Full Support</h4>
                  <p className="text-xs sm:text-sm text-neutral-600">We're here throughout your journey</p>
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 mb-3 sm:mb-4">
                Every client receives comprehensive aftercare advice and direct access to our team for any questions during your treatment course.
              </p>
              <button onClick={onBookingClick} className="text-primary-600 font-medium text-sm sm:text-base hover:text-primary-700">
                Book your consultation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
