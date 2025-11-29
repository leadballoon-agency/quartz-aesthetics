'use client'

import { useState } from 'react'
import Link from 'next/link'

// Configuration
const CONFIG = {
  webhookUrl: 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID_HERE',
  bookingUrlSuitable: 'https://calendly.com/your-clinic/co2-laser-consultation',
  bookingUrlAlternative: 'https://calendly.com/your-clinic/skin-consultation',
  tagSuitable: 'CO2 Laser - Qualified',
  tagNotSuitable: 'CO2 Laser - Not Suitable',
}

// Quiz data
const questions = [
  {
    id: 'eye_color',
    question: 'What is your natural eye colour?',
    options: [
      { text: 'Light blue, light grey, or light green', score: 0 },
      { text: 'Blue, grey, or green', score: 1 },
      { text: 'Hazel or light brown', score: 2 },
      { text: 'Dark brown', score: 3 },
      { text: 'Brownish black', score: 4 }
    ]
  },
  {
    id: 'hair_color',
    question: 'What is your natural hair colour?',
    options: [
      { text: 'Red or light blonde', score: 0 },
      { text: 'Blonde', score: 1 },
      { text: 'Dark blonde or light brown', score: 2 },
      { text: 'Dark brown', score: 3 },
      { text: 'Black', score: 4 }
    ]
  },
  {
    id: 'skin_color',
    question: 'What is your natural skin colour (unexposed areas)?',
    options: [
      { text: 'Ivory white', score: 0 },
      { text: 'Fair or pale', score: 1 },
      { text: 'Fair to beige with golden undertone', score: 2 },
      { text: 'Olive or light brown', score: 3 },
      { text: 'Dark brown or black', score: 4 }
    ]
  },
  {
    id: 'freckles',
    question: 'How many freckles do you have on unexposed areas?',
    options: [
      { text: 'Many', score: 0 },
      { text: 'Several', score: 1 },
      { text: 'A few', score: 2 },
      { text: 'Very few', score: 3 },
      { text: 'None', score: 4 }
    ]
  },
  {
    id: 'sun_reaction',
    question: 'How does your skin react to sun exposure?',
    options: [
      { text: 'Always burns, blisters, and peels', score: 0 },
      { text: 'Often burns, blisters, and peels', score: 1 },
      { text: 'Burns moderately', score: 2 },
      { text: 'Burns rarely', score: 3 },
      { text: 'Rarely or never burns', score: 4 }
    ]
  },
  {
    id: 'tanning',
    question: 'Does your skin tan?',
    options: [
      { text: 'Never — I just burn and peel', score: 0 },
      { text: 'Seldom', score: 1 },
      { text: 'Sometimes', score: 2 },
      { text: 'Often', score: 3 },
      { text: 'Always — I never burn', score: 4 }
    ]
  }
]

const fitzTypes: Record<number, any> = {
  1: {
    type: 'Type I', name: 'Very Fair',
    description: 'Always burns, never tans. Extremely sun-sensitive skin.',
    color: '#FFE4D6', textColor: '#8B4513',
    laserSuitability: 'excellent', isSuitable: true,
    laserMessage: 'Excellent candidate for CO2 laser resurfacing. Your skin type typically responds very well to ablative laser treatments with predictable healing.',
    considerations: ['Higher sensitivity may require adjusted treatment parameters', 'Excellent collagen response expected', 'Follow strict sun protection protocol post-treatment']
  },
  2: {
    type: 'Type II', name: 'Fair',
    description: 'Usually burns, tans minimally. Very sun-sensitive skin.',
    color: '#FFE8D0', textColor: '#8B4513',
    laserSuitability: 'excellent', isSuitable: true,
    laserMessage: 'Excellent candidate for CO2 laser resurfacing. Your skin type responds very well to treatment with low risk of complications.',
    considerations: ['Optimal healing potential', 'Low risk of post-inflammatory hyperpigmentation', 'Standard treatment protocols apply']
  },
  3: {
    type: 'Type III', name: 'Medium',
    description: 'Sometimes mild burn, tans uniformly. Moderately sun-sensitive.',
    color: '#E8C8A0', textColor: '#5D4037',
    laserSuitability: 'good', isSuitable: true,
    laserMessage: 'Good candidate for CO2 laser resurfacing. Your skin type generally responds well with proper treatment planning.',
    considerations: ['Pre-treatment skin conditioning may be recommended', 'Careful parameter selection for optimal results', 'Monitor for pigmentation changes during healing']
  },
  4: {
    type: 'Type IV', name: 'Olive',
    description: 'Burns minimally, always tans well. Minimal sun sensitivity.',
    color: '#C9A86C', textColor: '#3E2723',
    laserSuitability: 'moderate', isSuitable: true,
    laserMessage: 'Moderate candidate for CO2 laser resurfacing. Treatment is possible but requires careful assessment and may need modified protocols.',
    considerations: ['Higher risk of post-inflammatory hyperpigmentation', 'Pre-treatment with skin lightening agents often recommended', 'Conservative treatment settings typically used', 'Extended consultation recommended']
  },
  5: {
    type: 'Type V', name: 'Brown',
    description: 'Rarely burns, tans darkly easily. Sun-insensitive skin.',
    color: '#8B6914', textColor: '#FFFFFF',
    laserSuitability: 'limited', isSuitable: false,
    laserMessage: 'CO2 laser resurfacing carries significant risks for your skin type. We recommend exploring alternative treatments that can achieve similar results more safely.',
    considerations: ['Significant risk of hyperpigmentation and scarring with CO2', 'Alternative treatments like chemical peels or microneedling often preferred', 'Specialised protocols available for darker skin types', 'Comprehensive consultation essential to discuss all options']
  },
  6: {
    type: 'Type VI', name: 'Dark Brown/Black',
    description: 'Never burns, deeply pigmented. Sun-insensitive skin.',
    color: '#4A3728', textColor: '#FFFFFF',
    laserSuitability: 'not-recommended', isSuitable: false,
    laserMessage: 'CO2 laser resurfacing is not recommended for your skin type due to high complication risks. However, we have excellent alternative treatments that are safe and effective for your skin.',
    considerations: ['Very high risk of hyperpigmentation, hypopigmentation, and scarring with CO2', 'Safe and effective alternatives available', 'Options include: gentle chemical peels, microneedling, or specialised darker skin protocols', 'Our specialists can recommend the best approach for your goals']
  }
}

export default function SkinAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [leadData, setLeadData] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const calculateType = () => {
    const total = Object.values(answers).reduce((sum, score) => sum + score, 0)
    if (total <= 6) return 1
    if (total <= 12) return 2
    if (total <= 18) return 3
    if (total <= 24) return 4
    if (total <= 30) return 5
    return 6
  }

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [questions[currentStep].id]: score })

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setShowLeadForm(true)
      }
    }, 400)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!leadData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!leadData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) {
      newErrors.email = 'Valid email is required'
    }
    if (!leadData.phone.trim()) newErrors.phone = 'Phone number is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setSubmitting(true)

    const fitzType = calculateType()
    const result = fitzTypes[fitzType]

    const suitabilityLabels: Record<string, string> = {
      'excellent': 'Excellent Candidate',
      'good': 'Good Candidate',
      'moderate': 'Moderate Candidate',
      'limited': 'Limited Candidate',
      'not-recommended': 'Not Recommended'
    }

    const payload = {
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      phone: leadData.phone,
      fitzpatrick_type: fitzType,
      fitzpatrick_name: `${result.type} - ${result.name}`,
      co2_laser_suitability: suitabilityLabels[result.laserSuitability],
      co2_laser_suitable: result.isSuitable,
      tags: result.isSuitable ? CONFIG.tagSuitable : CONFIG.tagNotSuitable,
      assessment_source: 'Fitzpatrick Skin Type Quiz',
      submitted_at: new Date().toISOString()
    }

    try {
      await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error('Webhook error:', error)
    }

    setShowLeadForm(false)
    setShowResults(true)
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowLeadForm(false)
    setShowResults(false)
    setLeadData({ firstName: '', lastName: '', email: '', phone: '' })
    setErrors({})
  }

  const progress = ((currentStep + 1) / questions.length) * 100
  const fitzType = calculateType()
  const result = fitzTypes[fitzType]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Skin Type Assessment</h1>
          <p className="text-gray-600">Discover your Fitzpatrick skin type and CO2 laser suitability</p>
        </div>

        {/* Questions */}
        {!showLeadForm && !showResults && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {questions[currentStep].question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.score)}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lead Form */}
        {showLeadForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Results Are Ready!</h2>
              <p className="text-gray-600">Enter your details to see your personalised assessment</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={leadData.firstName}
                    onChange={(e) => setLeadData({...leadData, firstName: e.target.value})}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Jane"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={leadData.lastName}
                    onChange={(e) => setLeadData({...leadData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="jane@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="07123 456789"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'See My Results'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to receive communications about your assessment and treatment options.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && result && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(145deg, ${result.color}, ${result.color}CC)`,
                  color: result.textColor
                }}
              >
                <span className="text-4xl font-bold">{fitzType}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.type}</h2>
              <p className="text-xl text-gray-600 mb-2">{result.name}</p>
              <p className="text-gray-500">{result.description}</p>

              <div className="mt-6">
                <span className={`inline-block px-6 py-2 rounded-full text-white font-semibold text-sm ${
                  result.laserSuitability === 'excellent' ? 'bg-green-500' :
                  result.laserSuitability === 'good' ? 'bg-blue-500' :
                  result.laserSuitability === 'moderate' ? 'bg-yellow-500' :
                  result.laserSuitability === 'limited' ? 'bg-orange-500' :
                  'bg-purple-600'
                }`}>
                  {result.laserSuitability === 'excellent' ? 'EXCELLENT CANDIDATE' :
                   result.laserSuitability === 'good' ? 'GOOD CANDIDATE' :
                   result.laserSuitability === 'moderate' ? 'MODERATE CANDIDATE' :
                   result.laserSuitability === 'limited' ? 'LIMITED CANDIDATE' :
                   'NOT RECOMMENDED'}
                </span>
              </div>
            </div>

            {/* Assessment */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                CO2 LASER ASSESSMENT
              </h3>
              <p className="text-gray-700 mb-4">{result.laserMessage}</p>

              <h4 className="text-sm font-semibold text-gray-600 mb-2">KEY CONSIDERATIONS</h4>
              <ul className="space-y-2">
                {result.considerations.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            {result.isSuitable ? (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-6">
                <p className="mb-4">Great news! You're a strong candidate for CO2 laser treatment. Ready to discuss your personalised treatment plan?</p>
                <a
                  href={CONFIG.bookingUrlSuitable}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Book Your Consultation
                </a>
              </div>
            ) : (
              <div className="border-2 border-yellow-400 bg-yellow-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Alternative Treatments Available</h3>
                <p className="text-gray-700 mb-4">While CO2 laser may not be ideal for your skin type, we offer several effective alternatives that could achieve your goals safely.</p>
                <a
                  href={CONFIG.bookingUrlAlternative}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  Explore Your Options
                </a>
              </div>
            )}

            <button
              onClick={restart}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Retake Assessment
            </button>

            <p className="text-xs text-gray-500 text-center mt-6">
              This assessment provides general guidance only. Individual suitability must be confirmed during a professional consultation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
