import Link from "next/link";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/cities", label: "Service Areas" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Timber Testament home">
          Timber Testament
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
        <Link href="/contact" className="header-cta">
          Request Estimate
        </Link>
      </div>
    </header>
  );
}
