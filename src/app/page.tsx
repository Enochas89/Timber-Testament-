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
              Primary service areas with dedicated city pages.
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
        <div className="shell">
          <div className="section-head">
            <h2>Why Homeowners Choose Us</h2>
            <p>Built around craftsmanship, reliability, and practical function.</p>
          </div>
          <div className="card-grid">
            {whyChooseUs.map((reason) => (
              <article className="card" key={reason}>
                <p className="testimonial-quote">{reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Services</h2>
            <p>
              Start with your project type, then drill into your city page for local examples and FAQs.
            </p>
          </div>
          <div className="card-grid">
            {services.map((service) => (
              <article key={service.slug} className="card">
                <span className="badge">{service.name}</span>
                <p>{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`}>View service page</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>What Clients Say</h2>
            <p>Real homeowner feedback from projects across our service area.</p>
          </div>
          <div className="card-grid">
            {testimonials.map((item) => (
              <article className="card" key={`${item.author}-${item.quote.slice(0, 24)}`}>
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
            <h2>Areas We Serve</h2>
            <p>Find your city to view local services, project examples, and what to expect.</p>
          </div>
          <div className="card-grid">
            {cities.map((city) => (
              <article key={city.slug} className="card">
                <h3>
                  {city.name}, {city.state}
                </h3>
                <p>{city.summary}</p>
                <Link href={`/cities/${city.slug}`}>Explore {city.name} page</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Featured Projects</h2>
            <p>
              See recent project examples with real photos, scope details, and
              finished results.
            </p>
          </div>
          <div className="card-grid">
            {projects.map((project) => (
              <article className="card" key={project.slug}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <Link href={`/projects/${project.slug}`}>Read project details</Link>
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
              <Link className="btn-outline" href="/projects">
                See Project Examples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
