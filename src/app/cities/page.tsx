import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cities } from "@/data/cities";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Areas",
  description:
    "City-specific carpentry pages for Chattanooga, Athens, Dalton, Collegedale, Ooltewah, and Apison.",
  path: "/cities",
});

export default function CitiesPage() {
  return (
    <div className="page">
      <div className="shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
        <h1 className="page-title">Service Areas</h1>
        <p className="page-subtitle">
          These local landing pages are built for city-level SEO intent and link
          directly to service-specific pages.
        </p>
        <div className="card-grid">
          {cities.map((city) => (
            <article className="card" key={city.slug}>
              <h2>
                {city.name}, {city.state}
              </h2>
              <p>{city.summary}</p>
              <Link href={`/cities/${city.slug}`}>View {city.name} city page</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
