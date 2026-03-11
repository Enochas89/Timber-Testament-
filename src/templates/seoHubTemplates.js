const { business } = require("../config");
const {
  cityHubFaqTemplates,
  serviceHubFaqTemplates,
  anchorTemplates
} = require("../data/seoConfig");
const {
  pickVariant,
  pickVariants,
  stripTags,
  hashString
} = require("../lib/utils");
const { faqPageSchema, serviceSchema } = require("../lib/schema");

function fillTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (_, key) => data[key] || "");
}

function cityLabel(city) {
  return `${city.name} ${city.state}`;
}

function buildAnchor(patternKey, key, values) {
  const patterns = anchorTemplates[patternKey] || ["{service} in {city}"];
  const template = pickVariant(patterns, key);
  return fillTemplate(template, values);
}

function createCityHubFaq(city, pageKey) {
  const picked = pickVariants(cityHubFaqTemplates, `${pageKey}-city-faq`, 3);
  return picked.map((item) => ({
    q: fillTemplate(item.q, {
      city: city.name,
      state: city.state,
      nearbyA: city.nearbyCities[0] || "nearby communities",
      nearbyB: city.nearbyCities[1] || "surrounding areas"
    }),
    a: fillTemplate(item.a, {
      city: city.name,
      state: city.state,
      nearbyA: city.nearbyCities[0] || "nearby communities",
      nearbyB: city.nearbyCities[1] || "surrounding areas"
    })
  }));
}

function createServiceHubFaq(service, pageKey) {
  const picked = pickVariants(serviceHubFaqTemplates, `${pageKey}-service-faq`, 3);
  return picked.map((item) => ({
    q: fillTemplate(item.q, {
      service: service.name.toLowerCase()
    }),
    a: fillTemplate(item.a, {
      service: service.name.toLowerCase()
    })
  }));
}

function renderSeoCityHub({ city, services, allCities, projects = [] }) {
  const pageKey = `city-hub-${city.slug}`;
  const cityName = cityLabel(city);
  const faqItems = createCityHubFaq(city, pageKey);

  const serviceLinks = services
    .map((service) => {
      const href = `/${service.slug}-${city.slug}/`;
      const anchor = buildAnchor("cityToService", `${pageKey}-${service.slug}`, {
        service: service.name.toLowerCase(),
        city: cityName
      });
      return `<li><a href="${href}">${anchor}</a></li>`;
    })
    .join("");

  const nearbyLinks = allCities
    .filter((candidate) => candidate.slug !== city.slug)
    .filter((candidate) => city.nearbyCities.includes(candidate.name))
    .slice(0, 4)
    .map((candidate) => `<li><a href="/${candidate.slug}-carpentry/">Custom carpentry in ${candidate.name} ${candidate.state}</a></li>`)
    .join("");

  const relatedProjects = projects
    .filter(
      (project) =>
        project.city.toLowerCase() === city.name.toLowerCase() && project.state.toLowerCase() === city.state.toLowerCase()
    )
    .slice(0, 3);

  const projectsMarkup = relatedProjects.length
    ? `<ul>${relatedProjects
        .map((project) => `<li><a href="/projects/${project.slug}/">${project.title.replace("Project: ", "")}</a></li>`)
        .join("")}</ul>`
    : `<p><a href="/projects/">Browse recent carpentry projects</a> from Cleveland and surrounding Southeast Tennessee communities.</p>`;

  const introPhrase = city.introPhrases && city.introPhrases.length
    ? pickVariant(city.introPhrases, `${pageKey}-intro-phrase`)
    : `throughout ${city.name}`;

  const emphasisServices = (city.serviceEmphasis || [])
    .map((slug) => services.find((service) => service.slug === slug))
    .filter(Boolean)
    .map((service) => service.name)
    .join(", ");

  const content = `
    <section class="page-intro">
      <p class="eyebrow">City Hub</p>
      <h1>Custom Carpentry in ${city.name}, ${city.state}</h1>
      <p>${business.name} provides custom carpentry ${introPhrase}. We plan and install storage, trim, shelving, and finish details for homes across ${city.county}.</p>
      <p>${city.localNotes[0]} ${city.localNotes[1] || ""}</p>
    </section>

    <section>
      <h2>Services Available in ${cityName}</h2>
      <p>Homeowners in ${city.name} most often ask about ${emphasisServices || "built-ins, cabinetry, shelves, and finish carpentry"}. Select a service below to view city-specific details, process notes, and FAQ guidance.</p>
      <ul>${serviceLinks}</ul>
    </section>

    <section>
      <h2>Local Service Area Notes for ${cityName}</h2>
      <p>We work across ${city.localAreas.join(", ")} and nearby neighborhoods where homes range from established floor plans to newer remodel-ready layouts. Each scope is measured on-site so fit and finish quality remain consistent from first layout through final walkthrough.</p>
      <p>Local landmarks such as ${city.landmarks.join(" and ")} provide a useful reference for our broader service coverage in this area.</p>
    </section>

    <section>
      <h2>Nearby Service Areas</h2>
      <p>If your project is outside ${city.name} city limits, we may still be able to help in nearby communities.</p>
      <ul>${nearbyLinks}</ul>
    </section>

    <section>
      <h2>Related Project Examples</h2>
      ${projectsMarkup}
    </section>

    <section>
      <h2>FAQ: Carpentry in ${cityName}</h2>
      ${faqItems.map((faq) => `<h3>${faq.q}</h3><p>${faq.a}</p>`).join("")}
    </section>

    <section class="conversion-block quote-cta">
      <h2>Request a Quote in ${cityName}</h2>
      <p>Call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a> or <a href="/contact/">share your project scope</a> to plan custom carpentry in ${city.name}.</p>
      <p><a href="/services/">View all services</a> | <a href="/projects/">View project portfolio</a> | <a href="/contact/">Contact Timber & Testament</a></p>
    </section>
  `;

  return {
    h1: `Custom Carpentry in ${city.name}, ${city.state}`,
    title: `Custom Carpentry in ${city.name} ${city.state} | Timber & Testament`,
    description: `${business.name} provides custom carpentry in ${city.name} ${city.state} including built-ins, cabinetry, floating shelves, mantels, finish carpentry, and custom libraries.`,
    content,
    wordCount: stripTags(content).split(/\s+/).filter(Boolean).length,
    uniquenessFingerprint: `hub-city-${hashString(pageKey).toString(16)}`,
    uniquenessSource: `${pageKey}|notes:${city.localNotes.join(" ").slice(0, 140)}`,
    faqSetKey: `city-hub:${city.slug}:${faqItems.map((item) => item.q).join("|")}`,
    localTokens: {
      city: city.name,
      service: "Custom Carpentry"
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Service Areas", url: "/cities" },
      { name: cityName, url: `/${city.slug}-carpentry` }
    ],
    extraSchema: [
      faqPageSchema(faqItems),
      serviceSchema({
        serviceName: "Custom Carpentry",
        cityName,
        description: `${business.name} offers custom carpentry services in ${cityName}.`
      })
    ]
  };
}

function renderSeoServiceHub({ service, cities, services, projects = [] }) {
  const pageKey = `service-hub-${service.slug}`;
  const faqItems = createServiceHubFaq(service, pageKey);

  const cityLinks = cities
    .map((city) => {
      const cityName = cityLabel(city);
      const href = `/${service.slug}-${city.slug}/`;
      const anchor = buildAnchor("serviceToCity", `${pageKey}-${city.slug}`, {
        service: service.name.toLowerCase(),
        city: cityName
      });
      return `<li><a href="${href}">${anchor}</a></li>`;
    })
    .join("");

  const relatedServiceLinks = (service.relatedServices || [])
    .map((slug) => services.find((candidate) => candidate.slug === slug))
    .filter(Boolean)
    .map((related) => {
      const anchor = buildAnchor("relatedService", `${pageKey}-${related.slug}`, {
        service: related.name.toLowerCase(),
        city: "Southeast Tennessee"
      });
      return `<li><a href="/services/${related.slug}/">${anchor}</a></li>`;
    })
    .join("");

  const serviceProjects = projects
    .filter((project) => project.service.toLowerCase().includes(service.name.toLowerCase()))
    .slice(0, 3);

  const projectMarkup = serviceProjects.length
    ? `<ul>${serviceProjects
        .map((project) => `<li><a href="/projects/${project.slug}/">${project.title.replace("Project: ", "")}</a></li>`)
        .join("")}</ul>`
    : `<p><a href="/projects/">Browse project examples</a> related to ${service.name.toLowerCase()} and finish carpentry upgrades.</p>`;

  const content = `
    <section class="page-intro">
      <p class="eyebrow">Service Hub</p>
      <h1>${service.name} by Timber & Testament</h1>
      <p>${service.shortDescription} ${service.longDescription}</p>
    </section>

    <section>
      <h2>Where ${service.name} Adds Value</h2>
      <p>${service.name} is commonly used in ${service.roomTypes.join(", ")} where homeowners need better function and stronger finish quality.</p>
      <ul>
        ${service.commonUseCases.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section>
      <h2>Benefits and Materials</h2>
      <p>Key benefits include ${service.benefits.join(", ")}. Material selection often includes ${service.materials.join(", ")} based on wear expectations and visual goals.</p>
      <p>Typical process sequence: ${service.processNotes.join(", ")}.</p>
    </section>

    <section>
      <h2>${service.name} by City</h2>
      <p>Select your city page for local project context, FAQ guidance, and direct quote options.</p>
      <ul>${cityLinks}</ul>
    </section>

    <section>
      <h2>Related Services</h2>
      <ul>${relatedServiceLinks}</ul>
    </section>

    <section>
      <h2>Related Project Examples</h2>
      ${projectMarkup}
    </section>

    <section>
      <h2>FAQ: ${service.name}</h2>
      ${faqItems.map((faq) => `<h3>${faq.q}</h3><p>${faq.a}</p>`).join("")}
    </section>

    <section class="conversion-block quote-cta">
      <h2>Plan Your ${service.name} Project</h2>
      <p>Call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a> or <a href="/contact/">request a scoped estimate</a> for ${service.name.toLowerCase()} across Southeast Tennessee.</p>
      <p><a href="/projects/">View project portfolio</a> | <a href="/cities/">Browse service areas</a> | <a href="/contact/">Contact Timber & Testament</a></p>
    </section>
  `;

  return {
    h1: `${service.name} by Timber & Testament`,
    title: `${service.name} Services | Timber & Testament`,
    description: `${business.name} provides ${service.name.toLowerCase()} across Cleveland and surrounding Southeast Tennessee communities with custom planning and installation.`,
    content,
    wordCount: stripTags(content).split(/\s+/).filter(Boolean).length,
    uniquenessFingerprint: `hub-service-${hashString(pageKey).toString(16)}`,
    uniquenessSource: `${pageKey}|materials:${service.materials.join(",")}`,
    faqSetKey: `service-hub:${service.slug}:${faqItems.map((item) => item.q).join("|")}`,
    localTokens: {
      city: "Cleveland",
      service: service.name
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.name, url: `/services/${service.slug}` }
    ],
    extraSchema: [
      faqPageSchema(faqItems),
      serviceSchema({
        serviceName: service.name,
        cityName: "Southeast Tennessee",
        description: `${business.name} offers ${service.name.toLowerCase()} throughout the Southeast Tennessee service area.`
      })
    ]
  };
}

module.exports = {
  renderSeoCityHub,
  renderSeoServiceHub
};