import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Areas",
  description:
    "Browse custom-built carpentry service areas with licensed and insured master craftsmen serving Athens, Cleveland, Chattanooga, and nearby Southeast Tennessee cities.",
  path: "/cities",
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
        <h1 className="page-title">Service Areas</h1>
        <p className="page-subtitle">
          Explore your city page to see available services, nearby project
          examples, and clear next steps for getting an estimate.
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
