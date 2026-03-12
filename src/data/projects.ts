import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "signal-mountain-built-in-bookcase",
    title: "Built-In Bookcase Wall",
    citySlug: "chattanooga-tn",
    serviceSlug: "built-ins",
    summary:
      "Custom media wall and bookcase system designed for a family living room.",
    scope: [
      "Site measurement and layout",
      "Cabinet carcass fabrication",
      "Trim integration and paint prep",
    ],
    materials: ["Maple plywood", "Poplar face frames", "Primer + enamel top coat"],
    timeline: "8 business days",
    outcome:
      "The finished wall added closed storage, display shelving, and a clean focal point around the media area.",
    imagePath: "/images/project-placeholder.svg",
    isPlaceholder: true,
  },
  {
    slug: "athens-floating-shelf-install",
    title: "Kitchen Floating Shelves",
    citySlug: "athens-tn",
    serviceSlug: "floating-shelves",
    summary:
      "Pair of heavy-duty floating shelves installed above custom tile backsplash.",
    scope: [
      "Blocking location scan",
      "Custom shelf fabrication",
      "Concealed bracket installation",
    ],
    materials: ["White oak", "Steel hidden brackets", "Satin polyurethane"],
    timeline: "3 business days",
    outcome:
      "The homeowner gained accessible daily storage while preserving an open, uncluttered kitchen layout.",
    imagePath: "/images/project-placeholder.svg",
    isPlaceholder: true,
  },
  {
    slug: "dalton-fireplace-mantel-refresh",
    title: "Fireplace Mantel Upgrade",
    citySlug: "dalton-ga",
    serviceSlug: "mantels",
    summary:
      "Existing fireplace surround redesigned with a proportionate custom mantel.",
    scope: [
      "Design review and proportion study",
      "Mantel build and finish",
      "On-site scribing and install",
    ],
    materials: ["Paint-grade hardwood", "Premium trim stock", "Low-sheen enamel"],
    timeline: "5 business days",
    outcome:
      "The upgraded mantel created stronger visual balance and improved the room's focal point.",
    imagePath: "/images/project-placeholder.svg",
    isPlaceholder: true,
  },
];
