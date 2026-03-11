const { business } = require("../config");
const { canonicalFor } = require("./seo");

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Carpenter",
    "@id": `${business.website}/#localbusiness`,
    name: business.name,
    legalName: business.legalName,
    telephone: business.phone,
    email: business.email,
    url: business.website,
    image: `${business.website}${business.defaultOgImage}`,
    priceRange: "$$",
    foundingDate: business.yearFounded,
    openingHours: business.hours,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      postalCode: business.postalCode,
      addressCountry: business.addressCountry
    },
    areaServed: business.serviceArea.map((city) => ({
      "@type": "City",
      name: city
    })),
    sameAs: Object.values(business.profileUrls).filter(Boolean)
  };
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${business.website}/#organization`,
    name: business.name,
    url: business.website,
    logo: `${business.website}${business.defaultOgImage}`,
    sameAs: Object.values(business.profileUrls).filter(Boolean)
  };
}

function webPageSchema({ route, title, description, breadcrumbs = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalFor(route)}#webpage`,
    url: canonicalFor(route),
    name: title,
    description,
    isPartOf: {
      "@id": `${business.website}/#organization`
    },
    breadcrumb: breadcrumbs.length
      ? {
          "@id": `${canonicalFor(route)}#breadcrumb`
        }
      : undefined
  };
}

function breadcrumbSchema(route, breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(route)}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: canonicalFor(crumb.url)
    }))
  };
}

function faqPageSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
}

function serviceSchema({ serviceName, cityName, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@id": `${business.website}/#localbusiness`
    },
    areaServed: {
      "@type": "City",
      name: cityName
    },
    description
  };
}

function imageObjectSchema({ filename, caption, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${business.website}/assets/images/${filename}`,
    caption,
    description,
    creator: {
      "@id": `${business.website}/#organization`
    }
  };
}

module.exports = {
  localBusinessSchema,
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  imageObjectSchema
};
