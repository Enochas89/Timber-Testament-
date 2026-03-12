import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getProjectBySlug } from "@/lib/content";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ project: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ project: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  const city = cities.find((item) => item.slug === project.citySlug);
  const service = services.find((item) => item.slug === project.serviceSlug);

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        <h1 className="page-title">{project.title}</h1>
        <p className="page-subtitle">{project.summary}</p>

        <Image
          src={project.imagePath}
          alt={project.title}
          width={1200}
          height={750}
          className="project-image"
          priority
        />

        <section className="section cols-2">
          <article className="card">
            <h2>Scope</h2>
            <ul className="list">
              {project.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h2>Materials</h2>
            <ul className="list">
              {project.materials.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section">
          <div className="card">
            <p>
              <strong>Service:</strong> {service?.name}
              <br />
              <strong>Location:</strong> {city?.name}, {city?.state}
              <br />
              <strong>Timeline:</strong> {project.timeline}
            </p>
            <p>{project.outcome}</p>
            {project.isPlaceholder ? (
              <p className="muted-note">
                This is starter placeholder content. Replace with real photos and details from `content-intake/projects`.
              </p>
            ) : null}
          </div>
        </section>

        <section className="section">
          <div className="cta-band">
            <h2>Planning Something Similar?</h2>
            <p>Share your room photos and we can scope a comparable build path.</p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              {city && service ? (
                <Link className="btn-outline" href={`/cities/${city.slug}/${service.slug}`}>
                  Local {service.name} page
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
