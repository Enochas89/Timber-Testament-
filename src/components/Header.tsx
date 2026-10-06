import Link from "next/link";

import { business } from "@/data/business";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/cities", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  // Client portal (project status, contracts, deliveries), served from the company server via a rewrite in next.config.ts.
  { href: "https://portal.timbertestament.com", label: "Client Login", external: true },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="service-alert">
        <div className="shell service-alert-inner">
          <span>Repair requests, handyman work, and carpentry from Chattanooga to Knoxville</span>
          <a href={`tel:${business.primaryPhoneRaw}`}>Call {business.primaryPhoneDisplay}</a>
        </div>
      </div>
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Timber and Testament home">
          Timber &amp; Testament
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? <a href={item.href}>{item.label}</a> : <Link href={item.href}>{item.label}</Link>}
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="header-cta">
          Request an Estimate
        </Link>
      </div>
    </header>
  );
}
