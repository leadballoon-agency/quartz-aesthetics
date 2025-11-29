import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Quartz Aesthetics',
  description: 'Privacy Policy for Quartz Aesthetics Lipofirm Skin Tightening Treatments in Banbury',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 sm:mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-neutral-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-neutral-700 leading-relaxed">
              Quartz Aesthetics ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website skintightbanbury.co.uk and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li>Book a consultation or treatment</li>
              <li>Contact us via phone, email, or contact forms</li>
              <li>Subscribe to our newsletters or marketing communications</li>
              <li>Complete our skin assessment tool</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-4">
              This information may include: name, email address, phone number, postal address, date of birth, medical history relevant to treatments, skin concerns, and treatment preferences.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-neutral-700 leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device. We may also collect information about your browsing activity, such as pages viewed and links clicked.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li>Provide, operate, and maintain our services</li>
              <li>Process your bookings and appointments</li>
              <li>Communicate with you about treatments, appointments, and clinic updates</li>
              <li>Assess your suitability for specific treatments</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations and maintain records</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Meta (Facebook) Pixel and Tracking Technologies</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Our website uses Meta (Facebook) Pixel and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li>Measure and optimize our advertising campaigns</li>
              <li>Track conversions and user interactions</li>
              <li>Build targeted audiences for advertising</li>
              <li>Analyze website traffic and user behavior</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-4">
              The Meta Pixel may collect information including your IP address, browser type, pages visited, time spent on pages, and actions taken. This information is subject to Meta's Privacy Policy. You can opt out of personalized advertising by adjusting your Facebook Ad Preferences or using browser privacy settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-neutral-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (e.g., booking systems, payment processors, email service providers)</li>
              <li><strong>Marketing Partners:</strong> Including Meta (Facebook) for advertising purposes</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
            <p className="text-neutral-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
            <p className="text-neutral-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Medical records are retained in accordance with UK healthcare regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Your Rights (UK GDPR)</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Under UK data protection law, you have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
              <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Right to Object:</strong> Object to processing of your data for marketing purposes</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
            <p className="text-neutral-700 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Third-Party Links</h2>
            <p className="text-neutral-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-neutral-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <p className="font-semibold mb-2">Quartz Aesthetics</p>
              <p className="text-neutral-700">The Wellness Centre</p>
              <p className="text-neutral-700">54 Bloxham Road</p>
              <p className="text-neutral-700">Banbury, Oxfordshire OX16 9JR</p>
              <p className="text-neutral-700 mt-3">
                <strong>Phone:</strong> <a href="tel:+441295985001" className="text-primary-600 hover:text-primary-700">01295 985 001</a>
              </p>
              <p className="text-neutral-700">
                <strong>Mobile:</strong> <a href="tel:+447826755534" className="text-primary-600 hover:text-primary-700">07826 755534</a>
              </p>
              <p className="text-neutral-700">
                <strong>Email:</strong> <a href="mailto:quartzaesthetics@gmail.com" className="text-primary-600 hover:text-primary-700">quartzaesthetics@gmail.com</a>
              </p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              This privacy policy is compliant with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
