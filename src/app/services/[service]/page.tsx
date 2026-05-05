import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FoundersInsight } from "@/components/FoundersInsight";
import { JsonLd } from "@/components/JsonLd";
import { ServiceHeroCarousel } from "@/components/ServiceHeroCarousel";
import { cities } from "@/data/cities";
import { foundersInsights } from "@/data/foundersInsights";
import { serviceImageSets } from "@/data/service-images";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { services } from "@/data/services";
import { getServiceBySlug } from "@/lib/content";
import {
  breadcrumbSchema,
  buildPageMetadata,
  faqSchema,
  serviceSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

type ServicePageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: service.name,
    description: `${service.name} services for home repair, installation, maintenance, finish carpentry, and durable residential work in Southeast Tennessee.`,
    path: `/services/${service.slug}`,
    keywords: [
      ...repairSeoKeywords,
      `${service.name.toLowerCase()} near me`,
      `${service.name.toLowerCase()} Southeast Tennessee`,
    ],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const serviceImages = serviceImageSets[service.slug] ?? ["/images/project-placeholder.svg"];

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];
  const serviceInsight =
    service.slug === "finish-carpentry"
      ? foundersInsights["finish-carpentry"]
      : service.slug === "custom-carpentry"
        ? foundersInsights["custom-carpentry"]
        : null;

  return (
    <div className="page">
      <div className="shell">
        <JsonLd
          data={serviceSchema(service.slug, undefined, {
            descriptionOverride: serviceInsight?.schemaSummary,
          })}
        />
        <JsonLd data={faqSchema(service.faqs)} />
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />

        <h1 className="page-title">{service.name}</h1>
        <p className="page-subtitle">{service.hero}</p>
        {serviceInsight ? (
          <FoundersInsight title={serviceInsight.title} paragraph={serviceInsight.paragraph}>
            Work examples and planning guidance are available for{" "}
            <Link href="/cities/athens-tn">Athens</Link>,{" "}
            <Link href="/cities/cleveland-tn">Cleveland</Link>, and{" "}
            <Link href="/cities/chattanooga-tn">Chattanooga</Link>.
          </FoundersInsight>
        ) : null}
        <ServiceHeroCarousel images={serviceImages} serviceName={service.name} />

        <div className="cols-2">
          <article className="card">
            <h2>Why Homeowners Choose This Service</h2>
            <ul className="list">
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Available Service Areas</h2>
            <ul className="list">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/cities/${city.slug}/${service.slug}`}>
                    {service.name} in {city.name}, {city.state}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <section className="section">
          <h2>Frequently Asked Questions</h2>
          <div className="card-grid">
            {service.faqs.map((faq) => (
              <article className="card" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
