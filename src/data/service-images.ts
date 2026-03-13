export const serviceImageSets: Record<string, string[]> = {
  "custom-carpentry": ["/images/services/custom-carpentry.jpg"],
  "custom-framing": ["/images/services/custom-framing.jpeg"],
  "built-ins": ["/images/services/built-ins.jpg"],
  "custom-cabinets": ["/images/services/custom-cabinets.jpg"],
  "floating-shelves": [
    "/images/services/floating-shelves.jpg",
    "/images/services/floating-shelves-2.jpg",
  ],
  "media-walls": ["/images/services/media-walls.webp"],
  mantels: ["/images/services/mantels.webp"],
  "finish-carpentry": ["/images/services/finish-carpentry.jpeg"],
  "trim-work": ["/images/services/trim-work.jpg"],
  "custom-furniture": ["/images/services/custom-furniture.jpg"],
  "accent-walls": ["/images/services/accent-walls.webp"],
  "wood-feature-installations": ["/images/services/wood-feature-installations.jpeg"],
};

export const serviceSelectionImages: Record<string, string> = Object.fromEntries(
  Object.entries(serviceImageSets).map(([slug, images]) => [slug, images[0]]),
);
