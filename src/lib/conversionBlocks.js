const { business, conversion } = require("../config");
const { pickVariant, pickVariants } = require("./utils");

function renderQuoteCta({ key, serviceName, cityName }) {
  const ctaLabel = pickVariant(conversion.ctaVariants, `${key}-cta`);
  return `
    <section class="cta-card conversion-block">
      <h2>${ctaLabel}</h2>
      <p>Need ${serviceName.toLowerCase()} in ${cityName}? Call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a> for a scoped estimate and timeline.</p>
      <a class="cta-button" href="/contact/">Request Pricing</a>
    </section>
  `;
}

function renderClickToCall({ cityName }) {
  return `
    <section class="call-block conversion-block">
      <h2>Talk Directly With a Carpenter</h2>
      <p>Serving ${cityName} and surrounding communities. Get next-step guidance by phone.</p>
      <a class="cta-button" href="tel:${business.phone.replace(/[^+\d]/g, "")}">Call ${business.phone}</a>
    </section>
  `;
}

function renderTrustBlock({ key }) {
  const statements = pickVariants(conversion.trustStatements, `${key}-trust`, 2);
  return `
    <section class="trust-block conversion-block">
      <h2>Why Homeowners Hire ${business.name}</h2>
      <ul>${statements.map((statement) => `<li>${statement}</li>`).join("")}</ul>
    </section>
  `;
}

function renderReviewSnippet({ key }) {
  const snippets = pickVariants(conversion.reviewSnippets, `${key}-review`, 2);
  return `
    <section class="review-panel conversion-block">
      <h2>Recent Customer Feedback</h2>
      ${snippets
        .map(
          (item) =>
            `<blockquote><p>"${item.quote}"</p><cite>${item.author}</cite></blockquote>`
        )
        .join("")}
      <p class="review-note">When leaving a review, mention your service, city, and project type.</p>
      <a class="secondary-button" href="${business.profileUrls.google}" target="_blank" rel="noopener noreferrer">Read or Leave Reviews</a>
    </section>
  `;
}

function renderServiceAreaReassurance() {
  return `
    <section class="service-area-block conversion-block">
      <h2>Service Area Coverage</h2>
      <p>${conversion.serviceAreaReassurance}</p>
      <p><a href="/cities/">Browse all city coverage pages</a>.</p>
    </section>
  `;
}

function renderProjectHighlights(projects = []) {
  const items = projects.length
    ? projects
        .slice(0, 3)
        .map(
          (project) =>
            `<li><a href="/projects/${project.slug}/">${project.title}</a> - ${project.city} ${project.state}</li>`
        )
        .join("")
    : `<li><a href="/projects/">Browse our completed project portfolio</a> for recent built-ins, trim work, and feature carpentry.</li>`;

  return `
    <section class="project-highlight-block conversion-block">
      <h2>Recent Project Highlights</h2>
      <ul>${items}</ul>
    </section>
  `;
}

function renderStickyMobileCta() {
  return `
    <div class="mobile-sticky-cta" data-mobile-cta>
      <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${conversion.stickyMobileCtaLabel}: ${business.phone}</a>
    </div>
  `;
}

module.exports = {
  renderQuoteCta,
  renderClickToCall,
  renderTrustBlock,
  renderReviewSnippet,
  renderServiceAreaReassurance,
  renderProjectHighlights,
  renderStickyMobileCta
};
