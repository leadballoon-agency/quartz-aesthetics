'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "I've lost weight on Ozempic/Wegovy - can Lipofirm help with loose skin?",
    answer: "Absolutely! This is one of the most common reasons clients come to us. GLP-1 medications like Ozempic, Wegovy, and Mounjaro are excellent for weight loss, but the rapid fat reduction can leave loose, saggy skin behind. Lipofirm uses radiofrequency technology to stimulate collagen production, tightening and firming the skin naturally without surgery."
  },
  {
    question: 'How soon after stopping GLP-1 medication can I have treatment?',
    answer: "You can have Lipofirm treatment at any time - whether you're still on GLP-1 medication or have stopped. There's no waiting period required. Many clients start treatment while still on their medication to address loose skin as they lose weight, which can actually help prevent more skin laxity."
  },
  {
    question: 'Will skin tightening results last if I regain some weight?',
    answer: "The collagen stimulation from Lipofirm creates lasting structural improvements in your skin. However, significant weight fluctuations can affect results over time. We recommend maintaining a stable weight for best long-term results. If you're concerned about weight maintenance after GLP-1 medications, we can discuss this during your consultation."
  },
  {
    question: 'Is Lipofirm treatment painful?',
    answer: 'Lipofirm is a comfortable treatment. Most clients describe feeling a warm, pleasant sensation as the RF energy is delivered. The treatment is relaxing and many clients find it enjoyable. No anaesthetic is required.'
  },
  {
    question: 'Is there any downtime?',
    answer: 'One of the biggest advantages of Lipofirm is zero downtime! You can return to normal activities immediately after your session. Unlike surgical skin tightening procedures, there\'s no recovery period. Some clients experience mild warmth in the treated area, but this subsides quickly.'
  },
  {
    question: 'How many treatments will I need?',
    answer: "We offer a 4 session course (£380) for visible results, or a full 8 session course (£770) for complete transformation. Start with a consultation + first session for just £99 to see how your skin responds. You'll start seeing improvements from session 3-4, with full results visible after completing the course."
  },
  {
    question: 'Which areas can be treated for skin tightening?',
    answer: "Lipofirm is effective on many areas affected by loose skin including tummy (most common after weight loss), arms ('bingo wings'), thighs, love handles, back, and chin/jawline. We'll assess your specific concerns during your free consultation."
  },
  {
    question: 'When will I see skin tightening results?',
    answer: 'Many clients notice some tightening immediately after their first session due to the heat causing existing collagen to contract. The real transformation happens over the following weeks as your body produces new collagen. Most clients see significant improvement after 3-4 sessions, with results continuing to improve throughout your course.'
  }
]

interface FAQProps {
  onBookingClick?: () => void
}

export default function FAQ({ onBookingClick }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto section-padding">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-xs sm:text-sm">Skin Tightening FAQ</span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mt-2 sm:mt-3">
            Common Questions
            <span className="block gradient-text">About Lipofirm</span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center hover:bg-primary-50 transition-colors"
              >
                <span className="font-semibold text-sm sm:text-base pr-3 sm:pr-4">{faq.question}</span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">
            Still have questions? We're here to help.
          </p>
          <button
            onClick={onBookingClick}
            className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base lg:text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}
