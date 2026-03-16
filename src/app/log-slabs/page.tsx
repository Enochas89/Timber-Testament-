import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FoundersInsight } from "@/components/FoundersInsight";
import { JsonLd } from "@/components/JsonLd";
import { foundersInsights } from "@/data/foundersInsights";
import { breadcrumbSchema, buildPageMetadata, serviceSchema } from "@/lib/seo";

const customWoodworkInsight = foundersInsights["custom-woodwork"];

export const metadata: Metadata = buildPageMetadata({
  title: "Log Slab Custom Woodwork in Southeast Tennessee",
  description:
    "Custom woodwork and log slab fabrication guided by 14 years of founder experience, built for architectural fit, durability, and handcrafted finish quality.",
  path: "/log-slabs",
});

export default function LogSlabsPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Log Slabs", path: "/log-slabs" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd
          data={serviceSchema("wood-feature-installations", undefined, {
            serviceNameOverride: "Log Slab Custom Woodwork",
            pathOverride: "/log-slabs",
            descriptionOverride: customWoodworkInsight.schemaSummary,
          })}
        />
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Log Slabs" },
          ]}
        />

        <h1 className="page-title">Log Slab Custom Woodwork</h1>
        <p className="page-subtitle">
          Custom slab builds, wood feature details, and handcrafted installations tailored to
          your room architecture.
        </p>

        <FoundersInsight
          title={customWoodworkInsight.title}
          paragraph={customWoodworkInsight.paragraph}
        >
          We scope log slab and custom woodwork projects for{" "}
          <Link href="/cities/athens-tn">Athens</Link>,{" "}
          <Link href="/cities/cleveland-tn">Cleveland</Link>, and{" "}
          <Link href="/cities/chattanooga-tn">Chattanooga</Link>.
        </FoundersInsight>

        <section className="section">
          <div className="cta-band">
            <h2>Need a Log Slab Build Path?</h2>
            <p>
              Share your slab dimensions, species preferences, and intended use so we can
              plan a stable, finish-ready build.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              <Link className="btn-outline" href="/services/custom-woodworking">
                Explore Custom Woodworking
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
