import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Our Custom Carpentry Company",
  description:
    "Meet licensed and insured master carpenters creating custom-built trim, cabinetry, and interior woodwork for homes across Athens, Cleveland, and Chattanooga.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />
        <h1 className="page-title">About Timber &amp; Testament</h1>
        <p className="page-subtitle">
          We specialize in interior custom carpentry, balancing design quality,
          practical storage, and precise installation details that hold up over
          time.
        </p>
        <div className="card-grid">
          <article className="card">
            <h2>How We Work</h2>
            <ul className="list">
              <li>Discovery call and scope review</li>
              <li>On-site measurements and design direction</li>
              <li>Fabrication planning and material selection</li>
              <li>Installation with punch-list walkthrough</li>
            </ul>
          </article>
          <article className="card">
            <h2>Project Fit</h2>
            <ul className="list">
              <li>Custom built-ins and storage walls</li>
              <li>Trim upgrades and room refreshes</li>
              <li>Mantels and fireplace focal walls</li>
              <li>Wainscoting and architectural paneling</li>
            </ul>
          </article>
          <article className="card">
            <h2>Service Region</h2>
            <p>
              Core coverage includes {business.serviceArea.join(", ")}.
            </p>
          </article>
        </div>

        <section className="section">
          <div className="card">
            <h2>Built for Practical Homes</h2>
            <p>
              Most projects start with a specific problem: not enough storage,
              damaged trim, a room that needs a stronger focal point, or a
              repair list that needs one dependable crew. We look at the room
              conditions, existing finishes, daily use, and budget before
              recommending a build or repair path.
            </p>
            <p>
              Our work includes home repair, handyman support, cabinet
              installation, finish carpentry, built-ins, shelves, mantels, and
              custom wood features across East Tennessee homes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
