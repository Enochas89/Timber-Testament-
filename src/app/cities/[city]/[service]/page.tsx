import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getLocalServiceContent } from "@/data/localServiceContent";
import { services } from "@/data/services";
import {
  getAllServiceCityCombos,
  getCityBySlug,
  getProjectsByCityAndService,
  getServiceBySlug,
} from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllServiceCityCombos().map((combo) => ({
    city: combo.citySlug,
    service: combo.serviceSlug,
  }));
}

type LocalServicePageProps = {
  params: Promise<{ city: string; service: string }>;
};

export async function generateMetadata({
  params,
}: LocalServicePageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;

  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${service.name} in ${city.name}, ${city.state}`,
    description: `${service.shortDescription} Serving homeowners in ${city.name}, ${city.state}.`,
    path: `/cities/${city.slug}/${service.slug}`,
  });
}

export default async function LocalServicePage({ params }: LocalServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params;

  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);

  if (!city || !service) {
    notFound();
  }

  const localProjects = getProjectsByCityAndService(city.slug, service.slug);
  const localContent = getLocalServiceContent(city.slug, service.slug);
  const combinedFaqs = localContent
    ? [...localContent.localFaqs, ...service.faqs]
    : service.faqs;

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/cities" },
    { name: `${city.name}, ${city.state}`, path: `/cities/${city.slug}` },
    { name: service.name, path: `/cities/${city.slug}/${service.slug}` },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={serviceSchema(service.slug, city.slug)} />
        <JsonLd data={faqSchema(combinedFaqs)} />
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/cities" },
            { label: `${city.name}, ${city.state}`, href: `/cities/${city.slug}` },
            { label: service.name },
          ]}
        />

        <h1 className="page-title">
          {service.name} in {city.name}, {city.state}
        </h1>
        <p className="page-subtitle">
          {service.hero} Our team serves {city.name} with detailed planning,
          accurate fit, and finish-ready execution.
        </p>

        <div className="cols-2">
          <article className="card">
            <h2>How This Service Works in {city.name}</h2>
            <ul className="list">
              <li>On-site measurements and installation planning</li>
              <li>Material selection based on style, budget, and durability</li>
              <li>Precision install with clean trim transitions</li>
              <li>Final walkthrough and finish recommendations</li>
            </ul>
          </article>
          <article className="card">
            <h2>Popular Nearby Areas</h2>
            <ul className="list">
              {city.neighborhoods.map((neighborhood) => (
                <li key={neighborhood}>{neighborhood}</li>
              ))}
            </ul>
          </article>
        </div>

        {localContent ? (
          <section className="section">
            <div className="card">
              <h2>Local Project Focus in {city.name}</h2>
              <p>{localContent.localIntro}</p>
              <ul className="list">
                {localContent.localHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="section">
          <h2>{service.name} FAQs for {city.name}</h2>
          <div className="card-grid">
            {combinedFaqs.map((faq) => (
              <article className="card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Related Local Projects</h2>
          {localProjects.length ? (
            <div className="card-grid">
              {localProjects.map((project) => (
                <article className="card" key={project.slug}>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Link href={`/projects/${project.slug}`}>View project</Link>
                </article>
              ))}
            </div>
          ) : (
            <article className="card">
              <p>
                More project examples for this service in {city.name} are
                being added. Contact us for recent work in your area.
              </p>
            </article>
          )}
        </section>

        <section className="section">
          <div className="cta-band">
            <h2>Need {service.name.toLowerCase()} in {city.name}?</h2>
            <p>
              Share photos and room dimensions to get a scoped estimate and timeline.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              <Link className="btn-outline" href={`/services/${service.slug}`}>
                Back to {service.name}
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Explore More Services in {city.name}</h2>
          <div className="card-grid">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <article className="card" key={item.slug}>
                  <h3>{item.name}</h3>
                  <p>{item.shortDescription}</p>
                  <Link href={`/cities/${city.slug}/${item.slug}`}>View local page</Link>
                </article>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
