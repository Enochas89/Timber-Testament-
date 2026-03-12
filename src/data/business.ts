export const business = {
  name: "Timber Testament Custom Carpentry",
  legalName: "Timber Testament Custom Carpentry LLC",
  primaryPhoneDisplay: "(423) 555-0123",
  primaryPhoneRaw: "+14235550123",
  email: "hello@timbertestament.com",
  address: {
    street: "Update Street Address",
    city: "Chattanooga",
    region: "TN",
    postalCode: "37402",
    country: "US",
  },
  geo: {
    latitude: 35.0456,
    longitude: -85.3097,
  },
  serviceArea: [
    "Chattanooga, TN",
    "Athens, TN",
    "Dalton, GA",
    "Collegedale, TN",
    "Ooltewah, TN",
    "Apison, TN",
  ],
  tagline: "Custom carpentry, built-ins, trim, and finish work for homes across Southeast Tennessee and Northwest Georgia.",
  websiteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  googleBusinessProfileUrl:
    "https://business.google.com/",
  yearsExperience: 12,
};
