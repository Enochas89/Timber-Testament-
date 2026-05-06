import { City } from "@/lib/types";

export const cities: City[] = [
  {
    slug: "cleveland-tn",
    name: "Cleveland",
    state: "TN",
    summary:
      "Home repair, handyman support, cabinet installation, trim, built-ins, and custom carpentry for Cleveland homeowners.",
    neighborhoods: ["Downtown Cleveland", "Candies Creek", "South Lee Highway"],
    intro:
      "Timber & Testament helps Cleveland homeowners with repair lists, drywall and door work, cabinet installation, trim upgrades, built-ins, mantels, and finish carpentry with a focus on clean details and long-term function.",
  },
  {
    slug: "chattanooga-tn",
    name: "Chattanooga",
    state: "TN",
    summary:
      "Handyman services, home repair, doors, drywall, cabinet installation, built-ins, and carpentry for Chattanooga homes.",
    neighborhoods: ["North Shore", "St. Elmo", "East Brainerd", "Hixson"],
    intro:
      "From punch-list repairs, door adjustments, drywall patches, and fixture installs to media walls, built-ins, trim upgrades, and mantels, we support Chattanooga homes with practical repair work and clean finish quality.",
  },
  {
    slug: "athens-tn",
    name: "Athens",
    state: "TN",
    summary:
      "Home repair, cabinet installation, built-ins, trim, drywall, door repair, and handyman work for Athens homeowners.",
    neighborhoods: ["Downtown Athens", "Niota corridor", "Englewood side"],
    intro:
      "We help Athens clients handle repair lists, storage upgrades, cabinet installs, drywall touchups, door fixes, floating shelves, mantels, built-ins, and finish trim work.",
  },
  {
    slug: "dalton-ga",
    name: "Dalton",
    state: "GA",
    summary:
      "Home repair, maintenance, trim, doors, drywall, feature walls, and custom carpentry for Dalton interior projects.",
    neighborhoods: ["Downtown Dalton", "Rocky Face", "Tunnel Hill area"],
    intro:
      "Dalton homeowners can request practical repair scopes, trim updates, door and drywall work, cabinet-related upgrades, feature walls, and detail-driven carpentry that improves both function and design continuity.",
  },
  {
    slug: "collegedale-tn",
    name: "Collegedale",
    state: "TN",
    summary:
      "Home repair, handyman tasks, built-ins, accent walls, cabinet work, and finish carpentry for Collegedale homes.",
    neighborhoods: ["Apison border", "Collegedale core", "Ooltewah edge"],
    intro:
      "We support Collegedale homes with repair lists, cabinet installation, trim, door and drywall touchups, custom cabinetry, built-ins, and wall features with an emphasis on fit, finish, and room-specific design.",
  },
  {
    slug: "ooltewah-tn",
    name: "Ooltewah",
    state: "TN",
    summary:
      "Handyman services, home repair, custom cabinets, shelving, door work, drywall, and trim for Ooltewah homeowners.",
    neighborhoods: ["Cambridge Square", "Snow Hill", "Ooltewah Georgetown"],
    intro:
      "Our Ooltewah work includes repair lists, cabinet installation, door adjustments, drywall repair, trim upgrades, shelving, and custom features built around usable storage and clean details.",
  },
  {
    slug: "apison-tn",
    name: "Apison",
    state: "TN",
    summary:
      "Home repair, property maintenance, finish carpentry, doors, drywall, cabinets, and custom woodwork for Apison homes.",
    neighborhoods: ["Apison Pike", "East Brainerd fringe", "Collegedale approach"],
    intro:
      "Apison clients rely on us for repair lists, property maintenance tasks, door and drywall support, cabinet installation, trim upgrades, built-ins, mantels, and media walls.",
  },
  {
    slug: "charleston-tn",
    name: "Charleston",
    state: "TN",
    summary:
      "Home repair, handyman work, trim, cabinets, doors, drywall, floating shelves, and interior wood features for Charleston homes.",
    neighborhoods: ["Hiwassee area", "Central Charleston", "Rural Bradley County"],
    intro:
      "In Charleston, we handle repair lists, door and drywall touchups, cabinet and trim work, custom shelf systems, finish carpentry details, and built wood features that add warmth and function.",
  },
];

export const citySlugSet = new Set(cities.map((city) => city.slug));
