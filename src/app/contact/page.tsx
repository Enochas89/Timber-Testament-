import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { repairSeoKeywords } from "@/data/seoKeywords";
import { breadcrumbSchema, buildPageMetadata } from "@/lib/seo";

const contactFormEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

export const metadata: Metadata = buildPageMetadata({
  title: "Contact and Request an Estimate",
  description:
    "Request a quote for home repair services, handyman work, drywall repair, door repair, cabinet installation, property maintenance, trim, and built-ins.",
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
        <h1 className="page-title">Request an Estimate</h1>
        <p className="page-subtitle">
          Tell us your repair list, project location, and target timeline.
          Include photos and rough dimensions to speed up quoting.
        </p>

        <div className="cols-2">
          <article className="card">
            <h2>Contact Details</h2>
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
          </article>

          <article className="card">
            <h2>Project Intake Form</h2>
            <form
              className="lead-form"
              method="post"
              action={contactFormEndpoint ?? undefined}
              data-track-form="contact_estimate_request"
            >
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" required />
              </div>
              <div>
                <label htmlFor="city">Project City</label>
                <select id="city" name="city" required>
                  <option value="">Select city</option>
                  {business.serviceArea.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="service">Service Needed</label>
                <input
                  id="service"
                  name="service"
                  placeholder="Drywall repair, door repair, cabinet installation, handyman work, etc."
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Project Details</label>
                <textarea id="message" name="message" rows={5} required />
              </div>
              <button className="btn" type="submit">
                Submit Request
              </button>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}
