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
  { slug: "cleveland-tn", name: "Cleveland", state: "TN" },
  { slug: "chattanooga-tn", name: "Chattanooga", state: "TN" },
  { slug: "athens-tn", name: "Athens", state: "TN" },
  { slug: "knoxville-tn", name: "Knoxville", state: "TN" },
];

const serviceTemplates: ServiceTemplate[] = [
  {
    slugBase: "handyman-services",
    serviceName: "Handyman Services",
    serviceLabel: "Handyman",
    corridorDescription:
      "Family-owned handyman services for repair lists, same day handyman requests, fixture swaps, trim touchups, and practical upgrades from Chattanooga to Knoxville.",
    cityDescription:
      "Local family-owned handyman service for repair lists, punch-list work, same day handyman needs, and practical upgrades.",
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
    slugBase: "home-repair-services",
    serviceName: "Home Repair Services",
    serviceLabel: "Home Repair",
    corridorDescription:
      "General repair services, home maintenance services, small job contractor support, and quick home repairs from Chattanooga to Knoxville.",
    cityDescription:
      "Home repair services for drywall, doors, trim, fixtures, punch-list repairs, and practical maintenance needs.",
    corridorHighlights: [
      "General repair services for small projects",
      "Drywall repair, door repair, and trim touchups",
      "Repairs and installs for homeowner punch lists",
      "Quick home repairs and urgent scheduling when available",
    ],
    cityHighlights: [
      "Small job contractor scopes",
      "Drywall, door, and trim repair",
      "Fixture repair and installation tasks",
      "Punch-list repairs for homes and rentals",
    ],
    faqTemplate: [
      {
        question: "What types of home repair services do you handle?",
        answer:
          "We handle general repair services such as drywall repair, door repair, trim work, fixture installs, punch-list repairs, and small home maintenance tasks.",
      },
      {
        question: "Can you help with quick or emergency home repair needs?",
        answer:
          "Yes. We can review urgent repair requests and schedule quick home repairs when our calendar and the project scope allow.",
      },
    ],
  },
  {
    slugBase: "drywall-repair",
    serviceName: "Drywall Repair",
    serviceLabel: "Drywall Repair",
    corridorDescription:
      "Drywall repair, patching, touchups, and finish-ready wall repairs for homeowners from Chattanooga to Knoxville.",
    cityDescription:
      "Drywall repair near me service for patches, damaged areas, finish touchups, and repair lists.",
    corridorHighlights: [
      "Small drywall patch and repair scopes",
      "Wall damage repair before painting",
      "Punch-list drywall touchups",
      "Repair coordination with trim and finish work",
    ],
    cityHighlights: [
      "Drywall repair near me support",
      "Patch, sand, and finish-ready repair",
      "Wall repair for rentals and listings",
      "Bundled repair list completion",
    ],
    faqTemplate: [
      {
        question: "Do you handle small drywall repair jobs?",
        answer:
          "Yes. We take small drywall repair scopes and can bundle them with trim, door, cabinet, and other home repair work.",
      },
      {
        question: "Can drywall repair be part of a punch-list project?",
        answer:
          "Yes. Drywall repair is often included with punch-list repairs for homeowners, landlords, and real estate prep.",
      },
    ],
  },
  {
    slugBase: "cabinet-installation",
    serviceName: "Cabinet Installation",
    serviceLabel: "Cabinet Installer",
    corridorDescription:
      "Cabinet installation and cabinet repair support for kitchens, built-ins, storage upgrades, and small remodeling projects from Chattanooga to Knoxville.",
    cityDescription:
      "Cabinet installer support for cabinet installation, storage upgrades, and small remodeling projects.",
    corridorHighlights: [
      "Cabinet installation and fit adjustments",
      "Built-in and storage upgrade support",
      "Trim-ready finish carpentry details",
      "Small remodeling project coordination",
    ],
    cityHighlights: [
      "Cabinet installer for home upgrades",
      "Kitchen, laundry, and storage cabinet installs",
      "Cabinet fit and finish adjustments",
      "Minor renovations with clean finish work",
    ],
    faqTemplate: [
      {
        question: "Do you install cabinets for small remodeling projects?",
        answer:
          "Yes. We install cabinets for storage upgrades, built-ins, laundry rooms, kitchens, and other minor renovation scopes.",
      },
      {
        question: "Can you help with cabinet installation in Athens, TN?",
        answer:
          "Yes. Athens is one of our core service areas for cabinet installation, built-ins, trim work, and home upgrades.",
      },
    ],
  },
  {
    slugBase: "door-repair-installation",
    serviceName: "Door Repair and Installation",
    serviceLabel: "Door Repair",
    corridorDescription:
      "Door repair, door installation, hardware adjustments, trim work, and finish carpentry support from Chattanooga to Knoxville.",
    cityDescription:
      "Door repair and door installation for interior, exterior, and punch-list home repair needs.",
    corridorHighlights: [
      "Door repair and replacement",
      "Interior door installation",
      "Hardware alignment and fit correction",
      "Trim work and finish carpentry touchups",
    ],
    cityHighlights: [
      "Door repair for sticking or damaged doors",
      "Door installation and hardware setup",
      "Trim repair around door openings",
      "Punch-list door adjustments",
    ],
    faqTemplate: [
      {
        question: "Do you handle door repair and door installation?",
        answer:
          "Yes. We repair and install interior and exterior doors, adjust hardware, and complete related trim work when needed.",
      },
      {
        question: "Can door repair be bundled with other home repairs?",
        answer:
          "Yes. Door repair is commonly bundled with drywall repair, trim work, cabinet installation, and punch-list repairs.",
      },
    ],
  },
  {
    slugBase: "property-maintenance",
    serviceName: "Property Maintenance",
    serviceLabel: "Property Maintenance",
    corridorDescription:
      "Property maintenance, rental property repairs, landlord maintenance services, and real estate repair services from Chattanooga to Knoxville.",
    cityDescription:
      "Property maintenance and rental property repairs for landlords, real estate prep, and repair punch lists.",
    corridorHighlights: [
      "Rental property repairs and turnovers",
      "Landlord maintenance services",
      "Real estate repair services before listing",
      "Punch list repairs for move-in readiness",
    ],
    cityHighlights: [
      "Rental property repair support",
      "Landlord maintenance services",
      "Real estate punch-list repairs",
      "Repair technician support for small scopes",
    ],
    faqTemplate: [
      {
        question: "Do you handle rental property repairs?",
        answer:
          "Yes. We support landlords and property managers with rental property repairs, turnover punch lists, and maintenance tasks.",
      },
      {
        question: "Can you help with real estate repair services before a sale?",
        answer:
          "Yes. We complete real estate repair services and punch-list repairs to help homes show better and close cleaner.",
      },
    ],
  },
  {
    slugBase: "repairs-and-installs",
    serviceName: "Repairs and Installs",
    serviceLabel: "Repairs and Installs",
    corridorDescription:
      "Repairs and installs for TV mounting, ceiling fan installation, faucet and sink repair, toilet repair, decks, fences, drywall, doors, and trim from Chattanooga to Knoxville.",
    cityDescription:
      "Repairs and installs for TV mounting, ceiling fan installation, faucet and sink repair, toilet repair, drywall, doors, decks, and fences.",
    corridorHighlights: [
      "TV mounting and fixture installation",
      "Ceiling fan installation requests",
      "Faucet, sink, and toilet repair support",
      "Deck repair and fence repair scopes",
    ],
    cityHighlights: [
      "TV mounting and home installs",
      "Ceiling fan installation scheduling",
      "Faucet, sink, and toilet repair requests",
      "Deck repair and fence repair estimates",
    ],
    faqTemplate: [
      {
        question: "What repair and installation jobs can you quote?",
        answer:
          "We can quote TV mounting, ceiling fan installation, drywall repair, door repair, trim work, cabinet installation, faucet and sink repair, toilet repair, deck repair, and fence repair.",
      },
      {
        question: "Do you take small repair and install projects?",
        answer:
          "Yes. We regularly handle small jobs, quick repairs, minor renovations, home upgrades, and bundled repair lists.",
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

function extraKeywordTargets(slugBase: string, cityName?: string) {
  const city = cityName ? cityName.toLowerCase() : undefined;

  const targetsBySlug: Record<string, string[]> = {
    "handyman-services": [
      "handyman near me",
      city === "cleveland" ? "handyman in cleveland tn" : "handyman near me",
      "handyman in Cleveland TN",
      "same day handyman",
      "small job contractor",
    ],
    "home-repair-services": [
      "home repair services",
      city === "chattanooga" ? "home repair chattanooga tn" : "home repair services",
      "home repair Chattanooga TN",
      "general repair services",
      "home maintenance services",
      "home repair specialist",
      "quick home repairs",
      "emergency home repair",
    ],
    "drywall-repair": ["drywall repair", "drywall repair near me", "home repair specialist"],
    "cabinet-installation": [
      "cabinet installation",
      city === "athens" ? "cabinet installer athens tn" : "cabinet installer near me",
      "cabinet installer Athens TN",
      "home upgrades",
    ],
    "door-repair-installation": [
      "door repair / door installation",
      "door repair",
      "door installation",
      "trim work",
      "finish carpentry",
    ],
    "property-maintenance": [
      "property maintenance",
      "maintenance technician",
      "repair technician",
      "home service professional",
      "rental property repairs",
      "landlord maintenance services",
      "real estate repair services",
      "punch list repairs",
    ],
    "repairs-and-installs": [
      "Repairs & installs",
      "repairs and installs",
      "TV mounting",
      "tv mounting",
      "ceiling fan installation",
      "faucet / sink repair",
      "faucet repair",
      "sink repair",
      "toilet repair",
      "deck repair",
      "fence repair",
      "home improvement services",
      "small remodeling projects",
      "minor renovations",
    ],
  };

  return targetsBySlug[slugBase] ?? [];
}

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
      ...extraKeywordTargets(template.slugBase),
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
        ...extraKeywordTargets(template.slugBase, city.name),
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
