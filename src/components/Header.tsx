import Link from "next/link";

import { business } from "@/data/business";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/cities", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="service-alert">
        <div className="shell service-alert-inner">
          <span>24/7 emergency repair requests, handyman work, and carpentry from Chattanooga to Knoxville</span>
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
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/emergency-home-repair-chattanooga-to-knoxville" className="header-cta">
          24/7 Emergency Help
        </Link>
      </div>
    </header>
  );
}
