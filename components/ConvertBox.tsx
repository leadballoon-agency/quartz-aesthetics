'use client'

import Script from 'next/script'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export default function ConvertBox() {
  // Only load in production environment
  if (!IS_PRODUCTION) {
    return null
  }

  return (
    <Script
      id="convertbox"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('ConvertBox: Script loaded successfully')
      }}
      onError={(e) => {
        console.error('ConvertBox: Script failed to load', e)
      }}
      dangerouslySetInnerHTML={{
        __html: `
          !function(e,t){(e=t.createElement("script")).src="https://cdn.convertbox.com/convertbox/js/embed.js",e.id="app-convertbox-script",e.async=true,e.dataset.uuid="e2b4b048-1e07-482a-9efe-79ea173c2cff",document.getElementsByTagName("head")[0].appendChild(e)}(window,document);
        `,
      }}
    />
  )
}
