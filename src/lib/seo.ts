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
  return `${title} | ${business.name}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title: pageTitle(title),
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle(title),
      description,
      url: canonical,
      siteName: business.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle(title),
      description,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    legalName: business.legalName,
    image: absoluteUrl("/images/project-placeholder.svg"),
    url: baseUrl,
    telephone: business.primaryPhoneRaw,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
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
    areaServed: business.serviceArea.map((place) => ({
      "@type": "City",
      name: place,
    })),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
      },
    })),
  };
}

export function serviceSchema(serviceSlug: string, citySlug?: string) {
  const service = services.find((item) => item.slug === serviceSlug);
  const city = citySlug ? cities.find((item) => item.slug === citySlug) : undefined;

  if (!service) {
    return null;
  }

  const areaName = city ? `${city.name}, ${city.state}` : undefined;
  const path = city
    ? `/cities/${city.slug}/${service.slug}`
    : `/services/${service.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${service.name} in ${city.name}, ${city.state}` : service.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.primaryPhoneRaw,
      url: baseUrl,
    },
    description: service.shortDescription,
    serviceType: service.name,
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
