const { business } = require("../config");
const {
  introTemplates,
  serviceExplanationTemplates,
  localParagraphTemplates,
  processTemplates,
  ctaTemplates,
  faqTemplates,
  anchorTemplates
} = require("../data/seoConfig");
const {
  pickVariant,
  pickVariants,
  hashString,
  stripTags
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

function normalizeServicePhrase(serviceName) {
  return serviceName.toLowerCase();
}

function buildSeedFaq(service, city, pageKey) {
  const seedTemplates = {
    cost: {
      q: `How is ${normalizeServicePhrase(service.name)} pricing determined in ${city.name} ${city.state}?`,
      a: `Pricing is based on measurements, material selections, finish level, and installation complexity. We provide a detailed estimate after a site review.`
    },
    timeline: {
      q: `What is a typical timeline for ${normalizeServicePhrase(service.name)} in ${city.name}?`,
      a: `Most projects move through consultation, planning, fabrication, and installation stages. Exact timing depends on scope complexity and current scheduling windows.`
    },
    materials: {
      q: `What materials are recommended for ${normalizeServicePhrase(service.name)} in Southeast Tennessee homes?`,
      a: `We recommend materials based on wear expectations, style goals, and room conditions. For many projects, hardwoods and durable finish systems provide the best long-term value.`
    },
    design: {
      q: `Do you provide design guidance before building ${normalizeServicePhrase(service.name)}?`,
      a: `Yes. We guide dimensions, profile details, and finish options before fabrication so the project fits both the room and daily function.`
    },
    hardware: {
      q: `Can hardware and accessories be customized for ${normalizeServicePhrase(service.name)}?`,
      a: `Yes. We can recommend hardware and configuration options that support durability, storage function, and overall room design goals.`
    },
    "paint vs stain": {
      q: `Should ${normalizeServicePhrase(service.name)} be painted or stained?`,
      a: `That choice depends on wood species, style goals, and maintenance preferences. We review both options during scope planning.`
    },
    "trim profile matching": {
      q: `Can you match existing trim profiles with this service?`,
      a: `In many cases, yes. We capture profile dimensions and alignment details on-site before fabrication and installation.`
    },
    "installation duration": {
      q: `How long does on-site installation usually take?`,
      a: `On-site installation duration depends on scope size and finish requirements, but we provide clear scheduling windows before work begins.`
    },
    "new build vs remodel": {
      q: `Do you provide this service for remodels and new construction?`,
      a: `Yes. We work in both remodel and new-build environments, adapting scope planning to project sequencing and access conditions.`
    },
    finishing: {
      q: `How do you handle final finish and detail work?`,
      a: `We complete fit checks, detail refinements, and finish-ready prep so the final result is consistent and durable.`
    },
    "library layout": {
      q: `Can you help plan an efficient library layout?`,
      a: `Yes. We can plan shelf zones, cabinet placement, and visual balance to support both storage function and architectural consistency.`
    }
  };

  const seeds = Array.isArray(service.faqSeeds) && service.faqSeeds.length ? service.faqSeeds : ["cost", "timeline"];
  const selectedSeed = pickVariant(seeds, `${pageKey}-faq-seed`);
  return seedTemplates[selectedSeed] || seedTemplates.cost;
}

function createFaqItems(service, city, pageKey) {
  const genericFaq = pickVariants(faqTemplates, `${pageKey}-faq-generic`, 3).map((item) => ({
    q: fillTemplate(item.q, {
      service: normalizeServicePhrase(service.name),
      city: city.name,
      state: city.state,
      county: city.county
    }),
    a: fillTemplate(item.a, {
      service: normalizeServicePhrase(service.name),
      city: city.name,
      state: city.state,
      county: city.county
    })
  }));

  const seedFaq = buildSeedFaq(service, city, pageKey);
  return [seedFaq, ...genericFaq].slice(0, 4);
}

function createNearbyLinks(service, city, allCities, pageKey) {
  return allCities
    .filter((candidate) => candidate.slug !== city.slug)
    .filter((candidate) => city.nearbyCities.includes(candidate.name))
    .slice(0, 4)
    .map((candidate) => ({
      href: `/${service.slug}-${candidate.slug}/`,
      label: buildAnchor("serviceToCity", `${pageKey}-${candidate.slug}`, {
        service: normalizeServicePhrase(service.name),
        city: cityLabel(candidate)
      })
    }));
}

function createRelatedServiceLinks(service, city, allServices, pageKey) {
  const ordered = (service.relatedServices || [])
    .map((slug) => allServices.find((candidate) => candidate.slug === slug))
    .filter(Boolean);

  const fallback = allServices.filter((candidate) => candidate.slug !== service.slug);
  const source = ordered.length ? ordered : fallback;

  return source
    .filter((candidate) => candidate.slug !== service.slug)
    .slice(0, 4)
    .map((candidate) => ({
      href: `/${candidate.slug}-${city.slug}/`,
      hubHref: `/services/${candidate.slug}/`,
      label: buildAnchor("cityToService", `${pageKey}-${candidate.slug}`, {
        service: normalizeServicePhrase(candidate.name),
        city: cityLabel(city)
      })
    }));
}

function buildServiceExplain(service, city, pageKey) {
  return fillTemplate(pickVariant(serviceExplanationTemplates, `${pageKey}-service-explain`), {
    serviceLong: service.longDescription,
    city: city.name,
    useCaseA: service.commonUseCases[0] || "storage upgrades",
    useCaseB: service.commonUseCases[1] || "finish improvements",
    roomTypeA: service.roomTypes[0] || "living spaces",
    roomTypeB: service.roomTypes[1] || "home offices"
  });
}

function renderServiceCityTemplate({ service, city, allServices, allCities, relatedProjects = [] }) {
  const pageKey = `${service.slug}-${city.slug}`;
  const cityName = cityLabel(city);
  const serviceNameLower = normalizeServicePhrase(service.name);

  const intro = fillTemplate(pickVariant(introTemplates, `${pageKey}-intro`), {
    service: serviceNameLower,
    city: city.name,
    cityIntro: pickVariant(city.introPhrases || [`in ${city.name}`], `${pageKey}-city-intro`)
  });

  const localA = fillTemplate(pickVariant(localParagraphTemplates, `${pageKey}-local-a`), {
    service: serviceNameLower,
    city: city.name
  });
  const localB = fillTemplate(pickVariant(localParagraphTemplates, `${pageKey}-local-b`, 1), {
    service: serviceNameLower,
    city: city.name
  });

  const ctaCopy = fillTemplate(pickVariant(ctaTemplates, `${pageKey}-cta`), {
    service: serviceNameLower,
    city: city.name
  });

  const processLines = pickVariants(processTemplates, `${pageKey}-process`, 4);
  const faqItems = createFaqItems(service, city, pageKey);
  const nearbyLinks = createNearbyLinks(service, city, allCities, pageKey);
  const relatedServiceLinks = createRelatedServiceLinks(service, city, allServices, pageKey);
  const projectList = relatedProjects.slice(0, 3);
  const serviceExplain = buildServiceExplain(service, city, pageKey);

  const contentTop = `
    <section class="page-intro hero hero-service-city">
      <p class="eyebrow">${service.name} in ${cityName}</p>
      <h1>${service.name} in ${cityName}: Local Homeowner Guide</h1>
      <p>${intro}</p>
      <p>${serviceExplain}</p>
    </section>

    <section>
      <h2>Why Homeowners Choose ${service.name} in ${cityName}</h2>
      <p>${service.shortDescription} In ${city.name}, this service is often selected for ${service.commonUseCases.slice(0, 2).join(" and ")} where off-the-shelf options do not use the space efficiently.</p>
      <p>${localA} ${city.localNotes[0] || ""}</p>
      <p>${localB} ${city.localNotes[1] || ""}</p>
    </section>

    <section>
      <h2>Benefits, Materials, and Room Fit</h2>
      <p>Key benefits homeowners mention most are ${service.benefits.join(", ")}. Typical room fit includes ${service.roomTypes.join(", ")}, with scope adjusted around traffic flow and existing architecture.</p>
      <ul>
        ${service.materials.map((item) => `<li>Material option: ${item}</li>`).join("")}
      </ul>
      <p>In ${city.name}, projects are commonly planned around local neighborhood styles including ${city.localAreas.join(", ")} and surrounding areas near ${city.landmarks.join(" and ")}.</p>
    </section>

    <section>
      <h2>Our ${service.name} Process in ${cityName}</h2>
      <ol>
        <li><strong>Consultation:</strong> ${processLines[0]}</li>
        <li><strong>Scope and Design Alignment:</strong> ${processLines[1]}</li>
        <li><strong>Fabrication:</strong> ${processLines[2]}</li>
        <li><strong>Installation:</strong> ${processLines[3]}</li>
      </ol>
      <p>Service-specific notes for ${service.name.toLowerCase()}: ${service.processNotes.join(", ")}.</p>
    </section>

    <section>
      <h2>Related Projects and Examples</h2>
      <p>Reviewing completed work helps clarify layout expectations, material direction, and timeline planning before final scope decisions.</p>
      <ul>
        ${projectList.length
          ? projectList
              .map((project) => `<li><a href="/projects/${project.slug}/">${project.title.replace("Project: ", "")}</a></li>`)
              .join("")
          : '<li><a href="/projects/">Browse recent carpentry projects</a></li>'}
      </ul>
    </section>

    <section>
      <h2>FAQ: ${service.name} in ${cityName}</h2>
      ${faqItems.map((faq) => `<h3>${faq.q}</h3><p>${faq.a}</p>`).join("")}
    </section>

    <section>
      <h2>Related Pages and Next Steps</h2>
      <ul>
        <li><a href="/services/${service.slug}/">Parent service hub: ${service.name}</a></li>
        <li><a href="/${city.slug}-carpentry/">Parent city hub: ${cityName} carpentry</a></li>
        <li><a href="/projects/">View project portfolio</a></li>
        <li><a href="/contact/">Request a quote</a></li>
      </ul>

      <h3>Related Services in ${cityName}</h3>
      <ul>
        ${relatedServiceLinks.map((item) => `<li><a href="${item.href}">${item.label}</a> (<a href="${item.hubHref}">service hub</a>)</li>`).join("")}
      </ul>

      <h3>${service.name} in Nearby Cities</h3>
      <ul>
        ${nearbyLinks.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
      </ul>
    </section>

    <section class="conversion-block quote-cta">
      <h2>Get a Quote for ${service.name} in ${cityName}</h2>
      <p>${ctaCopy}. Call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a> or <a href="/contact/">send project details online</a> for scope and scheduling guidance.</p>
      <p><strong>Email:</strong> <a href="mailto:${business.email}">${business.email}</a> | <strong>Service area:</strong> Cleveland TN and surrounding Southeast Tennessee communities.</p>
    </section>
  `;

  let content = contentTop;
  let wordCount = stripTags(content).split(/\s+/).filter(Boolean).length;

  if (wordCount < 800) {
    content += `
      <section>
        <h2>Planning Notes for ${service.name} in ${cityName}</h2>
        <p>Before installation, we recommend confirming must-have functions, preferred material direction, and timeline priorities. This keeps scope clear and helps avoid redesign during fabrication.</p>
        <p>For homes in ${city.name}, we can phase multi-room work and keep each stage aligned with consistent finish standards.</p>
      </section>
    `;
    wordCount = stripTags(content).split(/\s+/).filter(Boolean).length;
  }

  const title = `${service.name} in ${city.name} ${city.state} | Timber & Testament`;
  const description = `${business.name} provides ${serviceNameLower} in ${city.name} ${city.state} with custom planning, installation details, FAQ guidance, and quote options.`;
  const fingerprint = `seo-${hashString(`${pageKey}-${title}-${faqItems[0].q}`).toString(16)}`;
  const route = `/${service.slug}-${city.slug}`;

  return {
    h1: `${service.name} in ${cityName}: Local Homeowner Guide`,
    title,
    description,
    content,
    wordCount,
    uniquenessFingerprint: fingerprint,
    uniquenessSource: `${pageKey}|intro:${intro.slice(0, 90)}|explain:${serviceExplain.slice(0, 90)}|faq:${faqItems
      .map((item) => item.q)
      .join(";")}`,
    faqSetKey: `seo:${service.slug}:${city.slug}:${faqItems.map((item) => item.q).join("|")}`,
    localTokens: {
      city: city.name,
      service: service.name
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.name, url: `/services/${service.slug}` },
      { name: cityName, url: route }
    ],
    extraSchema: [
      faqPageSchema(faqItems),
      serviceSchema({
        serviceName: service.name,
        cityName,
        description: `${business.name} offers ${serviceNameLower} services in ${cityName}.`
      })
    ]
  };
}

module.exports = {
  renderServiceCityTemplate
};