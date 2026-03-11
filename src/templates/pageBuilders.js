const { business } = require("../config");
const { cityLabel, citySlug, serviceSlug, slugify, pickVariant } = require("../lib/utils");
const {
  renderQuoteCta,
  renderClickToCall,
  renderTrustBlock,
  renderReviewSnippet,
  renderServiceAreaReassurance,
  renderProjectHighlights
} = require("../lib/conversionBlocks");
const { cityHubServiceLinks, buildAnchor } = require("../lib/linking");
const { imageObjectSchema, serviceSchema } = require("../lib/schema");

function renderHomePage({ services, cities, projects }) {
  const byServiceName = (name) => services.find((service) => service.name === name);
  const byCityName = (name) => cities.find((city) => city.name === name);
  const cleveland = byCityName("Cleveland") || cities[0];
  const athens = byCityName("Athens") || cities[1] || cities[0];
  const chattanooga = byCityName("Chattanooga") || cities[2] || cities[0];
  const ooltewah = byCityName("Ooltewah") || cities[3] || cities[0];

  const darkCollectionLinks = [
    { service: byServiceName("Custom Built-Ins"), city: cleveland },
    { service: byServiceName("Floating Shelves"), city: athens },
    { service: byServiceName("Mantels"), city: chattanooga },
    { service: byServiceName("Trim Carpentry"), city: ooltewah },
    { service: byServiceName("Crown Molding"), city: chattanooga },
    { service: byServiceName("Custom Cabinets"), city: cleveland }
  ]
    .filter((item) => item.service && item.city)
    .map((item) => ({
      href: `/services/${serviceSlug(item.service.name)}-${citySlug(item.city)}/`,
      label: `${item.service.name} in ${cityLabel(item.city)}`
    }));

  const serviceTiles = [
    byServiceName("Custom Built-Ins"),
    byServiceName("Custom Cabinets"),
    byServiceName("Mantels"),
    byServiceName("Trim Carpentry"),
    byServiceName("Crown Molding"),
    byServiceName("Accent Walls")
  ]
    .filter(Boolean)
    .map(
      (service) => `
      <article class="home-service-card reveal">
        <h3>${service.name}</h3>
        <p>${service.heroFocus}. Popular uses include ${service.commonUseCases.slice(0, 2).join(" and ")}.</p>
        <a href="/services/${serviceSlug(service.name)}/">View ${service.name} pages</a>
      </article>`
    )
    .join("");

  const archiveCards = projects
    .slice(0, 3)
    .map(
      (project, idx) => `
      <article class="home-archive-card reveal" style="transition-delay: ${idx * 120}ms;">
        <a href="/projects/${project.slug}/" class="home-archive-image-wrap">
          <img
            src="/assets/images/${project.images[0]}"
            alt="${project.service} project in ${project.city} ${project.state}"
            loading="lazy"
            width="900"
            height="1100"
            decoding="async"
          >
        </a>
        <div class="home-archive-copy">
          <h3><a href="/projects/${project.slug}/">${project.title.replace("Project: ", "")}</a></h3>
          <p class="home-archive-id">ID: #DRK-88${20 + idx} / ${project.city.toUpperCase()}, ${project.state}</p>
        </div>
      </article>`
    )
    .join("");

  return {
    h1: "Custom Carpentry in Cleveland TN and Southeast Tennessee",
    title: `${business.name} | Cleveland TN Custom Carpentry`,
    description:
      "Custom carpentry, built-ins, trim work, and interior wood features in Cleveland TN and surrounding Southeast Tennessee cities.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <div class="home-main">
        <section class="home-status-bar">
          <div>
            <span>STATUS: STAINING DARK WALNUT LATTICE [02/03]</span>
            <span class="home-status-sub">Custom Carpentry in Cleveland, TN</span>
          </div>
        </section>

        <section class="home-hero reveal active">
          <div class="home-hero-inner">
            <p class="home-chip">MASTER ARCHIVE SERIES</p>
            <h1>Custom Carpentry, Built-Ins & Cabinetry in Cleveland, Tennessee</h1>
            <p class="home-hero-copy">
              Darker by design. ${business.name} builds custom libraries, built-ins, cabinetry, shelving, mantels, and fine interior woodwork for homes across Cleveland, TN and surrounding Southeast Tennessee communities.
            </p>
            <div class="home-hero-actions">
              <a href="/projects/">View The Dark Collection</a>
              <a href="/contact/">Submit Specs</a>
            </div>
          </div>
        </section>

        <section class="home-intro reveal">
          <h2>Fine Interior Woodwork, Built For Presence</h2>
          <p>
            Timber & Testament Custom Carpentry designs and builds custom libraries, built-in shelving, cabinetry, fireplace surrounds, mantels, accent walls, and finish carpentry features tailored to each home.
            We serve Cleveland, Tennessee, along with nearby communities throughout Southeast Tennessee.
          </p>
          <p>
            Planning a dark walnut library wall, a custom entertainment unit, floating shelves, or detailed interior trim work?
            Explore our city-level money pages below for pricing context, process details, and local project examples.
          </p>
          <ul class="home-money-links">
            ${darkCollectionLinks.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
          </ul>
        </section>

        <section class="home-specialties reveal">
          <div class="home-split">
            <div class="home-split-image">
              <img
                src="/assets/images/${projects[0] ? projects[0].images[0] : "custom-built-ins-cleveland-tn.jpg"}"
                alt="Custom dark walnut library cabinetry with integrated lattice storage in Cleveland Tennessee"
                loading="lazy"
                width="1200"
                height="900"
                decoding="async"
              >
            </div>
            <div class="home-split-copy">
              <p class="home-spec">SPEC 01 / INSERTS</p>
              <h3>Diamond Lattice Wine Systems</h3>
              <p>Hand-cut lattices in deep-stained walnut for floor-to-ceiling libraries, bars, and custom cabinetry installs.</p>
              <div class="home-stat-grid">
                <article><strong>Precision</strong><span>Dado-locked joints for long-term structural integrity.</span></article>
                <article><strong>Finish</strong><span>Multi-stage dark oil hand-rubbed for a satin glow.</span></article>
              </div>
            </div>
          </div>

          <div class="home-split home-split-reverse">
            <div class="home-split-image">
              <img
                src="/assets/images/${projects[2] ? projects[2].images[0] : "mantel-installation-chattanooga-tn.jpg"}"
                alt="Custom rolling library ladder with dark metal track and fine wood shelving"
                loading="lazy"
                width="1200"
                height="900"
                decoding="async"
              >
            </div>
            <div class="home-split-copy">
              <p class="home-spec">SPEC 02 / ACCESS</p>
              <h3>Rolling Library Ladder Tracks</h3>
              <p>Custom-forged dark steel or brass rail systems designed for grand-scale libraries and built-in wall units.</p>
              <div class="home-ladder-rail"></div>
              <div class="home-metric-row">
                <article><strong>0.0\" Tol.</strong><span>Zero-Squeak Glide</span></article>
                <article><strong>14ft</strong><span>Max Vertical Span</span></article>
              </div>
            </div>
          </div>
        </section>

        <section class="home-services reveal">
          <h2>Core Services</h2>
          <p>
            Our work spans custom libraries, built-ins, fireplace walls, mantels, cabinetry, shelving, and detailed finish carpentry for homeowners seeking bold architectural interior statements.
          </p>
          <div class="home-services-grid">${serviceTiles}</div>
        </section>

        <section class="home-archive reveal">
          <div class="home-archive-head">
            <div>
              <h2>The Dark Archive</h2>
              <p>Selected commissions across Southeast Tennessee</p>
            </div>
            <span>Scribed & Hand-Finished</span>
          </div>
          <div class="home-archive-grid">${archiveCards}</div>
        </section>

        <section class="home-area reveal">
          <h2>Serving Cleveland, TN & Nearby Communities</h2>
          <p>
            ${business.name} serves homeowners in Cleveland, Tennessee, along with nearby areas including Athens, Charleston, Chattanooga, Ooltewah, and surrounding communities.
            If you are planning custom built-ins, cabinetry, shelving, a library wall, or finish carpentry work, we can help shape the design and build scope.
          </p>
          <p><a href="/cities/">Browse all city service pages</a> and <a href="/services/">all carpentry services</a>.</p>
        </section>

        <section class="home-commission reveal">
          <h2>Begin Your Commission</h2>
          <p>Every build begins with technical scope. Share your room dimensions, preferred wood species, and priority features.</p>
          <div class="home-commission-actions">
            <a href="/contact/" class="cta-button">Submit Spec Inquiry</a>
            <a href="tel:${business.phone.replace(/[^+\d]/g, "")}" class="secondary-button">Call ${business.phone}</a>
          </div>
          <p class="small-note">For direct city pages, start with ${darkCollectionLinks.slice(0, 2).map((item) => `<a href="${item.href}">${item.label}</a>`).join(" and ")}.</p>
        </section>

        ${renderTrustBlock({ key: "home-main" })}
        ${renderReviewSnippet({ key: "home-main" })}
        ${renderClickToCall({ cityName: "Cleveland TN" })}
        ${renderQuoteCta({ key: "home-main", serviceName: "custom carpentry", cityName: "Cleveland TN" })}
        ${renderServiceAreaReassurance()}
      </div>
    `
  };
}

function renderServicesIndex({ services, cities }) {
  const serviceCards = services
    .map((service) => {
      const city = cities[0];
      return `
        <article class="card">
          <h2><a href="/services/${serviceSlug(service.name)}/">${service.name}</a></h2>
          <p>${service.heroFocus}. Typical uses: ${service.commonUseCases.join(", ")}.</p>
          <p><a href="/services/${serviceSlug(service.name)}-${citySlug(city)}/">Example: ${service.name} in ${cityLabel(city)}</a></p>
        </article>`;
    })
    .join("");

  return {
    h1: "Carpentry Services",
    title: `Carpentry Services | ${business.name}`,
    description: "Browse finish carpentry services and localized SEO pages for every city in our service area.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Carpentry Services</h1>
        <p>Choose a service to view detailed pages by city, process, benefits, and project examples.</p>
      </section>
      <section class="card-grid">${serviceCards}</section>
      ${renderQuoteCta({ key: "services-index", serviceName: "custom carpentry", cityName: "our service area" })}
    `
  };
}

function renderServiceHub({ service, cities }) {
  const links = cities
    .map((city) => {
      const cityName = cityLabel(city);
      const anchor = buildAnchor({ key: `${service.name}-${cityName}`, serviceName: service.name, cityName });
      return `<li><a href="/services/${serviceSlug(service.name)}-${citySlug(city)}/">${anchor}</a></li>`;
    })
    .join("");

  return {
    h1: `${service.name}`,
    title: `${service.name} | ${business.name}`,
    description: `${service.name} services throughout Southeast Tennessee and nearby North Georgia cities.`,
    localTokens: {
      city: "Cleveland",
      service: service.name
    },
    content: `
      <section class="page-intro">
        <p class="eyebrow">Service Hub</p>
        <h1>${service.name}</h1>
        <p>${service.heroFocus} for homeowners across ${business.primaryRegion}. Common use cases include ${service.commonUseCases.join(", ")}.</p>
      </section>
      <section>
        <h2>${service.name} by City</h2>
        <ul class="city-grid">${links}</ul>
      </section>
      ${renderProjectHighlights([])}
      ${renderClickToCall({ cityName: "Southeast Tennessee" })}
    `,
    extraSchema: [
      serviceSchema({
        serviceName: service.name,
        cityName: "Southeast Tennessee",
        description: `${service.name} services by ${business.name} across the regional service area.`
      })
    ]
  };
}

function renderCitiesIndex({ cities, services }) {
  const cityCards = cities
    .map((city) => {
      const service = services[0];
      return `
        <article class="card">
          <h2><a href="/cities/${citySlug(city)}-carpentry/">${cityLabel(city)} Carpentry</a></h2>
          <p>${city.county}. ${city.localNotes}</p>
          <p><a href="/services/${serviceSlug(service.name)}-${citySlug(city)}/">Example: ${service.name} in ${cityLabel(city)}</a></p>
        </article>`;
    })
    .join("");

  return {
    h1: "Cities We Serve",
    title: `Cities We Serve | ${business.name}`,
    description: "City-based carpentry pages across Southeast Tennessee and North Georgia.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Cities We Serve</h1>
        <p>Find local carpentry landing pages for your city and neighborhood.</p>
      </section>
      <section class="card-grid">${cityCards}</section>
      ${renderServiceAreaReassurance()}
    `
  };
}

function renderCityHub({ city, services, projects }) {
  const cityName = cityLabel(city);
  const serviceLinks = cityHubServiceLinks({ city, services })
    .map((item) => `<li><a href="${item.href}">${item.anchor}</a></li>`)
    .join("");

  const topServices = services
    .filter((service) => ["Custom Built-Ins", "Trim Carpentry", "Floating Shelves", "Custom Cabinets", "Crown Molding"].includes(service.name))
    .slice(0, 5)
    .map((service) => `<li><a href="/services/${serviceSlug(service.name)}-${citySlug(city)}/">${service.name} in ${cityName}</a></li>`)
    .join("");

  const relatedProjects = projects
    .filter((project) => project.city === city.name && project.state === city.state)
    .slice(0, 3);

  return {
    h1: `${cityName} Carpentry Services`,
    title: `${cityName} Carpentry Services | ${business.name}`,
    description: `Finish carpentry, built-ins, trim, shelving, and custom woodworking in ${cityName}.`,
    localTokens: {
      city: city.name,
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <p class="eyebrow">City Hub</p>
        <h1>${cityName} Carpentry Services</h1>
        <p>${business.name} delivers custom carpentry and finish installation in ${cityName}. ${city.localNotes}</p>
      </section>

      <section>
        <h2>Services Available in ${cityName}</h2>
        <ul class="city-grid">${serviceLinks}</ul>
      </section>

      <section>
        <h2>Top Services Requested in ${cityName}</h2>
        <ul>${topServices}</ul>
        <p>Nearby communities we frequently serve include ${city.nearbyCommunities.join(", ")}.</p>
      </section>

      ${renderProjectHighlights(relatedProjects.length ? relatedProjects : projects)}
      ${renderTrustBlock({ key: `${cityName}-city-hub` })}
      ${renderQuoteCta({ key: `${cityName}-city-hub`, serviceName: "custom carpentry", cityName })}
    `
  };
}

function renderProjectsIndex({ projects }) {
  const projectCards = projects
    .map(
      (project) => `
      <article class="card">
        <h2><a href="/projects/${project.slug}/">${project.title}</a></h2>
        <p>${project.summary}</p>
      </article>`
    )
    .join("");

  return {
    h1: "Completed Carpentry Projects",
    title: `Carpentry Projects | ${business.name}`,
    description: "Portfolio of custom built-ins, trim work, mantels, shelves, and finish carpentry projects.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Completed Carpentry Projects</h1>
        <p>Real projects with materials, process details, and before/after notes.</p>
      </section>
      <section class="card-grid">${projectCards}</section>
      ${renderQuoteCta({ key: "projects-index", serviceName: "custom carpentry", cityName: "Southeast Tennessee" })}
    `
  };
}

function imageCaption(service, city, state, idx) {
  const captions = [
    `${service} layout and prep in ${city} ${state}`,
    `${service} installation progress in ${city} ${state}`,
    `${service} detail craftsmanship in ${city} ${state}`,
    `${service} finish stage in ${city} ${state}`,
    `${service} completed reveal in ${city} ${state}`
  ];
  return captions[idx] || captions[captions.length - 1];
}

function renderProjectPage({ project, services, cities }) {
  const cityObj = cities.find((city) => city.name === project.city && city.state === project.state);
  const serviceObj = services.find((service) => service.name === project.service) || services[0];
  const cityName = `${project.city} ${project.state}`;

  const imageFigures = project.images
    .map((filename, idx) => {
      const alt = `${project.service} installed in ${project.city} ${project.state} home - image ${idx + 1}`;
      const caption = imageCaption(project.service, project.city, project.state, idx);
      return `
        <figure>
          <img src="/assets/images/${filename}" alt="${alt}" loading="lazy" width="1200" height="800" decoding="async">
          <figcaption>${caption}</figcaption>
        </figure>`;
    })
    .join("");

  const materials = project.materials.map((item) => `<li>${item}</li>`).join("");
  const scope = project.scopeOfWork.map((item) => `<li>${item}</li>`).join("");

  const imageSchema = project.images.map((filename, idx) =>
    imageObjectSchema({
      filename,
      caption: imageCaption(project.service, project.city, project.state, idx),
      description: `${project.service} project photo ${idx + 1} in ${cityName}`
    })
  );

  return {
    h1: `${project.title}`,
    title: `${project.title} | ${business.name}`,
    description: `${project.service} project in ${cityName} with materials, installation details, and before/after outcomes.`,
    localTokens: {
      city: project.city,
      service: project.service
    },
    ogImage: `/assets/images/${project.images[0]}`,
    extraSchema: imageSchema,
    content: `
      <section class="page-intro">
        <p class="eyebrow">Project Case Study</p>
        <h1>${project.title}</h1>
        <p>Location: ${cityName}. Service: ${project.service}. ${project.summary}</p>
      </section>

      <section class="gallery-grid">${imageFigures}</section>

      <section>
        <h2>Project Overview</h2>
        <p>${project.summary}</p>
      </section>

      <section>
        <h2>Scope of Work</h2>
        <ul>${scope}</ul>
      </section>

      <section>
        <h2>Materials Used</h2>
        <ul>${materials}</ul>
      </section>

      <section>
        <h2>Before and After</h2>
        <p>${project.beforeAfter}</p>
      </section>

      <section>
        <h2>Related Service Pages</h2>
        <ul>
          <li><a href="/services/${serviceSlug(project.service)}-${citySlug(cityObj)}/">${project.service} in ${cityName}</a></li>
          <li><a href="/cities/${citySlug(cityObj)}-carpentry/">${cityName} city carpentry hub</a></li>
          <li><a href="/services/${serviceSlug(serviceObj.name)}/">${serviceObj.name} service hub</a></li>
        </ul>
      </section>

      ${renderClickToCall({ cityName })}
      ${renderQuoteCta({ key: project.slug, serviceName: project.service, cityName })}
    `
  };
}

function renderBlogIndex({ blogTopics }) {
  const topicLinks = blogTopics
    .map((topic) => {
      const slug = slugify(topic.title);
      return `<li><a href="/blog/${slug}/">${topic.title}</a> <span class="muted">(${topic.intent})</span></li>`;
    })
    .join("");

  return {
    h1: "Local Carpentry Blog",
    title: `Carpentry Blog | ${business.name}`,
    description: "Local homeowner carpentry guides for cost, design, and material planning.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Local Carpentry Blog</h1>
        <p>Homeowner-focused guides covering project cost, design decisions, and maintenance best practices.</p>
      </section>
      <section>
        <h2>Blog Topics</h2>
        <ul>${topicLinks}</ul>
      </section>
    `
  };
}

function renderBlogPost({ topic, cities, services }) {
  const slug = slugify(topic.title);
  const serviceA = services.find((service) => service.name === topic.relatedServices[0]) || services[0];
  const serviceB = services.find((service) => service.name === topic.relatedServices[1]) || services[1] || services[0];
  const cityA = cities.find((city) => city.name === topic.relatedCities[0]) || cities[0];
  const cityB = cities.find((city) => city.name === topic.relatedCities[1]) || cities[1] || cities[0];

  return {
    slug,
    h1: topic.title,
    title: `${topic.title} | ${business.name}`,
    description: `${topic.title} - practical planning advice from a local Southeast Tennessee carpentry team.`,
    localTokens: {
      city: cityA.name,
      service: serviceA.name
    },
    content: `
      <article class="blog-post">
        <p class="eyebrow">Homeowner Guide</p>
        <h1>${topic.title}</h1>
        <p>This guide explains practical decisions homeowners should make before hiring a carpenter, including scope definition, timeline planning, material tradeoffs, and installation quality checks.</p>
        <h2>Planning Framework</h2>
        <p>Define function first, then finish level, then budget. This sequence helps avoid design drift and protects project quality.</p>
        <h2>Related Service Pages</h2>
        <ul>
          <li><a href="/services/${serviceSlug(serviceA.name)}-${citySlug(cityA)}/">${serviceA.name} in ${cityLabel(cityA)}</a></li>
          <li><a href="/services/${serviceSlug(serviceB.name)}-${citySlug(cityB)}/">${serviceB.name} in ${cityLabel(cityB)}</a></li>
          <li><a href="/cities/${citySlug(cityA)}-carpentry/">${cityLabel(cityA)} carpentry hub</a></li>
        </ul>
        ${renderQuoteCta({ key: slug, serviceName: serviceA.name, cityName: cityLabel(cityA) })}
      </article>
    `
  };
}

function renderAboutPage() {
  return {
    h1: `About ${business.name}`,
    title: `About ${business.name}`,
    description: "Learn about our carpentry process, craftsmanship standards, and service area coverage.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>About ${business.name}</h1>
        <p>We are a finish-focused carpentry company serving homeowners across Southeast Tennessee and nearby North Georgia. Our work emphasizes precision layout, durable materials, and detail-rich installation.</p>
      </section>
      <section>
        <h2>What We Build</h2>
        <p>Built-ins, trim packages, mantels, floating shelves, wall paneling, and interior wood features tailored to each home.</p>
      </section>
      <section>
        <h2>How We Work</h2>
        <p>Every project follows a clear sequence: consultation, field measurement, scope alignment, installation, and final walkthrough.</p>
      </section>
      ${renderTrustBlock({ key: "about" })}
    `
  };
}

function renderContactPage({ cities }) {
  const areaLinks = cities
    .map((city) => `<li><a href="/cities/${citySlug(city)}-carpentry/">${cityLabel(city)}</a></li>`)
    .join("");

  return {
    h1: `Contact ${business.name}`,
    title: `Contact ${business.name}`,
    description: "Request a custom carpentry estimate in Cleveland TN and surrounding cities.",
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Contact ${business.name}</h1>
        <p>Call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a> or email <a href="mailto:${business.email}">${business.email}</a> to request your estimate.</p>
      </section>

      <section>
        <h2>Service Area</h2>
        <ul class="city-grid">${areaLinks}</ul>
      </section>

      <section>
        <h2>Request a Quote</h2>
        <form class="contact-form" action="mailto:${business.email}" method="post" enctype="text/plain">
          <label>Name <input type="text" name="name" required></label>
          <label>City <input type="text" name="city" required></label>
          <label>Service Needed <input type="text" name="service" required></label>
          <label>Project Details <textarea name="message" rows="5" required></textarea></label>
          <button class="cta-button" type="submit">Send Request</button>
        </form>
        <p class="small-note">Replace the form action with your deployed form endpoint if using Netlify, Formspree, or serverless handlers.</p>
      </section>

      <section>
        <h2>Find Us on the Map</h2>
        <div class="map-wrap">
          <iframe title="Google map for ${business.name}" src="${business.mapEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      <section class="review-panel">
        <h2>Review Request</h2>
        <p>Please include the service performed, city name, and project type in your review. Example: "trim carpentry in Ooltewah TN for a whole-home remodel."</p>
        <a class="cta-button" href="${business.profileUrls.google}" target="_blank" rel="noopener noreferrer">Leave a Google Review</a>
      </section>

      ${renderClickToCall({ cityName: "Southeast Tennessee" })}
    `
  };
}

module.exports = {
  renderHomePage,
  renderServicesIndex,
  renderServiceHub,
  renderCitiesIndex,
  renderCityHub,
  renderProjectsIndex,
  renderProjectPage,
  renderBlogIndex,
  renderBlogPost,
  renderAboutPage,
  renderContactPage
};
