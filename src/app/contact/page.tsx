import { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { business } from "@/data/business";
import { buildPageMetadata } from "@/lib/seo";

const contactFormEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "https://formspree.io/f/your-form-id";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact and Request an Estimate",
  description:
    "Request a carpentry estimate for built-ins, media walls, cabinets, trim work, and mantels in Athens and nearby areas.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="page">
      <div className="shell">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
        <h1 className="page-title">Request an Estimate</h1>
        <p className="page-subtitle">
          Tell us your project goals, location, and target timeline. Include
          photos and rough dimensions to speed up quoting.
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
              action={contactFormEndpoint}
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
                <input id="service" name="service" placeholder="Built-ins, trim, mantel, etc." required />
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
