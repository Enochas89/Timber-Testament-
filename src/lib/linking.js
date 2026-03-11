const { cityLabel, citySlug, serviceSlug, pickVariant } = require("./utils");

const anchorPatterns = [
  "{{service}} in {{city}}",
  "local {{service}} for {{city}} homes",
  "{{city}} {{service}} specialists",
  "get {{service}} in {{city}}"
];

function buildAnchor({ key, serviceName, cityName }) {
  const template = pickVariant(anchorPatterns, key);
  return template
    .replace(/{{service}}/g, serviceName.toLowerCase())
    .replace(/{{city}}/g, cityName);
}

function relatedServiceLinks({ currentService, city, services, max = 8 }) {
  return services
    .filter((service) => service.name !== currentService.name)
    .slice(0, max)
    .map((service) => {
      const href = `/services/${serviceSlug(service.name)}-${citySlug(city)}/`;
      const cityName = cityLabel(city);
      return {
        href,
        anchor: buildAnchor({
          key: `${currentService.name}-${service.name}-${cityName}`,
          serviceName: service.name,
          cityName
        })
      };
    });
}

function nearbyCityLinks({ service, city, cities, max = 8 }) {
  return cities
    .filter((candidate) => candidate.name !== city.name || candidate.state !== city.state)
    .slice(0, max)
    .map((candidate) => {
      const candidateLabel = cityLabel(candidate);
      return {
        href: `/services/${serviceSlug(service.name)}-${citySlug(candidate)}/`,
        anchor: buildAnchor({
          key: `${service.name}-${candidateLabel}`,
          serviceName: service.name,
          cityName: candidateLabel
        })
      };
    });
}

function cityHubServiceLinks({ city, services }) {
  return services.map((service) => {
    const cityName = cityLabel(city);
    return {
      href: `/services/${serviceSlug(service.name)}-${citySlug(city)}/`,
      anchor: buildAnchor({ key: `${cityName}-${service.name}`, serviceName: service.name, cityName })
    };
  });
}

module.exports = {
  buildAnchor,
  relatedServiceLinks,
  nearbyCityLinks,
  cityHubServiceLinks
};
