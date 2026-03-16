import type { MetadataRoute } from "next";

import { business } from "@/data/business";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = business.websiteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
