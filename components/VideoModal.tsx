'use client'

import { useEffect, useRef } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      // Explicitly play video on mobile (user-initiated action)
      if (videoRef.current) {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Video autoplay prevented:', error)
          })
        }
      }
    } else {
      document.body.style.overflow = 'unset'
    }

    // Close on ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Video Container - Portrait orientation */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-md bg-black sm:rounded-3xl shadow-2xl overflow-hidden animate-modal-slide-up">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
          aria-label="Close video"
        >
          <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
          >
            <source src="https://storage.googleapis.com/msgsndr/GVVaIBlAD0WmNtFQQ6KJ/media/692b2099aaad9166afb65ed5.mp4" type="video/mp4" />
            <p className="text-white text-center p-4">
              Your browser doesn't support video playback.
            </p>
          </video>
        </div>
      </div>
    </div>
  )
}
