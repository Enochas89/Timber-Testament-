import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FoundersInsight } from "@/components/FoundersInsight";
import { JsonLd } from "@/components/JsonLd";
import { foundersInsights } from "@/data/foundersInsights";
import { breadcrumbSchema, buildPageMetadata, serviceSchema } from "@/lib/seo";

const trimInsight = foundersInsights["trim-carpentry"];

export const metadata: Metadata = buildPageMetadata({
  title: "Trim Carpentry TN",
  description:
    "Founder-led trim carpentry with 14 years of experience delivering clean lines, profile matching, and durable finish quality for homes in Southeast Tennessee.",
  path: "/services/trim",
});

export default function TrimCarpentryPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Trim Carpentry", path: "/services/trim" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd
          data={serviceSchema("trim-work", undefined, {
            serviceNameOverride: "Trim Carpentry",
            pathOverride: "/services/trim",
            descriptionOverride: trimInsight.schemaSummary,
          })}
        />
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Trim Carpentry" },
          ]}
        />

        <h1 className="page-title">Trim Carpentry</h1>
        <p className="page-subtitle">
          Precision trim carpentry for baseboards, casing, crown, and interior transitions.
        </p>

        <FoundersInsight title={trimInsight.title} paragraph={trimInsight.paragraph}>
          We provide trim carpentry planning and installation support for{" "}
          <Link href="/cities/athens-tn">Athens</Link>,{" "}
          <Link href="/cities/cleveland-tn">Cleveland</Link>, and{" "}
          <Link href="/cities/chattanooga-tn">Chattanooga</Link>.
        </FoundersInsight>

        <section className="section">
          <div className="cta-band">
            <h2>Need a Trim Upgrade Plan?</h2>
            <p>
              Share photos of your current trim profiles and we can scope a clean
              replacement or extension path.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              <Link className="btn-outline" href="/services/trim-work">
                See Trim Work Service Page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
