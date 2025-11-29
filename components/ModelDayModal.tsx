'use client'

import { useEffect } from 'react'
import { trackModelDayModalOpen, trackModelDayWhatsAppClick, trackPhoneClick } from './FacebookPixel'

interface ModelDayModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModelDayModal({ isOpen, onClose }: ModelDayModalProps) {
  const whatsappNumber = '447476903007'
  const whatsappMessage = encodeURIComponent(
    `Hi Quartz Aesthetics! I'd like to apply for your Lipofirm Model programme.

I'm interested in being featured in your before & after gallery for skin tightening.

Here's a photo of my concern area:`
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      trackModelDayModalOpen()
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleWhatsAppClick = () => {
    trackModelDayWhatsAppClick()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-modal-slide-up max-h-[90vh] sm:max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-5 sm:p-6 lg:p-8 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur rounded-full mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-2">
              LIMITED SPOTS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Become a Lipofirm Model</h2>
            <p className="text-white/90 text-sm leading-relaxed mt-2">
              Get exclusive rates on skin tightening in exchange for before & after photos
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
          <div className="space-y-5 sm:space-y-6">
            {/* What You Get */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center">
                <span className="text-primary-500 mr-2">✨</span>
                What You Get
              </h3>
              <ul className="space-y-2">
                {[
                  'Exclusive discounted skin tightening rates',
                  'Professional before & after photography',
                  'Same expert RF treatment as full-price clients',
                  'Be featured on our website & social media'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base text-neutral-700">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How It Works */}
            <div className="bg-primary-50 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-base sm:text-lg mb-3 flex items-center">
                <span className="text-primary-500 mr-2">📱</span>
                How to Apply
              </h3>
              <ol className="space-y-3">
                {[
                  'Send us a photo of your concern area via WhatsApp',
                  'We\'ll assess if you\'re a good fit for our portfolio',
                  'Receive your personalised offer within 24 hours'
                ].map((step, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base text-neutral-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Requirements Note */}
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Models agree to allow their before & after photos to be used for marketing purposes including our website, social media, and promotional materials.
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex-shrink-0 p-5 sm:p-6 lg:p-8 pt-0 space-y-3">
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl sm:rounded-2xl p-4 sm:p-5 font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg group"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Apply via WhatsApp
          </a>

          {/* Call Option */}
          <a
            href="tel:+447476903007"
            onClick={trackPhoneClick}
            className="flex items-center justify-center w-full text-primary-600 hover:text-primary-700 text-sm sm:text-base font-medium transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Prefer to call? 07476 903007
          </a>
        </div>
      </div>
    </div>
  )
}
