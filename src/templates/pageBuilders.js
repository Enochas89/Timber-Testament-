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

function renderHomeSectionHeader({ eyebrow, title, description }) {
  return `
    <header class="home-section-header reveal">
      ${eyebrow ? `<p class="home-section-eyebrow">${eyebrow}</p>` : ""}
      <h2>${title}</h2>
      ${description ? `<p>${description}</p>` : ""}
    </header>`;
}

function renderHomeServiceCard({ title, description, href, bullets = [] }) {
  return `
    <article class="home-service-card reveal">
      <h3>${title}</h3>
      <p>${description}</p>
      <ul class="home-service-bullets">
        ${bullets.slice(0, 3).map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <a class="home-inline-link" href="${href}">Explore ${title}</a>
    </article>`;
}

function renderHomeTestimonialCard({ quote, author }) {
  return `
    <article class="home-testimonial-card reveal">
      <blockquote>
        <p>"${quote}"</p>
      </blockquote>
      <p class="home-testimonial-author">${author}</p>
    </article>`;
}

function renderHomePage({ services, cities, projects }) {
  const byServiceName = (name) => services.find((service) => service.name === name);
  const byCityName = (name) => cities.find((city) => city.name === name);
  const cleveland = byCityName("Cleveland") || cities[0];
  const athens = byCityName("Athens") || cities[1] || cities[0];
  const chattanooga = byCityName("Chattanooga") || cities[2] || cities[0];
  const ooltewah = byCityName("Ooltewah") || cities[3] || cities[0];

  const featuredMoneyLinks = [
    { service: byServiceName("Custom Built-Ins"), city: cleveland },
    { service: byServiceName("Custom Cabinets"), city: cleveland },
    { service: byServiceName("Floating Shelves"), city: athens },
    { service: byServiceName("Mantels"), city: chattanooga },
    { service: byServiceName("Finish Carpentry"), city: ooltewah }
  ]
    .filter((item) => item.service && item.city)
    .map((item) => ({
      href: `/${serviceSlug(item.service.name)}-${citySlug(item.city)}/`,
      label: `${item.service.name} in ${cityLabel(item.city)}`
    }));

  const serviceCards = [
    {
      lookup: "Custom Built-Ins",
      heading: "Custom Built-Ins",
      href: "/services/custom-built-ins/",
      description:
        "Custom built-ins for living rooms, media walls, and storage zones designed around your exact room dimensions in Cleveland TN homes.",
      bullets: ["library walls", "media cabinetry", "mudroom storage"]
    },
    {
      lookup: "Custom Cabinets",
      heading: "Cabinetry",
      href: "/services/cabinetry/",
      description:
        "Built-to-fit cabinetry for mudrooms, home offices, and utility spaces with durable hardware and finish-grade installation.",
      bullets: ["home office cabinets", "laundry storage", "entry organization"]
    },
    {
      lookup: "Floating Shelves",
      heading: "Floating Shelves",
      href: "/services/floating-shelves/",
      description:
        "Floating shelves with concealed support systems that keep kitchens and living rooms open while adding practical everyday storage.",
      bullets: ["kitchen shelving", "coffee bar shelves", "display niches"]
    },
    {
      lookup: "Built-in Bookcases",
      heading: "Custom Libraries",
      href: "/services/custom-libraries/",
      description:
        "Custom libraries and built-in bookcases with balanced proportions, integrated cabinetry, and tailored layout planning.",
      bullets: ["study walls", "home library systems", "display cabinetry"]
    },
    {
      lookup: "Mantels",
      heading: "Mantels",
      href: "/services/mantels/",
      description:
        "Custom mantel design and installation that creates a strong focal point while matching surrounding trim and architecture.",
      bullets: ["beam mantels", "fireplace updates", "feature wall focal points"]
    },
    {
      lookup: "Finish Carpentry",
      heading: "Finish Carpentry",
      href: "/services/finish-carpentry/",
      description:
        "Finish carpentry for trim transitions, casing, and final-stage interior detailing that gives remodels a polished, complete look.",
      bullets: ["trim transitions", "profile matching", "paint-ready finish work"]
    }
  ];

  const servicesMarkup = serviceCards
    .map((entry) => {
      const service = byServiceName(entry.lookup);
      if (!service) {
        return "";
      }
      return renderHomeServiceCard({
        title: entry.heading,
        description: entry.description,
        href: entry.href,
        bullets: entry.bullets
      });
    })
    .filter(Boolean)
    .join("");

  const portfolioCards = projects
    .slice(0, 3)
    .map(
      (project) => `
      <article class="home-portfolio-card reveal">
        <a href="/projects/${project.slug}/" class="home-portfolio-image-wrap">
          <img
            src="/assets/images/${project.images[0]}"
            alt="${project.service} project completed in ${project.city} ${project.state}"
            loading="lazy"
            width="900"
            height="1100"
            decoding="async"
          >
        </a>
        <div class="home-portfolio-copy">
          <h3><a href="/projects/${project.slug}/">${project.title.replace("Project: ", "")}</a></h3>
          <p>${project.summary}</p>
          <a class="home-inline-link" href="/projects/${project.slug}/">View project details</a>
        </div>
      </article>`
    )
    .join("");
  const heroImage = `/assets/images/${projects[0] ? projects[0].images[0] : "custom-built-ins-cleveland-tn.jpg"}`;

  const testimonials = [
    {
      quote:
        "Timber & Testament built a custom walnut library wall and integrated cabinetry in our Cleveland TN home. The finish carpentry quality was exceptional.",
      author: "Homeowner in Cleveland TN"
    },
    {
      quote:
        "Our floating shelves and mudroom cabinetry in Athens TN were planned clearly from consultation through installation. The process felt organized and professional.",
      author: "Homeowner in Athens TN"
    },
    {
      quote:
        "They rebuilt our fireplace wall with a custom mantel and trim package in Chattanooga TN. The final fit and detailing completely elevated the room.",
      author: "Homeowner in Chattanooga TN"
    },
    {
      quote:
        "We hired them for finish carpentry and custom built-ins in Ooltewah TN, and the project stayed clean, on schedule, and exactly on spec.",
      author: "Homeowner in Ooltewah TN"
    }
  ];

  return {
    h1: "Custom Carpentry, Built-Ins & Cabinetry in Cleveland Tennessee",
    title: `Custom Carpentry, Built-Ins & Cabinetry in Cleveland TN | Timber & Testament`,
    description:
      "Timber & Testament provides custom carpentry, built-ins, cabinetry, floating shelves, mantels, and finish carpentry in Cleveland TN and Southeast Tennessee.",
    ogImage: heroImage,
    preloadImages: [heroImage],
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <div class="home-main home-premium">
        <section class="home-hero reveal active">
          <div class="home-hero-media-wrap">
            <img
              src="${heroImage}"
              alt="Custom built-in library cabinetry for a residential interior in Cleveland Tennessee"
              loading="eager"
              fetchpriority="high"
              width="1600"
              height="980"
              decoding="sync"
              class="home-hero-media"
            >
          </div>
          <div class="home-hero-inner">
            <p class="home-chip">Bespoke Craft Built For Generations</p>
            <h1>Custom Carpentry, Built-Ins & Cabinetry<br>in Cleveland, Tennessee.</h1>
            <p class="home-hero-copy">
              ${business.name} delivers custom carpentry, custom built-ins, cabinetry, floating shelves, custom libraries, mantels, and finish carpentry for homeowners in Cleveland TN and surrounding Southeast Tennessee communities.
            </p>
            <div class="home-hero-actions">
              <a href="/contact/" class="cta-button">Request Consultation</a>
              <a href="/projects/" class="secondary-button">View Portfolio</a>
            </div>
            <ul class="home-hero-links">
              <li><a href="/services/">Browse Services</a></li>
              <li><a href="/cities/">Cities We Serve</a></li>
              <li><a href="/blog/">Project Planning Blog</a></li>
            </ul>
          </div>
        </section>

        <section class="home-services" id="services">
          ${renderHomeSectionHeader({
            eyebrow: "Service Summary",
            title: "Custom Carpentry Services for Cleveland TN Homes",
            description:
              "Explore our core service hubs with detailed process, material, and city-level pages for local homeowners."
          })}
          <div class="home-services-grid">
            ${servicesMarkup}
          </div>
          <p class="home-section-links">
            Direct links: <a href="/services/custom-built-ins/">Custom Built-Ins</a> | <a href="/services/cabinetry/">Cabinetry</a> | <a href="/services/floating-shelves/">Floating Shelves</a> | <a href="/services/custom-libraries/">Custom Libraries</a> | <a href="/services/mantels/">Mantels</a> | <a href="/services/finish-carpentry/">Finish Carpentry</a>
          </p>
        </section>

        <section class="home-brand">
          ${renderHomeSectionHeader({
            eyebrow: "Brand Philosophy",
            title: "Workshop-Built Details, Installed With Finish-Level Precision",
            description:
              "We combine measured planning, premium materials, and clean installation standards so every project feels integrated with the architecture of your home."
          })}
          <div class="home-brand-grid">
            <article class="home-brand-card reveal">
              <h3>Custom Carpentry Approach</h3>
              <p>Every project starts with layout verification and practical planning to reduce surprises during fabrication and installation.</p>
            </article>
            <article class="home-brand-card reveal">
              <h3>Premium Material Guidance</h3>
              <p>We help homeowners choose durable hardwoods, paint-grade options, and finish systems aligned with real daily use.</p>
            </article>
            <article class="home-brand-card reveal">
              <h3>Clean Installation Standards</h3>
              <p>Our finish carpentry process prioritizes tight reveals, clean job sites, and final walkthrough accountability.</p>
            </article>
          </div>
        </section>

        <section class="home-process">
          ${renderHomeSectionHeader({
            eyebrow: "Process",
            title: "From Consultation to Installation",
            description: "A clear four-step process keeps schedule, scope, and quality aligned."
          })}
          <ol class="home-process-list">
            <li><h3>Consultation</h3><p>We review your goals, measurements, and room conditions on-site.</p></li>
            <li><h3>Design</h3><p>Layouts, materials, and profile details are finalized around function and finish.</p></li>
            <li><h3>Workshop Fabrication</h3><p>Core components are built for precision fit before arriving on-site.</p></li>
            <li><h3>Installation</h3><p>Final install includes alignment checks, detailing, and walkthrough closeout.</p></li>
          </ol>
        </section>

        <section class="home-portfolio" id="portfolio">
          ${renderHomeSectionHeader({
            eyebrow: "Portfolio",
            title: "Recent Custom Carpentry Projects",
            description: "Browse recent projects to compare layout ideas, material direction, and finish quality."
          })}
          <div class="home-portfolio-grid">${portfolioCards}</div>
          <p class="home-section-links">Featured local pages: ${featuredMoneyLinks.map((item) => `<a href="${item.href}">${item.label}</a>`).join(" | ")}</p>
          <p class="home-section-links"><a href="/projects/">See all completed projects</a></p>
        </section>

        <section class="home-area" id="areas">
          ${renderHomeSectionHeader({
            eyebrow: "Service Area",
            title: "Serving Cleveland, Tennessee and Surrounding Communities",
            description:
              `${business.name} provides custom carpentry, built-ins, cabinetry, and finish carpentry across Cleveland TN, Athens TN, Charleston TN, Chattanooga TN, Ooltewah TN, and nearby Southeast Tennessee communities.`
          })}
          <div class="home-area-links">
            <a href="/cleveland-tn-carpentry/">Cleveland TN</a>
            <a href="/athens-tn-carpentry/">Athens TN</a>
            <a href="/charleston-tn-carpentry/">Charleston TN</a>
            <a href="/chattanooga-tn-carpentry/">Chattanooga TN</a>
            <a href="/ooltewah-tn-carpentry/">Ooltewah TN</a>
          </div>
          <p class="home-section-links"><a href="/cities/">View all city hub pages</a> and <a href="/services/">all services</a>.</p>
        </section>

        <section class="home-testimonials" id="testimonials">
          ${renderHomeSectionHeader({
            eyebrow: "Testimonials",
            title: "What Local Homeowners Say",
            description: "Recent feedback from homeowners who hired Timber & Testament for custom carpentry projects."
          })}
          <div class="home-testimonials-grid">
            ${testimonials.map((item) => renderHomeTestimonialCard(item)).join("")}
          </div>
        </section>

        <section class="home-contact-signals" id="contact">
          ${renderHomeSectionHeader({
            eyebrow: "Contact",
            title: "Start Your Carpentry Consultation",
            description:
              "Share your scope, room dimensions, and service goals to get a practical estimate and timeline."
          })}
          <div class="home-contact-grid">
            <article class="home-contact-card reveal">
              <h3>Call</h3>
              <p><a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a></p>
            </article>
            <article class="home-contact-card reveal">
              <h3>Email</h3>
              <p><a href="mailto:${business.email}">${business.email}</a></p>
            </article>
            <article class="home-contact-card reveal">
              <h3>Quick Links</h3>
              <p><a href="/contact/">Request Quote</a> | <a href="/projects/">Projects</a> | <a href="/blog/">Blog</a></p>
            </article>
          </div>
        </section>

        ${renderTrustBlock({ key: "home-main" })}
        ${renderClickToCall({ cityName: "Cleveland TN" })}
        ${renderQuoteCta({ key: "home-main", serviceName: "custom carpentry", cityName: "Cleveland TN" })}
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

function renderPrivacyPage() {
  return {
    h1: "Privacy Policy",
    title: `Privacy Policy | ${business.name}`,
    description: `Privacy policy for ${business.name}, including website contact, lead form, and communication handling practices.`,
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Privacy Policy</h1>
        <p>This page explains how ${business.name} collects, uses, and protects contact information submitted through this website.</p>
      </section>
      <section>
        <h2>Information We Collect</h2>
        <p>We collect the details you provide in quote requests, including name, email, phone number, city, and project scope.</p>
      </section>
      <section>
        <h2>How Information Is Used</h2>
        <p>Submitted information is used to respond to inquiries, provide estimates, schedule consultations, and communicate about requested services.</p>
      </section>
      <section>
        <h2>Data Sharing</h2>
        <p>We do not sell personal information. We only share information with service providers needed to operate this website or deliver requested services.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent to <a href="mailto:${business.email}">${business.email}</a> or by calling <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a>.</p>
      </section>
    `
  };
}

function renderTermsPage() {
  return {
    h1: "Terms of Use",
    title: `Terms of Use | ${business.name}`,
    description: `Terms of use for ${business.name} website and service inquiry submissions.`,
    localTokens: {
      city: "Cleveland",
      service: "Custom Carpentry"
    },
    content: `
      <section class="page-intro">
        <h1>Terms of Use</h1>
        <p>By using this website, you agree to these terms for browsing content and submitting service inquiries to ${business.name}.</p>
      </section>
      <section>
        <h2>Website Content</h2>
        <p>Project descriptions, service pages, and pricing guidance are provided for informational purposes and may change as project scope changes.</p>
      </section>
      <section>
        <h2>Estimates and Scope</h2>
        <p>Any timeline or cost details provided through this website are preliminary until confirmed in a final written scope.</p>
      </section>
      <section>
        <h2>Third-Party Platforms</h2>
        <p>Links to external websites, including map and review platforms, are provided for convenience and are governed by their own policies.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>For questions regarding these terms, contact <a href="mailto:${business.email}">${business.email}</a> or call <a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a>.</p>
      </section>
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
  renderContactPage,
  renderPrivacyPage,
  renderTermsPage
};
