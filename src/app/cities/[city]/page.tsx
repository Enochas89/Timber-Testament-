import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
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
    title: `Custom Carpentry in ${city.name}, ${city.state}`,
    description: city.summary,
    path: `/cities/${city.slug}`,
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

        <h1 className="page-title">Custom Carpentry in {city.name}, {city.state}</h1>
        <p className="page-subtitle">{city.intro}</p>

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
                Add real projects for {city.name} from `content-intake/projects` to strengthen local proof and ranking potential.
              </p>
            </article>
          )}
        </section>
      </div>
    </div>
  );
}
