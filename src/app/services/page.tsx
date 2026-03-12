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

const featuredServices = services.slice(0, 4);
const additionalServices = services.slice(4);
const featuredTestimonials = testimonials.slice(0, 3);

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

        <section className="section services-overview">
          <article className="card services-overview-main">
            <h2>Custom Carpentry Built Around Your Home</h2>
            <p>
              Every project is designed for your layout, your style, and your
              daily use. We focus on quality materials, clean install details,
              and a finished look that feels original to the home.
            </p>
            <ul className="list">
              {whyChooseUs.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request an Estimate
              </Link>
              <Link className="btn-outline" href="/projects">
                See Recent Projects
              </Link>
            </div>
          </article>

          <aside className="card services-overview-aside">
            <h2>What to Expect</h2>
            <p>
              Send photos, share your goals, and we will map out a clear scope,
              timeline, and next steps during your estimate.
            </p>
            <ul className="list">
              {processSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Most Requested Services</h2>
            <p>Start here if you are planning a new custom carpentry project.</p>
          </div>
          <div className="card-grid">
            {featuredServices.map((service) => (
              <article className="card" key={service.slug}>
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`}>Explore service</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <details className="service-compact-details">
            <summary>View all carpentry services</summary>
            <div className="service-compact-list">
              {additionalServices.map((service) => (
                <Link className="service-compact-link" href={`/services/${service.slug}`} key={service.slug}>
                  <span>{service.name}</span>
                  <span aria-hidden="true">View</span>
                </Link>
              ))}
            </div>
          </details>
        </section>

        <section className="section services-proof">
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
          <article className="card">
            <h2>What Homeowners Say</h2>
            <div className="services-quote-list">
              {featuredTestimonials.map((item) => (
                <figure className="services-quote-item" key={`services-${item.author}-${item.quote.slice(0, 24)}`}>
                  <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption>{item.author}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
