type LocalFaq = {
  question: string;
  answer: string;
};

type LocalServiceContent = {
  citySlug: string;
  serviceSlug: string;
  localIntro: string;
  localHighlights: string[];
  localFaqs: LocalFaq[];
};

const localServiceContent: LocalServiceContent[] = [
  {
    citySlug: "athens-tn",
    serviceSlug: "built-ins",
    localIntro:
      "Athens homeowners often need practical entry and storage upgrades that can handle daily family traffic. Our built-ins are laid out for real use, not just looks.",
    localHighlights: [
      "Custom mudroom and drop-zone storage planning",
      "Built-in layouts tailored to everyday traffic flow",
      "Finish-ready detailing for clean final appearance",
    ],
    localFaqs: [
      {
        question: "Can built-ins be designed around backpacks, shoes, and daily gear?",
        answer:
          "Yes. We size compartments and storage sections around the way your household uses the space every day.",
      },
      {
        question: "Do you build full wall systems or just small units?",
        answer:
          "We do both, from focused storage sections to full wall-to-wall built-in systems.",
      },
    ],
  },
  {
    citySlug: "cleveland-tn",
    serviceSlug: "custom-framing",
    localIntro:
      "For larger Cleveland builds, framing quality directly impacts every trade that follows. We prioritize layout accuracy, structural consistency, and clean sequencing.",
    localHighlights: [
      "Full-house framing for larger floor plans",
      "Opening layout accuracy for windows and doors",
      "Trade-ready execution for next construction phases",
    ],
    localFaqs: [
      {
        question: "Do you take on full-house framing scopes in Cleveland?",
        answer:
          "Yes. We handle complete framing scopes, including primary wall systems and interior layout framing.",
      },
      {
        question: "Can framing quality affect finish timelines later?",
        answer:
          "Absolutely. Accurate framing helps mechanical, drywall, and finish work move faster and cleaner.",
      },
    ],
  },
  {
    citySlug: "chattanooga-tn",
    serviceSlug: "custom-carpentry",
    localIntro:
      "In Chattanooga, we complete custom carpentry projects that blend craftsmanship and practical use, from outdoor builds to detailed interior upgrades.",
    localHighlights: [
      "Project-specific design for your space and layout",
      "Durable material recommendations by use case",
      "Detail-focused install and finish quality",
    ],
    localFaqs: [
      {
        question: "Can you handle custom outdoor and indoor carpentry projects?",
        answer:
          "Yes. We build both interior and exterior custom carpentry features based on your project goals.",
      },
      {
        question: "Do you help with layout decisions before the build starts?",
        answer:
          "Yes. We provide planning input early so the final build fits your space and daily use.",
      },
    ],
  },
  {
    citySlug: "dalton-ga",
    serviceSlug: "accent-walls",
    localIntro:
      "Dalton clients often want one strong focal wall that elevates the whole room. We design balanced accent wall layouts with clean, finish-ready execution.",
    localHighlights: [
      "Pattern and proportion planning by room size",
      "Crisp trim alignment and panel spacing",
      "Prep work completed for a smooth final paint result",
    ],
    localFaqs: [
      {
        question: "Can accent wall layouts be customized to modern or traditional rooms?",
        answer:
          "Yes. We tailor trim profile, spacing, and pattern style to match your room design.",
      },
      {
        question: "Will the wall be ready for paint after installation?",
        answer:
          "Yes. We complete fill, caulk, and prep steps so the wall is paint-ready.",
      },
    ],
  },
  {
    citySlug: "collegedale-tn",
    serviceSlug: "accent-walls",
    localIntro:
      "Collegedale homeowners often choose accent walls to add architectural depth without major renovation work. We focus on symmetry, alignment, and clean transitions.",
    localHighlights: [
      "Custom layout planning around room geometry",
      "Finish carpentry details that create visual depth",
      "Consistent spacing for a clean premium result",
    ],
    localFaqs: [
      {
        question: "Can you design a full feature wall for living areas or bedrooms?",
        answer:
          "Yes. We design and install full-room feature walls based on your preferred style.",
      },
      {
        question: "Do accent walls hold up in high-traffic spaces?",
        answer:
          "Yes, with proper install and finish prep they perform well in active household areas.",
      },
    ],
  },
  {
    citySlug: "ooltewah-tn",
    serviceSlug: "custom-cabinets",
    localIntro:
      "In Ooltewah, custom cabinet projects are often about maximizing storage without making a room feel crowded. We build layouts that improve flow and organization.",
    localHighlights: [
      "Space-specific cabinet planning and sizing",
      "Adjustable storage options where needed",
      "Paint-grade finish quality for a built-in look",
    ],
    localFaqs: [
      {
        question: "Can cabinet storage be designed for changing household needs?",
        answer:
          "Yes. We can include adjustable shelving and flexible storage zones for long-term use.",
      },
      {
        question: "Do custom cabinets have to look bulky?",
        answer:
          "No. Proper layout and proportion keep cabinets functional while maintaining clean room flow.",
      },
    ],
  },
  {
    citySlug: "apison-tn",
    serviceSlug: "finish-carpentry",
    localIntro:
      "Apison finish carpentry projects often focus on raising perceived room quality through better trim lines, cleaner transitions, and stronger detail consistency.",
    localHighlights: [
      "Trim and finish detailing aligned with home style",
      "Consistent joints, reveals, and transition quality",
      "Preparation steps that support a cleaner final finish",
    ],
    localFaqs: [
      {
        question: "Can finish carpentry be done as a targeted room upgrade?",
        answer:
          "Yes. We handle focused room upgrades as well as broader multi-room finish scopes.",
      },
      {
        question: "Will new finish details match the existing home style?",
        answer:
          "Yes. We plan profile and layout details so upgrades blend naturally with the space.",
      },
    ],
  },
  {
    citySlug: "charleston-tn",
    serviceSlug: "floating-shelves",
    localIntro:
      "Charleston shelf projects are usually about balancing clean design with everyday function. We build shelf systems that look minimal while staying structurally solid.",
    localHighlights: [
      "Custom spacing based on storage and display needs",
      "Solid bracket support for long-term stability",
      "Finish options matched to room style",
    ],
    localFaqs: [
      {
        question: "Can floating shelves be both decorative and functional?",
        answer:
          "Yes. We design shelf spacing and structure for real storage while keeping a clean visual profile.",
      },
      {
        question: "Do you install shelf systems in kitchens and dining spaces?",
        answer:
          "Yes. We regularly install shelves in kitchens, dining spaces, and living areas.",
      },
    ],
  },
];

export function getLocalServiceContent(citySlug: string, serviceSlug: string) {
  return localServiceContent.find(
    (item) => item.citySlug === citySlug && item.serviceSlug === serviceSlug,
  );
}
