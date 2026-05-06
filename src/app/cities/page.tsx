import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Repair Service Areas",
  description:
    "Browse home repair, handyman, drywall, door repair, cabinet installation, property maintenance, and carpentry areas in Southeast Tennessee.",
  path: "/cities",
  keywords: repairSeoKeywords,
});

export default function CitiesPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/cities" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
        <h1 className="page-title">Home Repair and Handyman Service Areas</h1>
        <p className="page-subtitle">
          Explore your city page to see available repair services, handyman
          work, nearby project examples, and clear next steps for getting an
          estimate.
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
