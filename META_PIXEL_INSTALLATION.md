# Meta Pixel Installation Guide for Next.js 15 + App Router

## Overview

This guide explains how to properly install Meta (Facebook) Pixel on Next.js 15 applications using the App Router. The implementation addresses common issues that cause tracking failures, duplicate events, and inaccurate analytics.

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Implementation Steps](#implementation-steps)
- [Testing](#testing)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

---

## The Problem

Meta Pixel installation on Next.js 15 with App Router has several critical issues if implemented incorrectly:

### Common Issues:

1. **100% Bounce Rate** - PageView only fires on initial load, not on client-side navigation
2. **Double PageView Events** - Script initialization fires PageView AND useEffect fires it again
3. **StrictMode Double-Firing** - React 19 StrictMode causes events to fire twice in development
4. **Race Conditions** - Events fire before the pixel script fully loads, causing silent failures
5. **Development Data Pollution** - Local testing creates fake conversion data in Meta
6. **Missing Navigation Tracking** - App Router's client-side routing bypasses traditional page tracking

---

## The Solution

Our implementation addresses all these issues with:

- ✅ **Navigation tracking** using `usePathname()` and `useSearchParams()`
- ✅ **Single PageView per navigation** (removed from script initialization)
- ✅ **Environment detection** (development vs production)
- ✅ **Script load verification** with retry logic
- ✅ **StrictMode guards** to prevent double-firing in development
- ✅ **Suspense boundary** for proper App Router integration

---

## Implementation Steps

### Step 1: Create FacebookPixel Component

Create `/components/FacebookPixel.tsx`:

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'YOUR_PIXEL_ID'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const TEST_MODE = process.env.NEXT_PUBLIC_META_PIXEL_TEST_MODE === 'true'

export default function FacebookPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pixelLoaded, setPixelLoaded] = useState(false)
  const initialized = useRef(false)

  // Don't load pixel in development unless test mode is enabled
  if (!IS_PRODUCTION && !TEST_MODE) {
    return null
  }

  // Check when pixel script is fully loaded
  useEffect(() => {
    const checkPixel = setInterval(() => {
      if (typeof window !== 'undefined' && window.fbq && window.fbq.version) {
        setPixelLoaded(true)
        clearInterval(checkPixel)
      }
    }, 100)

    const timeout = setTimeout(() => {
      clearInterval(checkPixel)
      if (!pixelLoaded) {
        console.warn('Meta Pixel: Script failed to load within 10 seconds')
      }
    }, 10000)

    return () => {
      clearInterval(checkPixel)
      clearTimeout(timeout)
    }
  }, [pixelLoaded])

  // Track PageView on navigation
  useEffect(() => {
    // In development with StrictMode, prevent double-firing
    if (!IS_PRODUCTION && initialized.current) {
      return
    }
    initialized.current = true

    if (typeof window !== 'undefined' && window.fbq && pixelLoaded) {
      if (TEST_MODE) {
        console.log('[Meta Pixel TEST] PageView:', pathname, searchParams?.toString())
      }
      window.fbq('track', 'PageView')
    }
  }, [pathname, searchParams, pixelLoaded])

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Meta Pixel: Script loaded successfully')
        }}
        onError={(e) => {
          console.error('Meta Pixel: Script failed to load', e)
        }}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FACEBOOK_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

// Enhanced tracking with retry logic
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window === 'undefined') return
  if (!IS_PRODUCTION && !TEST_MODE) {
    console.log(`[Meta Pixel DEV] Would track: ${eventName}`, parameters)
    return
  }

  const maxAttempts = 10
  let attempts = 0

  const attemptTrack = () => {
    if (window.fbq && window.fbq.version) {
      if (TEST_MODE) {
        console.log(`[Meta Pixel TEST] Event: ${eventName}`, parameters)
      }
      window.fbq('track', eventName, parameters)
    } else if (attempts < maxAttempts) {
      attempts++
      setTimeout(attemptTrack, 100)
    } else {
      console.warn(`Meta Pixel: Failed to track ${eventName} after ${maxAttempts} attempts`)
    }
  }

  attemptTrack()
}
```

### Step 2: Update Root Layout

Update `/app/layout.tsx`:

```typescript
import { Suspense } from 'react'
import FacebookPixel from '@/components/FacebookPixel'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
```

**Important:** The `Suspense` wrapper is required because `useSearchParams()` needs a Suspense boundary in the App Router.

### Step 3: Create Environment Configuration

Create `.env.local`:

```bash
# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=YOUR_PIXEL_ID_HERE

# Set to true to enable pixel tracking in development mode for testing
# NEXT_PUBLIC_META_PIXEL_TEST_MODE=true
```

**Note:** `.env.local` is automatically excluded by Next.js `.gitignore` - never commit this file!

### Step 4: Add Custom Event Tracking (Optional)

Add custom event tracking functions to `FacebookPixel.tsx`:

```typescript
export const trackBookingSubmit = (treatmentType: string, price?: number) => {
  trackEvent('Lead', {
    content_name: 'Booking Form Submitted',
    content_category: treatmentType,
    value: price,
    currency: 'GBP'
  })
}

export const trackButtonClick = (buttonName: string) => {
  trackEvent('ViewContent', {
    content_name: `${buttonName} Clicked`
  })
}
```

Then use in your components:

```typescript
import { trackBookingSubmit } from '@/components/FacebookPixel'

function BookingForm() {
  const handleSubmit = () => {
    trackBookingSubmit('CO2 Laser Treatment', 395)
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## Testing

### Development Testing

1. **Enable Test Mode** in `.env.local`:
   ```bash
   NEXT_PUBLIC_META_PIXEL_TEST_MODE=true
   ```

2. **Restart dev server**:
   ```bash
   rm -rf .next && npm run dev
   ```

3. **Open browser DevTools** → Console tab

4. **Look for logs**:
   - `Meta Pixel: Script loaded successfully`
   - `[Meta Pixel TEST] PageView: /page-path`
   - `[Meta Pixel TEST] Event: EventName {...}`

5. **Test navigation**:
   - Navigate between pages
   - Confirm PageView fires on each navigation
   - Check console for TEST logs

### Browser Extension Testing

1. **Install Meta Pixel Helper**:
   - Chrome: [Meta Pixel Helper Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper)

2. **With test mode enabled**, visit your site

3. **Click the extension icon** - should show:
   - ✅ PageViews detected
   - ✅ Pixel ID matches yours
   - ✅ No duplicate events

### Meta Events Manager Testing

1. **Go to Meta Business Suite** → Events Manager

2. **Select your pixel**

3. **Click "Test Events"** tab

4. **With test mode enabled**, use your site

5. **Verify events appear in real-time**:
   - PageView on each navigation
   - Custom events (Lead, ViewContent, etc.)
   - Correct parameters

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Pixel ID is correct in `.env.local`
- [ ] Test mode is DISABLED (comment out or delete the line)
- [ ] `.env.local` is in `.gitignore`
- [ ] Tested locally with test mode enabled
- [ ] Verified no duplicate events in Meta Pixel Helper

### Environment Variables

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_META_PIXEL_ID` = `YOUR_PIXEL_ID`
3. Select: Production, Preview, Development
4. Deploy

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add: `NEXT_PUBLIC_META_PIXEL_ID` = `YOUR_PIXEL_ID`
3. Deploy

**Note:** `NODE_ENV=production` is automatically set by hosting platforms.

### Post-Deployment Verification

1. **Visit production site**

2. **Check Meta Pixel Helper**:
   - Should detect pixel
   - Should show PageViews
   - Should NOT show duplicate events

3. **Check Meta Events Manager**:
   - Should see real-time PageViews
   - Should NOT see TEST prefixes
   - Should see accurate user data

4. **Test conversion events**:
   - Submit forms, click buttons, etc.
   - Verify events appear in Events Manager
   - Check event parameters are correct

5. **Monitor for 24-48 hours**:
   - Check for unusual patterns
   - Verify conversion tracking works
   - Confirm no duplicate events

---

## Troubleshooting

### Pixel Helper Shows No Pixel

**Symptom:** Extension shows "No pixels found"

**Causes & Solutions:**

1. **Development mode without test mode**
   - Solution: Enable `NEXT_PUBLIC_META_PIXEL_TEST_MODE=true` in `.env.local`

2. **Environment variable not loaded**
   - Solution: Restart dev server after changing `.env.local`

3. **Component not rendering**
   - Solution: Check browser DevTools → Elements → Search for `facebook-pixel` script

### Double PageView Events

**Symptom:** Two PageViews fire per page load

**Causes & Solutions:**

1. **Script initialization includes PageView**
   - Solution: Remove `fbq('track', 'PageView')` from script tag (line should NOT be there)

2. **Multiple FacebookPixel components**
   - Solution: Ensure only ONE `<FacebookPixel />` in entire app

3. **useEffect missing dependencies**
   - Solution: Verify `[pathname, searchParams, pixelLoaded]` in dependency array

### Events Not Firing in Production

**Symptom:** Pixel loads but events don't appear in Meta

**Causes & Solutions:**

1. **Wrong Pixel ID**
   - Solution: Verify `NEXT_PUBLIC_META_PIXEL_ID` matches your actual pixel

2. **Ad blocker**
   - Solution: Test in incognito mode without extensions

3. **Script blocked by CSP**
   - Solution: Add `connect.facebook.net` to Content Security Policy

4. **Browser privacy settings**
   - Solution: Test in multiple browsers

### Navigation Tracking Not Working

**Symptom:** PageView only fires on initial load

**Causes & Solutions:**

1. **Missing navigation hooks**
   - Solution: Verify `usePathname()` and `useSearchParams()` are imported and used

2. **Missing Suspense boundary**
   - Solution: Wrap `<FacebookPixel />` in `<Suspense>` in layout.tsx

3. **Component rendering conditionally**
   - Solution: Ensure component always renders in production

### StrictMode Double-Firing in Development

**Symptom:** Events fire twice in development console

**Causes & Solutions:**

1. **Missing StrictMode guard**
   - Solution: Verify `initialized.current` ref is used correctly

2. **StrictMode enabled in development**
   - Solution: This is expected React 19 behavior - use test mode to see realistic behavior

---

## Key Implementation Details

### Why This Works

1. **Navigation Tracking**: `usePathname()` and `useSearchParams()` trigger useEffect on every route change
2. **Single PageView**: Removed from script initialization, only fires from useEffect
3. **Environment Detection**: `NODE_ENV === 'production'` ensures dev data doesn't pollute analytics
4. **Retry Logic**: `attemptTrack()` handles race conditions when events fire before script loads
5. **Suspense Boundary**: Required by Next.js App Router for `useSearchParams()`

### Common Mistakes to Avoid

❌ **DON'T** use `router.events` (doesn't exist in App Router)
❌ **DON'T** put PageView in script initialization
❌ **DON'T** skip the Suspense wrapper
❌ **DON'T** commit `.env.local` to git
❌ **DON'T** forget to set environment variables in production

✅ **DO** use `usePathname()` and `useSearchParams()`
✅ **DO** remove duplicate PageView from script
✅ **DO** wrap in Suspense
✅ **DO** use environment variables
✅ **DO** test with Meta Pixel Helper before deploying

---

## Additional Resources

- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Meta Events Manager](https://business.facebook.com/events_manager)

---

## Support

If you encounter issues not covered in this guide:

1. Check Meta Events Manager for error messages
2. Use Meta Pixel Helper to diagnose tracking issues
3. Review browser console for error messages
4. Verify environment variables are set correctly
5. Test in incognito mode to rule out browser extensions

---

**Last Updated:** November 2025
**Next.js Version:** 15.5.0
**React Version:** 19.1.1
