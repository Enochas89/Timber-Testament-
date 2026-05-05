import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FoundersInsight } from "@/components/FoundersInsight";
import { JsonLd } from "@/components/JsonLd";
import { foundersInsights } from "@/data/foundersInsights";
import { breadcrumbSchema, buildPageMetadata, serviceSchema } from "@/lib/seo";

const woodworkingInsight = foundersInsights.woodworking;

export const metadata: Metadata = buildPageMetadata({
  title: "Custom Woodworking TN",
  description:
    "Founder-led custom woodworking with 14 years of residential experience, focused on structural planning, material behavior, and handcrafted finish execution.",
  path: "/services/custom-woodworking",
});

export default function CustomWoodworkingPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Custom Woodworking", path: "/services/custom-woodworking" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd
          data={serviceSchema("wood-feature-installations", undefined, {
            serviceNameOverride: "Custom Woodworking",
            pathOverride: "/services/custom-woodworking",
            descriptionOverride: woodworkingInsight.schemaSummary,
          })}
        />
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Custom Woodworking" },
          ]}
        />

        <h1 className="page-title">Custom Woodworking</h1>
        <p className="page-subtitle">
          Built-to-fit woodworking services designed for long-term use, visual balance, and
          clean finish integration.
        </p>

        <FoundersInsight
          title={woodworkingInsight.title}
          paragraph={woodworkingInsight.paragraph}
        >
          Homeowners in <Link href="/cities/athens-tn">Athens</Link>,{" "}
          <Link href="/cities/cleveland-tn">Cleveland</Link>, and{" "}
          <Link href="/cities/chattanooga-tn">Chattanooga</Link> use this service for
          room-specific woodworking that performs daily.
        </FoundersInsight>

        <section className="section">
          <div className="cta-band">
            <h2>Planning a Custom Woodworking Project?</h2>
            <p>
              Send dimensions and room photos and we can map options for material,
              joinery, and final finish.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              <Link className="btn-outline" href="/services/wood-feature-installations">
                See Wood Feature Installations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
