import Image from "next/image";
import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GeneralContactForm } from "@/components/GeneralContactForm";
import { IssueIntakeForm } from "@/components/IssueIntakeForm";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact for 24/7 Emergency Repair",
  description:
    "Call or request help for 24/7 emergency home repair, leaks, plumbing fixture issues, electrical fixture problems, drywall, doors, and handyman work.",
  path: "/contact",
  keywords: repairSeoKeywords,
});

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="page">
      <div className="shell">
        <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
        <h1 className="page-title">Request Emergency Repair Help or an Estimate</h1>
        <p className="page-subtitle">
          Tell us whether this is urgent, your repair list, project location,
          and target timeline. Include photos and rough dimensions to speed up
          quoting.
        </p>

        <div className="cols-2">
          <article className="card">
            <h2>Contact Details</h2>
            <p>
              <strong>24/7 Emergency Requests:</strong> Call for urgent leaks,
              plumbing fixture problems, electrical fixture concerns, storm
              damage, damaged doors or windows, drywall damage, and home safety
              repairs.
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${business.primaryPhoneRaw}`}>{business.primaryPhoneDisplay}</a>
              {business.email ? (
                <>
                  <br />
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </>
              ) : null}
            </p>
            <p>
              <strong>Service Areas:</strong> {business.serviceArea.join(", ")}
            </p>
            <figure className="contact-support-figure">
              <Image
                src="/images/contact/leaks.png"
                alt="Emergency repair services including leaks, electrical fixtures, doors, windows, cabinets, drywall, and more"
                width={691}
                height={549}
                sizes="(max-width: 920px) 100vw, 430px"
                priority
              />
            </figure>
          </article>

          <article className="card" id="emergency-details">
            <h2>Photo Repair Request Form</h2>
            <p>
              Use your phone to take photos of the issue, describe what is
              happening, and submit the request directly to our email.
            </p>
            <IssueIntakeForm serviceAreas={business.serviceArea} />
          </article>
        </div>

        <section className="section" id="general-request">
          <div className="card">
            <h2>Regular Contact Form</h2>
            <p>
              For non-emergency projects, planned carpentry, built-ins, trim,
              cabinets, maintenance, and repair lists, send the details here.
              Photos are optional for regular requests; if you need to include
              photos, use the emergency/photo form above.
            </p>
            <GeneralContactForm serviceAreas={business.serviceArea} />
          </div>
        </section>

        <section className="section">
          <div className="card">
            <h2>What to Include With Your Request</h2>
            <p>
              Helpful details include the project address or city, a few photos,
              rough dimensions, the service you need, and whether the work is a
              24/7 emergency request. For repair lists, group related items
              together so we can understand the full scope before scheduling.
            </p>
            <p>
              We quote emergency home repair requests, leak repair help,
              plumbing fixture issues, electrical fixture concerns, drywall
              repair, door repair, window repair, cabinet installation, trim
              work, built-ins, mantels, shelves, property maintenance, and small
              upgrade projects.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
