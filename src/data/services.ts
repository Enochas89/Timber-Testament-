import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "custom-carpentry",
    name: "Custom Carpentry",
    shortDescription:
      "Bespoke interior woodwork designed and installed for your layout and style.",
    hero: "From concept sketches to final install, we build durable custom wood features that fit your space and daily routine.",
    benefits: [
      "Designed around your exact room dimensions",
      "Built with stable materials suited for Southern humidity",
      "Detailed trim and finish for a clean, high-end look",
    ],
    faqs: [
      {
        question: "How long does a custom carpentry project take?",
        answer:
          "Most single-room projects take 1 to 3 weeks including planning, fabrication, and installation.",
      },
      {
        question: "Can you match existing trim styles?",
        answer:
          "Yes. We profile and match existing trim details so additions blend with the original home design.",
      },
    ],
  },
  {
    slug: "built-ins",
    name: "Custom Built-Ins",
    shortDescription:
      "Built-in storage, media walls, and bookcases that increase function and visual appeal.",
    hero: "We design and install built-ins that look original to the home while solving everyday storage needs.",
    benefits: [
      "Maximizes wall space and storage",
      "Tailored shelving and cabinetry layouts",
      "Clean integration around fireplaces and windows",
    ],
    faqs: [
      {
        question: "Do built-ins add home value?",
        answer:
          "Professionally finished built-ins can improve usability and perceived home value, especially in living and office spaces.",
      },
      {
        question: "Can you include lighting or outlets?",
        answer:
          "Yes. We coordinate with licensed electricians to integrate outlets and accent lighting where needed.",
      },
    ],
  },
  {
    slug: "trim-carpentry",
    name: "Trim Carpentry",
    shortDescription:
      "Precision trim installation for doors, windows, baseboards, and architectural detail.",
    hero: "Crisp trim lines and tight joints that elevate the entire room and support a quality paint finish.",
    benefits: [
      "Sharp miter and cope work",
      "Consistent reveals and spacing",
      "Paint-ready finish details",
    ],
    faqs: [
      {
        question: "Can you replace only damaged trim sections?",
        answer:
          "Yes. We can repair or replace targeted trim sections and match surrounding profiles as closely as possible.",
      },
      {
        question: "Do you handle new construction and remodels?",
        answer:
          "Yes, we provide finish trim services for both remodel and new build projects.",
      },
    ],
  },
  {
    slug: "floating-shelves",
    name: "Floating Shelves",
    shortDescription:
      "Strong, level floating shelves for kitchens, living rooms, and office spaces.",
    hero: "Custom floating shelves that carry real load while preserving a minimal, clean-lined look.",
    benefits: [
      "Concealed heavy-duty mounting systems",
      "Custom stains and paint-grade options",
      "Scaled dimensions for your wall and use case",
    ],
    faqs: [
      {
        question: "How much weight can floating shelves hold?",
        answer:
          "Capacity depends on wall framing and bracket system. We spec each install for the expected load.",
      },
      {
        question: "Can shelves be color matched?",
        answer:
          "Yes. We offer stain and paint matching to complement flooring, cabinets, and trim.",
      },
    ],
  },
  {
    slug: "mantels",
    name: "Custom Mantels",
    shortDescription:
      "Fireplace mantel design and install with clean proportions and durable finish work.",
    hero: "Mantels designed to anchor your living space, with balanced scale and careful fit around your fireplace surround.",
    benefits: [
      "Style options from modern to traditional",
      "Built and scribed for proper fit",
      "Paint-grade and stain-grade finish paths",
    ],
    faqs: [
      {
        question: "Do you build mantels from solid wood or MDF?",
        answer:
          "We use the material that best fits your budget and finish goals, then engineer for durability and clean installation.",
      },
      {
        question: "Can you update an existing fireplace wall?",
        answer:
          "Yes. We can redesign the wall with mantel, trim, and optional built-in elements.",
      },
    ],
  },
  {
    slug: "wainscoting",
    name: "Wainscoting & Wall Paneling",
    shortDescription:
      "Decorative wall paneling layouts that add depth and architectural character.",
    hero: "From simple box molding to full-height feature walls, we install paneling systems that look balanced and intentional.",
    benefits: [
      "Room-specific layout planning",
      "Symmetrical panel spacing",
      "Strong substrate prep for long-term finish quality",
    ],
    faqs: [
      {
        question: "Is wainscoting good for high-traffic areas?",
        answer:
          "Yes. It protects walls from daily wear and gives hallways, dining areas, and stair zones a finished look.",
      },
      {
        question: "Can you install chair rail and crown in the same project?",
        answer:
          "Yes, we frequently combine multiple trim elements for a cohesive wall system.",
      },
    ],
  },
];

export const serviceSlugSet = new Set(services.map((service) => service.slug));
