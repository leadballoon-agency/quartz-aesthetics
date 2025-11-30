export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Quartz Aesthetics",
    "alternateName": "Quartz The Hidden Gem Aesthetics",
    "url": "https://skintightbanbury.co.uk",
    "sameAs": [
      "https://skintightbanbury.co.uk",
      "https://quartzaesthetics.co.uk"
    ],
    "logo": "https://skintightbanbury.co.uk/images/quartz-logo.png",
    "image": "https://skintightbanbury.co.uk/images/pamela-crombie.webp",
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
    "telephone": "+447476903007",
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
            "name": "Consultation + First Session",
            "description": "Skin consultation plus first RF skin tightening session - ideal for trying the treatment"
          },
          "price": "99",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "4 Session Lipofirm Course",
            "description": "4 weekly skin tightening sessions for visible skin firming results"
          },
          "price": "380",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Course - 8 Lipofirm Sessions",
            "description": "8 weekly skin tightening sessions for complete skin transformation - ideal for post-weight loss loose skin from Ozempic, Wegovy or Mounjaro"
          },
          "price": "770",
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
    "url": "https://skintightbanbury.co.uk",
    "description": "Specialist skin tightening for loose skin after weight loss from Ozempic, Wegovy, Mounjaro. RF Lipofirm treatment in Banbury by experienced practitioner Pamela Crombie",
    "publisher": {
      "@type": "Organization",
      "name": "Quartz Aesthetics"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://skintightbanbury.co.uk/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Quartz Aesthetics",
    "alternateName": "Post-Ozempic Skin Tightening Banbury",
    "image": "https://skintightbanbury.co.uk/images/quartz-aesthetics-clinic-landscape.webp",
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
    "url": "https://skintightbanbury.co.uk",
    "telephone": "+447476903007",
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
      "telephone": "+447476903007"
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
      "serviceUrl": "https://skintightbanbury.co.uk",
      "serviceSmsNumber": "+447476903007"
    },
    "category": "Beauty Treatment",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Skin Tightening Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Consultation + First Session",
          "price": "99",
          "priceCurrency": "GBP",
          "description": "Skin consultation plus first RF skin tightening session"
        },
        {
          "@type": "Offer",
          "name": "4 Session Course",
          "price": "380",
          "priceCurrency": "GBP",
          "description": "4 weekly skin tightening sessions for visible firming results"
        },
        {
          "@type": "Offer",
          "name": "Full Course - 8 Sessions",
          "price": "770",
          "priceCurrency": "GBP",
          "description": "8 weekly skin tightening sessions for complete transformation - ideal for post-weight loss loose skin from GLP-1 medications"
        }
      ]
    }
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pamela Crombie",
    "jobTitle": "Founder & Skin Tightening Specialist",
    "image": "https://skintightbanbury.co.uk/images/pamela-crombie.webp",
    "description": "Pamela Crombie is the founder of Quartz Aesthetics, specialising in helping clients who have experienced significant weight loss - whether through GLP-1 medications like Ozempic and Wegovy, or traditional methods - to tighten and firm their loose skin using advanced RF Lipofirm technology.",
    "url": "https://skintightbanbury.co.uk",
    "worksFor": {
      "@type": "BeautySalon",
      "name": "Quartz Aesthetics",
      "url": "https://skintightbanbury.co.uk"
    },
    "knowsAbout": [
      "RF Skin Tightening",
      "Lipofirm Treatment",
      "Post-Weight Loss Skin Laxity",
      "GLP-1 Medication Side Effects",
      "Collagen Stimulation Therapy",
      "Non-Surgical Body Contouring"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Wellness Centre, 54 Bloxham Road",
      "addressLocality": "Banbury",
      "addressRegion": "Oxfordshire",
      "postalCode": "OX16 9JR",
      "addressCountry": "GB"
    },
    "telephone": "+447476903007"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can Lipofirm help with loose skin after Ozempic or Wegovy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Lipofirm is particularly effective for addressing the loose, sagging skin that can result from rapid weight loss on GLP-1 medications like Ozempic, Wegovy, or Mounjaro. The RF technology stimulates your body's natural collagen production to tighten and firm the skin over a course of treatments."
        }
      },
      {
        "@type": "Question",
        "name": "How many sessions will I need?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a 4 session course (£380) for visible results, or a full 8 session course (£770) for complete transformation. Start with a consultation + first session for just £99. You'll start seeing improvements from session 3-4, with full results visible after completing the course."
        }
      },
      {
        "@type": "Question",
        "name": "Is there any downtime after treatment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No downtime at all. Lipofirm is completely non-invasive. You can return to your normal activities immediately after each session. Some clients experience mild warmth or redness in the treated area, which typically subsides within a few hours."
        }
      },
      {
        "@type": "Question",
        "name": "What areas can be treated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lipofirm is effective on multiple areas including tummy, arms (bingo wings), thighs, buttocks, and the face/jawline. These are the most common areas affected by loose skin after weight loss from GLP-1 medications or natural weight loss."
        }
      },
      {
        "@type": "Question",
        "name": "How long do results last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Results are long-lasting as the treatment stimulates your body's own collagen production. With a healthy lifestyle and stable weight, results can last 12-18 months or longer. We recommend maintenance sessions every 2-3 months to maintain optimal skin firmness."
        }
      },
      {
        "@type": "Question",
        "name": "Is Lipofirm suitable while still taking Ozempic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Many clients continue their GLP-1 medication while having Lipofirm treatments. In fact, starting skin tightening during your weight loss journey can help prevent excessive skin laxity. We recommend discussing with your prescriber if you have any concerns."
        }
      }
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  )
}
