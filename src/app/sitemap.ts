import type { MetadataRoute } from "next";

import { cities } from "@/data/cities";
import { seoLandingPages } from "@/data/seoLandingPages";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/services",
    "/cities",
    "/projects",
    "/carpentry-glossary",
    "/services/trim",
    "/services/custom-woodworking",
    "/log-slabs",
  ].map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const servicePages = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityPages = cities.map((city) => ({
    url: absoluteUrl(`/cities/${city.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const localServicePages = cities.flatMap((city) =>
    services.map((service) => ({
      url: absoluteUrl(`/cities/${city.slug}/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  const projectPages = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seoLandingPageEntries = seoLandingPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.slug.includes("-to-knoxville") ? 0.9 : 0.85,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...localServicePages,
    ...projectPages,
    ...seoLandingPageEntries,
  ];
}
