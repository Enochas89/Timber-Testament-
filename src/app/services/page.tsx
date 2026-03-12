import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { services } from "@/data/services";
import { processSteps, testimonials, whyChooseUs } from "@/data/trust";
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
              Precision carpentry built to transform your space with custom
              craftsmanship, lasting quality, and real everyday function.
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

        <section className="section">
          <div className="section-head">
            <h2>Why Clients Trust Our Work</h2>
            <p>Every project is built for clean results and long-term daily use.</p>
          </div>
          <div className="card-grid">
            {whyChooseUs.map((reason) => (
              <article className="card" key={reason}>
                <p className="testimonial-quote">{reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section cols-2">
          <article className="card">
            <h2>Our Process</h2>
            <ul className="list">
              {processSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Workmanship Promise</h2>
            <p>
              We stand behind our craftsmanship. If a workmanship issue appears,
              we return to address it and make it right.
            </p>
            <p>
              You get clear communication, dependable execution, and final
              results built to last.
            </p>
          </article>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Client Feedback</h2>
          </div>
          <div className="card-grid">
            {testimonials.map((item) => (
              <article className="card" key={`services-${item.author}-${item.location}`}>
                <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                <p className="testimonial-meta">
                  {item.author} - {item.location}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
