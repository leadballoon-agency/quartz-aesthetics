'use client'

import { useState } from 'react'
import { trackAssessmentStart, trackAssessmentComplete } from './FacebookPixel'
import AssessmentModal from './AssessmentModal'

interface AssessmentToolProps {
  onBookingClick?: () => void
  onAssessmentComplete?: (data: any) => void
}

export default function AssessmentTool({ onBookingClick, onAssessmentComplete }: AssessmentToolProps) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<any>({})
  const [showModal, setShowModal] = useState(false)

  const questions = [
    {
      id: 1,
      question: "What caused your loose skin?",
      subtext: "Select the main reason for your skin concerns",
      options: [
        { value: 'ozempic', label: 'Ozempic/Wegovy weight loss', icon: '💊' },
        { value: 'mounjaro', label: 'Mounjaro weight loss', icon: '💉' },
        { value: 'natural', label: 'Natural weight loss', icon: '🏃' },
        { value: 'aging', label: 'Natural aging', icon: '⏰' },
        { value: 'pregnancy', label: 'Post-pregnancy', icon: '👶' },
        { value: 'other', label: 'Other / Not sure', icon: '❓' }
      ]
    },
    {
      id: 2,
      question: "Which area concerns you most?",
      options: [
        { value: 'tummy', label: 'Tummy / Abdomen', icon: '🎯' },
        { value: 'arms', label: 'Arms (bingo wings)', icon: '💪' },
        { value: 'thighs', label: 'Thighs', icon: '🦵' },
        { value: 'multiple', label: 'Multiple areas', icon: '✨' }
      ]
    },
    {
      id: 3,
      question: "How would you describe your skin laxity?",
      options: [
        { value: 'mild', label: 'Mild - Slightly loose', icon: '🌱' },
        { value: 'moderate', label: 'Moderate - Noticeable sagging', icon: '🌿' },
        { value: 'significant', label: 'Significant - Very loose', icon: '🌳' }
      ]
    }
  ]

  const totalSteps = questions.length
  const currentQuestion = questions[step - 1]

  const handleAnswer = (value: string | number) => {
    const newAnswers = { ...answers, [step]: value }
    setAnswers(newAnswers)

    // Track first question as assessment start
    if (step === 1) {
      trackAssessmentStart()
    }

    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Show results and emit assessment completion
      setStep(step + 1)
      const recommendation = getRecommendation(newAnswers)

      // Track assessment completion
      trackAssessmentComplete(recommendation.treatment)

      onAssessmentComplete?.({
        answers: newAnswers,
        recommendation,
        completedAt: new Date().toISOString()
      })
    }
  }

  const getRecommendation = (assessmentAnswers: any = answers) => {
    const cause = assessmentAnswers[1]
    const area = assessmentAnswers[2]
    const laxity = assessmentAnswers[3]

    // Course of 12 for significant weight loss or multiple areas with significant laxity
    if (laxity === 'significant' || (area === 'multiple' && (cause === 'ozempic' || cause === 'mounjaro' || cause === 'natural'))) {
      return {
        treatment: 'Course of 12 Sessions',
        price: '£900',
        oldPrice: '£1200',
        description: 'Complete skin transformation package. Ideal for significant skin laxity after major weight loss. Maximum collagen stimulation across multiple areas.',
        isSuitable: true,
        isBestValue: true
      }
    }

    // Course of 6 for moderate laxity or GLP-1 users
    if (laxity === 'moderate' || cause === 'ozempic' || cause === 'mounjaro') {
      return {
        treatment: 'Course of 6 Sessions',
        price: '£480',
        oldPrice: '£600',
        description: 'Our most popular package for post-weight loss skin tightening. 6 sessions for optimal collagen stimulation and visible firming results.',
        isSuitable: true,
        isBestValue: true
      }
    }

    // Single session for mild concerns or first-timers
    if (laxity === 'mild' || cause === 'aging' || cause === 'other') {
      return {
        treatment: 'Single Lipofirm Session',
        price: '£99',
        description: 'Try our RF skin tightening treatment. Perfect for mild concerns or to experience the treatment before committing to a course.',
        isSuitable: true
      }
    }

    // Default to course of 6
    return {
      treatment: 'Course of 6 Sessions',
      price: '£480',
      oldPrice: '£600',
      description: 'Our recommended package for visible skin tightening results. Stimulates collagen production over 6 weekly sessions.',
      isSuitable: true,
      isBestValue: true
    }
  }

  return (
    <section id="assessment" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto section-padding">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full mb-3">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mr-2"></span>
            <span className="text-primary-700 font-medium text-xs sm:text-sm">Skin Assessment</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
            Find Your Perfect
            <span className="gradient-text"> Skin Tightening Plan</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-600 max-w-2xl mx-auto px-4">
            Answer 3 quick questions for personalized recommendations
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-premium p-6 sm:p-8 md:p-12">
          {step <= totalSteps && currentQuestion ? (
            <>
              {/* Progress Bar */}
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-neutral-600">Step {step} of {totalSteps}</span>
                  <span className="text-xs sm:text-sm text-neutral-600">{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div
                    className="bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-2">{currentQuestion.question}</h3>
                {currentQuestion.subtext && (
                  <p className="text-sm leading-relaxed text-neutral-500">{currentQuestion.subtext}</p>
                )}
              </div>

              {/* Standard Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQuestion.options?.map((option: any) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group relative bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-primary-500 hover:shadow-lg transition-all duration-300 hover:scale-105 flex sm:flex-col items-center sm:items-center text-left sm:text-center"
                  >
                    <div className="text-3xl sm:text-4xl mr-4 sm:mr-0 sm:mb-3">{option.icon}</div>
                    <p className="font-medium text-sm sm:text-base text-neutral-700 group-hover:text-primary-600">
                      {option.label}
                    </p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl">✨</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Your Recommended Treatment Plan
              </h3>

              <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-4 sm:mb-6 border-2 bg-gradient-to-br from-primary-50 to-white border-primary-100">
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-primary-600">
                  {getRecommendation().treatment}
                  {getRecommendation().isBestValue && <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">RECOMMENDED</span>}
                </h4>
                {getRecommendation().oldPrice && (
                  <p className="text-sm text-neutral-400 line-through mb-1">{getRecommendation().oldPrice}</p>
                )}
                <p className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 gradient-text">
                  {getRecommendation().price}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-neutral-600">
                  {getRecommendation().description}
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <p className="text-sm text-green-900 font-medium mb-1">No Downtime Required</p>
                    <p className="text-sm text-green-800">
                      Lipofirm RF is a comfortable treatment with no recovery time. Return to normal activities immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <button
                  onClick={onBookingClick}
                  type="button"
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-xl hover:scale-105 px-6 py-3 sm:py-4 rounded-full font-medium transition-all duration-300"
                >
                  Book Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => {setStep(1); setAnswers({})}}
                  className="w-full inline-flex items-center justify-center text-primary-600 text-sm font-medium hover:text-primary-700 transition-all duration-300"
                >
                  ← Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Modal */}
      <AssessmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={{
          skinType: answers[1],
          concern: answers[2],
          age: answers[3]
        }}
      />
    </section>
  )
}
