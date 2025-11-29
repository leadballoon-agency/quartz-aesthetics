# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HIFU (High-Intensity Focused Ultrasound) non-surgical facelift landing page for Amethyst Aesthetics Beauty. Built with Next.js 15 App Router, TypeScript, and Tailwind CSS. Domain: hifusomerset.co.uk

## Development Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production (run before deploying)
npm run lint       # Run ESLint
```

## Architecture

### Page Structure

The site is a single-page landing page with modal overlays:

- `app/page.tsx` → renders `PageWrapper` component
- `components/PageWrapper.tsx` → orchestrates all sections and manages modal state
- All booking CTAs trigger `BookingModal` with optional assessment data
- `VideoModal` handles video playback overlay

### Component Flow

`PageWrapper` manages two key state flows:
1. **Booking flow**: Any "Book Now" button sets `assessmentData.skipToCalendar = true` and opens `BookingModal`
2. **Assessment flow**: `AssessmentTool` collects skin data, passes to `BookingModal` via `onAssessmentComplete`

### Key Components

| Component | Purpose |
|-----------|---------|
| `PageWrapper.tsx` | Main orchestrator, holds booking/video modal state |
| `AssessmentTool.tsx` | Multi-step skin assessment questionnaire |
| `BookingModal.tsx` | Booking form, receives assessment data |
| `StructuredData.tsx` | JSON-LD schema markup for SEO |
| `FacebookPixel.tsx` | Meta Pixel tracking |

### API Routes

- `app/api/contact/route.ts` - Contact form POST handler (currently logs only, integrate email service as needed)

### SEO & Tracking

- Metadata in `app/layout.tsx` (title, description, OpenGraph, Twitter cards)
- `app/sitemap.ts` and `app/robots.ts` for search engines
- `components/StructuredData.tsx` for LocalBusiness schema
- Facebook Pixel in `components/FacebookPixel.tsx`

## Customization for New Clinics

### Must Change

1. `app/layout.tsx` - All metadata, business name, domain URL
2. `components/Footer.tsx` - Contact details, address, social links
3. `components/StructuredData.tsx` - Business schema data
4. `/public/images/` - Logo and all images

### Content Updates

- `PremiumHero.tsx` - Hero messaging and video
- `AboutSection.tsx` - Clinic description
- `TeamSection.tsx` - Practitioner info
- `PremiumTreatments.tsx` - Pricing
- `FAQ.tsx` - Q&A content
- `ResultsGallery.tsx` - Before/after images

### Automation Scripts

The repo includes automation for batch clinic deployments:
- `clinic-automation-agent.js` - Main orchestrator using Firecrawl
- `quality-assurance-system.js` - 36+ validation checks
- `deployment-automation.js` - Vercel/Netlify deployment

Run with: `FIRECRAWL_API_KEY=xxx node clinic-automation-agent.js --url https://clinic-site.com`