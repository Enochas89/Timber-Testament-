import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { carpentryGlossary, carpentryGlossaryTerms } from "@/data/carpentryGlossary";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Carpentry Glossary",
    description:
      "Browse carpentry terms used by licensed and insured master craftsmen, from custom-built cabinetry and trim carpentry to framing, joinery, and woodworking.",
    path: "/carpentry-glossary",
  }),
  keywords: carpentryGlossaryTerms,
};

export default function CarpentryGlossaryPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Carpentry Glossary", path: "/carpentry-glossary" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Carpentry Glossary" },
          ]}
        />

        <h1 className="page-title">Carpentry Glossary</h1>
        <p className="page-subtitle">
          This glossary covers common words homeowners use when planning custom
          carpentry, trim, built-ins, cabinetry, framing, and wood feature projects.
        </p>

        <div className="card-grid">
          {carpentryGlossary.map((category) => (
            <article className="card" key={category.slug}>
              <h2>{category.title}</h2>
              <ul className="list">
                {category.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="section">
          <div className="cta-band">
            <h2>Need Help Defining Your Project Scope?</h2>
            <p>
              If you already know the terms or need help choosing the right approach,
              we can map the best build path for your home.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              <Link className="btn-outline" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
