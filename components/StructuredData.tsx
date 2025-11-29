export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Quartz Aesthetics",
    "alternateName": "Quartz The Hidden Gem Aesthetics",
    "url": "https://lipofirmbanbury.co.uk",
    "sameAs": [
      "https://lipofirmbanbury.co.uk",
      "https://quartzaesthetics.co.uk"
    ],
    "logo": "https://lipofirmbanbury.co.uk/images/quartz-logo.png",
    "image": "https://lipofirmbanbury.co.uk/images/lipofirm-results.png",
    "description": "Specialist skin tightening clinic in Banbury, Oxfordshire. Helping clients tighten loose skin after weight loss from Ozempic, Wegovy, Mounjaro or natural methods. RF Lipofirm treatments led by experienced practitioner Pamela Crombie.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Wellness Centre, 54 Bloxham Road",
      "addressLocality": "Banbury",
      "addressRegion": "Oxfordshire",
      "postalCode": "OX16 9JR",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.0629",
      "longitude": "-1.3397"
    },
    "telephone": "+441295985001",
    "email": "quartzaesthetics@gmail.com",
    "priceRange": "££",
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-17:00"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Skin Tightening Treatments",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Single Lipofirm Session",
            "description": "Single RF skin tightening session - ideal for trying the treatment"
          },
          "price": "99",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lipofirm Course of 6 Sessions",
            "description": "6 weekly skin tightening sessions for optimal collagen stimulation and visible skin firming - ideal for post-weight loss loose skin"
          },
          "price": "480",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lipofirm Course of 12 Sessions",
            "description": "12 sessions for complete skin transformation - best for significant weight loss from Ozempic, Wegovy or Mounjaro"
          },
          "price": "900",
          "priceCurrency": "GBP"
        }
      ]
    },
    "medicalSpecialty": [
      "Dermatology",
      "Aesthetic Medicine",
      "Body Contouring"
    ],
    "availableService": [
      {
        "@type": "Service",
        "name": "Post-Weight Loss Skin Tightening",
        "description": "RF skin tightening for loose skin after Ozempic, Wegovy, Mounjaro or other weight loss"
      },
      {
        "@type": "Service",
        "name": "Lipofirm RF Skin Tightening",
        "description": "Advanced radiofrequency technology to stimulate collagen and firm loose skin"
      },
      {
        "@type": "Service",
        "name": "Collagen Stimulation Therapy",
        "description": "Natural collagen production for firmer, tighter skin without surgery"
      },
      {
        "@type": "Service",
        "name": "GLP-1 Skin Laxity Treatment",
        "description": "Specialist treatment for skin laxity following GLP-1 medication weight loss"
      },
      {
        "@type": "Service",
        "name": "Body Contouring",
        "description": "Non-surgical skin firming and body contouring"
      },
      {
        "@type": "Service",
        "name": "Tummy Skin Tightening",
        "description": "Target loose abdominal skin after significant weight loss"
      }
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quartz Aesthetics - Skin Tightening Banbury",
    "alternateName": "Post-Ozempic Skin Tightening Banbury",
    "url": "https://lipofirmbanbury.co.uk",
    "description": "Specialist skin tightening for loose skin after weight loss from Ozempic, Wegovy, Mounjaro. RF Lipofirm treatment in Banbury by experienced practitioner Pamela Crombie",
    "publisher": {
      "@type": "Organization",
      "name": "Quartz Aesthetics"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lipofirmbanbury.co.uk/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Quartz Aesthetics",
    "alternateName": "Post-Ozempic Skin Tightening Banbury",
    "image": "https://lipofirmbanbury.co.uk/images/quartz-clinic.jpg",
    "description": "Specialist skin tightening clinic in Banbury, Oxfordshire. Helping clients tighten loose skin after weight loss from Ozempic, Wegovy, Mounjaro. RF Lipofirm treatments with visible results, zero downtime.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Wellness Centre, 54 Bloxham Road",
      "addressLocality": "Banbury",
      "addressRegion": "Oxfordshire",
      "postalCode": "OX16 9JR",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.0629",
      "longitude": "-1.3397"
    },
    "url": "https://lipofirmbanbury.co.uk",
    "telephone": "+441295985001",
    "email": "quartzaesthetics@gmail.com",
    "priceRange": "££",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "GBP",
    "areaServed": [
      {
        "@type": "City",
        "name": "Banbury"
      },
      {
        "@type": "City",
        "name": "Oxford"
      },
      {
        "@type": "City",
        "name": "Bicester"
      },
      {
        "@type": "City",
        "name": "Brackley"
      },
      {
        "@type": "City",
        "name": "Daventry"
      },
      {
        "@type": "City",
        "name": "Leamington Spa"
      }
    ],
    "hasMap": "https://maps.google.com/?q=The+Wellness+Centre,+54+Bloxham+Road,+Banbury,+OX16+9JR",
    "medicalSpecialty": [
      "Dermatology",
      "Aesthetic Medicine",
      "Body Contouring"
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Post-Weight Loss Skin Tightening Banbury",
    "description": "Specialist RF skin tightening treatment for loose skin after Ozempic, Wegovy or Mounjaro weight loss. Lipofirm collagen stimulation therapy led by experienced practitioner Pamela Crombie",
    "provider": {
      "@type": "BeautySalon",
      "name": "Quartz Aesthetics",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Wellness Centre, 54 Bloxham Road",
        "addressLocality": "Banbury",
        "addressRegion": "Oxfordshire",
        "postalCode": "OX16 9JR",
        "addressCountry": "GB"
      },
      "telephone": "+441295985001"
    },
    "areaServed": [
      "Banbury",
      "Oxford",
      "Bicester",
      "Brackley",
      "Daventry",
      "Leamington Spa",
      "Warwick",
      "Northampton",
      "Oxfordshire"
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://lipofirmbanbury.co.uk",
      "serviceSmsNumber": "+447826755534"
    },
    "category": "Beauty Treatment",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Skin Tightening Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Single Lipofirm Session",
          "price": "99",
          "priceCurrency": "GBP",
          "description": "Single RF skin tightening session to try the treatment"
        },
        {
          "@type": "Offer",
          "name": "Course of 6 Sessions",
          "price": "480",
          "priceCurrency": "GBP",
          "description": "6 skin tightening sessions for optimal collagen stimulation - ideal for post-weight loss loose skin"
        },
        {
          "@type": "Offer",
          "name": "Course of 12 Sessions",
          "price": "900",
          "priceCurrency": "GBP",
          "description": "Complete skin transformation - best for significant weight loss from GLP-1 medications"
        }
      ]
    }
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Quartz Aesthetics",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "8",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rochelle Lear"
        },
        "datePublished": "2024-01-15",
        "reviewBody": "I have been visiting Pam for several months now for lipofirm sessions on my Abdominal area and have noticed a vast improvement in reduction of fat and firming of the skin, I have dropped from a size 18 trousers to a 14/16 so I am very pleased with my results and will continue with the sessions. Pam is very warm and friendly, professional and knowledgable, such a lovely woman!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Anna Lawley"
        },
        "datePublished": "2024-01-10",
        "reviewBody": "After having lipofirm on my middle section (8 sessions) I have not only lost pounds but inches, Pam made me feel very comfortable and relaxed at each visit and it has given me the focus to continue my weight loss journey. I would highly recommend.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Julia Powell"
        },
        "datePublished": "2024-01-05",
        "reviewBody": "I definitely feel that the lipofirm helps break down some scar tissue & fat (tummy felt less lumpy if that makes sense) there are measurement changes too! Amazing! Pam is wonderful, lovely lady who will put you right at ease, Would highly recommend.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Flavia Urso"
        },
        "datePublished": "2023-12-20",
        "reviewBody": "Absolutely happy with my results. Very professional, Pam is great. Loving my body again after my pregnancy. Couldn't recommend enough.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Karen Wieland"
        },
        "datePublished": "2023-12-15",
        "reviewBody": "I've had 2 courses with Pam and so very pleased with the results. Pam is professional and her knowledge of aesthetics is amazing, not only that but she's so warm and friendly. I cannot recommend Pam and her salon enough.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  )
}
