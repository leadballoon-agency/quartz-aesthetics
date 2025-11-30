interface PremiumHeroProps {
  onBookingClick?: () => void
  onVideoClick?: () => void
}

export default function PremiumHero({ onBookingClick, onVideoClick }: PremiumHeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 animate-slide-up text-center lg:text-left">
            {/* Special Offer Badge */}
            <div className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto lg:mx-0 shadow-lg">
              <span className="text-white font-bold text-sm sm:text-base tracking-wide">Limited Time Offer</span>
            </div>

            {/* Main Heading - GLP-1 Focus */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Lost Weight on Ozempic?
              <span className="block gradient-text mt-1 sm:mt-2">Tighten Loose Skin</span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
              Ozempic, Wegovy & Mounjaro help you lose weight - but what about the loose skin left behind? Lipofirm uses advanced RF technology to tighten and firm skin naturally. No surgery, no downtime.
            </p>

            {/* Offer Box - Clean styling without Black Friday */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-5 sm:p-6 mx-auto lg:mx-0 max-w-xl shadow-lg">
              <p className="text-white font-bold text-xs sm:text-sm mb-3 tracking-wide">GET STARTED TODAY</p>
              <div className="flex justify-center gap-3">
                <div className="text-center bg-white/20 backdrop-blur rounded-xl p-4 shadow-md flex-1">
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">£99</p>
                  <p className="text-xs sm:text-sm text-white font-medium">Consultation + 1st Session</p>
                </div>
                <div className="text-center bg-white/30 backdrop-blur rounded-xl p-4 shadow-md flex-1 border-2 border-white/50">
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">£770</p>
                  <p className="text-xs sm:text-sm text-white font-medium">Full 8 Sessions</p>
                  <p className="text-xs text-white/80 mt-1 line-through">£960</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/90 mt-3 sm:mt-4 text-center font-medium">Pay Monthly Available • No Downtime Required</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-1">
              <button
                onClick={onBookingClick}
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Book Free Consultation
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={onVideoClick}
                className="inline-flex items-center justify-center border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-full font-semibold text-base hover:bg-primary-50 transition-all duration-300 w-full sm:w-auto group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Video
              </button>
            </div>

            {/* Social Proof - Skin Tightening Focus */}
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center lg:justify-start gap-4 sm:gap-6 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary-600">No</p>
                <p className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">Downtime</p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary-600">RF</p>
                <p className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">Technology</p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary-600">Visible</p>
                <p className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">Tightening</p>
              </div>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-primary-600">Collagen</p>
                <p className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">Stimulation</p>
              </div>
            </div>
          </div>

          {/* Mobile Video Section - Simple and Clean */}
          <div className="relative mt-8 lg:hidden">
            <div className="relative mx-auto max-w-[320px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="rounded-2xl shadow-xl w-full"
              >
                <source
                  src="https://storage.googleapis.com/msgsndr/GVVaIBlAD0WmNtFQQ6KJ/media/692b2099aaad9166afb65ed5.mp4"
                  type="video/mp4"
                />
                {/* Fallback for browsers that don't support video */}
                <img
                  src="/images/lipofirm-treatment.jpg"
                  alt="Lipofirm Skin Tightening Treatment"
                  className="rounded-2xl shadow-xl w-full"
                />
              </video>
            </div>
          </div>

          {/* Desktop Video Section */}
          <div className="relative mt-8 lg:mt-0 hidden lg:block">
            <div className="relative h-[600px] flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 rounded-3xl"></div>

              <div className="relative flex items-center justify-center h-full w-full">
                {/* Main Video */}
                <div className="relative w-full max-w-md">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="rounded-2xl shadow-2xl w-full animate-float"
                  >
                    <source
                      src="https://storage.googleapis.com/msgsndr/GVVaIBlAD0WmNtFQQ6KJ/media/692b2099aaad9166afb65ed5.mp4"
                      type="video/mp4"
                    />
                    {/* Fallback for browsers that don't support video */}
                    <img
                      src="/images/lipofirm-treatment.jpg"
                      alt="Lipofirm Skin Tightening Treatment"
                      className="rounded-2xl shadow-2xl w-full animate-float"
                    />
                  </video>
                </div>
              </div>

              {/* Info Card - Desktop Only */}
              <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">Post-Weight Loss Skin Specialist</h3>
                    <div className="flex justify-center items-center space-x-2 text-primary-600">
                      <span className="font-medium">RF Skin Tightening</span>
                      <span className="text-primary-300">•</span>
                      <span className="font-medium">Non-Surgical Solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements - Hidden on Mobile */}
            <div className="hidden sm:block absolute -top-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full animate-float opacity-20 blur-2xl"></div>
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-tr from-primary-300 to-primary-500 rounded-full animate-float opacity-20 blur-2xl" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Visible on all devices */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs text-neutral-500 mb-2">Scroll to explore</span>
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
