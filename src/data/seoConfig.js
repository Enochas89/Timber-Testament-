const services = [
  {
    name: "Custom Built-Ins",
    slug: "custom-built-ins",
    shortDescription: "Handcrafted built-in shelving, storage walls, and architectural cabinetry.",
    longDescription:
      "Custom built-ins create durable storage and visual permanence in living rooms, offices, and family spaces where stock furniture cannot fully use wall depth or ceiling height.",
    commonUseCases: ["library walls", "media units", "mudroom storage", "window seat storage"],
    roomTypes: ["living rooms", "home offices", "bonus rooms", "mudrooms"],
    benefits: ["improved storage", "architectural character", "better use of wall space"],
    materials: ["white oak", "walnut", "paint-grade hardwoods", "furniture-grade plywood cores"],
    processNotes: ["measured design", "shop fabrication", "scribe-fit installation", "final hardware tuning"],
    faqSeeds: ["cost", "timeline", "paint vs stain", "design process"],
    relatedServices: ["cabinetry", "custom-libraries", "floating-shelves"],
    serviceEmphasis: "storage-forward architectural millwork"
  },
  {
    name: "Cabinetry",
    slug: "cabinetry",
    shortDescription: "Custom cabinetry built and installed for practical daily use.",
    longDescription:
      "Custom cabinetry improves room function with tailored dimensions, durable hardware, and layout-first planning for kitchens, utility spaces, libraries, and built-in storage zones.",
    commonUseCases: ["kitchen support cabinetry", "home office storage", "laundry storage", "entry drop zones"],
    roomTypes: ["kitchens", "mudrooms", "laundry rooms", "home offices"],
    benefits: ["more organized storage", "improved workflow", "durable long-term use"],
    materials: ["maple", "oak", "paint-grade hardwood", "soft-close hardware"],
    processNotes: ["site measurement", "cabinet layout planning", "shop assembly", "finish-level installation"],
    faqSeeds: ["cabinet layout", "installation timeline", "material choices", "hardware"],
    relatedServices: ["custom-built-ins", "finish-carpentry", "custom-libraries"],
    serviceEmphasis: "daily-use storage and workflow improvements"
  },
  {
    name: "Floating Shelves",
    slug: "floating-shelves",
    shortDescription: "Minimalist floating shelf systems with concealed structural support.",
    longDescription:
      "Floating shelves provide open storage and display without visual bulk, using structural mounting methods tailored to wall conditions, load expectations, and finish goals.",
    commonUseCases: ["kitchen display shelves", "coffee bar shelving", "living room niches", "bath storage shelves"],
    roomTypes: ["kitchens", "living rooms", "bathrooms", "breakfast nooks"],
    benefits: ["open visual feel", "functional display storage", "custom size flexibility"],
    materials: ["solid oak", "walnut", "maple", "powder-coated steel support hardware"],
    processNotes: ["wall structure checks", "level reference layout", "concealed bracket install", "load validation"],
    faqSeeds: ["weight capacity", "material options", "kitchen suitability", "installation process"],
    relatedServices: ["custom-built-ins", "cabinetry", "finish-carpentry"],
    serviceEmphasis: "lightweight visual design with structural performance"
  },
  {
    name: "Mantels",
    slug: "mantels",
    shortDescription: "Custom fireplace mantel design and installation.",
    longDescription:
      "Custom mantels establish a strong focal point around fireplaces with proportion-aware design, code-conscious spacing, and finish details aligned with surrounding trim and cabinetry.",
    commonUseCases: ["fireplace wall refreshes", "new construction focal points", "beam-style mantel upgrades"],
    roomTypes: ["living rooms", "great rooms", "dens"],
    benefits: ["defined focal point", "better room proportion", "cohesive finish quality"],
    materials: ["alder", "oak", "maple", "engineered beam cores"],
    processNotes: ["clearance review", "mounting reinforcement", "mantel fitting", "finish touch-up"],
    faqSeeds: ["clearances", "timeline", "material selection", "mantel size"],
    relatedServices: ["finish-carpentry", "custom-libraries", "cabinetry"],
    serviceEmphasis: "fireplace-centered architectural carpentry"
  },
  {
    name: "Finish Carpentry",
    slug: "finish-carpentry",
    shortDescription: "Detail-focused trim and finish work that completes interiors.",
    longDescription:
      "Finish carpentry brings cohesion to interior spaces through precise casing, base, trim transitions, and final detailing that makes remodel and new-build projects look complete.",
    commonUseCases: ["whole-home trim updates", "door and window casing", "baseboard upgrades", "remodel closeout"],
    roomTypes: ["whole-home", "main living areas", "hallways", "bedrooms"],
    benefits: ["clean transitions", "refined appearance", "consistent trim language"],
    materials: ["paint-grade trim stock", "stain-grade hardwood trim", "caulk and finish products"],
    processNotes: ["profile matching", "precision cutting", "dry-fit sequencing", "paint-ready prep"],
    faqSeeds: ["trim profile matching", "installation duration", "new build vs remodel", "finishing"],
    relatedServices: ["cabinetry", "mantels", "custom-built-ins"],
    serviceEmphasis: "final-stage detailing and trim consistency"
  },
  {
    name: "Custom Libraries",
    slug: "custom-libraries",
    shortDescription: "Floor-to-ceiling library walls with integrated cabinetry and shelving.",
    longDescription:
      "Custom libraries combine storage, display, and architectural structure through full-wall carpentry systems that are designed around room proportion, lighting, and long-term organization goals.",
    commonUseCases: ["study walls", "home office libraries", "living room bookcases", "display cabinetry"],
    roomTypes: ["studies", "home offices", "living rooms", "bonus rooms"],
    benefits: ["organized wall storage", "architectural depth", "long-lasting visual value"],
    materials: ["walnut", "oak", "maple", "paint-grade hardwood"],
    processNotes: ["wall system planning", "cabinet and shelf fabrication", "on-site fitting", "finish detailing"],
    faqSeeds: ["library layout", "cost factors", "wood species", "project timeline"],
    relatedServices: ["custom-built-ins", "cabinetry", "floating-shelves"],
    serviceEmphasis: "full-wall architectural storage systems"
  }
];

const cities = [
  {
    tier: 1,
    name: "Cleveland",
    slug: "cleveland-tn",
    state: "TN",
    county: "Bradley County",
    nearbyCities: ["Charleston", "Athens", "Ooltewah"],
    landmarks: ["Downtown Cleveland", "Lee University"],
    localAreas: ["North Cleveland", "South Cleveland", "Inman Street corridor"],
    localNotes: [
      "Many Cleveland homeowners want built-ins that maximize wall space while matching existing trim lines.",
      "Cabinetry and library walls are common upgrades for families improving storage in primary living areas."
    ],
    serviceEmphasis: ["custom-built-ins", "cabinetry"],
    introPhrases: ["in Cleveland homes", "across Cleveland neighborhoods"]
  },
  {
    tier: 1,
    name: "Athens",
    slug: "athens-tn",
    state: "TN",
    county: "McMinn County",
    nearbyCities: ["Etowah", "Riceville", "Calhoun"],
    landmarks: ["Downtown Athens", "Tennessee Wesleyan University"],
    localAreas: ["North Athens", "Decatur Pike corridor"],
    localNotes: [
      "Athens remodels often combine practical cabinetry upgrades with trim refinements.",
      "Homeowners frequently request floating shelves and built-ins for flexible everyday storage."
    ],
    serviceEmphasis: ["floating-shelves", "finish-carpentry"],
    introPhrases: ["throughout Athens", "for Athens-area homeowners"]
  },
  {
    tier: 1,
    name: "Charleston",
    slug: "charleston-tn",
    state: "TN",
    county: "Bradley County",
    nearbyCities: ["Cleveland", "Calhoun", "Georgetown"],
    landmarks: ["Hiwassee River area", "Charleston town center"],
    localAreas: ["river corridor homes", "central Charleston"],
    localNotes: [
      "Charleston projects usually prioritize practical upgrades that improve room function first.",
      "Custom carpentry is commonly used to replace temporary storage with built-to-fit solutions."
    ],
    serviceEmphasis: ["custom-built-ins", "cabinetry"]
  },
  {
    tier: 1,
    name: "Ooltewah",
    slug: "ooltewah-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Collegedale", "Apison", "Chattanooga"],
    landmarks: ["Cambridge Square", "Main Street Ooltewah"],
    localAreas: ["Cambridge Square area", "Hampton Creek"],
    localNotes: [
      "Ooltewah homeowners often ask for clean-lined trim and statement built-ins in open-concept spaces.",
      "Projects frequently combine finish carpentry and cabinetry for cohesive room updates."
    ],
    serviceEmphasis: ["finish-carpentry", "cabinetry"]
  },
  {
    tier: 1,
    name: "Collegedale",
    slug: "collegedale-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Ooltewah", "Apison", "East Ridge"],
    landmarks: ["Southern Adventist University", "Little Debbie Park"],
    localAreas: ["Wolftever Creek area", "college district"],
    localNotes: [
      "Collegedale projects often focus on storage improvements and trim consistency in family homes.",
      "Clients regularly request custom libraries and floating shelves for home office and study spaces."
    ],
    serviceEmphasis: ["custom-libraries", "floating-shelves"]
  },
  {
    tier: 1,
    name: "Apison",
    slug: "apison-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Ooltewah", "Collegedale", "East Ridge"],
    landmarks: ["Apison Pike corridor", "rural-residential Apison"],
    localAreas: ["Apison Pike homes", "east Hamilton outskirts"],
    localNotes: [
      "Apison homeowners typically prioritize durable custom work that matches newer interior layouts.",
      "Built-ins and cabinetry are common for improving storage without crowding open rooms."
    ],
    serviceEmphasis: ["custom-built-ins", "cabinetry"]
  },
  {
    tier: 1,
    name: "Chattanooga",
    slug: "chattanooga-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Red Bank", "East Ridge", "Hixson"],
    landmarks: ["North Shore", "Southside"],
    localAreas: ["Missionary Ridge", "St. Elmo", "downtown neighborhoods"],
    localNotes: [
      "Chattanooga homes range from historic properties to modern renovations, requiring fit-specific carpentry planning.",
      "Custom libraries, trim refreshes, and mantel upgrades are frequent requests across the metro area."
    ],
    serviceEmphasis: ["custom-libraries", "mantels"]
  },
  {
    tier: 1,
    name: "Calhoun",
    slug: "calhoun-tn",
    state: "TN",
    county: "McMinn County",
    nearbyCities: ["Cleveland", "Athens", "Charleston"],
    landmarks: ["Calhoun community center", "Hiwassee access areas"],
    localAreas: ["Hwy 11 corridor", "town center neighborhoods"],
    localNotes: [
      "Calhoun projects often emphasize practical space planning and durable finishes.",
      "Homeowners commonly choose custom built-ins and cabinetry for long-term function."
    ],
    serviceEmphasis: ["custom-built-ins", "cabinetry"]
  },
  {
    tier: 1,
    name: "Riceville",
    slug: "riceville-tn",
    state: "TN",
    county: "McMinn County",
    nearbyCities: ["Athens", "Calhoun", "Charleston"],
    landmarks: ["Riceville Pike area", "rural McMinn communities"],
    localAreas: ["farm-adjacent neighborhoods", "Riceville center"],
    localNotes: [
      "Riceville homeowners often request custom carpentry that balances durability with clean interior design.",
      "Finish carpentry and shelving upgrades are popular in incremental remodel projects."
    ],
    serviceEmphasis: ["finish-carpentry", "floating-shelves"]
  },
  {
    tier: 1,
    name: "Benton",
    slug: "benton-tn",
    state: "TN",
    county: "Polk County",
    nearbyCities: ["Cleveland", "Georgetown", "Etowah"],
    landmarks: ["Ocoee corridor", "Benton town center"],
    localAreas: ["Polk County residential areas", "river corridor homes"],
    localNotes: [
      "Benton projects often account for humidity swings and high-traffic household use.",
      "Custom shelving, cabinetry, and finish carpentry are common for everyday functionality."
    ],
    serviceEmphasis: ["floating-shelves", "finish-carpentry"]
  },
  {
    tier: 2,
    name: "Soddy-Daisy",
    slug: "soddy-daisy-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Hixson", "Dayton", "Sale Creek"],
    landmarks: ["Chickamauga Lake", "Soddy Creek area"],
    localAreas: ["Lakesite-adjacent neighborhoods", "north Hamilton homes"],
    localNotes: [
      "Soddy-Daisy clients often prioritize resilient materials and practical storage upgrades.",
      "Mantel, trim, and built-in projects are frequently requested during interior refreshes."
    ],
    serviceEmphasis: ["mantels", "custom-built-ins"]
  },
  {
    tier: 2,
    name: "Harrison",
    slug: "harrison-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Ooltewah", "Chattanooga", "Hixson"],
    landmarks: ["Chickamauga Lake shoreline", "Harrison Bay area"],
    localAreas: ["lake-adjacent neighborhoods", "Harrison Pike corridor"],
    localNotes: [
      "Harrison homes often benefit from storage-focused carpentry planned around open living spaces.",
      "Cabinetry and finish carpentry projects are common in phased remodel work."
    ],
    serviceEmphasis: ["cabinetry", "finish-carpentry"]
  },
  {
    tier: 2,
    name: "Dayton",
    slug: "dayton-tn",
    state: "TN",
    county: "Rhea County",
    nearbyCities: ["Soddy-Daisy", "Sale Creek", "Decatur"],
    landmarks: ["Downtown Dayton", "Chickamauga Lake area"],
    localAreas: ["Rhea County neighborhoods", "lake corridor homes"],
    localNotes: [
      "Dayton homeowners often prioritize long-lasting materials and straightforward installation plans.",
      "Custom built-ins and finish carpentry are common upgrades for family living areas."
    ],
    serviceEmphasis: ["custom-built-ins", "finish-carpentry"]
  },
  {
    tier: 2,
    name: "Georgetown",
    slug: "georgetown-tn",
    state: "TN",
    county: "Bradley County",
    nearbyCities: ["Cleveland", "Charleston", "Benton"],
    landmarks: ["Hwy 58 corridor", "river-access communities"],
    localAreas: ["Georgetown center", "Bradley County outskirts"],
    localNotes: [
      "Georgetown projects often focus on practical room upgrades with durable finishes.",
      "Floating shelves and cabinetry are frequent requests for kitchen and living spaces."
    ],
    serviceEmphasis: ["floating-shelves", "cabinetry"]
  },
  {
    tier: 2,
    name: "Decatur",
    slug: "decatur-tn",
    state: "TN",
    county: "Meigs County",
    nearbyCities: ["Dayton", "Athens", "Etowah"],
    landmarks: ["Downtown Decatur", "Tennessee River access"],
    localAreas: ["river-side homes", "Meigs County neighborhoods"],
    localNotes: [
      "Decatur homeowners commonly request cabinetry and built-ins that improve daily organization.",
      "Custom carpentry projects often combine storage needs with cleaner trim transitions."
    ],
    serviceEmphasis: ["cabinetry", "custom-built-ins"]
  },
  {
    tier: 2,
    name: "Etowah",
    slug: "etowah-tn",
    state: "TN",
    county: "McMinn County",
    nearbyCities: ["Athens", "Englewood", "Decatur"],
    landmarks: ["Etowah Depot", "downtown Etowah"],
    localAreas: ["mountain-view neighborhoods", "central Etowah"],
    localNotes: [
      "Etowah projects often focus on trim updates and storage improvements in established homes.",
      "Homeowners frequently request finish carpentry and custom libraries for better room structure."
    ],
    serviceEmphasis: ["finish-carpentry", "custom-libraries"]
  },
  {
    tier: 2,
    name: "Englewood",
    slug: "englewood-tn",
    state: "TN",
    county: "McMinn County",
    nearbyCities: ["Athens", "Etowah", "Riceville"],
    landmarks: ["Englewood center", "Hwy 39 corridor"],
    localAreas: ["residential Englewood", "county-line homes"],
    localNotes: [
      "Englewood homeowners often prioritize practical cabinetry and trim upgrades.",
      "Custom libraries and floating shelves are common in home office and living-room remodels."
    ],
    serviceEmphasis: ["cabinetry", "custom-libraries"]
  },
  {
    tier: 2,
    name: "Sale Creek",
    slug: "sale-creek-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Soddy-Daisy", "Dayton", "Hixson"],
    landmarks: ["Sale Creek valley", "north Hamilton corridor"],
    localAreas: ["rural-residential areas", "creekside neighborhoods"],
    localNotes: [
      "Sale Creek projects typically emphasize sturdy installation and useful storage improvements.",
      "Finish carpentry and built-ins are frequent requests for long-term daily use."
    ],
    serviceEmphasis: ["finish-carpentry", "custom-built-ins"]
  },
  {
    tier: 2,
    name: "Birchwood",
    slug: "birchwood-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Georgetown", "Sale Creek", "Dayton"],
    landmarks: ["Birchwood Pike area", "Tennessee River plain"],
    localAreas: ["rural neighborhoods", "north county homes"],
    localNotes: [
      "Birchwood homeowners often request cabinetry and shelving that improve storage without overbuilding rooms.",
      "Projects commonly focus on practical function and easy long-term maintenance."
    ],
    serviceEmphasis: ["cabinetry", "floating-shelves"]
  },
  {
    tier: 2,
    name: "Dunlap",
    slug: "dunlap-tn",
    state: "TN",
    county: "Sequatchie County",
    nearbyCities: ["Signal Mountain", "Red Bank", "Soddy-Daisy"],
    landmarks: ["Dunlap valley", "downtown Dunlap"],
    localAreas: ["Sequatchie County neighborhoods", "ridge-adjacent homes"],
    localNotes: [
      "Dunlap projects often blend storage upgrades with finish carpentry for cleaner room transitions.",
      "Custom mantels and built-ins are common focal upgrades in living spaces."
    ],
    serviceEmphasis: ["mantels", "custom-built-ins"]
  },
  {
    tier: 3,
    name: "Red Bank",
    slug: "red-bank-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Chattanooga", "Hixson", "Signal Mountain"],
    landmarks: ["Dayton Boulevard corridor", "Stringers Ridge area"],
    localAreas: ["Red Bank neighborhoods", "north Chattanooga edge"],
    localNotes: [
      "Red Bank homeowners often request finish carpentry and cabinetry updates during interior remodels.",
      "Projects frequently focus on efficient storage and trim consistency in established homes."
    ],
    serviceEmphasis: ["finish-carpentry", "cabinetry"]
  },
  {
    tier: 3,
    name: "Signal Mountain",
    slug: "signal-mountain-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Red Bank", "Chattanooga", "Dunlap"],
    landmarks: ["Signal Point area", "mountain-top neighborhoods"],
    localAreas: ["brow homes", "plateau neighborhoods"],
    localNotes: [
      "Signal Mountain projects often emphasize custom detailing and high-finish carpentry execution.",
      "Custom libraries, mantels, and built-ins are common requests for focal living areas."
    ],
    serviceEmphasis: ["custom-libraries", "mantels"]
  },
  {
    tier: 3,
    name: "Lookout Mountain",
    slug: "lookout-mountain-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Chattanooga", "Signal Mountain", "Red Bank"],
    landmarks: ["Lookout Mountain neighborhoods", "scenic ridge homes"],
    localAreas: ["historic homes", "ridge-line residential streets"],
    localNotes: [
      "Lookout Mountain homes often require careful profile matching and trim continuity.",
      "Finish carpentry and custom cabinetry are frequent needs in historic or character-rich interiors."
    ],
    serviceEmphasis: ["finish-carpentry", "cabinetry"]
  },
  {
    tier: 3,
    name: "East Ridge",
    slug: "east-ridge-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Chattanooga", "Apison", "Red Bank"],
    landmarks: ["Ringgold Road corridor", "Camp Jordan area"],
    localAreas: ["central East Ridge", "residential side streets"],
    localNotes: [
      "East Ridge homeowners commonly request practical cabinetry and built-ins for better everyday storage.",
      "Floating shelves and trim updates are popular for phased interior improvements."
    ],
    serviceEmphasis: ["cabinetry", "floating-shelves"]
  },
  {
    tier: 3,
    name: "Hixson",
    slug: "hixson-tn",
    state: "TN",
    county: "Hamilton County",
    nearbyCities: ["Red Bank", "Chattanooga", "Soddy-Daisy"],
    landmarks: ["Northgate area", "Hixson Pike corridor"],
    localAreas: ["Big Ridge", "middle valley neighborhoods"],
    localNotes: [
      "Hixson projects often center on built-ins, cabinetry, and trim upgrades for growing households.",
      "Homeowners frequently prioritize durable materials and clear installation timelines."
    ],
    serviceEmphasis: ["custom-built-ins", "cabinetry"]
  }
];

const introTemplates = [
  "Timber & Testament designs and installs custom {service} {cityIntro} with a focus on function, finish quality, and long-term durability.",
  "Homeowners {cityIntro} choose Timber & Testament for handcrafted {service} that are field-measured and built for real daily use.",
  "Our team builds premium {service} {cityIntro}, combining practical layout planning with finish-grade carpentry standards.",
  "When stock options do not fit your room, we provide custom {service} {cityIntro} with clear scope and predictable installation steps."
];

const serviceExplanationTemplates = [
  "{serviceLong} In {city}, this service is commonly selected for {useCaseA} and {useCaseB}.",
  "{serviceLong} Many {city} homeowners request this work for {roomTypeA} and {roomTypeB} where standard products do not fit well.",
  "{serviceLong} We typically scope projects around {roomTypeA} and {roomTypeB} so results match your layout and daily routines."
];

const localParagraphTemplates = [
  "Homes in {city} vary from established neighborhoods to newer builds, which is why measurement-first planning matters for {service} work.",
  "Across {city}, custom {service} projects are often used to improve storage and maintain design consistency room to room.",
  "In {city}, many homeowners choose custom {service} to replace temporary furniture solutions with permanent, fitted carpentry."
];

const processTemplates = [
  "We start with consultation and site measurements so scope is based on real wall, ceiling, and traffic-flow conditions.",
  "Design and materials are aligned before fabrication, including profile details, finish direction, and sequencing.",
  "Core components are fabricated for fit consistency and cleaner installation on site.",
  "Installation includes leveling, detail refinements, and final walkthrough checks before closeout."
];

const ctaTemplates = [
  "Request a quote for {service} in {city}",
  "Schedule an estimate for your {service} project in {city}",
  "Talk with Timber & Testament about {service} for your {city} home",
  "Start planning custom {service} in {city}"
];

const faqTemplates = [
  {
    q: "How much does {service} cost in {city} {state}?",
    a: "Pricing depends on dimensions, material selections, finish detail, and installation complexity. We provide project-specific estimates after a site review and scope discussion."
  },
  {
    q: "How long does a typical {service} project take in {city}?",
    a: "Timeline depends on design complexity and fabrication lead time. Most projects move through consultation, build planning, fabrication, and installation in scheduled phases."
  },
  {
    q: "What materials do you recommend for {service} in Tennessee homes?",
    a: "Material selection depends on style goals, wear expectations, and room conditions. We commonly recommend durable hardwoods and finish systems suited to everyday use."
  },
  {
    q: "Do you provide design guidance before installation?",
    a: "Yes. We guide dimensions, profile decisions, and finish options before fabrication so your project fits the architecture and function of the room."
  },
  {
    q: "Do you serve neighborhoods outside downtown {city}?",
    a: "Yes. We work across {county} and nearby communities, with scheduling based on project scope and installation access."
  },
  {
    q: "Can this work be phased if I have multiple rooms?",
    a: "Yes. Many homeowners phase projects by room and priority so each stage delivers meaningful improvements while keeping budget and schedule manageable."
  }
];

const cityHubFaqTemplates = [
  {
    q: "What carpentry services are most requested in {city} {state}?",
    a: "Homeowners in {city} commonly request built-ins, cabinetry, floating shelves, finish carpentry, mantels, and custom library features depending on room layout and storage goals."
  },
  {
    q: "Do you provide on-site estimates in {city}?",
    a: "Yes. We schedule site visits in {city} to verify dimensions, discuss priorities, and provide practical scope recommendations before fabrication begins."
  },
  {
    q: "Can projects in {city} be completed in stages?",
    a: "Yes. We can phase work room-by-room so homeowners can prioritize high-impact spaces first while maintaining a coordinated finish approach."
  },
  {
    q: "Do you also serve nearby communities around {city}?",
    a: "Yes. We regularly work in nearby areas including {nearbyA} and {nearbyB}, with scheduling based on scope and current production windows."
  }
];

const serviceHubFaqTemplates = [
  {
    q: "What affects {service} project pricing?",
    a: "Key factors include dimensions, material choices, finish level, and installation complexity. We provide clear estimates after reviewing your space and goals."
  },
  {
    q: "How long does custom {service} installation usually take?",
    a: "Timeline depends on design complexity and fabrication requirements. Most projects are scoped with clear consultation, fabrication, and install phases."
  },
  {
    q: "Can {service} be matched to existing trim and finishes?",
    a: "Yes. We review existing profiles and finish direction to align new work with your home where practical."
  },
  {
    q: "Do you offer {service} across Southeast Tennessee?",
    a: "Yes. We provide {service} across Cleveland and surrounding communities with route coverage throughout the greater service area."
  }
];

const anchorTemplates = {
  serviceToCity: [
    "{service} in {city}",
    "local {service} for {city} homes",
    "explore {service} options in {city}",
    "{city} {service} page"
  ],
  cityToService: [
    "{service} services in {city}",
    "{city} homeowners: {service}",
    "view {service} in {city}",
    "{service} for {city} homes"
  ],
  relatedService: [
    "related service: {service}",
    "also consider {service}",
    "see {service} options",
    "learn about {service}"
  ]
};

module.exports = {
  services,
  cities,
  introTemplates,
  serviceExplanationTemplates,
  localParagraphTemplates,
  processTemplates,
  ctaTemplates,
  faqTemplates,
  cityHubFaqTemplates,
  serviceHubFaqTemplates,
  anchorTemplates
};