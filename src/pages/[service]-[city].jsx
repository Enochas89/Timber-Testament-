import React from "react";

/**
 * Reference React page component for service + city SEO routes.
 * The production static generator uses HTML templates, but this component
 * mirrors the same section structure for future React route integration.
 */
export default function ServiceCityPage({
  title,
  intro,
  serviceContent,
  localContent,
  processSteps = [],
  faqs = [],
  ctaText,
  ctaHref = "/contact/"
}) {
  return (
    <main>
      <section className="page-intro hero hero-service-city">
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>

      <section>
        <h2>Service Overview</h2>
        <p>{serviceContent}</p>
      </section>

      <section>
        <h2>Local Expertise</h2>
        <p>{localContent}</p>
      </section>

      <section>
        <h2>Process</h2>
        <ol>
          {processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <article key={faq.q}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </article>
        ))}
      </section>

      <section className="conversion-block quote-cta">
        <h2>Request a Quote</h2>
        <p>{ctaText}</p>
        <a className="cta-button" href={ctaHref}>
          Contact Timber &amp; Testament
        </a>
      </section>
    </main>
  );
}