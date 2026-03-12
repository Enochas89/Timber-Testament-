import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { business } from "@/data/business";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Our Custom Carpentry Company",
  description:
    "Learn how Timber & Testament approaches design, fabrication, and finish carpentry projects across the Cleveland region.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page">
      <div className="shell">
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
      </div>
    </div>
  );
}
