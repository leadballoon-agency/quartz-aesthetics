'use client'

import { useState } from 'react'

interface Review {
  name: string
  rating: 5
  date: string
  treatment: string
  text: string
  verified: boolean
}

export default function Reviews() {
  const reviews: Review[] = [
    {
      name: "Sarah M.",
      rating: 5,
      date: "2024-11-15",
      treatment: "Lipofirm Course",
      text: "Amazing results from my Lipofirm course! I've lost inches from my tummy and the skin is so much tighter. Pamela is so professional and makes you feel at ease. Highly recommend!",
      verified: true
    },
    {
      name: "Rachel T.",
      rating: 5,
      date: "2024-10-28",
      treatment: "Body Sculpting",
      text: "I was skeptical at first but after my course of treatments I can really see the difference. My arms are more toned and the bingo wings have reduced significantly. Great experience!",
      verified: true
    },
    {
      name: "Jennifer K.",
      rating: 5,
      date: "2024-10-12",
      treatment: "Lipofirm Treatment",
      text: "Quartz Aesthetics is fantastic. The clinic is clean and welcoming, and Pamela really knows her stuff. I've had great results on my thighs and would definitely recommend to anyone considering body contouring.",
      verified: true
    },
    {
      name: "Emma W.",
      rating: 5,
      date: "2024-09-20",
      treatment: "Fat Reduction",
      text: "So happy with my results! The treatment is relaxing and I've seen real changes in my problem areas. Pamela explains everything clearly and the aftercare advice was really helpful.",
      verified: true
    },
    {
      name: "Claire B.",
      rating: 5,
      date: "2024-09-05",
      treatment: "Skin Tightening",
      text: "I came for skin tightening after weight loss and I'm thrilled with how much firmer my skin looks. The whole experience was lovely and I felt really looked after throughout.",
      verified: true
    },
    {
      name: "Louise H.",
      rating: 5,
      date: "2024-08-18",
      treatment: "Lipofirm Course",
      text: "Brilliant service from start to finish. Pamela is so knowledgeable and caring. My love handles have really reduced and I feel so much more confident. Worth every penny!",
      verified: true
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-xs sm:text-sm">Client Reviews</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-4">
            What Our Clients
            <span className="block gradient-text">Are Saying</span>
          </h2>

          {/* Overall Rating */}
          <div className="mt-6 sm:mt-8 inline-flex flex-col items-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center space-x-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-neutral-900">5.0</p>
            <p className="text-sm sm:text-base text-neutral-600 mt-1">Based on verified reviews</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white border-2 border-neutral-100 rounded-2xl p-6 sm:p-8 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-neutral-700 text-sm sm:text-base mb-4 leading-relaxed">
                "{review.text}"
              </p>

              {/* Treatment Badge */}
              <div className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                {review.treatment}
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div>
                  <p className="font-semibold text-neutral-900 text-sm sm:text-base">{review.name}</p>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {new Date(review.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
                {review.verified && (
                  <div className="flex items-center text-green-600 text-xs">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 sm:p-8">
            <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
              <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
              <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
            </svg>
            <div className="text-left">
              <p className="font-semibold text-neutral-900 text-base sm:text-lg mb-1">Read more reviews on Google</p>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-neutral-600">5.0 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
