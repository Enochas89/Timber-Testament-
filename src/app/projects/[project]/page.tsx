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

const projectSeoTitles: Record<string, string> = {
  "custom-framing-3500-sqft-house-cleveland-tn": "Custom Framing Cleveland TN",
  "floating-shelves-kitchen-dining-charleston-tn": "Floating Shelves Charleston TN",
  "custom-fireplace-mantel-athens-tn": "Fireplace Mantel Athens TN",
  "custom-built-in-cabinet-storage-ooltewah-tn": "Built-In Storage Ooltewah TN",
  "custom-wood-furniture-piece-chattanooga-tn": "Outdoor Shower Chattanooga TN",
  "custom-mudroom-storage-athens-tn": "Mudroom Storage Athens TN",
  "interior-trim-upgrade-cleveland-tn": "Interior Trim Cleveland TN",
  "custom-pergola-shade-structure-chattanooga-tn": "Pergola Build Chattanooga TN",
  "accent-wall-finish-carpentry-collegedale-tn": "Accent Wall Collegedale TN",
};

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

  const city = cities.find((item) => item.slug === project.citySlug);
  const seoTitle = projectSeoTitles[project.slug] ?? project.title;
  const location = city ? `${city.name}, ${city.state}` : "Southeast Tennessee";

  return buildPageMetadata({
    title: seoTitle,
    description: `${seoTitle} case study in ${location}. Review scope, materials, and finished carpentry details from Timber & Testament.`,
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
          alt={`${project.title} custom-built carpentry result in ${city?.name ?? "Southeast Tennessee"}, ${city?.state ?? "TN"}`}
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
          <article className="card">
            <h2>Project Planning Notes</h2>
            <p>
              This project was planned around fit, function, and finish quality
              for the specific space. Before installation, we review dimensions,
              site conditions, material choices, and how the finished work needs
              to hold up under daily use.
            </p>
            <p>
              The same process applies across home repair, custom carpentry,
              built-ins, trim work, cabinet installation, mantels, shelves, and
              other residential woodworking projects.
            </p>
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
