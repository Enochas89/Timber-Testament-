import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSelectionImages } from "@/data/service-images";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { services } from "@/data/services";
import { processSteps, testimonials, whyChooseUs } from "@/data/trust";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { Service } from "@/lib/types";

export const metadata: Metadata = buildPageMetadata({
  title: "Home Repair Services",
  description:
    "Explore home repair, handyman work, drywall, doors, cabinet installation, trim, finish carpentry, built-ins, and woodworking.",
  path: "/services",
  keywords: repairSeoKeywords,
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

function ServiceSelectionRow({ service }: { service: Service }) {
  const imageSrc = serviceSelectionImages[service.slug];

  return (
    <article className="service-selection-card">
      <div className="service-selection-copy">
        <h3>{service.name}</h3>
        <p>{service.shortDescription}</p>
      </div>
      <Link
        className="service-selection-media"
        href={`/services/${service.slug}`}
        aria-label={`Explore ${service.name}`}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${service.name} custom-built carpentry project installed in Southeast Tennessee`}
            width={680}
            height={380}
            className="service-selection-media-image"
            sizes="(max-width: 880px) 100vw, 340px"
          />
        ) : (
          <span className="service-selection-media-placeholder">Photo Placeholder</span>
        )}
        <span className="service-selection-media-overlay">Explore</span>
      </Link>
    </article>
  );
}

export default function ServicesPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <section className="services-collage" aria-label="Timber and Testament project collage">
          <div className="services-collage-grid">
            {collageImages.map((src, index) => (
              <figure className="services-collage-tile" key={src}>
                <Image
                  src={src}
                  alt={`Custom-built master carpentry detail ${index + 1} from a licensed and insured residential project`}
                  width={640}
                  height={380}
                  className="services-collage-image"
                  sizes="(max-width: 880px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
          <div className="services-collage-overlay">
            <h1 className="page-title">Home Repair, Handyman, and Carpentry Services</h1>
            <p className="page-subtitle services-collage-subtitle">
              General repair services, home maintenance services, and precision
              carpentry built with lasting quality and real everyday function.
            </p>
          </div>
        </section>

        <section className="section services-overview">
          <article className="card services-overview-main">
            <h2>Home Services Built Around Your Repair List</h2>
            <p>
              Every repair, install, and carpentry project is scoped for your
              layout, your timeline, and your daily use. We focus on quality
              materials, clean install details, and a finished look that feels
              original to the home.
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
          <div className="authority-grid">
            <article className="authority-block">
              <p className="authority-label">Senior Estimator</p>
              <h3>Scope Built to Tradesman Specification</h3>
              <p>
                Our Senior Estimator develops line-item scopes using a Tradesman
                Specification workflow: field measurements, material-grade notes,
                install sequencing, and tolerance controls before fabrication begins.
              </p>
            </article>
            <article className="authority-block">
              <p className="authority-label">Project Management</p>
              <h3>Execution Controls from Layout to Closeout</h3>
              <p>
                Project Management tracks milestone quality checks, change-order
                impacts, and dependency handoffs so framing, finish carpentry, and
                final punch-list work stay aligned to the original Tradesman Specification.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Most Requested Services</h2>
            <p>Start here if you are planning a new custom carpentry project.</p>
          </div>
          <div className="service-selection-list">
            {featuredServices.map((service) => (
              <ServiceSelectionRow key={service.slug} service={service} />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>More Carpentry Services</h2>
            <p>Explore the remaining specialty woodwork and finish services.</p>
          </div>
          <div className="service-compact-list">
            {additionalServices.map((service) => (
              <ServiceSelectionRow key={service.slug} service={service} />
            ))}
          </div>
        </section>

        <section className="section">
          <article className="card">
            <h2>Founder Insight Service Pages</h2>
            <ul className="list">
              <li>
                <Link href="/services/finish-carpentry">Finish Carpentry founder insight</Link>
              </li>
              <li>
                <Link href="/services/trim">Trim Carpentry founder insight</Link>
              </li>
              <li>
                <Link href="/services/custom-woodworking">Custom Woodworking founder insight</Link>
              </li>
              <li>
                <Link href="/log-slabs">Log Slab custom woodwork insight</Link>
              </li>
            </ul>
          </article>
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
