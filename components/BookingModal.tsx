'use client'

import { useEffect } from 'react'
import { trackBookingModalOpen, trackPhoneClick } from './FacebookPixel'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  assessmentData?: any
}

export default function BookingModal({ isOpen, onClose, assessmentData }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      trackBookingModalOpen()

      // Load GHL calendar script
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://link.leadballoon.co.uk/js/form_embed.js'
      document.body.appendChild(script)

      return () => {
        try {
          document.body.removeChild(script)
        } catch (e) {
          // Script already removed
        }
      }
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Mobile slides up from bottom, desktop centered */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-modal-slide-up max-h-[90vh] sm:max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-5 sm:p-6 lg:p-8 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur rounded-full mb-2 sm:mb-3 lg:mb-4">
              <span className="text-2xl sm:text-3xl">✨</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Book Your Treatment</h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Select your preferred date and time
            </p>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* GHL Calendar Embed */}
            <div className="w-full min-h-[500px]">
              <iframe
                src="https://link.leadballoon.co.uk/widget/booking/ItKSB3DOgERnbDFczvp7"
                style={{ width: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }}
                scrolling="no"
                id="ItKSB3DOgERnbDFczvp7_booking"
              />
            </div>

            {/* Contact alternatives below calendar */}
            <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200">
              <p className="text-center text-sm text-neutral-600 mb-3">
                Prefer to speak to us directly?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+441295985001"
                  onClick={trackPhoneClick}
                  className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  01295 985 001
                </a>
                <a
                  href="tel:+447826755534"
                  onClick={trackPhoneClick}
                  className="inline-flex items-center justify-center border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  07826 755534
                </a>
              </div>
              <p className="text-center text-xs text-neutral-500 mt-3">
                The Wellness Centre, 54 Bloxham Road, Banbury, OX16 9JR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
