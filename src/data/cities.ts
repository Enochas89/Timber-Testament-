import { City } from "@/lib/types";

export const cities: City[] = [
  {
    slug: "chattanooga-tn",
    name: "Chattanooga",
    state: "TN",
    summary:
      "Custom carpentry for historic and modern homes across Chattanooga neighborhoods.",
    neighborhoods: ["North Shore", "St. Elmo", "Hixson", "East Brainerd"],
    intro:
      "We provide detail-driven finish carpentry in Chattanooga, including built-ins, custom trim, mantels, and wall paneling for remodeling and new construction projects.",
  },
  {
    slug: "athens-tn",
    name: "Athens",
    state: "TN",
    summary:
      "Built-ins, trim, and wood features tailored to Athens homes and renovations.",
    neighborhoods: ["Downtown Athens", "Niota outskirts", "Englewood corridor"],
    intro:
      "Homeowners in Athens choose us for practical custom carpentry that improves storage, elevates finish quality, and fits the style of the home.",
  },
  {
    slug: "dalton-ga",
    name: "Dalton",
    state: "GA",
    summary:
      "Custom carpentry and finish woodwork for Dalton interior upgrades.",
    neighborhoods: ["Downtown Dalton", "Rocky Face", "Tunnel Hill area"],
    intro:
      "In Dalton, we build and install custom interior woodwork with a focus on fit, proportion, and long-term durability.",
  },
  {
    slug: "collegedale-tn",
    name: "Collegedale",
    state: "TN",
    summary:
      "Architectural trim and custom built-ins for Collegedale homes.",
    neighborhoods: ["Collegedale core", "Apison border", "Ooltewah edge"],
    intro:
      "We help Collegedale homeowners add function and style with cleanly installed built-ins, mantels, trim, and paneling.",
  },
  {
    slug: "ooltewah-tn",
    name: "Ooltewah",
    state: "TN",
    summary:
      "Finish carpentry and custom wood features for Ooltewah interiors.",
    neighborhoods: ["Cambridge Square", "Snow Hill", "Ooltewah Georgetown"],
    intro:
      "From statement walls to practical storage, our Ooltewah carpentry projects are designed around how you live in the space.",
  },
  {
    slug: "apison-tn",
    name: "Apison",
    state: "TN",
    summary:
      "Custom carpentry services for Apison renovations and new homes.",
    neighborhoods: ["Apison Pike", "East Brainerd fringe", "Collegedale approach"],
    intro:
      "Apison clients rely on us for precise carpentry execution, from trim packages to custom shelving and built-in cabinetry.",
  },
];

export const citySlugSet = new Set(cities.map((city) => city.slug));
