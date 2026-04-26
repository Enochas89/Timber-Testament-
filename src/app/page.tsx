import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { business } from "@/data/business";
import { cities } from "@/data/cities";
import { projects } from "@/data/projects";
import { cityLandingPages, corridorLandingPages } from "@/data/seoLandingPages";
import { serviceSelectionImages } from "@/data/service-images";
import { services } from "@/data/services";
import { testimonials, whyChooseUs } from "@/data/trust";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Family-Owned Home Services from Chattanooga to Knoxville",
  description:
    "Family-owned handyman, concrete, window installation, door installation, and custom carpentry services from Chattanooga to Knoxville.",
  path: "/",
});

export default function Home() {
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 6);
  const visibleTestimonials = testimonials.slice(0, 6);

  const cityNameBySlug = new Map(
    cities.map((city) => [city.slug, `${city.name}, ${city.state}`]),
  );
  const serviceNameBySlug = new Map(
    services.map((service) => [service.slug, service.name]),
  );

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy hero-copy-tile">
            <p className="eyebrow">Local Family-Owned Home Services</p>
            <h1>Handyman, Concrete, Windows, Doors, and Carpentry from Chattanooga to Knoxville</h1>
            <p>
              {business.tagline} We focus on clean installation details, durable
              materials, and practical design for daily use.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request an Estimate
              </Link>
              <a className="btn-outline" href={`tel:${business.primaryPhoneRaw}`}>
                Call {business.primaryPhoneDisplay}
              </a>
            </div>
          </div>

          <div className="stat-grid">
            <div className="stat">
              <strong>{business.yearsExperience}+</strong>
              Years of carpentry experience in local markets.
            </div>
            <div className="stat">
              <strong>{cities.length}</strong>
              Service areas across Southeast Tennessee and nearby Georgia.
            </div>
            <div className="stat">
              <strong>{services.length}</strong>
              Core services built around real homeowner needs.
            </div>
            <div className="stat">
              <strong>Fast</strong>
              Quote response workflow built for local homeowners.
            </div>
          </div>
        </div>
      </section>

      <section className="section home-video-section" aria-label="Timber and Testament craftsmanship video">
        <div className="shell">
          <div className="home-video-band">
            <video
              className="home-video"
              src="/videos/timber.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Timber and Testament craftsmanship and project work video"
            />
            <div className="home-video-copy">
              <p className="eyebrow">Craftsmanship In Motion</p>
              <h2>See the detail before the estimate.</h2>
              <p>
                A closer look at the materials, cuts, fit, and finish work that
                shape each Timber &amp; Testament project.
              </p>
              <div className="hero-actions">
                <Link className="btn" href="/contact">
                  Request an Estimate
                </Link>
                <Link className="btn-outline" href="/projects">
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell home-split">
          <article className="card">
            <h2>Why Homeowners Choose Us</h2>
            <p>
              Our projects are built for long-term function, clean finish
              quality, and a final result that feels right for the home.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Start a Quote
              </Link>
              <Link className="btn-outline" href="/projects">
                View Recent Projects
              </Link>
            </div>
          </article>
          <ol className="home-checklist">
            {whyChooseUs.map((reason) => (
              <li key={reason}>
                <p>{reason}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Services at a Glance</h2>
            <p>Choose the service that best matches your project goals.</p>
          </div>
          <div className="service-flow">
            {services.map((service) => (
              <article className="service-selection-card" key={service.slug}>
                <div className="service-selection-copy">
                  <h3>{service.name}</h3>
                  <p>{service.shortDescription}</p>
                </div>
                <Link
                  className="service-selection-media"
                  href={`/services/${service.slug}`}
                  aria-label={`Explore ${service.name}`}
                >
                  {serviceSelectionImages[service.slug] ? (
                    <Image
                      src={serviceSelectionImages[service.slug]}
                      alt={`${service.name} custom-built woodworking installation in Southeast Tennessee`}
                      fill
                      className="service-selection-media-image"
                      sizes="(max-width: 880px) 100vw, 340px"
                    />
                  ) : (
                    <span className="service-selection-media-placeholder">Photo Placeholder</span>
                  )}
                  <span className="service-selection-media-overlay">Explore</span>
                </Link>
              </article>
            ))}
          </div>
          <p className="muted-note">
            Looking for specific trade terms? Browse the{" "}
            <Link href="/carpentry-glossary">full carpentry glossary</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Client Results</h2>
            <p>Feedback from homeowners across recent projects.</p>
          </div>
          <div className="testimonial-stack">
            {visibleTestimonials.map((item) => (
              <article className="testimonial-panel" key={`${item.author}-${item.quote.slice(0, 24)}`}>
                <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                <p className="testimonial-meta">
                  {item.author}
                  {item.location ? ` - ${item.location}` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Project Spotlight</h2>
            <p>Recent examples of craftsmanship, scope, and finished quality.</p>
          </div>
          <div className="project-showcase">
            {featuredProject ? (
              <article className="card project-feature">
                <h3>{featuredProject.title}</h3>
                <p className="muted-note">
                  {serviceNameBySlug.get(featuredProject.serviceSlug)} in {cityNameBySlug.get(featuredProject.citySlug)}
                </p>
                <p>{featuredProject.summary}</p>
                <Link href={`/projects/${featuredProject.slug}`}>Read full case study</Link>
              </article>
            ) : null}
            <div className="project-list">
              {secondaryProjects.map((project) => (
                <article className="card project-list-item" key={project.slug}>
                  <h3>{project.title}</h3>
                  <p className="muted-note">
                    {serviceNameBySlug.get(project.serviceSlug)} in {cityNameBySlug.get(project.citySlug)}
                  </p>
                  <Link href={`/projects/${project.slug}`}>View project</Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Areas We Serve</h2>
            <p>Pick your city to see local services and project examples.</p>
          </div>
          <div className="area-chip-wrap">
            {cities.map((city) => (
              <Link className="area-chip" key={city.slug} href={`/cities/${city.slug}`}>
                {city.name}, {city.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Chattanooga To Knoxville Landing Pages</h2>
            <p>
              Explore service-specific landing pages built for local intent
              searches across East Tennessee.
            </p>
          </div>
          <div className="card-grid">
            {corridorLandingPages.map((page) => (
              <article className="card" key={page.slug}>
                <h3>{page.h1}</h3>
                <p>{page.description}</p>
                <Link href={page.path}>View landing page</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>City + Service Landing Pages</h2>
            <p>
              Dedicated Chattanooga and Knoxville landing pages for handyman,
              concrete, windows, and doors.
            </p>
          </div>
          <div className="card-grid">
            {cityLandingPages.map((page) => (
              <article className="card" key={page.slug}>
                <h3>{page.h1}</h3>
                <p>{page.description}</p>
                <Link href={page.path}>View local page</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="cta-band">
            <h2>Ready to Start a Carpentry Project?</h2>
            <p>
              Send project photos, room dimensions, and your target timeline. We
              will respond with next steps and an estimate path.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Start a Quote
              </Link>
              <Link className="btn-outline" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
