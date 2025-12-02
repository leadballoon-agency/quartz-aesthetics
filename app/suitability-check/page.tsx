'use client'

import { useState } from 'react'
import Link from 'next/link'

// Contraindication options with categories
const contraindicationOptions = [
  { value: 'pregnant', label: 'I am pregnant or breastfeeding', icon: '🤰', shortLabel: 'Pregnant/breastfeeding' },
  { value: 'cancer', label: 'I have/had cancer in the last 5 years or am having treatment', icon: '🏥', shortLabel: 'Cancer history/treatment' },
  { value: 'autoimmune', label: 'I have an autoimmune disease (lupus, MS, rheumatoid arthritis)', icon: '💊', shortLabel: 'Autoimmune disease' },
  { value: 'recentSurgery', label: "I've had surgery in the treatment area in the last 12 months", icon: '🔪', shortLabel: 'Recent surgery' },
  { value: 'implants', label: 'I have a pacemaker, implanted device, or metal implants', icon: '⚡', shortLabel: 'Pacemaker/implants' },
  { value: 'diabetes', label: 'I have uncontrolled diabetes or circulation issues', icon: '🩸', shortLabel: 'Diabetes/circulation' },
  { value: 'cardiovascular', label: 'I have a cardiovascular or vascular condition', icon: '❤️', shortLabel: 'Cardiovascular condition' },
  { value: 'skinIssues', label: 'I have active skin issues in the treatment area', icon: '🩹', shortLabel: 'Active skin issues' },
  { value: 'keloid', label: 'I have a history of keloid scarring', icon: '🔴', shortLabel: 'Keloid scarring' },
  { value: 'epilepsy', label: 'I have epilepsy or seizure disorders', icon: '⚠️', shortLabel: 'Epilepsy/seizures' },
  { value: 'cosmeticProcedures', label: "I've had recent cosmetic procedures (injectables, laser, etc.)", icon: '💉', shortLabel: 'Recent cosmetic procedures' },
  { value: 'under18', label: 'I am under 18 years old', icon: '🔞', shortLabel: 'Under 18' },
  { value: 'none', label: 'None of these apply to me', icon: '✅', shortLabel: 'None' },
]

// Categories for smart responses
const TEMPORARY_CONTRAINDICATIONS = ['pregnant', 'recentSurgery', 'cosmeticProcedures', 'skinIssues']
const CONSULTATION_CONTRAINDICATIONS = ['autoimmune', 'diabetes', 'cardiovascular']
const FIRM_CONTRAINDICATIONS = ['cancer', 'implants', 'epilepsy', 'keloid', 'under18']

type ContraindicationCategory = 'none' | 'temporary' | 'consultation' | 'notSuitable'

const getContraindicationCategory = (selections: string[]): ContraindicationCategory => {
  if (selections.includes('none') || selections.length === 0) return 'none'
  if (selections.some(s => FIRM_CONTRAINDICATIONS.includes(s))) return 'notSuitable'
  if (selections.some(s => CONSULTATION_CONTRAINDICATIONS.includes(s))) return 'consultation'
  if (selections.some(s => TEMPORARY_CONTRAINDICATIONS.includes(s))) return 'temporary'
  return 'none'
}

// Build WhatsApp declaration message
const buildDeclarationMessage = (name: string, selections: string[], category: ContraindicationCategory): string => {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  if (selections.includes('none')) {
    return `📋 LIPOFIRM SUITABILITY DECLARATION

✅ ALL CLEAR

I, ${name}, confirm that on ${date} I have reviewed the Lipofirm contraindications list and declare that NONE of the listed conditions apply to me.

I understand that:
• I must inform the clinic if my health changes before treatment
• This declaration will be verified at my consultation
• My safety is the clinic's priority

I am ready to proceed with booking my consultation.

---
Submitted via Quartz Aesthetics Suitability Check`
  }

  const selectedLabels = selections
    .map(s => contraindicationOptions.find(o => o.value === s)?.shortLabel)
    .filter(Boolean)
    .join('\n• ')

  const categoryText: Record<string, string> = {
    temporary: '⏳ TEMPORARY CONDITION',
    consultation: '📋 REQUIRES DISCUSSION',
    notSuitable: '❌ NOT CURRENTLY SUITABLE'
  }

  return `📋 LIPOFIRM SUITABILITY DECLARATION

${categoryText[category] || ''}

I, ${name}, confirm that on ${date} I have reviewed the Lipofirm contraindications list and declare the following conditions apply to me:

• ${selectedLabels}

I understand that:
• The clinic will review my situation
• Additional information or GP clearance may be required
• My safety is the clinic's priority

${category === 'temporary' ? 'I would like to discuss timing for when I may be suitable.' : ''}
${category === 'consultation' ? 'I would like to discuss my options with the clinic.' : ''}
${category === 'notSuitable' ? 'I understand treatment may not be suitable but would like to discuss further.' : ''}

---
Submitted via Quartz Aesthetics Suitability Check`
}

export default function SuitabilityCheckPage() {
  const [step, setStep] = useState<'name' | 'check' | 'result'>('name')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [selections, setSelections] = useState<string[]>([])
  const [category, setCategory] = useState<ContraindicationCategory>('none')

  const handleNameSubmit = () => {
    if (!name.trim() || name.trim().length < 2) {
      setNameError('Please enter your name')
      return
    }
    setNameError('')
    setStep('check')
  }

  const handleToggle = (value: string) => {
    if (value === 'none') {
      setSelections(['none'])
    } else {
      const newSelections = selections.filter(s => s !== 'none')
      if (newSelections.includes(value)) {
        setSelections(newSelections.filter(s => s !== value))
      } else {
        setSelections([...newSelections, value])
      }
    }
  }

  const handleSubmit = () => {
    if (selections.length === 0) return
    const cat = getContraindicationCategory(selections)
    setCategory(cat)
    setStep('result')
  }

  const handleReset = () => {
    setStep('name')
    setName('')
    setNameError('')
    setSelections([])
    setCategory('none')
  }

  const getWhatsAppLink = () => {
    const message = buildDeclarationMessage(name, selections, category)
    return `https://wa.me/447476903007?text=${encodeURIComponent(message)}`
  }

  const getEmailLink = () => {
    const message = buildDeclarationMessage(name, selections, category)
    const subject = category === 'none'
      ? `Suitability Declaration - ${name} - ALL CLEAR`
      : category === 'temporary'
      ? `Suitability Declaration - ${name} - Temporary Condition`
      : category === 'consultation'
      ? `Suitability Declaration - ${name} - Requires Discussion`
      : `Suitability Declaration - ${name} - Not Currently Suitable`
    return `mailto:kerry@mail.skintightbanbury.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">QA</span>
              </div>
              <span className="font-display font-bold text-lg text-neutral-900 hidden sm:block">Quartz Aesthetics</span>
            </Link>
            <a
              href="tel:+447476903007"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">07476 903007</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">

        {/* Step 1: Name */}
        {step === 'name' && (
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚕️</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                Suitability Declaration
              </h1>
              <p className="text-neutral-600 max-w-md mx-auto">
                Complete this quick check to confirm you&apos;re suitable for Lipofirm treatment. Your declaration will be sent to the clinic.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Your full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors text-base ${
                    nameError ? 'border-red-500 focus:border-red-500' : 'border-neutral-200 focus:border-primary-500'
                  }`}
                  placeholder="Enter your full name"
                  autoFocus
                />
                {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>}
              </div>

              <button
                onClick={handleNameSubmit}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all touch-manipulation"
              >
                Continue
              </button>
            </div>

            <p className="text-center text-neutral-400 text-sm mt-6">
              Your name will be included in your declaration to the clinic.
            </p>
          </div>
        )}

        {/* Step 2: Checklist */}
        {step === 'check' && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                Hi {name.split(' ')[0]}!
              </h1>
              <p className="text-neutral-600">
                Please review and select any conditions that apply to you.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 sm:p-8 mb-6">
              <p className="text-neutral-500 text-sm mb-4 text-center">Select all that apply</p>

              <div className="space-y-2 mb-6 max-h-[45vh] overflow-y-auto">
                {contraindicationOptions.map((option) => {
                  const isSelected = selections.includes(option.value)
                  const isNoneSelected = selections.includes('none')
                  const isDisabled = option.value !== 'none' && isNoneSelected

                  return (
                    <button
                      key={option.value}
                      onClick={() => handleToggle(option.value)}
                      disabled={isDisabled}
                      className={`w-full flex items-center gap-3 p-3 sm:p-4 border-2 rounded-xl transition-all duration-200 touch-manipulation text-left ${
                        option.value === 'none'
                          ? isSelected
                            ? 'border-green-500 bg-green-50'
                            : 'border-green-200 bg-green-50/30 hover:border-green-400'
                          : isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : isDisabled
                          ? 'border-neutral-100 bg-neutral-50 opacity-50 cursor-not-allowed'
                          : 'border-neutral-200 bg-white hover:border-primary-300 active:bg-neutral-50'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          isSelected
                            ? option.value === 'none'
                              ? 'border-green-500 bg-green-500'
                              : 'border-primary-500 bg-primary-500'
                            : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xl flex-shrink-0">{option.icon}</span>
                      <span className={`text-sm sm:text-base ${isSelected ? option.value === 'none' ? 'text-green-700 font-medium' : 'text-primary-700 font-medium' : 'text-neutral-700'}`}>
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('name')}
                  className="px-6 py-4 border-2 border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-all touch-manipulation"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selections.length === 0}
                  className="flex-1 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>

            <p className="text-center text-neutral-400 text-sm">
              Be honest — your safety is our priority.
            </p>
          </>
        )}

        {/* Step 3: Results */}
        {step === 'result' && (
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 sm:p-8">
            {/* All Clear */}
            {category === 'none' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">✅</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                  Great News, {name.split(' ')[0]}!
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed max-w-md mx-auto">
                  Based on your answers, you appear to be a suitable candidate for Lipofirm treatment.
                </p>

                {/* Declaration Preview */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-green-800 font-medium mb-2">Your declaration:</p>
                  <p className="text-sm text-green-700">
                    &quot;I, {name}, confirm that none of the listed contraindications apply to me and I am ready to proceed with booking.&quot;
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </a>
                  <a
                    href={getEmailLink()}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send via Email
                  </a>
                  <Link
                    href="/skin-assessment"
                    className="block w-full py-4 border-2 border-neutral-300 text-neutral-600 font-bold text-lg rounded-xl hover:bg-neutral-50 transition-all text-center"
                  >
                    Take Full Assessment First
                  </Link>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 text-neutral-500 font-medium hover:text-neutral-700 transition-colors"
                  >
                    Start Again
                  </button>
                </div>
              </div>
            )}

            {/* Temporary */}
            {category === 'temporary' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">⏳</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                  Almost There, {name.split(' ')[0]}!
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed max-w-md mx-auto">
                  Your current situation is temporary. Once it resolves, you&apos;ll likely be a great candidate for Lipofirm.
                </p>

                {/* Declaration Preview */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-amber-800 font-medium mb-2">Your declaration includes:</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {selections.map(s => {
                      const option = contraindicationOptions.find(o => o.value === s)
                      return option ? <li key={s}>• {option.shortLabel}</li> : null
                    })}
                  </ul>
                </div>

                <div className="space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </a>
                  <a
                    href={getEmailLink()}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send via Email
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 text-neutral-500 font-medium hover:text-neutral-700 transition-colors"
                  >
                    Start Again
                  </button>
                </div>
              </div>
            )}

            {/* Needs Consultation */}
            {category === 'consultation' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">📋</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                  Let&apos;s Chat, {name.split(' ')[0]}
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed max-w-md mx-auto">
                  Some conditions need a conversation before we can proceed — but that doesn&apos;t mean no!
                  Many clients with similar conditions enjoy Lipofirm after a consultation.
                </p>

                {/* Declaration Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-blue-800 font-medium mb-2">Your declaration includes:</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {selections.map(s => {
                      const option = contraindicationOptions.find(o => o.value === s)
                      return option ? <li key={s}>• {option.shortLabel}</li> : null
                    })}
                  </ul>
                </div>

                <div className="space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </a>
                  <a
                    href={getEmailLink()}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send via Email
                  </a>
                  <a
                    href="tel:+447476903007"
                    className="block w-full py-4 border-2 border-neutral-300 text-neutral-600 font-bold text-lg rounded-xl hover:bg-neutral-50 transition-all text-center"
                  >
                    Call Us: 07476 903007
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 text-neutral-500 font-medium hover:text-neutral-700 transition-colors"
                  >
                    Start Again
                  </button>
                </div>
              </div>
            )}

            {/* Not Suitable */}
            {category === 'notSuitable' && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-neutral-400 to-neutral-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">💙</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                  Thank You, {name.split(' ')[0]}
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed max-w-md mx-auto">
                  Based on your answers, Lipofirm treatment isn&apos;t suitable for you at this time.
                  Your safety is our top priority.
                </p>

                {/* Declaration Preview */}
                <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-neutral-700 font-medium mb-2">Your declaration includes:</p>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {selections.map(s => {
                      const option = contraindicationOptions.find(o => o.value === s)
                      return option ? <li key={s}>• {option.shortLabel}</li> : null
                    })}
                  </ul>
                </div>

                <p className="text-neutral-500 text-sm mb-6">
                  If your situation changes or you have questions, we&apos;re always happy to chat.
                </p>

                <div className="space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </a>
                  <a
                    href={getEmailLink()}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send via Email
                  </a>
                  <Link
                    href="/"
                    className="block w-full py-4 border-2 border-neutral-300 text-neutral-600 font-bold text-lg rounded-xl hover:bg-neutral-50 transition-all text-center"
                  >
                    Back to Home
                  </Link>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 text-neutral-500 font-medium hover:text-neutral-700 transition-colors"
                  >
                    Start Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
