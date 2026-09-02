import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import {
  getSeoLandingPageBySlug,
  getSeoLandingPagesBySlugs,
  seoLandingPages,
} from "@/data/seoLandingPages";
import { absoluteUrl, breadcrumbSchema, buildPageMetadata, faqSchema } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({ landing: page.slug }));
}

type LandingPageProps = {
  params: Promise<{ landing: string }>;
};

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { landing } = await params;
  const page = getSeoLandingPageBySlug(landing);

  if (!page) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function SeoLandingPage({ params }: LandingPageProps) {
  const { landing } = await params;
  const page = getSeoLandingPageBySlug(landing);

  if (!page) {
    notFound();
  }

  const relatedPages = getSeoLandingPagesBySlugs(page.relatedSlugs);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: page.serviceName, path: page.path },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: page.serviceName,
    description: page.description,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.primaryPhoneRaw,
      email: business.email,
      url: business.websiteUrl,
    },
    areaServed: page.areaServed.map((location) => ({
      "@type": "City",
      name: location,
    })),
    url: absoluteUrl(page.path),
  };

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={serviceJsonLd} />
        <JsonLd data={faqSchema(page.faqs)} />
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: page.serviceName },
          ]}
        />

        <h1 className="page-title">{page.h1}</h1>
        <p className="page-subtitle">{page.intro}</p>

        <div className="cols-2">
          <article className="card">
            <h2>{page.serviceName} Scope</h2>
            <p>{page.description}</p>
            <ul className="list">
              {page.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Service Area Focus</h2>
            <p>
              We focus this page on the local area below so homeowners can
              quickly confirm service availability before requesting a quote.
            </p>
            <ul className="list">
              {page.areaServed.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </article>
        </div>

        <section className="section">
          <article className="card">
            <h2>What This Service Covers</h2>
            <p>
              Timber &amp; Testament uses this page to match the right
              {` ${page.serviceLabel.toLowerCase()} `} request with the right
              local scope. That may include a single repair, a bundled
              punch-list, a small install, or a larger finish project that needs
              careful measuring and clean completion.
            </p>
            <p>
              Before quoting work in {page.areaServed.join(", ")}, we review
              photos, dimensions, access, materials, and any timing pressure so
              the estimate reflects the real job instead of a generic service
              menu.
            </p>
          </article>
        </section>

        <section className="section">
          <h2>{page.serviceName} FAQs</h2>
          <div className="card-grid">
            {page.faqs.map((faq) => (
              <article className="card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Request A Quote</h2>
          <div className="cta-band">
            <p>
              Call <a href={`tel:${business.primaryPhoneRaw}`}>{business.primaryPhoneDisplay}</a>
              {business.email ? (
                <>
                  {" "}or email <a href={`mailto:${business.email}`}>{business.email}</a>
                </>
              ) : null}{" "}
              with your project details.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact#general-request">
                Request Estimate
              </Link>
              <a className="btn-outline" href={`tel:${business.primaryPhoneRaw}`}>
                Call {business.primaryPhoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {relatedPages.length ? (
          <section className="section">
            <h2>Related Landing Pages</h2>
            <div className="card-grid">
              {relatedPages.map((item) => (
                <article className="card" key={item.slug}>
                  <h3>{item.h1}</h3>
                  <p>{item.description}</p>
                  <Link href={item.path}>View page</Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
