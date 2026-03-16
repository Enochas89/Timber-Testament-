import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { cities } from "@/data/cities";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Project Portfolio",
  description:
    "Review custom-built project case studies by licensed and insured master carpenters across Athens, Cleveland, and Chattanooga for trim, cabinetry, and built-ins.",
  path: "/projects",
});

export default function ProjectsPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
        <h1 className="page-title">Project Portfolio</h1>
        <p className="page-subtitle">
          Browse recent projects to see workmanship, material choices, and
          finished results across different spaces.
        </p>

        <div className="card-grid">
          {projects.map((project) => {
            const city = cities.find((item) => item.slug === project.citySlug);
            const service = services.find((item) => item.slug === project.serviceSlug);

            return (
              <article className="card" key={project.slug}>
                <Image
                  src={project.imagePath}
                  alt={`${project.title} custom-built carpentry installation in ${city?.name ?? "Southeast Tennessee"}`}
                  width={800}
                  height={500}
                  className="project-image"
                />
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <p className="muted-note">
                  {service?.name} in {city?.name}
                </p>
                <Link href={`/projects/${project.slug}`}>Read case study</Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
