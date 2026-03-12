import Image from "next/image";
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

const collageImages = [
  "/images/backgrounds/background-1.jpg",
  "/images/backgrounds/background-2.jpg",
  "/images/backgrounds/background-3.jpg",
  "/images/backgrounds/background-4.jpg",
  "/images/backgrounds/background-5.jpg",
  "/images/backgrounds/background-6.jpg",
];

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <section className="services-collage" aria-label="Timber and Testament project collage">
          <div className="services-collage-grid">
            {collageImages.map((src, index) => (
              <figure className="services-collage-tile" key={src}>
                <Image
                  src={src}
                  alt={`Custom carpentry project background ${index + 1}`}
                  fill
                  className="services-collage-image"
                  sizes="(max-width: 880px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
          <div className="services-collage-overlay">
            <h1 className="page-title">Carpentry Services</h1>
            <p className="page-subtitle services-collage-subtitle">
              Each service page is optimized for organic search intent and links to
              city-level landing pages for stronger local relevance.
            </p>
          </div>
        </section>
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
