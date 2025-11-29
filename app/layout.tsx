import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import StructuredData from '@/components/StructuredData'
import FacebookPixel from '@/components/FacebookPixel'
import ConvertBox from '@/components/ConvertBox'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Post-Ozempic Skin Tightening Banbury | Loose Skin After Weight Loss | Quartz Aesthetics',
  description: 'Tighten loose skin after Ozempic, Wegovy or Mounjaro weight loss. Lipofirm RF skin tightening in Banbury stimulates collagen for firmer skin. No surgery, no downtime. Courses from £480. Book your free consultation.',
  keywords: 'post Ozempic skin tightening, Wegovy loose skin treatment, Mounjaro skin laxity, GLP-1 weight loss skin, Lipofirm Banbury, skin tightening Banbury, loose skin after weight loss, RF skin tightening, collagen stimulation, non-surgical skin tightening, Quartz Aesthetics, body contouring Oxfordshire',
  authors: [{ name: 'Quartz Aesthetics' }],
  creator: 'Quartz Aesthetics',
  publisher: 'Quartz Aesthetics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lipofirmbanbury.co.uk'),
  alternates: {
    canonical: 'https://lipofirmbanbury.co.uk',
  },
  openGraph: {
    title: 'Post-Ozempic Skin Tightening | Tighten Loose Skin After Weight Loss | Quartz Aesthetics Banbury',
    description: 'Lost weight on Ozempic, Wegovy or Mounjaro? Tighten loose skin with Lipofirm RF technology. Non-surgical skin tightening in Banbury. Courses from £480. No downtime.',
    url: 'https://lipofirmbanbury.co.uk',
    siteName: 'Quartz Aesthetics - Skin Tightening Banbury',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: 'https://lipofirmbanbury.co.uk/images/lipofirm-results.png',
        width: 1200,
        height: 630,
        alt: 'Lipofirm Skin Tightening Results - Quartz Aesthetics Banbury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Post-Ozempic Skin Tightening Banbury | Quartz Aesthetics',
    description: 'Tighten loose skin after weight loss. Lipofirm RF skin tightening - no surgery, no downtime. Courses from £480.',
    images: ['https://lipofirmbanbury.co.uk/images/lipofirm-results.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'geo.region': 'GB-OXF',
    'geo.placename': 'Banbury',
    'geo.position': '52.0629;-1.3397',
    'ICBM': '52.0629, -1.3397',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <FacebookPixel />
          <ConvertBox />
        </Suspense>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
