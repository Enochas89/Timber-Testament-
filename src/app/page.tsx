import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { business } from "@/data/business";
import { cities } from "@/data/cities";
import { projects } from "@/data/projects";
import { corridorRepairServiceLinks } from "@/data/repairServiceLinks";
import { serviceSelectionImages } from "@/data/service-images";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { services } from "@/data/services";
import { testimonials, whyChooseUs } from "@/data/trust";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "24/7 Emergency Home Repair & Handyman TN",
  description:
    "24/7 emergency home repair requests, handyman work, leak repair help, drywall, doors, cabinets, and property maintenance from Chattanooga to Knoxville.",
  path: "/",
  keywords: repairSeoKeywords,
});

export default function Home() {
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 6);
  const featuredServices = services.slice(0, 6);
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
        <div className="shell hero-layout">
          <div className="hero-copy hero-copy-tile">
            <p className="eyebrow">24/7 Emergency Repair Requests</p>
            <h1>Emergency Home Repair, Handyman, Leaks, Doors, Drywall, Cabinets, and Carpentry from Chattanooga to Knoxville</h1>
            <p>
              {business.tagline} We handle urgent repair requests, leak repair
              help, plumbing fixture issues, electrical fixture concerns, repair
              lists, home maintenance, installs, and practical upgrades.
            </p>
            <div className="hero-service-tags" aria-label="Common work types">
              <span>24/7 Emergency</span>
              <span>Leaks</span>
              <span>Plumbing Fixtures</span>
              <span>Electrical Fixtures</span>
              <span>Handyman</span>
              <span>Drywall</span>
              <span>Doors</span>
              <span>Cabinets</span>
              <span>Carpentry</span>
            </div>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request an Estimate
              </Link>
              <a className="btn-outline" href={`tel:${business.primaryPhoneRaw}`}>
                Call {business.primaryPhoneDisplay}
              </a>
            </div>
          </div>

          <aside className="hero-service-panel" aria-label="Start a home service request">
            <p className="eyebrow">Emergency Service</p>
            <h2>Need urgent repair help? Call or send details now.</h2>
            <p>
              We accept 24/7 emergency repair requests for leaks, storm damage,
              damaged doors or windows, drywall damage, plumbing fixture
              problems, electrical fixture issues, and urgent safety concerns.
            </p>
            <div className="hero-service-actions">
              <a className="btn" href={`tel:${business.primaryPhoneRaw}`}>
                Call {business.primaryPhoneDisplay}
              </a>
              <Link className="btn-outline" href="/contact">
                Send Emergency Details
              </Link>
            </div>
            <div className="hero-quick-links" aria-label="Popular service paths">
              {corridorRepairServiceLinks.slice(0, 4).map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
        <div className="shell stat-strip" aria-label="Timber and Testament service proof">
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
            <strong>24/7</strong>
            Emergency repair request intake for urgent home issues.
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="shell">
          <div className="section-head">
            <h2>24/7 Emergency Home Repair and Handyman Help</h2>
            <p>
              Fast paths for urgent and common repair searches: emergency home
              repair, plumbing leaks, electrical fixture problems, drywall
              repair, door repair, window repair, cabinet installation, storm
              damage, property maintenance, and everyday handyman repairs.
            </p>
          </div>
          <div className="quick-service-grid">
            {corridorRepairServiceLinks.slice(0, 5).map((item) => (
              <article className="quick-service-card" key={item.href}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href}>View {item.title.toLowerCase()}</Link>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="btn-outline" href="/repairs-and-installs-chattanooga-to-knoxville">
              See Common Repairs and Installs
            </Link>
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
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell home-split">
          <article className="card">
            <h2>Why Homeowners Choose Us</h2>
            <p>
              Our emergency home repair, handyman, and improvement services are
              built for urgent communication, long-term function, clean finish
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
        <div className="shell human-connection">
          <div className="human-connection-copy">
            <p className="eyebrow">People Behind The Work</p>
            <h2>Real Crews, Real Job Sites, Real Care</h2>
            <p>
              Homeowners are trusting us with the places they live every day.
              That means showing up prepared, communicating clearly, and doing
              careful work even before the finished details are visible.
            </p>
            <p>
              From structural framing to final carpentry, our work is done by
              people who care about fit, safety, cleanup, and how the finished
              project will feel once your family is using the space.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/about">
                Meet Timber &amp; Testament
              </Link>
              <Link className="btn-outline" href="/contact">
                Talk Through a Project
              </Link>
            </div>
          </div>
          <div className="human-photo-grid" aria-label="Timber and Testament crews working on framing projects">
            <figure className="human-photo human-photo-tall">
              <Image
                src="/images/team/crew-framing-trusses.jpg"
                alt="Timber and Testament crew members framing a residential structure"
                width={1000}
                height={1499}
                sizes="(max-width: 920px) 100vw, 340px"
              />
              <figcaption>Hands-on framing work with attention to layout and structure.</figcaption>
            </figure>
            <figure className="human-photo">
              <Image
                src="/images/team/carpenter-framing-wall.jpg"
                alt="Carpenter fastening wall framing on a residential build"
                width={1200}
                height={800}
                sizes="(max-width: 920px) 100vw, 440px"
              />
              <figcaption>Every project starts with people doing the work carefully.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Services at a Glance</h2>
            <p>
              Start with the main project type. We can narrow drywall repair,
              door repair, trim work, cabinet installation, TV mounting, ceiling
              fan installation, deck repair, fence repair, faucet repair, sink
              repair, toilet repair, minor renovations, and home upgrades during
              the estimate.
            </p>
          </div>
          <div className="service-flow">
            {featuredServices.map((service) => (
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
            ))}
          </div>
          <div className="hero-actions">
            <Link className="btn-outline" href="/services">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h2>Repair and Maintenance Work</h2>
            <p>
              Homeowners, landlords, and real estate agents call us for clear
              repair scopes, punch-list work, and practical maintenance across
              Cleveland, Chattanooga, Athens, and nearby East Tennessee.
            </p>
          </div>
          <div className="card-grid">
            <article className="card">
              <h3>Common Repair Requests</h3>
              <p>
                Drywall patches, door repair, trim work, cabinet installation,
                TV mounting, ceiling fan installation, faucet or sink repair,
                toilet repair, deck repair, and fence repair.
              </p>
            </article>
            <article className="card">
              <h3>Small Projects and Upgrades</h3>
              <p>
                Small remodeling projects, minor renovations, home upgrades,
                quick repairs, and same-day handyman scheduling when
                availability allows.
              </p>
            </article>
            <article className="card">
              <h3>Local Search Areas</h3>
              <p>
                Local help for handyman requests, home repair, drywall repair,
                cabinet installation, and other home service needs across our
                service area.
              </p>
            </article>
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
          <div className="service-area-feature">
            <div>
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
            <figure className="service-area-map">
              <Image
                src="/images/service_locations.png"
                alt="Timber and Testament service locations across Southeast Tennessee"
                width={900}
                height={700}
                sizes="(max-width: 920px) 100vw, 520px"
              />
            </figure>
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
