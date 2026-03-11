const { business } = require("../config");
const {
  cityLabel,
  citySlug,
  serviceSlug,
  stripTags,
  estimateReadingTime,
  pickVariant
} = require("../lib/utils");
const { createServiceCityContentPlan } = require("../lib/contentEngine");
const { faqPageSchema, serviceSchema } = require("../lib/schema");
const {
  renderQuoteCta,
  renderClickToCall,
  renderTrustBlock,
  renderReviewSnippet,
  renderProjectHighlights
} = require("../lib/conversionBlocks");
const { relatedServiceLinks, nearbyCityLinks } = require("../lib/linking");

function renderServiceCityPage({ service, city, allCities, allServices, relatedProjects, route }) {
  const cityName = cityLabel(city);
  const citySlugValue = citySlug(city);
  const serviceSlugValue = serviceSlug(service.name);

  const plan = createServiceCityContentPlan({ service, city });

  const relatedServiceItems = relatedServiceLinks({
    currentService: service,
    city,
    services: allServices,
    max: 8
  });
  const nearbyCityItems = nearbyCityLinks({
    service,
    city,
    cities: allCities,
    max: 8
  });

  const anchorOptions = [
    "Request a quote",
    "Get a scope call",
    "Book consultation",
    "Start planning"
  ];

  const body = `
  <section class="hero hero-service-city">
    <p class="eyebrow">${service.name} in ${cityName}</p>
    <h1>${service.name} in ${cityName}</h1>
    <p>${plan.intro} ${plan.localBlurb}</p>
    <div class="meta-row">
      <span>${estimateReadingTime(1050)}</span>
      <span>${city.county}, ${city.region}</span>
      <a class="cta-button" href="/contact/">${pickVariant(anchorOptions, `${plan.pageKey}-hero-anchor`)}</a>
    </div>
  </section>

  <article class="content-grid">
    <section>
      <h2>Local ${service.name} Built for ${cityName} Homes</h2>
      <p>${business.name} provides ${service.name.toLowerCase()} for homeowners across ${city.serviceAreaWording}. Our team tailors each job to the structure and style of the property, from ${city.housingStyle} to updated remodel layouts. Instead of forcing stock dimensions, we field-measure and design around real walls, ceilings, and traffic flow so the finished work feels like a natural extension of your home.</p>
      <p>Neighborhood patterns matter in ${cityName}. Homes near ${plan.cityMentions.neighborhoods.join(" and ")} can differ from properties around ${plan.cityMentions.landmarks.join(" and ")}. ${city.localNotes}</p>
      <p>Clients choose this service when they need ${plan.serviceSellingPoints.join(", ")}.</p>
      <ul>
        ${plan.serviceUseCases.map((item) => `<li>${service.shortName} use case: ${item}</li>`).join("")}
      </ul>
    </section>

    <section>
      <h2>Homeowner Benefits of ${service.name} in ${cityName}</h2>
      <p>${plan.benefitsOpener} Most homeowners in ${cityName} call us because they need better function and cleaner visual structure. We approach each room as a system so spacing, alignment, and material durability work together.</p>
      <p>With professional ${service.name.toLowerCase()}, you can correct layout friction, improve storage behavior, and create better transitions between finishes while protecting long-term durability.</p>
      <ul>
        ${plan.serviceBenefits.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <p>Many families around ${cityName} also ask us to phase projects room-by-room. That approach allows measurable progress without overextending budget or disrupting the full home at once.</p>
    </section>

    <section>
      <h2>How Our ${service.name} Process Works in ${cityName}</h2>
      <ol>
        <li><strong>Consultation and field verification:</strong> We assess goals, site conditions, and design constraints while measuring for exact fit.</li>
        <li><strong>Scope and build planning:</strong> We align material choices, detailing, and sequence so the project has clear expectations.</li>
        <li><strong>Installation and quality checks:</strong> We install with finish-level standards, then complete punch refinements before closeout.</li>
      </ol>
      <p>Process detail for this service in ${cityName}:</p>
      <ul>
        ${plan.processSteps.map((step) => `<li>${step}</li>`).join("")}
      </ul>
      <p>We also coordinate projects in nearby communities such as ${plan.cityMentions.nearbyCommunities.join(", ")}.</p>
    </section>

    <section>
      <h2>Recent Project Examples Related to ${service.name}</h2>
      <p>Our portfolio across ${business.primaryRegion} includes projects that match homeowner goals similar to those in ${cityName}. Each build balances aesthetics, durability, and day-to-day use.</p>
      <ul>
        ${relatedProjects
          .slice(0, 2)
          .map(
            (project) =>
              `<li><a href="/projects/${project.slug}/">${project.title}</a></li>`
          )
          .join("")}
      </ul>
      <p>If you are comparing options, we recommend reviewing project pages first, then requesting a scoped estimate for your room dimensions and finish preferences.</p>
    </section>

    <section>
      <h2>Frequently Asked Questions: ${service.name} in ${cityName}</h2>
      ${plan.faqItems
        .map(
          (faq) =>
            `<h3>${faq.q}</h3><p>${faq.a}</p>`
        )
        .join("")}
    </section>

    <section>
      <h2>Related Carpentry Pages</h2>
      <div class="link-columns">
        <div>
          <h3>Related Services in ${cityName}</h3>
          <ul>
            ${relatedServiceItems.map((item) => `<li><a href="${item.href}">${item.anchor}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>${service.name} in Nearby Cities</h3>
          <ul>
            ${nearbyCityItems.map((item) => `<li><a href="${item.href}">${item.anchor}</a></li>`).join("")}
          </ul>
        </div>
      </div>
      <p>Browse the service hub at <a href="/services/${serviceSlugValue}/">${service.name}</a> or the city hub at <a href="/cities/${citySlugValue}-carpentry/">${cityName} carpentry services</a>.</p>
    </section>

    ${renderTrustBlock({ key: plan.pageKey })}
    ${renderProjectHighlights(relatedProjects)}
    ${renderClickToCall({ cityName })}
    ${renderReviewSnippet({ key: plan.pageKey })}
    ${renderQuoteCta({ key: plan.pageKey, serviceName: service.name, cityName })}

    <section>
      <h2>Next Step for ${service.name} in ${cityName}</h2>
      <p>${plan.closingSummary}</p>
      <p>Call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a> or <a href="/contact/">submit your project details</a> to receive a clear estimate and scheduling window.</p>
      <p class="small-note">Uniqueness fingerprint: ${plan.uniqueness.fingerprint}</p>
    </section>
  </article>`;

  const wordCount = stripTags(body).split(/\s+/).filter(Boolean).length;

  return {
    content: body,
    wordCount,
    uniquenessFingerprint: plan.uniqueness.fingerprint,
    uniquenessSource: plan.uniqueness.source,
    faqSetKey: `${service.faqPool}:${plan.faqPoolKey}`,
    h1: `${service.name} in ${cityName}`,
    title: `${service.name} in ${cityName} | ${business.name}`,
    description: `${service.name} in ${cityName} with local project examples, installation process, FAQ answers, and quote options from ${business.name}.`,
    extraSchema: [
      faqPageSchema(plan.faqItems),
      serviceSchema({
        serviceName: service.name,
        cityName,
        description: `${business.name} provides ${service.name.toLowerCase()} in ${cityName} with custom planning and finish-level installation.`
      })
    ],
    localTokens: {
      city: city.name,
      service: service.name
    },
    route,
    noindex: false
  };
}

module.exports = {
  renderServiceCityPage
};
