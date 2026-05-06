import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { getCityRepairServiceLinks } from "@/data/repairServiceLinks";
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
    title: `Home Repair ${city.name} ${city.state}`,
    description: `Home repair, handyman, drywall, doors, cabinets, trim, carpentry, and property maintenance in ${city.name}, ${city.state}.`,
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
  const priorityRepairLinks = getCityRepairServiceLinks(city);

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
            <h2>Priority Home Repair Pages</h2>
            <ul className="list">
              {priorityRepairLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <section className="section">
          <div className="section-head">
            <h2>Common Repair and Install Requests in {city.name}</h2>
            <p>
              These are the high-demand services local homeowners often search
              for when they need a reliable home service professional.
            </p>
          </div>
          <div className="card-grid">
            {priorityRepairLinks.slice(0, 6).map((item) => (
              <article className="card" key={item.href}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href}>Open service page</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <article className="card">
            <h2>Custom Carpentry and Finish Services in {city.name}</h2>
            <p>
              For built-ins, custom cabinetry, mantels, floating shelves, trim,
              media walls, furniture, and wood feature installations, use the
              local carpentry service links below.
            </p>
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
        </section>

        <section className="section">
          <article className="card">
            <h2>Custom Carpentry Built for {city.name} Homes</h2>
            <p>
              We plan each project around the home layout, existing finishes,
              and how the space needs to function after installation. That can
              include built-in storage, cabinet details, mantel updates, trim
              repairs, floating shelves, media walls, and other handcrafted
              wood features.
            </p>
            <p>
              The goal is clean fit, durable construction, and a finished look
              that feels intentional instead of added on later.
            </p>
          </article>
        </section>

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
