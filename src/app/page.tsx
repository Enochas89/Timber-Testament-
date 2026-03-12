import Link from "next/link";
import { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { cities } from "@/data/cities";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials, whyChooseUs } from "@/data/trust";
import { buildPageMetadata, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Custom Carpentry in Athens, Cleveland, Chattanooga, Dalton, Collegedale, Ooltewah, Apison, and Charleston",
  description:
    "Custom built-ins, media walls, cabinets, trim work, mantels, and finish carpentry for homes in Southeast Tennessee and Dalton, Georgia.",
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
      <JsonLd data={localBusinessSchema()} />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy hero-copy-tile">
            <p className="eyebrow">Custom Carpentry Company</p>
            <h1>Built-ins, Trim, and Finish Carpentry That Looks Original to Your Home</h1>
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
              <article className="service-flow-item" key={service.slug}>
                <div className="service-flow-copy">
                  <h3>{service.name}</h3>
                  <p>{service.shortDescription}</p>
                </div>
                <Link href={`/services/${service.slug}`}>Explore</Link>
              </article>
            ))}
          </div>
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
