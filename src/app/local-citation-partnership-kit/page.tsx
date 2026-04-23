import { Metadata } from "next";
import Link from "next/link";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Local Citation and Partner Outreach Kit",
  description:
    "Operational citation and backlink outreach resources for Timber and Testament, including checklist CSV files and outreach templates.",
  path: "/local-citation-partnership-kit",
});

const citationPlatforms = [
  { name: "Google Business Profile", url: "https://www.google.com/business/", priority: "Highest" },
  { name: "Bing Places", url: "https://www.bingplaces.com/", priority: "High" },
  { name: "Apple Business Connect", url: "https://businessconnect.apple.com/", priority: "High" },
  { name: "Yelp", url: "https://biz.yelp.com/", priority: "High" },
  { name: "BBB", url: "https://www.bbb.org/", priority: "High" },
  { name: "Angi", url: "https://www.angi.com/", priority: "Medium" },
  { name: "Thumbtack", url: "https://www.thumbtack.com/", priority: "Medium" },
  { name: "Nextdoor Business", url: "https://nextdoor.com/business", priority: "Medium" },
];

export default function LocalCitationPartnershipKitPage() {
  return (
    <div className="page">
      <div className="shell">
        <h1 className="page-title">Local Citation And Partner Outreach Kit</h1>
        <p className="page-subtitle">
          Use these assets to keep listing data consistent, track submissions, and run city-service-specific backlink outreach.
        </p>

        <section className="section">
          <div className="card">
            <h2>Official NAP Reference</h2>
            <ul className="list">
              <li>Business Name: Timber &amp; Testament</li>
              <li>Phone: +1-865-200-1604</li>
              <li>Email: timberandtestamentllc@gmail.com</li>
              <li>Website: https://www.timbertestament.com</li>
              <li>Primary Coverage: Chattanooga to Knoxville, Tennessee</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <h2>Priority Citation Platforms</h2>
          <div className="card-grid">
            {citationPlatforms.map((platform) => (
              <article className="card" key={platform.name}>
                <h3>{platform.name}</h3>
                <p>Priority: {platform.priority}</p>
                <a href={platform.url} target="_blank" rel="noreferrer">
                  Open submission page
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Downloadable Outreach Files</h2>
          <div className="card-grid">
            <article className="card">
              <h3>Citation Submission Checklist</h3>
              <p>Track platform status and destination page targeting.</p>
              <a href="/citation-submission-checklist.csv">Download CSV</a>
            </article>
            <article className="card">
              <h3>Backlink Outreach Targets</h3>
              <p>Track local partner categories, status, and link opportunities.</p>
              <a href="/backlink-outreach-targets.csv">Download CSV</a>
            </article>
            <article className="card">
              <h3>City-Service Outreach Map</h3>
              <p>Match outreach contacts with the best local landing page.</p>
              <a href="/city-service-outreach-map.csv">Download CSV</a>
            </article>
            <article className="card">
              <h3>Partner Outreach Email Template</h3>
              <p>Reusable outreach copy for local directories and partners.</p>
              <a href="/partner-outreach-email-template.txt">Download Template</a>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="cta-band">
            <h2>Next Execution Step</h2>
            <p>
              Keep NAP formatting identical in every listing and link each submission to the most relevant service landing page.
            </p>
            <div className="hero-actions">
              <Link className="btn" href="/contact">
                Request Estimate
              </Link>
              <Link className="btn-outline" href="/">
                Back To Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}