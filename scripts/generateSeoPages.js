const fs = require("fs");
const path = require("path");

const { services, cities } = require("../src/data/seoConfig");
const { projects } = require("../src/config");
const { renderServiceCityTemplate } = require("../src/templates/serviceCityTemplate");
const { renderSeoCityHub, renderSeoServiceHub } = require("../src/templates/seoHubTemplates");
const { renderLayout } = require("../src/templates/layout");
const { canonicalFor, resolveRobots, buildBreadcrumbs } = require("../src/lib/seo");
const { pathToOutputPath } = require("../src/lib/utils");

function normalize(input) {
  return (input || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function selectRelatedProjects(service, city, projectPool = []) {
  const cityMatches = projectPool.filter(
    (project) =>
      project.city.toLowerCase() === city.name.toLowerCase() &&
      project.state.toLowerCase() === city.state.toLowerCase()
  );

  const serviceNorm = normalize(service.name);
  const serviceMatches = projectPool.filter((project) => {
    const projectServiceNorm = normalize(project.service);
    return projectServiceNorm.includes(serviceNorm) || serviceNorm.includes(projectServiceNorm);
  });

  const combined = [...cityMatches, ...serviceMatches];
  if (combined.length) {
    return [...new Map(combined.map((item) => [item.slug, item])).values()].slice(0, 3);
  }
  return projectPool.slice(0, 3);
}

function createServiceCityEntries(projectPool) {
  const entries = [];

  services.forEach((service) => {
    cities.forEach((city) => {
      const route = `/${service.slug}-${city.slug}`;
      const relatedProjects = selectRelatedProjects(service, city, projectPool);
      const page = renderServiceCityTemplate({
        service,
        city,
        allServices: services,
        allCities: cities,
        relatedProjects
      });

      entries.push({
        route,
        type: "money",
        page
      });
    });
  });

  return entries;
}

function createCityHubEntries(projectPool) {
  return cities.map((city) => ({
    route: `/${city.slug}-carpentry`,
    type: "hub",
    page: renderSeoCityHub({
      city,
      services,
      allCities: cities,
      projects: projectPool
    })
  }));
}

function createServiceHubEntries(projectPool) {
  return services.map((service) => ({
    route: `/services/${service.slug}`,
    type: "hub",
    page: renderSeoServiceHub({
      service,
      cities,
      services,
      projects: projectPool
    })
  }));
}

function createSeoPageEntries({ projectPool = projects } = {}) {
  const serviceCityEntries = createServiceCityEntries(projectPool);
  const cityHubEntries = createCityHubEntries(projectPool);
  const serviceHubEntries = createServiceHubEntries(projectPool);
  const entries = [...serviceHubEntries, ...cityHubEntries, ...serviceCityEntries];

  const summary = {
    totalPagesGenerated: entries.length,
    serviceCityPages: serviceCityEntries.length,
    cityHubPages: cityHubEntries.length,
    serviceHubPages: serviceHubEntries.length,
    servicesCount: services.length,
    citiesCount: cities.length,
    routes: entries.map((entry) => entry.route),
    linkLattice: {
      serviceHubToServiceCityLinks: services.length * cities.length,
      cityHubToServiceCityLinks: services.length * cities.length,
      serviceCityToParentHubLinks: serviceCityEntries.length * 2
    }
  };

  return { entries, summary };
}

function writeStandalonePage(entry, distDir) {
  const breadcrumbs = entry.page.breadcrumbs || buildBreadcrumbs(entry.route, entry.page.h1 || entry.page.title);
  const html = renderLayout({
    route: entry.route,
    title: entry.page.title,
    description: entry.page.description,
    canonical: canonicalFor(entry.route),
    content: entry.page.content,
    extraSchema: entry.page.extraSchema || [],
    robots: resolveRobots(false),
    breadcrumbs,
    preloadImages: []
  });

  const outputPath = path.resolve(pathToOutputPath(entry.route));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, "utf8");
}

function writeSeoSummary(summary, distDir = path.resolve("dist")) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(
    path.join(distDir, "seo-pages-summary.json"),
    JSON.stringify(
      {
        totalPagesGenerated: summary.totalPagesGenerated,
        serviceCityPages: summary.serviceCityPages,
        cityHubPages: summary.cityHubPages,
        serviceHubPages: summary.serviceHubPages,
        servicesCount: summary.servicesCount,
        citiesCount: summary.citiesCount,
        linkLattice: summary.linkLattice
      },
      null,
      2
    ),
    "utf8"
  );
}

function runStandalone() {
  const distDir = path.resolve("dist");
  const { entries, summary } = createSeoPageEntries();
  entries.forEach((entry) => writeStandalonePage(entry, distDir));
  writeSeoSummary(summary, distDir);

  console.log("SEO pages generated.");
  console.log(JSON.stringify(summary, null, 2));
}

if (require.main === module) {
  runStandalone();
}

module.exports = {
  createSeoPageEntries,
  writeSeoSummary,
  seoServiceSlugs: services.map((service) => service.slug),
  seoCitySlugs: cities.map((city) => city.slug)
};