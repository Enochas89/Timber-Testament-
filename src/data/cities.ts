import { City } from "@/lib/types";

export const cities: City[] = [
  {
    slug: "cleveland-tn",
    name: "Cleveland",
    state: "TN",
    summary:
      "Custom carpentry and built-ins for Cleveland homeowners seeking high-quality, handcrafted interior upgrades.",
    neighborhoods: ["Downtown Cleveland", "Candies Creek", "South Lee Highway"],
    intro:
      "Timber & Testament provides custom cabinets, media walls, mantels, trim work, and finish carpentry in Cleveland with a focus on long-term function and visual impact.",
  },
  {
    slug: "chattanooga-tn",
    name: "Chattanooga",
    state: "TN",
    summary:
      "Custom woodwork, built-ins, and finish carpentry for Chattanooga homes and remodels.",
    neighborhoods: ["North Shore", "St. Elmo", "East Brainerd", "Hixson"],
    intro:
      "From media walls and built-in storage to trim upgrades and mantels, we deliver custom carpentry in Chattanooga with craftsmanship and clean finish quality.",
  },
  {
    slug: "athens-tn",
    name: "Athens",
    state: "TN",
    summary:
      "Handcrafted interior carpentry solutions for Athens homeowners.",
    neighborhoods: ["Downtown Athens", "Niota corridor", "Englewood side"],
    intro:
      "We help Athens clients add practical storage and custom character through built-ins, floating shelves, mantels, and finish trim upgrades.",
  },
  {
    slug: "dalton-ga",
    name: "Dalton",
    state: "GA",
    summary:
      "Custom carpentry and feature wall work for Dalton interior projects.",
    neighborhoods: ["Downtown Dalton", "Rocky Face", "Tunnel Hill area"],
    intro:
      "Dalton homeowners trust us for detail-driven carpentry that improves both function and overall design continuity.",
  },
  {
    slug: "collegedale-tn",
    name: "Collegedale",
    state: "TN",
    summary:
      "Built-ins, accent walls, and finish carpentry crafted for Collegedale homes.",
    neighborhoods: ["Apison border", "Collegedale core", "Ooltewah edge"],
    intro:
      "We install custom cabinetry, trim, and wall features in Collegedale with an emphasis on fit, finish, and room-specific design.",
  },
  {
    slug: "ooltewah-tn",
    name: "Ooltewah",
    state: "TN",
    summary:
      "Custom cabinets, shelving, and trim work for Ooltewah homeowners.",
    neighborhoods: ["Cambridge Square", "Snow Hill", "Ooltewah Georgetown"],
    intro:
      "Our Ooltewah projects are built around usable storage, clean details, and custom features that feel original to the home.",
  },
  {
    slug: "apison-tn",
    name: "Apison",
    state: "TN",
    summary:
      "Finish carpentry and custom woodwork for Apison renovations and homes.",
    neighborhoods: ["Apison Pike", "East Brainerd fringe", "Collegedale approach"],
    intro:
      "Apison clients rely on us for handcrafted wood features, from mantels and media walls to trim upgrades and built-ins.",
  },
  {
    slug: "charleston-tn",
    name: "Charleston",
    state: "TN",
    summary:
      "Custom floating shelves and interior wood features for Charleston homes.",
    neighborhoods: ["Hiwassee area", "Central Charleston", "Rural Bradley County"],
    intro:
      "In Charleston, we deliver custom shelf systems, finish carpentry details, and built wood features that add warmth and function.",
  },
];

export const citySlugSet = new Set(cities.map((city) => city.slug));
