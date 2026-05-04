import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { services } from "@/data/services";
import { getCityBySlug, getProjectsByCity } from "@/lib/content";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "City Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `Home Repair and Handyman Services in ${city.name}, ${city.state}`,
    description: `Home repair, handyman work, drywall repair, door repair, cabinet installation, property maintenance, trim, and carpentry in ${city.name}, ${city.state}.`,
    path: `/cities/${city.slug}`,
    keywords: [
      ...repairSeoKeywords,
      `home repair ${city.name} ${city.state}`,
      `handyman ${city.name} ${city.state}`,
      `drywall repair ${city.name} ${city.state}`,
      `cabinet installation ${city.name} ${city.state}`,
    ],
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const cityProjects = getProjectsByCity(city.slug);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/cities" },
    { name: `${city.name}, ${city.state}`, path: `/cities/${city.slug}` },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/cities" },
            { label: `${city.name}, ${city.state}` },
          ]}
        />

        <h1 className="page-title">Home Repair and Handyman Services in {city.name}, {city.state}</h1>
        <p className="page-subtitle">
          {city.intro} We also support home repair services, handyman punch
          lists, drywall repair, door repair, cabinet installation, property
          maintenance, and small home upgrades.
        </p>

        <div className="cols-2">
          <article className="card">
            <h2>Neighborhood Focus</h2>
            <ul className="list">
              {city.neighborhoods.map((neighborhood) => (
                <li key={neighborhood}>{neighborhood}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Local Service Pages</h2>
            <ul className="list">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/cities/${city.slug}/${service.slug}`}>
                    {service.name} in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <section className="section">
          {city.slug === "athens-tn" ? (
            <article className="card">
              <h2>Featured Athens Service Path</h2>
              <p>
                Looking for furniture that fits your room exactly? Start with our
                <Link href="/cities/athens-tn/custom-furniture"> custom furniture service page for Athens, TN homeowners</Link>.
              </p>
            </article>
          ) : null}
        </section>

        <section className="section">
          <h2>Project Examples Near {city.name}</h2>
          {cityProjects.length ? (
            <div className="card-grid">
              {cityProjects.map((project) => (
                <article key={project.slug} className="card">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Link href={`/projects/${project.slug}`}>See project details</Link>
                </article>
              ))}
            </div>
          ) : (
            <article className="card">
              <p>
                More project examples for {city.name} are being added. Contact
                us for recent work in your area.
              </p>
            </article>
          )}
        </section>
      </div>
    </div>
  );
}
