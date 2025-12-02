# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Template Type:** Aesthetic Clinic Landing Page with Lead Capture Assessment
**Current Instance:** Quartz Aesthetics - Lipofirm RF Skin Tightening
**Domain:** skintightbanbury.co.uk
**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS

This template is designed for aesthetic clinics offering body treatments (Lipofirm, fat reduction, skin tightening). It includes a sophisticated lead qualification system with branching assessments and CRM integration.

## Development Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production (run before deploying)
npm run lint       # Run ESLint
```

## Architecture

### Page Structure

```
/                        → Main landing page (PageWrapper)
/skin-assessment         → Standalone body assessment tool
/suitability-check       → Contraindications/safety declaration
/privacy-policy          → Privacy policy page
```

### Key Flows

```
┌─────────────────────────────────────────────────────────────────┐
│                     ASSESSMENT FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│  Name → Branching Questions → Lead Form → Webhook → Redirect    │
│                                              ↓                   │
│                                    /suitability-check            │
│                                              ↓                   │
│                              Declaration (WhatsApp/Email)        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   BOOKING FLOW (Main Page)                       │
├─────────────────────────────────────────────────────────────────┤
│  CTA Click → BookingModal → Assessment or Direct Booking         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

| Component | Purpose |
|-----------|---------|
| `PageWrapper.tsx` | Main page orchestrator, modal state management |
| `app/skin-assessment/page.tsx` | Standalone multi-step assessment with scoring |
| `app/suitability-check/page.tsx` | Safety screening with declaration system |
| `BookingModal.tsx` | Booking form with optional assessment integration |
| `StructuredData.tsx` | JSON-LD LocalBusiness schema for SEO |
| `FacebookPixel.tsx` | Meta Pixel tracking with custom events |
| `ScrollToTop.tsx` | Disables browser scroll restoration, scrolls to top on navigation |
| `Footer.tsx` | Contact details, links, legal |

### Fat Reduction Callout

The main landing page focuses on skin tightening (post-Ozempic). A subtle callout below the AssessmentTool in `PageWrapper.tsx` redirects visitors interested in fat reduction to `/skin-assessment`, which has branching logic for different goals including "Stubborn fat I can't shift".

## Assessment System (Key Feature)

### Branching Logic

The assessment uses a `showWhen` conditional system for dynamic question paths:

```typescript
{
  id: 'stubbornFat_duration',
  question: 'How long have you struggled with stubborn fat?',
  showWhen: (answers) => answers.primaryGoal === 'stubbornFat',
  options: [...]
}
```

**Primary Goal Branches:**
- `stubbornFat` → Fat-specific questions
- `looseSkin` → Skin laxity questions (includes Ozempic/weight loss)
- `both` → Combined questions
- `toneUp` → Event preparation questions
- `postPregnancy` → Post-baby body questions

### Scoring Algorithm

Located in `calculateSuitability()` function. Scores based on:
- Lifestyle factors (exercise, water, sleep, stress)
- Skin elasticity
- Treatment timeline urgency
- Budget readiness
- Previous treatment history

**Score Tiers:**
- 80+ = Excellent candidate
- 60-79 = Good candidate
- 40-59 = Moderate candidate
- <40 = May need consultation

### Webhook Payload

Sends to GHL (GoHighLevel) with formatted notes field:

```json
{
  "firstName": "Jane",
  "email": "jane@example.com",
  "phone": "07700900000",
  "bestTimeToContact": "Morning",
  "primaryGoal": "Stubborn fat I cannot shift",
  "suitabilityScore": "Excellent",
  "suitabilityPoints": 85,
  "recommendation": "Premium Lipofirm Course",
  "recommendedPrice": "£1,200",
  "recommendedSessions": "8 sessions",
  "notes": "━━━ FORMATTED SUMMARY ━━━",
  "source": "body-assessment-landing",
  "assessmentVersion": "4.2"
}
```

## Suitability Check / Contraindications

### Categories

The suitability check categorizes conditions into three response types:

| Category | Conditions | Response |
|----------|------------|----------|
| **Temporary** | Pregnancy, recent surgery, cosmetic procedures, skin issues | "Almost there" - can proceed when resolved |
| **Consultation** | Autoimmune, diabetes, cardiovascular | "Let's chat" - needs clinic discussion |
| **Not Suitable** | Cancer, pacemaker/implants, epilepsy, keloid, under 18 | Firm contraindication |

### Declaration System

After completing the check, users can send a declaration via:
- **WhatsApp** - Pre-filled message with conditions acknowledged
- **Email** - Formatted declaration to clinic email

This creates a record of informed consent before treatment.

## Configuration Points

### Must Change for New Clinic

```
app/layout.tsx              → Metadata, business name, domain
app/skin-assessment/page.tsx → CONFIG object (webhook URL, phone numbers)
app/suitability-check/page.tsx → CONFIG object (phone, email)
components/Footer.tsx        → Contact details, address
components/StructuredData.tsx → LocalBusiness schema
public/images/              → Logo, practitioner photos, results
```

### CONFIG Objects

Each page with external integrations has a CONFIG object at the top:

```typescript
const CONFIG = {
  webhookUrl: 'https://services.leadconnectorhq.com/hooks/...',
  whatsappNumber: '447476903007',
  phoneNumber: '07476 903007',
  email: 'kerry@mail.skintightbanbury.co.uk',
}
```

### Treatment Pricing

Update in `PremiumTreatments.tsx`:
- Single session: £99 (intro offer)
- 4-session course: £380
- 8-session course: £770

## SEO & Tracking

- **Metadata:** `app/layout.tsx` (title, description, OpenGraph, Twitter)
- **Sitemap:** `app/sitemap.ts` (auto-generated)
- **Robots:** `app/robots.ts`
- **Schema:** `components/StructuredData.tsx` (LocalBusiness JSON-LD)
- **Facebook Pixel:** `components/FacebookPixel.tsx`
  - Tracks: PageView, Lead, AssessmentStart, AssessmentComplete

## Deployment

### Vercel (Recommended)

```bash
npm run build   # Test build locally first
vercel          # Deploy
```

### Environment Variables

```
# .env.local (if needed)
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id
```

## Template Adaptation Checklist

When creating a new clinic site from this template:

- [ ] Update `CONFIG` objects in all pages
- [ ] Replace business name and domain throughout
- [ ] Update `StructuredData.tsx` with clinic details
- [ ] Replace images in `/public/images/`
- [ ] Update pricing in `PremiumTreatments.tsx`
- [ ] Update practitioner info in `AboutSection.tsx`
- [ ] Configure GHL webhook and map fields
- [ ] Set up Facebook Pixel
- [ ] Update footer contact details
- [ ] Test assessment flow end-to-end
- [ ] Test suitability check declaration (WhatsApp + Email)
- [ ] Verify webhook payload in GHL
- [ ] Run `npm run build` before deploying
