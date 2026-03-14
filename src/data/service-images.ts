export const serviceImageSets: Record<string, string[]> = {
  "custom-carpentry": [
    "/images/services/custom-carpentry-1.jpg",
    "/images/services/custom-carpentry-background-5.jpg",
    "/images/services/custom-carpentry-background-4.jpg",
    "/images/services/custom-carpentry-bunks.jpg",
    "/images/services/custom-carpentry-finish-carpentry.jpg",
    "/images/services/custom-carpentry-bench.jpg",
  ],
  "custom-framing": [
    "/images/services/custom-framing-2.webp",
    "/images/services/custom-framing-4.jpg",
  ],
  "built-ins": [
    "/images/services/built-ins.jpg",
    "/images/services/built-ins-2.webp",
  ],
  "custom-cabinets": [
    "/images/services/custom-cabinets.jpg",
    "/images/services/custom-cabinets-2.webp",
    "/images/services/custom-cabinets-3.webp",
  ],
  "floating-shelves": [
    "/images/services/floating-shelves.jpg",
    "/images/services/floating-shelves-2.jpg",
  ],
  "media-walls": ["/images/services/media-walls.webp"],
  mantels: ["/images/services/mantels.webp"],
  "finish-carpentry": ["/images/services/finish-carpentry.jpeg"],
  "trim-work": ["/images/services/trim-work.jpg"],
  "custom-furniture": ["/images/services/custom-furniture.jpg"],
  "accent-walls": [
    "/images/services/accent-walls.webp",
    "/images/services/accent-walls-2.webp",
  ],
  "wood-feature-installations": [
    "/images/services/wood-feature-installations-accent-wall-finish2.webp",
    "/images/services/wood-feature-installations-bech.webp",
    "/images/services/wood-feature-installations-stacked-wood.webp",
    "/images/services/wood-feature-installations.jpeg",
  ],
};

export const serviceSelectionImages: Record<string, string> = Object.fromEntries(
  Object.entries(serviceImageSets).map(([slug, images]) => [slug, images[0]]),
);
