import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="shell">
        <h1 className="page-title">Page Not Found</h1>
        <p className="page-subtitle">
          This page may have moved or the URL may be incorrect.
        </p>
        <div className="hero-actions">
          <Link className="btn" href="/">
            Back to Home
          </Link>
          <Link className="btn-outline" href="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
