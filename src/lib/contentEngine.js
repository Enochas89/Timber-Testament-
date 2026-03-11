const { variation, faqPools, processPools } = require("../config");
const { pickVariant, pickVariants, hashString } = require("./utils");

function fillTemplate(text, context) {
  return text
    .replace(/{{city}}/g, context.cityName)
    .replace(/{{service}}/g, context.serviceName)
    .replace(/{{county}}/g, context.city.county || "the local area");
}

function pickFaqSet(service, cityKey) {
  const poolKey = service.faqPool || "general";
  const pool = faqPools[poolKey] || faqPools.general;
  const secondaryPool = faqPools.general;

  const primary = pickVariants(pool, `${cityKey}-${service.name}-faq-primary`, 2);
  const secondary = pickVariant(secondaryPool, `${cityKey}-${service.name}-faq-secondary`);
  const all = [...primary, secondary].filter(Boolean);

  return {
    faqPoolKey: poolKey,
    faqItems: all.slice(0, 3)
  };
}

function pickProcessSteps(service, cityKey) {
  const poolKey = service.processPool || "general";
  const pool = processPools[poolKey] || processPools.general;
  return {
    processPoolKey: poolKey,
    steps: pickVariants(pool, `${cityKey}-${service.name}-process`, 3)
  };
}

function buildUniquenessFingerprint(parts) {
  const source = JSON.stringify(parts);
  const hash = hashString(source).toString(16);
  return {
    source,
    fingerprint: `u-${hash}`
  };
}

function createServiceCityContentPlan({ service, city }) {
  const cityName = `${city.name} ${city.state}`;
  const context = { serviceName: service.name, cityName, city };
  const pageKey = `${service.name}-${cityName}`;

  const intro = fillTemplate(pickVariant(variation.introStructures, `${pageKey}-intro`), context);
  const localBlurb = fillTemplate(pickVariant(variation.localRelevanceBlurbs, `${pageKey}-local`), context);
  const benefitsOpener = fillTemplate(pickVariant(variation.benefitsOpeners, `${pageKey}-benefits`), context);
  const closingSummary = fillTemplate(pickVariant(variation.closingSummaries, `${pageKey}-closing`), context);

  const serviceSellingPoints = pickVariants(service.sellingPoints || [], `${pageKey}-selling`, 3);
  const serviceBenefits = pickVariants(service.homeownerBenefits || [], `${pageKey}-homeowner-benefits`, 3);
  const serviceUseCases = pickVariants(service.commonUseCases || [], `${pageKey}-use-cases`, 3);
  const cityMentions = {
    neighborhoods: pickVariants(city.neighborhoods || [], `${pageKey}-neighborhoods`, 2),
    landmarks: pickVariants(city.landmarks || [], `${pageKey}-landmarks`, 2),
    nearbyCommunities: pickVariants(city.nearbyCommunities || [], `${pageKey}-nearby`, 2)
  };

  const process = pickProcessSteps(service, pageKey);
  const faq = pickFaqSet(service, pageKey);

  const uniquenessInputs = {
    intro,
    localBlurb,
    benefitsOpener,
    closingSummary,
    serviceSellingPoints,
    serviceBenefits,
    serviceUseCases,
    cityMentions,
    processPoolKey: process.processPoolKey,
    faqPoolKey: faq.faqPoolKey
  };

  return {
    pageKey,
    intro,
    localBlurb,
    benefitsOpener,
    closingSummary,
    serviceSellingPoints,
    serviceBenefits,
    serviceUseCases,
    cityMentions,
    processSteps: process.steps,
    processPoolKey: process.processPoolKey,
    faqItems: faq.faqItems,
    faqPoolKey: faq.faqPoolKey,
    uniqueness: buildUniquenessFingerprint(uniquenessInputs)
  };
}

module.exports = {
  createServiceCityContentPlan,
  buildUniquenessFingerprint
};
