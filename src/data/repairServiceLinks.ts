export type RepairServiceLink = {
  href: string;
  title: string;
  description: string;
};

export const corridorRepairServiceLinks: RepairServiceLink[] = [
  {
    href: "/emergency-home-repair-chattanooga-to-knoxville",
    title: "24/7 Emergency Home Repair",
    description:
      "Emergency repair requests for leaks, plumbing fixture issues, electrical fixture problems, storm damage, doors, windows, drywall, and urgent home safety concerns.",
  },
  {
    href: "/handyman-services-chattanooga-to-knoxville",
    title: "Handyman Services",
    description:
      "Repair lists, fixture swaps, punch-list work, and practical home upgrades across East Tennessee.",
  },
  {
    href: "/home-repair-services-chattanooga-to-knoxville",
    title: "Home Repair Services",
    description:
      "Drywall, doors, trim, fixtures, small repairs, and home maintenance from Chattanooga to Knoxville.",
  },
  {
    href: "/drywall-repair-chattanooga-to-knoxville",
    title: "Drywall Repair",
    description:
      "Patch work, wall damage repair, finish-ready touchups, and bundled home repair scopes.",
  },
  {
    href: "/door-repair-installation-chattanooga-to-knoxville",
    title: "Door Repair and Installation",
    description:
      "Interior and exterior door repair, replacement, hardware adjustment, and trim touchups.",
  },
  {
    href: "/cabinet-installation-chattanooga-to-knoxville",
    title: "Cabinet Installation",
    description:
      "Cabinet installs, storage upgrades, fit adjustments, and small remodeling support.",
  },
  {
    href: "/property-maintenance-chattanooga-to-knoxville",
    title: "Property Maintenance",
    description:
      "Rental repairs, landlord maintenance, real estate punch lists, and turnover support.",
  },
  {
    href: "/repairs-and-installs-chattanooga-to-knoxville",
    title: "Repairs and Installs",
    description:
      "TV mounting, ceiling fans, faucet repair, sink repair, toilet repair, decks, fences, doors, and trim.",
  },
];

export const cityRepairSlugBases = [
  "emergency-home-repair",
  "handyman-services",
  "home-repair-services",
  "drywall-repair",
  "door-repair-installation",
  "cabinet-installation",
  "property-maintenance",
  "repairs-and-installs",
];

const cityRepairTitleBySlugBase: Record<string, string> = {
  "emergency-home-repair": "24/7 Emergency Home Repair",
  "handyman-services": "Handyman",
  "home-repair-services": "Home Repair",
  "drywall-repair": "Drywall Repair",
  "door-repair-installation": "Door Repair",
  "cabinet-installation": "Cabinet Installation",
  "property-maintenance": "Property Maintenance",
  "repairs-and-installs": "Repairs and Installs",
};

const cityLandingSupportedSlugs = new Set([
  "cleveland-tn",
  "chattanooga-tn",
  "athens-tn",
  "knoxville-tn",
]);

export function getCityRepairServiceLinks(city: { slug: string; name: string; state: string }) {
  if (!cityLandingSupportedSlugs.has(city.slug)) {
    return corridorRepairServiceLinks;
  }

  return cityRepairSlugBases.map((slugBase) => ({
    href: `/${slugBase}-${city.slug}`,
    title: `${cityRepairTitleBySlugBase[slugBase]} in ${city.name}, ${city.state}`,
    description:
      slugBase === "emergency-home-repair"
        ? "24/7 emergency repair requests for leaks, plumbing fixture issues, electrical fixture problems, storm damage, doors, windows, drywall, and urgent home safety concerns."
        : "Local repair, install, maintenance, and punch-list support for homeowners and properties.",
  }));
}
