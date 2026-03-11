const { business, technicalSeo } = require("../config");
const { resolveRobots } = require("../lib/seo");
const {
  localBusinessSchema,
  organizationSchema,
  webPageSchema,
  breadcrumbSchema
} = require("../lib/schema");

function renderHead({
  route,
  title,
  description,
  canonical,
  ogImage,
  robots,
  breadcrumbs = [],
  extraSchema = [],
  preloadImages = []
}) {
  const computedRobots = robots || resolveRobots(false);
  const normalizedOgImage = ogImage && ogImage.startsWith("http") ? ogImage : `${business.website}${ogImage || business.defaultOgImage}`;
  const preloadLinks = preloadImages
    .filter(Boolean)
    .map((image) => `<link rel="preload" as="image" href="${image}">`)
    .join("\n");

  const schemaBlocks = [
    localBusinessSchema(),
    organizationSchema(),
    webPageSchema({ route, title, description, breadcrumbs }),
    ...(breadcrumbs.length > 1 ? [breadcrumbSchema(route, breadcrumbs)] : []),
    ...extraSchema
  ]
    .map((item) => `<script type=\"application/ld+json\">${JSON.stringify(item)}</script>`)
    .join("\n");

  const tracking = [
    technicalSeo.twitterHandle ? `<meta name=\"twitter:site\" content=\"${technicalSeo.twitterHandle}\">` : "",
    business.tracking.ga4Id ? `<meta name=\"x-ga4-id\" content=\"${business.tracking.ga4Id}\">` : "",
    business.tracking.gtmId ? `<meta name=\"x-gtm-id\" content=\"${business.tracking.gtmId}\">` : ""
  ].join("\n");

  return `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="${computedRobots}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${normalizedOgImage}">
    <meta property="og:site_name" content="${business.name}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${normalizedOgImage}">
    ${tracking}
    <link rel="dns-prefetch" href="//www.google.com">
    <link rel="preconnect" href="https://www.google.com" crossorigin>
    ${preloadLinks}
    <link rel="preload" href="/assets/css/site.css" as="style">
    <link rel="stylesheet" href="/assets/css/site.css">
    <script defer src="/assets/js/site.js"></script>
    ${schemaBlocks}
  `;
}

function renderNav() {
  return `
    <header class="site-header">
      <a class="brand" href="/">${business.name}</a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/services/">Services</a>
        <a href="/projects/">Projects</a>
        <a href="/cities/">Cities</a>
        <a href="/blog/">Blog</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
      </nav>
      <a class="phone-pill" href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a>
    </header>
  `;
}

function renderBreadcrumbs(breadcrumbs = []) {
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return "";
  }

  const links = breadcrumbs
    .map((crumb, idx) => {
      const isLast = idx === breadcrumbs.length - 1;
      if (isLast) {
        return `<li aria-current=\"page\">${crumb.name}</li>`;
      }
      return `<li><a href=\"${crumb.url.endsWith("/") ? crumb.url : `${crumb.url}/`}\">${crumb.name}</a></li>`;
    })
    .join("");

  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${links}</ol></nav>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div>
        <h2>${business.name}</h2>
        <p>Custom finish carpentry and woodworking across ${business.primaryRegion}.</p>
      </div>
      <div>
        <h3>Service Area</h3>
        <p>${business.serviceArea.join(" | ")}</p>
      </div>
      <div>
        <h3>Contact</h3>
        <p><a href="tel:${business.phone.replace(/[^+\d]/g, "")}">${business.phone}</a></p>
        <p><a href="mailto:${business.email}">${business.email}</a></p>
      </div>
      <p class="copyright">&copy; ${new Date().getFullYear()} ${business.name}. All rights reserved.</p>
    </footer>
  `;
}

function renderLayout({
  route,
  title,
  description,
  canonical,
  content,
  extraSchema = [],
  robots,
  ogImage,
  breadcrumbs = [],
  stickyMobileCta = "",
  preloadImages = []
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    ${renderHead({ route, title, description, canonical, extraSchema, robots, ogImage, breadcrumbs, preloadImages })}
  </head>
  <body>
    ${renderNav()}
    <main>${renderBreadcrumbs(breadcrumbs)}${content}</main>
    ${stickyMobileCta}
    ${renderFooter()}
  </body>
</html>`;
}

module.exports = {
  renderLayout
};

