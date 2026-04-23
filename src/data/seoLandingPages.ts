export type SeoLandingFaq = {
  question: string;
  answer: string;
};

export type SeoLandingPage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  serviceName: string;
  serviceLabel: string;
  areaServed: string[];
  highlights: string[];
  keywordTargets: string[];
  relatedSlugs: string[];
  corridorSlug?: string;
  faqs: SeoLandingFaq[];
};

type ServiceTemplate = {
  slugBase: string;
  serviceName: string;
  serviceLabel: string;
  corridorDescription: string;
  cityDescription: string;
  corridorHighlights: string[];
  cityHighlights: string[];
  faqTemplate: SeoLandingFaq[];
};

type TargetCity = {
  slug: string;
  name: string;
  state: string;
};

const corridorCities = [
  "Chattanooga, TN",
  "Cleveland, TN",
  "Athens, TN",
  "Sweetwater, TN",
  "Lenoir City, TN",
  "Farragut, TN",
  "Knoxville, TN",
];

const targetCities: TargetCity[] = [
  { slug: "chattanooga-tn", name: "Chattanooga", state: "TN" },
  { slug: "knoxville-tn", name: "Knoxville", state: "TN" },
];

const serviceTemplates: ServiceTemplate[] = [
  {
    slugBase: "handyman-services",
    serviceName: "Handyman Services",
    serviceLabel: "Handyman",
    corridorDescription:
      "Family-owned handyman services for repair lists, fixture swaps, trim touchups, and practical upgrades from Chattanooga to Knoxville.",
    cityDescription:
      "Local family-owned handyman service for repair lists, punch-list work, and practical upgrades.",
    corridorHighlights: [
      "Interior and exterior repair support",
      "Rental turnover and punch-list completion",
      "Fast scheduling for urgent homeowner tasks",
      "Clear communication from estimate through completion",
    ],
    cityHighlights: [
      "Interior repair and punch-list completion",
      "Trim, hardware, and fixture updates",
      "Property maintenance-ready scopes",
      "Practical upgrades for homeowners",
    ],
    faqTemplate: [
      {
        question: "Do you take smaller handyman jobs and larger punch-list scopes?",
        answer:
          "Yes. We handle both one-off repair tasks and bundled project lists with clear scope confirmation up front.",
      },
      {
        question: "Do you serve both homeowners and rental properties?",
        answer:
          "Yes. We regularly support homeowners, rental turnovers, and property managers across the service corridor.",
      },
    ],
  },
  {
    slugBase: "concrete-services",
    serviceName: "Concrete Services",
    serviceLabel: "Concrete",
    corridorDescription:
      "Residential concrete services including walkways, pads, transitions, and repair scopes from Chattanooga to Knoxville.",
    cityDescription:
      "Residential concrete work including walkways, pads, and repair-focused scopes.",
    corridorHighlights: [
      "Walkways, pads, and slab support scopes",
      "Concrete repair and selective replacement",
      "Prep and forming focused on durability",
      "Clean finishing for long-term function",
    ],
    cityHighlights: [
      "Walkway and path improvements",
      "Pad and small slab projects",
      "Repair and replacement of worn sections",
      "Entry and utility transition concrete",
    ],
    faqTemplate: [
      {
        question: "Can you combine concrete work with related home upgrades?",
        answer:
          "Yes. We frequently schedule concrete scopes alongside door, window, and finish-related upgrades.",
      },
      {
        question: "Do you handle smaller residential concrete projects?",
        answer:
          "Yes. We take focused residential scopes such as walkway sections, pads, and targeted repair work.",
      },
    ],
  },
  {
    slugBase: "window-installation",
    serviceName: "Window Installation",
    serviceLabel: "Windows",
    corridorDescription:
      "Window installation and replacement with weather-tight fit and trim-ready finish quality from Chattanooga to Knoxville.",
    cityDescription:
      "Window installation and replacement focused on energy performance and clean finishing.",
    corridorHighlights: [
      "Window replacement and install sequencing",
      "Flashing and weather-seal best practices",
      "Interior and exterior trim coordination",
      "Multi-window project scheduling",
    ],
    cityHighlights: [
      "Measured replacement installs",
      "Weather-seal focused setup",
      "Interior and exterior trim updates",
      "Phased multi-window planning",
    ],
    faqTemplate: [
      {
        question: "Can you install windows and update trim in the same project?",
        answer:
          "Yes. We can coordinate installation and trim finishing so the project is completed as one clean scope.",
      },
      {
        question: "Do you handle full-home window replacement phases?",
        answer:
          "Yes. We can stage replacement in phases to match timeline, budget, and occupancy needs.",
      },
    ],
  },
  {
    slugBase: "door-installation",
    serviceName: "Door Installation",
    serviceLabel: "Doors",
    corridorDescription:
      "Entry, patio, and interior door installation with alignment, hardware setup, and weather-ready sealing from Chattanooga to Knoxville.",
    cityDescription:
      "Door installation and replacement for entry, patio, and interior door projects.",
    corridorHighlights: [
      "Exterior and entry door replacement",
      "Patio and interior door install scopes",
      "Hardware alignment and fit correction",
      "Seal quality for long-term performance",
    ],
    cityHighlights: [
      "Entry and exterior door installs",
      "Patio and sliding door replacement",
      "Interior door installation and adjustments",
      "Hardware setup and weather-seal fit",
    ],
    faqTemplate: [
      {
        question: "Can you replace both interior and exterior doors?",
        answer:
          "Yes. We install and replace interior, entry, and patio doors with proper fit and function checks.",
      },
      {
        question: "Do you correct sticking or misaligned doors?",
        answer:
          "Yes. We diagnose fit and alignment issues and make corrections when conditions allow.",
      },
    ],
  },
];

export const corridorLandingPages: SeoLandingPage[] = serviceTemplates.map((template) => {
  const slug = `${template.slugBase}-chattanooga-to-knoxville`;
  const relatedSlugs = serviceTemplates
    .filter((item) => item.slugBase !== template.slugBase)
    .map((item) => `${item.slugBase}-chattanooga-to-knoxville`);

  return {
    slug,
    path: `/${slug}`,
    title: `${template.serviceName} Chattanooga To Knoxville TN`,
    description: template.corridorDescription,
    h1: `${template.serviceName} In Chattanooga To Knoxville, TN`,
    intro: `Timber & Testament delivers ${template.serviceLabel.toLowerCase()} service across East Tennessee with local family-owned care and clear communication from first call to final walkthrough.`,
    serviceName: template.serviceName,
    serviceLabel: template.serviceLabel,
    areaServed: corridorCities,
    highlights: template.corridorHighlights,
    keywordTargets: [
      `${template.slugBase.replace(/-/g, " ")} chattanooga tn`,
      `${template.slugBase.replace(/-/g, " ")} knoxville tn`,
      `east tennessee ${template.serviceLabel.toLowerCase()} service`,
    ],
    relatedSlugs,
    faqs: template.faqTemplate,
  };
});

export const cityLandingPages: SeoLandingPage[] = targetCities.flatMap((city) =>
  serviceTemplates.map((template) => {
    const slug = `${template.slugBase}-${city.slug}`;
    const corridorSlug = `${template.slugBase}-chattanooga-to-knoxville`;

    const relatedServiceSlugs = serviceTemplates
      .filter((item) => item.slugBase !== template.slugBase)
      .map((item) => `${item.slugBase}-${city.slug}`);

    return {
      slug,
      path: `/${slug}`,
      title: `${template.serviceName} ${city.name}, ${city.state}`,
      description: `${template.cityDescription} Serving ${city.name}, ${city.state} homeowners with dependable local scheduling and quality execution.`,
      h1: `${template.serviceName} In ${city.name}, ${city.state}`,
      intro: `If you need ${template.serviceLabel.toLowerCase()} service in ${city.name}, ${city.state}, our family-owned team can scope, schedule, and complete the work with practical results and strong communication.`,
      serviceName: template.serviceName,
      serviceLabel: template.serviceLabel,
      areaServed: [`${city.name}, ${city.state}`],
      highlights: template.cityHighlights,
      keywordTargets: [
        `${template.slugBase.replace(/-/g, " ")} ${city.name.toLowerCase()} tn`,
        `${template.serviceLabel.toLowerCase()} contractor ${city.name.toLowerCase()} tn`,
        `${city.name.toLowerCase()} ${template.serviceLabel.toLowerCase()} quote`,
      ],
      relatedSlugs: [corridorSlug, ...relatedServiceSlugs],
      corridorSlug,
      faqs: template.faqTemplate,
    };
  }),
);

export const seoLandingPages: SeoLandingPage[] = [
  ...corridorLandingPages,
  ...cityLandingPages,
];

const seoLandingPageMap = new Map(
  seoLandingPages.map((page) => [page.slug, page]),
);

export function getSeoLandingPageBySlug(slug: string) {
  return seoLandingPageMap.get(slug);
}

export function getSeoLandingPagesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => seoLandingPageMap.get(slug))
    .filter((item): item is SeoLandingPage => Boolean(item));
}

export const corridorLandingSlugs = corridorLandingPages.map((page) => page.slug);
export const cityLandingSlugs = cityLandingPages.map((page) => page.slug);
