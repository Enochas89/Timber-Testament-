import Link from "next/link";

import { business } from "@/data/business";

const footerCollageImages = [
  "/images/backgrounds/background-1.jpg",
  "/images/backgrounds/background-2.jpg",
  "/images/backgrounds/background-3.jpg",
  "/images/backgrounds/background-4.jpg",
  "/images/backgrounds/background-5.jpg",
  "/images/backgrounds/background-6.jpg",
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-collage" aria-hidden="true">
        {footerCollageImages.map((src) => (
          <span key={src} className="footer-collage-tile" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <div className="shell footer-grid">
        <div>
          <h2>{business.name}</h2>
          <p>{business.tagline}</p>
          <p>
            <a href={`tel:${business.primaryPhoneRaw}`}>{business.primaryPhoneDisplay}</a>
            {business.email ? (
              <>
                <br />
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </>
            ) : null}
          </p>
        </div>
        <div>
          <h3>Areas We Serve</h3>
          <ul>
            {business.serviceArea.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/cities">Service Areas</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell footer-meta">
        <small>
          2025 {business.name}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
