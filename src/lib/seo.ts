import { Metadata } from "next";

import { business } from "@/data/business";
import { cities } from "@/data/cities";
import { services } from "@/data/services";

function normalizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const baseUrl = normalizeBaseUrl(business.websiteUrl);

export function absoluteUrl(path = "") {
  if (!path) {
    return baseUrl;
  }
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageTitle(title: string) {
  return title;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${business.name}`;

  return {
    title: pageTitle(title),
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: business.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function localBusinessSchema() {
  const hasStreetAddress =
    business.address.street && business.address.street !== "Update Street Address";
  const hasGoogleBusinessProfile =
    business.googleBusinessProfileUrl &&
    business.googleBusinessProfileUrl !== "https://business.google.com/";

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: business.name,
    legalName: business.legalName,
    image: absoluteUrl(
      "/images/projects/custom-living-room-media-wall-cleveland-tn.jpeg",
    ),
    url: baseUrl,
    telephone: business.primaryPhoneRaw,
    description: business.fullDescription,
    priceRange: "$$",
    ...(business.email ? { email: business.email } : {}),
    ...(hasGoogleBusinessProfile
      ? { sameAs: [business.googleBusinessProfileUrl] }
      : {}),
    address: hasStreetAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        }
      : {
          "@type": "PostalAddress",
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: [
      ...(business.serviceCounties ?? []).map((county) => ({
        "@type": "AdministrativeArea",
        name: county,
      })),
      ...business.serviceArea.map((place) => ({
        "@type": "City",
        name: place,
      })),
    ],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${business.name} home repair and carpentry services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };
}

type ServiceSchemaOptions = {
  descriptionOverride?: string;
  pathOverride?: string;
  serviceNameOverride?: string;
};

export function serviceSchema(
  serviceSlug: string,
  citySlug?: string,
  options?: ServiceSchemaOptions,
) {
  const service = services.find((item) => item.slug === serviceSlug);
  const city = citySlug ? cities.find((item) => item.slug === citySlug) : undefined;

  if (!service) {
    return null;
  }

  const areaName = city ? `${city.name}, ${city.state}` : undefined;
  const path = options?.pathOverride
    ? options.pathOverride
    : city
      ? `/cities/${city.slug}/${service.slug}`
      : `/services/${service.slug}`;
  const serviceName = options?.serviceNameOverride ?? service.name;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${serviceName} in ${city.name}, ${city.state}` : serviceName,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.primaryPhoneRaw,
      url: baseUrl,
    },
    description: options?.descriptionOverride ?? service.shortDescription,
    serviceType: serviceName,
    url: absoluteUrl(path),
    areaServed: areaName
      ? {
          "@type": "City",
          name: areaName,
        }
      : business.serviceArea.map((place) => ({
          "@type": "City",
          name: place,
        })),
  };
}

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
