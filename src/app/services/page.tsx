import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { services } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Carpentry Services",
  description:
    "Explore custom carpentry services including built-ins, trim, mantels, floating shelves, and wall paneling.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <h1 className="page-title">Carpentry Services</h1>
        <p className="page-subtitle">
          Each service page is optimized for organic search intent and links to
          city-level landing pages for stronger local relevance.
        </p>
        <div className="card-grid">
          {services.map((service) => (
            <article className="card" key={service.slug}>
              <h2>{service.name}</h2>
              <p>{service.shortDescription}</p>
              <Link href={`/services/${service.slug}`}>Open {service.name} page</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
