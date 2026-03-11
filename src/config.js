
const business = {
  name: "Timber & Testament Custom Carpentry",
  legalName: "Timber & Testament Custom Carpentry",
  type: "Custom Carpentry / Finish Carpentry / Woodworking",
  category: "Carpenter",
  phone: "+1-423-555-0142",
  email: "hello@timberandtestament.com",
  website: "https://www.timberandtestament.com",
  streetAddress: "1250 Inman Street East",
  addressLocality: "Cleveland",
  addressRegion: "TN",
  postalCode: "37311",
  addressCountry: "US",
  geo: {
    latitude: "35.1595",
    longitude: "-84.8766"
  },
  primaryCity: "Cleveland, Tennessee",
  primaryRegion: "Southeast Tennessee",
  serviceArea: [
    "Cleveland TN",
    "Charleston TN",
    "Athens TN",
    "Ooltewah TN",
    "Collegedale TN",
    "Chattanooga TN",
    "Dayton TN",
    "Etowah TN",
    "Sweetwater TN",
    "Calhoun TN",
    "Benton TN",
    "Soddy Daisy TN",
    "Ringgold GA",
    "Fort Oglethorpe GA",
    "Dalton GA"
  ],
  mapEmbedUrl: "https://www.google.com/maps?q=Cleveland+TN+carpentry&output=embed",
  profileUrls: {
    google: "https://www.google.com/search?q=Timber+and+Testament+Custom+Carpentry+reviews",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    houzz: "https://www.houzz.com/"
  },
  tracking: {
    gtmId: "",
    ga4Id: ""
  },
  defaultOgImage: "/assets/images/custom-carpentry-cleveland-tn.jpg",
  hours: ["Mo-Fr 08:00-17:30", "Sa 09:00-13:00"],
  yearFounded: "2018"
};

const services = [
  {
    name: "Custom Carpentry",
    shortName: "Custom Carpentry",
    category: "General",
    heroFocus: "detail-rich interior woodwork",
    sellingPoints: ["tailored dimensions", "architectural consistency", "finish-grade execution"],
    homeownerBenefits: ["better space efficiency", "long-term durability", "higher perceived home value"],
    commonUseCases: ["whole-home trim upgrades", "built-in storage", "feature wall detailing"],
    faqPool: "general",
    processPool: "general"
  },
  {
    name: "Custom Built-Ins",
    shortName: "Built-Ins",
    category: "Storage",
    heroFocus: "integrated storage and display",
    sellingPoints: ["wall-to-wall fit", "hidden storage options", "seamless media integration"],
    homeownerBenefits: ["less clutter", "better room flow", "increased resale appeal"],
    commonUseCases: ["media walls", "living room storage", "mudroom organization"],
    faqPool: "builtins",
    processPool: "storage"
  },
  {
    name: "Trim Carpentry",
    shortName: "Trim Work",
    category: "Trim",
    heroFocus: "crisp lines and balanced proportions",
    sellingPoints: ["clean reveals", "profile matching", "tight joints"],
    homeownerBenefits: ["refined finish quality", "architectural definition", "improved room transitions"],
    commonUseCases: ["door and window casings", "baseboard upgrades", "remodel finish packages"],
    faqPool: "trim",
    processPool: "trim"
  },
  {
    name: "Finish Carpentry",
    shortName: "Finish Carpentry",
    category: "Trim",
    heroFocus: "final-stage interior detailing",
    sellingPoints: ["precise fitting", "high-end appearance", "jobsite coordination"],
    homeownerBenefits: ["polished interiors", "durable details", "better project outcomes"],
    commonUseCases: ["remodel closeout", "new-construction finish", "multi-room carpentry"],
    faqPool: "general",
    processPool: "trim"
  },
  {
    name: "Floating Shelves",
    shortName: "Floating Shelves",
    category: "Storage",
    heroFocus: "minimalist storage with visual warmth",
    sellingPoints: ["hidden supports", "weight-rated installations", "custom depth and length"],
    homeownerBenefits: ["functional display", "open visual feel", "kitchen and living flexibility"],
    commonUseCases: ["kitchen shelving", "living room niches", "bathroom storage"],
    faqPool: "shelves",
    processPool: "storage"
  },
  {
    name: "Mantels",
    shortName: "Mantels",
    category: "Feature",
    heroFocus: "fireplace-centered craftsmanship",
    sellingPoints: ["custom beam profiles", "safe clearance planning", "finish-matched installation"],
    homeownerBenefits: ["strong focal point", "improved living room style", "custom architectural character"],
    commonUseCases: ["fireplace refreshes", "new build focal walls", "living room remodels"],
    faqPool: "mantels",
    processPool: "feature"
  },
  {
    name: "Accent Walls",
    shortName: "Accent Walls",
    category: "Feature",
    heroFocus: "high-impact feature wall carpentry",
    sellingPoints: ["accurate layout", "custom trim geometry", "paint-ready finish"],
    homeownerBenefits: ["instant visual depth", "personalized style", "defined focal points"],
    commonUseCases: ["entry walls", "bedroom features", "dining room statement walls"],
    faqPool: "feature",
    processPool: "feature"
  },
  {
    name: "Custom Cabinets",
    shortName: "Custom Cabinets",
    category: "Storage",
    heroFocus: "built-to-fit cabinetry solutions",
    sellingPoints: ["optimized storage planning", "quality hardware", "finish consistency"],
    homeownerBenefits: ["better organization", "improved workflow", "durable daily function"],
    commonUseCases: ["mudrooms", "home offices", "laundry rooms"],
    faqPool: "storage",
    processPool: "storage"
  },
  {
    name: "Woodworking",
    shortName: "Woodworking",
    category: "General",
    heroFocus: "custom wood fabrication and detailing",
    sellingPoints: ["material selection guidance", "shop-built precision", "bespoke outcomes"],
    homeownerBenefits: ["tailored aesthetics", "durable craftsmanship", "project flexibility"],
    commonUseCases: ["decorative features", "custom trim elements", "specialty millwork"],
    faqPool: "general",
    processPool: "general"
  },
  {
    name: "Interior Wood Features",
    shortName: "Interior Wood Features",
    category: "Feature",
    heroFocus: "architectural wood details",
    sellingPoints: ["design cohesion", "custom fabrication", "professional finishing"],
    homeownerBenefits: ["elevated interior character", "cohesive style", "lasting quality"],
    commonUseCases: ["niche features", "entry details", "room framing accents"],
    faqPool: "feature",
    processPool: "feature"
  },
  {
    name: "Built-in Bookcases",
    shortName: "Built-in Bookcases",
    category: "Storage",
    heroFocus: "library-style wall storage",
    sellingPoints: ["adjustable shelf planning", "integrated lighting options", "space-maximizing layouts"],
    homeownerBenefits: ["organized display", "architectural balance", "improved room utility"],
    commonUseCases: ["home offices", "living room libraries", "hallway built-ins"],
    faqPool: "builtins",
    processPool: "storage"
  },
  {
    name: "Coffered Ceilings",
    shortName: "Coffered Ceilings",
    category: "Ceilings",
    heroFocus: "ceiling dimension and architectural depth",
    sellingPoints: ["precise grid layout", "proportion control", "integrated trim finishing"],
    homeownerBenefits: ["luxury appearance", "strong room definition", "resale-ready detail"],
    commonUseCases: ["dining rooms", "great rooms", "formal living spaces"],
    faqPool: "ceiling",
    processPool: "feature"
  },
  {
    name: "Wainscoting",
    shortName: "Wainscoting",
    category: "Wall Detailing",
    heroFocus: "structured wall panel treatments",
    sellingPoints: ["symmetrical panel layout", "impact-resistant finishes", "custom profile options"],
    homeownerBenefits: ["durable wall protection", "high-end style", "room-by-room design consistency"],
    commonUseCases: ["dining rooms", "hallways", "entry spaces"],
    faqPool: "wallpanel",
    processPool: "feature"
  },
  {
    name: "Crown Molding",
    shortName: "Crown Molding",
    category: "Trim",
    heroFocus: "clean ceiling-line transitions",
    sellingPoints: ["tight corner joints", "profile matching", "smooth paint-ready finish"],
    homeownerBenefits: ["refined architecture", "strong visual continuity", "finished-room look"],
    commonUseCases: ["whole-home trim updates", "new build finish", "living area upgrades"],
    faqPool: "trim",
    processPool: "trim"
  },
  {
    name: "Custom Wall Paneling",
    shortName: "Wall Paneling",
    category: "Wall Detailing",
    heroFocus: "bespoke wall texture and depth",
    sellingPoints: ["custom panel layouts", "material flexibility", "paint or stain-ready options"],
    homeownerBenefits: ["statement interiors", "durable finish", "style personalization"],
    commonUseCases: ["bedroom feature walls", "home offices", "foyer focal walls"],
    faqPool: "wallpanel",
    processPool: "feature"
  }
];

const cities = [
  {
    name: "Cleveland",
    state: "TN",
    county: "Bradley County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Hopewell", "McDonald", "Georgetown"],
    neighborhoods: ["Historic Downtown Cleveland", "North Cleveland", "South Cleveland"],
    landmarks: ["Lee University", "Red Clay State Historic Park"],
    housingStyle: "a mix of classic brick ranches and newer suburban homes",
    localNotes: "Many homes in Cleveland benefit from storage-forward built-ins and trim refreshes.",
    serviceAreaWording: "Cleveland metro neighborhoods and nearby Bradley County communities"
  },
  {
    name: "Charleston",
    state: "TN",
    county: "Bradley County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Calhoun", "Georgetown", "Cleveland"],
    neighborhoods: ["Hiwassee River corridor", "Central Charleston"],
    landmarks: ["Hiwassee River Heritage Center", "Charleston Waterfront"],
    housingStyle: "rural and suburban homes with frequent remodel opportunities",
    localNotes: "Charleston projects often combine storage improvements with durable finish upgrades.",
    serviceAreaWording: "Charleston and surrounding Bradley County neighborhoods"
  },
  {
    name: "Athens",
    state: "TN",
    county: "McMinn County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Etowah", "Riceville", "Englewood"],
    neighborhoods: ["Downtown Athens", "North Athens", "Starr Mountain area"],
    landmarks: ["Tennessee Wesleyan University", "Mayfield Dairy Farms"],
    housingStyle: "historic neighborhoods blended with newer family subdivisions",
    localNotes: "Athens homeowners frequently request floating shelves and built-in bookcases.",
    serviceAreaWording: "Athens city limits and broader McMinn County service area"
  },
  {
    name: "Ooltewah",
    state: "TN",
    county: "Hamilton County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Collegedale", "Apison", "East Brainerd"],
    neighborhoods: ["Cambridge Square", "Savannah Bay", "Hampton Creek"],
    landmarks: ["Cambridge Square", "The Honors Course"],
    housingStyle: "upscale suburban homes with open-concept interiors",
    localNotes: "Ooltewah projects often focus on custom millwork and statement wall features.",
    serviceAreaWording: "Ooltewah neighborhoods and nearby Hamilton County communities"
  },
  {
    name: "Collegedale",
    state: "TN",
    county: "Hamilton County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Ooltewah", "Apison", "East Brainerd"],
    neighborhoods: ["College Park", "Wolftever Creek area", "Southern Heritage"],
    landmarks: ["Southern Adventist University", "Little Debbie Park"],
    housingStyle: "family-focused subdivisions and custom homes",
    localNotes: "Collegedale homeowners often prioritize finish carpentry and panel details.",
    serviceAreaWording: "Collegedale and nearby East Hamilton neighborhoods"
  },
  {
    name: "Chattanooga",
    state: "TN",
    county: "Hamilton County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Red Bank", "Hixson", "Signal Mountain"],
    neighborhoods: ["North Shore", "St. Elmo", "Southside", "Missionary Ridge"],
    landmarks: ["Tennessee Riverwalk", "Lookout Mountain", "Walnut Street Bridge"],
    housingStyle: "historic urban homes, condos, and modern renovations",
    localNotes: "Chattanooga jobs often involve blending modern layouts with historic trim character.",
    serviceAreaWording: "Chattanooga metro neighborhoods and nearby Hamilton County areas"
  },
  {
    name: "Dayton",
    state: "TN",
    county: "Rhea County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Graysville", "Evensville", "Soddy Daisy"],
    neighborhoods: ["Downtown Dayton", "Chickamauga Lake area"],
    landmarks: ["Bryan College", "Laurel-Snow State Natural Area"],
    housingStyle: "lake-area homes and established neighborhoods",
    localNotes: "Dayton projects often prioritize durable materials and storage functionality.",
    serviceAreaWording: "Dayton neighborhoods and greater Rhea County"
  },
  {
    name: "Etowah",
    state: "TN",
    county: "McMinn County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Athens", "Englewood", "Riceville"],
    neighborhoods: ["Downtown Etowah", "Mountain View corridor"],
    landmarks: ["Etowah Depot", "Cherohala Skyway gateway"],
    housingStyle: "older homes with strong demand for interior updates",
    localNotes: "Etowah homeowners frequently upgrade trim and wall paneling for resale readiness.",
    serviceAreaWording: "Etowah and nearby McMinn County communities"
  },
  {
    name: "Sweetwater",
    state: "TN",
    county: "Monroe County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Athens", "Philadelphia", "Madisonville"],
    neighborhoods: ["Downtown Sweetwater", "Rural residential outskirts"],
    landmarks: ["The Lost Sea Adventure", "Downtown Sweetwater Historic District"],
    housingStyle: "historic properties and suburban remodel homes",
    localNotes: "Sweetwater remodels often combine cabinetry and custom trim upgrades.",
    serviceAreaWording: "Sweetwater and Monroe County neighborhoods"
  },
  {
    name: "Calhoun",
    state: "TN",
    county: "McMinn County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Charleston", "Athens", "Cleveland"],
    neighborhoods: ["Calhoun center", "Hwy 11 corridor"],
    landmarks: ["Hiwassee River access", "Historic Calhoun district"],
    housingStyle: "small-town homes with practical storage and trim needs",
    localNotes: "Calhoun clients often request high-utility built-ins and shelving features.",
    serviceAreaWording: "Calhoun and adjacent communities across McMinn and Bradley counties"
  },
  {
    name: "Benton",
    state: "TN",
    county: "Polk County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Ocoee", "Reliance", "Cleveland"],
    neighborhoods: ["Benton center", "Ocoee river corridor"],
    landmarks: ["Hiwassee/Ocoee Scenic River State Park", "Ocoee Whitewater Center"],
    housingStyle: "mountain-adjacent homes and cabins",
    localNotes: "Benton homes benefit from durable wood selections suited for humidity shifts.",
    serviceAreaWording: "Benton, Ocoee corridor, and surrounding Polk County homes"
  },
  {
    name: "Soddy Daisy",
    state: "TN",
    county: "Hamilton County",
    region: "Southeast Tennessee",
    nearbyCommunities: ["Hixson", "Dayton", "Sale Creek"],
    neighborhoods: ["Lakesite-adjacent areas", "Soddy Creek neighborhoods"],
    landmarks: ["Chickamauga Lake", "Soddy Gulf"],
    housingStyle: "lake and suburban homes with active family use",
    localNotes: "Soddy Daisy projects commonly focus on resilient finishes and practical storage.",
    serviceAreaWording: "Soddy Daisy neighborhoods and north Hamilton County"
  },
  {
    name: "Ringgold",
    state: "GA",
    county: "Catoosa County",
    region: "North Georgia",
    nearbyCommunities: ["Fort Oglethorpe", "East Ridge", "Tunnel Hill"],
    neighborhoods: ["Downtown Ringgold", "Battlefield Parkway corridor"],
    landmarks: ["Ringgold Depot", "General Bragg Trailhead"],
    housingStyle: "historic and suburban homes requiring blended finish styles",
    localNotes: "Ringgold homeowners often request crown molding and custom built-ins.",
    serviceAreaWording: "Ringgold and nearby Catoosa County communities"
  },
  {
    name: "Fort Oglethorpe",
    state: "GA",
    county: "Catoosa County",
    region: "North Georgia",
    nearbyCommunities: ["Ringgold", "Rossville", "Chattanooga"],
    neighborhoods: ["Battlefield area", "Cloud Springs Road corridor"],
    landmarks: ["Chickamauga Battlefield", "Gilbert-Stephenson Park"],
    housingStyle: "mid-century neighborhoods and modern remodels",
    localNotes: "Fort Oglethorpe projects often focus on trim carpentry and interior refreshes.",
    serviceAreaWording: "Fort Oglethorpe and surrounding North Georgia neighborhoods"
  },
  {
    name: "Dalton",
    state: "GA",
    county: "Whitfield County",
    region: "North Georgia",
    nearbyCommunities: ["Tunnel Hill", "Rocky Face", "Varnell"],
    neighborhoods: ["Downtown Dalton", "North Dalton", "West Walnut corridor"],
    landmarks: ["Dalton Convention Center", "Crown Mill District"],
    housingStyle: "diverse housing stock from historic to new subdivisions",
    localNotes: "Dalton homes frequently combine accent walls with cabinet and trim upgrades.",
    serviceAreaWording: "Dalton metro neighborhoods and nearby Whitfield County communities"
  }
];

const blogTopics = [
  { title: "Cost of Custom Built-Ins in Cleveland TN: 2026 Homeowner Guide", intent: "commercial", relatedServices: ["Custom Built-Ins", "Built-in Bookcases"], relatedCities: ["Cleveland", "Athens"] },
  { title: "Best Wood Species for Floating Shelves in Tennessee Homes", intent: "informational", relatedServices: ["Floating Shelves", "Woodworking"], relatedCities: ["Chattanooga", "Cleveland"] },
  { title: "How Custom Carpentry Increases Home Value in Southeast Tennessee", intent: "commercial", relatedServices: ["Custom Carpentry", "Finish Carpentry"], relatedCities: ["Cleveland", "Ooltewah"] },
  { title: "Custom Trim vs Prefabricated Trim: Which Is Better for Your Home?", intent: "commercial", relatedServices: ["Trim Carpentry", "Crown Molding"], relatedCities: ["Chattanooga", "Ringgold"] },
  { title: "How to Plan Built-In Bookcases Around Fireplaces", intent: "informational", relatedServices: ["Built-in Bookcases", "Mantels"], relatedCities: ["Cleveland", "Dayton"] },
  { title: "Wainscoting Design Ideas for Historic Homes in Chattanooga", intent: "informational", relatedServices: ["Wainscoting", "Custom Wall Paneling"], relatedCities: ["Chattanooga", "Dalton"] },
  { title: "Crown Molding Profiles That Work in Modern Farmhouse Interiors", intent: "informational", relatedServices: ["Crown Molding", "Trim Carpentry"], relatedCities: ["Ooltewah", "Collegedale"] },
  { title: "What to Expect During a Finish Carpentry Installation", intent: "transactional", relatedServices: ["Finish Carpentry"], relatedCities: ["Cleveland", "Athens"] },
  { title: "How to Choose the Right Stain Color for Custom Wood Features", intent: "informational", relatedServices: ["Woodworking", "Interior Wood Features"], relatedCities: ["Dalton", "Ringgold"] },
  { title: "Mistakes to Avoid When Hiring a Trim Carpenter", intent: "commercial", relatedServices: ["Trim Carpentry", "Finish Carpentry"], relatedCities: ["Cleveland", "Chattanooga"] },
  { title: "Do Accent Walls Still Add Value? A Carpenter's Perspective", intent: "commercial", relatedServices: ["Accent Walls", "Custom Wall Paneling"], relatedCities: ["Dalton", "Fort Oglethorpe"] },
  { title: "How Long Does a Custom Mantel Installation Take?", intent: "transactional", relatedServices: ["Mantels"], relatedCities: ["Chattanooga", "Ringgold"] },
  { title: "Custom Cabinet Upgrades That Improve Everyday Storage", intent: "commercial", relatedServices: ["Custom Cabinets", "Custom Built-Ins"], relatedCities: ["Athens", "Cleveland"] },
  { title: "When to Replace vs Refine Existing Interior Woodwork", intent: "informational", relatedServices: ["Interior Wood Features", "Finish Carpentry"], relatedCities: ["Etowah", "Sweetwater"] },
  { title: "How Humidity in Tennessee Affects Wood Movement Indoors", intent: "informational", relatedServices: ["Woodworking", "Custom Carpentry"], relatedCities: ["Benton", "Soddy Daisy"] },
  { title: "Open Shelving vs Closed Cabinetry: Function and Style Tradeoffs", intent: "commercial", relatedServices: ["Floating Shelves", "Custom Cabinets"], relatedCities: ["Ooltewah", "Collegedale"] },
  { title: "Coffered Ceilings for Standard-Height Rooms: Is It Worth It?", intent: "commercial", relatedServices: ["Coffered Ceilings", "Crown Molding"], relatedCities: ["Chattanooga", "Cleveland"] },
  { title: "How to Budget for Multi-Room Finish Carpentry Projects", intent: "commercial", relatedServices: ["Finish Carpentry", "Trim Carpentry"], relatedCities: ["Dalton", "Athens"] },
  { title: "Top Questions to Ask Before Starting a Built-In Project", intent: "transactional", relatedServices: ["Custom Built-Ins", "Built-in Bookcases"], relatedCities: ["Cleveland", "Chattanooga"] },
  { title: "What Makes a High-End Carpentry Finish Look Professional", intent: "informational", relatedServices: ["Finish Carpentry", "Custom Carpentry"], relatedCities: ["Ringgold", "Fort Oglethorpe"] }
];

const projects = [
  {
    slug: "project-oak-built-ins-cleveland-tn",
    title: "Project: White Oak Built-Ins in Cleveland TN",
    service: "Custom Built-Ins",
    city: "Cleveland",
    state: "TN",
    summary: "Custom living room built-ins with concealed media storage and display shelving tailored to asymmetrical wall dimensions.",
    scopeOfWork: ["Measured and templated existing alcoves", "Shop-built cabinet and shelving modules", "Integrated cable management and vent spacing", "Final scribe, finish correction, and hardware tuning"],
    beforeAfter: "Before, the wall had mismatched freestanding furniture and visible cable clutter. After, the room gained centered storage, balanced proportions, and a clean architectural focal wall.",
    materials: ["Rift white oak panels", "Maple face frames", "Soft-close hinges and slides", "Low-VOC lacquer finish"],
    images: ["custom-built-ins-cleveland-tn.jpg", "oak-built-in-bookcases-cleveland-tn.jpg", "media-wall-built-ins-cleveland-tn.jpg", "built-in-cabinet-detail-cleveland-tn.jpg", "built-ins-before-after-cleveland-tn.jpg"]
  },
  {
    slug: "project-floating-shelves-athens-tn",
    title: "Project: Floating Shelves and Niche Storage in Athens TN",
    service: "Floating Shelves",
    city: "Athens",
    state: "TN",
    summary: "Kitchen and breakfast nook floating shelves designed for daily-use storage with a lighter visual footprint.",
    scopeOfWork: ["Wall blocking verification and reinforcement", "Concealed bracket fabrication and leveling", "Shelf installation with finish-matched edge details", "Final weight-load validation"],
    beforeAfter: "Before, the space had limited upper storage and visual heaviness from bulky cabinetry. After, shelves improved accessibility and opened sight lines.",
    materials: ["Walnut veneer shelves", "Steel concealed brackets", "Color-matched edge banding", "Satin polyurethane"],
    images: ["floating-shelves-athens-tn.jpg", "kitchen-floating-shelves-athens-tn.jpg", "bracket-installation-athens-tn.jpg", "floating-shelf-detail-athens-tn.jpg", "floating-shelves-before-after-athens-tn.jpg"]
  },
  {
    slug: "project-mantel-installation-chattanooga-tn",
    title: "Project: Custom Mantel Installation in Chattanooga TN",
    service: "Mantels",
    city: "Chattanooga",
    state: "TN",
    summary: "Fireplace mantel installation with hidden steel support and proportion-matched detailing for a remodeled great room.",
    scopeOfWork: ["Verified substrate and fireplace clearances", "Prepared reinforced wall mount points", "Installed and leveled solid wood beam mantel", "Applied finish touch-up and final reveal alignment"],
    beforeAfter: "Before, the fireplace lacked a visual anchor and looked underscaled. After, the custom mantel established a strong focal point with clean proportions.",
    materials: ["Solid alder beam", "Hidden steel reinforcement", "Fireplace-rated clearances", "Hand-rubbed oil finish"],
    images: ["mantel-installation-chattanooga-tn.jpg", "custom-fireplace-mantel-chattanooga-tn.jpg", "mantel-scribing-detail-chattanooga-tn.jpg", "mantel-finish-work-chattanooga-tn.jpg", "mantel-before-after-chattanooga-tn.jpg"]
  },
  {
    slug: "project-wainscoting-collegedale-tn",
    title: "Project: Dining Room Wainscoting in Collegedale TN",
    service: "Wainscoting",
    city: "Collegedale",
    state: "TN",
    summary: "Custom wall panel system designed to improve durability and visual structure in a high-traffic dining room.",
    scopeOfWork: ["Laser-laid panel spacing and datum lines", "Installed poplar rails, stiles, and panel backing", "Caulked, sanded, and primed all transitions", "Prepared paint-ready finish for homeowner color selection"],
    beforeAfter: "Before, walls showed wear and lacked architectural detail. After, the room gained rhythm, wall protection, and a formal finish.",
    materials: ["Moisture-resistant MDF panels", "Poplar rails and stiles", "Premium primer and enamel", "Caulked and sanded seams"],
    images: ["wainscoting-collegedale-tn.jpg", "panel-layout-collegedale-tn.jpg", "wainscoting-installation-collegedale-tn.jpg", "wainscoting-closeup-collegedale-tn.jpg", "wainscoting-before-after-collegedale-tn.jpg"]
  },
  {
    slug: "project-crown-molding-ringgold-ga",
    title: "Project: Multi-Room Crown Molding in Ringgold GA",
    service: "Crown Molding",
    city: "Ringgold",
    state: "GA",
    summary: "Whole-home crown molding package to unify ceiling transitions across living spaces and hallways.",
    scopeOfWork: ["Profile selection and corner-angle verification", "Precision miter cutting and dry-fit sequencing", "Installation and fastener concealment", "Joint refinement and paint-ready prep"],
    beforeAfter: "Before, ceiling transitions looked unfinished and inconsistent room to room. After, crown profiles created continuity and elevated finish quality.",
    materials: ["Finger-jointed pine crown profiles", "Compound miter joints", "Flexible caulk for seasonal movement", "Enamel topcoat"],
    images: ["crown-molding-ringgold-ga.jpg", "crown-joint-detail-ringgold-ga.jpg", "living-room-crown-ringgold-ga.jpg", "crown-molding-paint-ready-ringgold-ga.jpg", "crown-molding-before-after-ringgold-ga.jpg"]
  },
  {
    slug: "project-accent-wall-dalton-ga",
    title: "Project: Geometric Accent Wall in Dalton GA",
    service: "Accent Walls",
    city: "Dalton",
    state: "GA",
    summary: "Custom geometric trim feature wall for a primary bedroom with precise layout and paint-ready detailing.",
    scopeOfWork: ["Developed scaled layout map and reference lines", "Cut and fitted trim segments for geometric pattern", "Installed and blended transitions", "Completed final prep for paint application"],
    beforeAfter: "Before, the room lacked a focal point and felt flat. After, the finished wall added depth, rhythm, and design intent.",
    materials: ["Poplar trim stock", "Laser layout lines", "Construction adhesive and pin nails", "Durable satin paint"],
    images: ["accent-wall-dalton-ga.jpg", "accent-wall-layout-dalton-ga.jpg", "feature-wall-trim-dalton-ga.jpg", "accent-wall-detail-dalton-ga.jpg", "accent-wall-before-after-dalton-ga.jpg"]
  }
];

const contentRules = {
  serviceCityWordRange: { min: 900, max: 1200 },
  minLocalMentions: 5,
  minServiceMentions: 4,
  paragraphDuplicateThreshold: 0.92,
  repeatedFaqSetThreshold: 70,
  duplicatePatternThreshold: 0.9,
  lowLinkThreshold: 2,
  overLinkThreshold: 120
};

const indexation = {
  excludeFromSitemapOnFail: true,
  markNoindexOnFail: true,
  noindexRoutes: [],
  excludeFromSitemapRoutes: []
};

const conversion = {
  stickyMobileCtaLabel: "Call for Quote",
  trustStatements: [
    "Licensed, insured, and finish-focused craftsmanship.",
    "Clear scope, clean job sites, and punch-list accountability.",
    "Built for daily use, not just photos."
  ],
  reviewSnippets: [
    {
      quote: "They built custom bookcases that look original to the house. Communication and cleanup were excellent.",
      author: "Homeowner in Cleveland TN"
    },
    {
      quote: "Our trim package transformed the entire first floor. Precise work and very respectful crew.",
      author: "Homeowner in Ooltewah TN"
    },
    {
      quote: "From design notes to installation, every detail was handled professionally.",
      author: "Homeowner in Ringgold GA"
    }
  ],
  ctaVariants: ["Request a Detailed Quote", "Schedule On-Site Estimate", "Plan Your Carpentry Project", "Talk With a Finish Carpenter"],
  serviceAreaReassurance: "Serving Cleveland TN, Chattanooga TN, and nearby Southeast Tennessee and North Georgia communities."
};

const variation = {
  introStructures: [
    "Homeowners in {{city}} often choose {{service}} when standard options fail to fit their room dimensions or design goals.",
    "If you are planning {{service}} in {{city}}, the right result starts with precise layout, material choices, and finish-level installation.",
    "Well-executed {{service}} in {{city}} should improve both daily use and long-term home value, not just appearance.",
    "Across {{city}}, clients call us for {{service}} that feels integrated with the architecture rather than added as an afterthought."
  ],
  localRelevanceBlurbs: [
    "Projects in {{city}} often require balancing style upgrades with practical durability for active households.",
    "Because homes in {{city}} range from older floor plans to newer subdivisions, custom sizing and profile selection matter.",
    "In {{city}}, many remodels prioritize cleaner storage lines and trim consistency room to room.",
    "Our team plans each {{service}} project in {{city}} around existing layouts, traffic flow, and long-term maintenance."
  ],
  benefitsOpeners: ["The first benefit is function.", "The most immediate improvement is usability.", "Homeowners usually notice everyday convenience first.", "Most clients value the functional upgrade before the visual one."],
  closingSummaries: [
    "If you want {{service}} in {{city}} delivered with predictable communication and high execution standards, we can scope your project clearly from day one.",
    "For homeowners in {{city}}, this approach to {{service}} keeps timelines realistic and results consistent.",
    "The result is {{service}} in {{city}} that performs well, photographs well, and holds up to daily life.",
    "From consultation through final walkthrough, our goal is straightforward: reliable {{service}} for homes across {{city}}."
  ]
};
const faqPools = {
  general: [
    { q: "How far in advance should I schedule a custom carpentry project?", a: "Most projects are scheduled after an on-site estimate and scoped timeline review. Booking early helps secure preferred installation windows." },
    { q: "Do you handle both new construction and remodel work?", a: "Yes. We work on both new homes and renovations, coordinating details with existing finishes or new design plans." },
    { q: "Can you help prioritize projects if I have multiple rooms?", a: "Yes. We can phase your scope by budget, timeline, and daily-use priorities so each stage delivers meaningful improvements." }
  ],
  builtins: [
    { q: "Can built-ins be designed around existing fireplaces or windows?", a: "Yes. Built-ins are field-measured and designed around fixed architecture so spacing and proportions look intentional." },
    { q: "What depth is best for built-in shelving?", a: "Depth depends on intended use and room flow. During design we balance storage function with walk-path clearance." },
    { q: "Are built-ins painted or stained?", a: "Both are available. Material and finish choices are selected based on style goals, wear expectations, and maintenance preferences." }
  ],
  trim: [
    { q: "Can you match my existing trim profile?", a: "In most cases, yes. We document dimensions and profile details on-site to blend new work with existing millwork." },
    { q: "How do you minimize visible joints in crown molding?", a: "We use precision cutting, staged dry-fit checks, and proper seam prep to reduce visual joint lines." },
    { q: "Is trim carpentry messy during installation?", a: "We use controlled cutting and daily cleanup practices to reduce dust and keep work areas orderly." }
  ],
  storage: [
    { q: "Can custom cabinets or shelves be built for awkward wall spaces?", a: "Yes. Custom fabrication is ideal for corners, alcoves, and unusual dimensions where stock pieces underperform." },
    { q: "How do you ensure shelves hold real weight?", a: "Support method and fastener placement are selected around wall structure, span length, and expected load." },
    { q: "Do storage projects require full-room remodeling?", a: "Not always. Many projects are completed as stand-alone upgrades with minimal disruption to surrounding finishes." }
  ],
  mantels: [
    { q: "Do you account for fireplace safety clearances?", a: "Yes. Mantel designs are reviewed for appropriate spacing and material use around heat sources." },
    { q: "Can a mantel match existing beams or flooring tones?", a: "Yes. We can select species and finish options that align with nearby wood tones and trim details." },
    { q: "How long does a mantel project usually take?", a: "Timelines vary by design complexity and finish requirements, but installation windows are scoped during estimate." }
  ],
  shelves: [
    { q: "Can floating shelves be installed on tile or masonry walls?", a: "Yes, with the proper anchoring and layout method for the substrate." },
    { q: "What shelf thickness looks best for modern interiors?", a: "Most homeowners choose proportions based on wall size and use case, and we mock options during planning." },
    { q: "Do floating shelves work in kitchens?", a: "Yes. They are common for display and quick-access storage when properly supported and finished." }
  ],
  feature: [
    { q: "How do you make feature walls look symmetrical?", a: "We build from measured centerlines and reference points so visual weight stays balanced across the wall." },
    { q: "Can feature projects be completed in occupied homes?", a: "Yes. Most are completed in phases with clean-up routines that keep the space usable." },
    { q: "Will feature walls still feel timeless in a few years?", a: "Profile choice and proportion matter most. We guide selections toward long-term style flexibility." }
  ],
  ceiling: [
    { q: "Are coffered ceilings only for high ceilings?", a: "Not necessarily. Proper beam depth and spacing can be adapted for many standard-height rooms." },
    { q: "Can ceiling details match existing trim downstairs?", a: "Yes. We align profile language across the home for visual consistency." },
    { q: "Will ceiling projects disrupt daily living?", a: "There is temporary disruption, but sequencing and cleanup plans keep impact manageable." }
  ],
  wallpanel: [
    { q: "What is the difference between wainscoting and full wall paneling?", a: "Wainscoting typically covers lower wall sections, while full paneling can run floor-to-ceiling for stronger visual impact." },
    { q: "Can wall paneling be installed in moisture-prone rooms?", a: "Yes, with the right substrate and finish system for the environment." },
    { q: "Do panel layouts need to align with windows and doors?", a: "Yes. Alignment around architectural features is key to a polished result." }
  ]
};

const processPools = {
  general: [
    "Consult on-site, verify dimensions, and confirm scope priorities before any fabrication.",
    "Develop the build approach with material and finish selections suited to room use.",
    "Fabricate components for precision fit, then install, refine seams, and complete final walkthrough."
  ],
  storage: [
    "Map storage goals and wall geometry to define exact shelf, cabinet, or niche dimensions.",
    "Pre-build structural and visible components with load support and finish consistency in mind.",
    "Install, level, and tune hardware so daily-use access is smooth and durable."
  ],
  trim: [
    "Capture profile details and room measurements to plan balanced trim transitions.",
    "Cut and dry-fit components to reduce gaps and maintain clean reveal lines.",
    "Install, seal, and prep surfaces for an integrated paint or stain-ready finish."
  ],
  feature: [
    "Establish centerlines and layout references for visual symmetry.",
    "Fabricate feature components with attention to proportion and profile continuity.",
    "Complete installation, seam refinement, and final detailing for a cohesive focal finish."
  ]
};

const sitemap = {
  includeRootRedirect: true,
  defaultPriority: 0.7,
  priorities: {
    "/home": 1.0,
    "/services": 0.9,
    "/cities": 0.9,
    "/contact": 0.9,
    "/projects": 0.8,
    "/blog": 0.8
  },
  changeFreqByType: {
    home: "weekly",
    hub: "weekly",
    money: "weekly",
    project: "monthly",
    blog: "monthly",
    utility: "yearly"
  }
};

const technicalSeo = {
  titleMaxLength: 60,
  descriptionMaxLength: 155,
  defaultRobots: "index,follow,max-image-preview:large",
  noindexRobots: "noindex,follow,max-image-preview:large",
  publisherName: business.name,
  siteName: business.name,
  twitterHandle: "",
  enforceUniqueMeta: true
};

const audits = {
  failOnMissingMeta: true,
  failOnMissingH1: true,
  maxTitleDupes: 1,
  maxCanonicalDupes: 1,
  maxDuplicateRiskScore: 0.82
};

module.exports = {
  business,
  services,
  cities,
  blogTopics,
  projects,
  contentRules,
  indexation,
  conversion,
  variation,
  faqPools,
  processPools,
  sitemap,
  technicalSeo,
  audits
};
