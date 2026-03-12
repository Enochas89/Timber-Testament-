export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  hero: string;
  benefits: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export type City = {
  slug: string;
  name: string;
  state: string;
  summary: string;
  neighborhoods: string[];
  intro: string;
};

export type Project = {
  slug: string;
  title: string;
  citySlug: string;
  serviceSlug: string;
  summary: string;
  scope: string[];
  materials: string[];
  timeline: string;
  outcome: string;
  imagePath: string;
  isPlaceholder?: boolean;
};
