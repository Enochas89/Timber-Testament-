import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { serviceSelectionImages } from "@/data/service-images";
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
    title: `${service.name} Services`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const serviceImagePath = serviceSelectionImages[service.slug] ?? "/images/project-placeholder.svg";

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={serviceSchema(service.slug)} />
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
        <figure className="service-detail-image-frame">
          <Image
            src={serviceImagePath}
            alt={`${service.name} project example`}
            fill
            className="service-detail-image"
            sizes="(max-width: 880px) 92vw, 1120px"
            priority
          />
        </figure>

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
