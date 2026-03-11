const fs = require("fs");
const path = require("path");
const { createSeoPageEntries, writeSeoSummary } = require("./generateSeoPages");

const {
  business,
  services,
  cities,
  blogTopics,
  projects,
  contentRules,
  indexation,
  sitemap
} = require("../src/config");
const { renderLayout } = require("../src/templates/layout");
const { renderServiceCityPage } = require("../src/templates/serviceCityPage");
const {
  renderHomePage,
  renderServicesIndex,
  renderServiceHub,
  renderCitiesIndex,
  renderCityHub,
  renderProjectsIndex,
  renderProjectPage,
  renderBlogIndex,
  renderBlogPost,
  renderAboutPage,
  renderContactPage
} = require("../src/templates/pageBuilders");
const { pathToOutputPath, serviceSlug, citySlug } = require("../src/lib/utils");
const { canonicalFor, resolveRobots, inferPageType, buildBreadcrumbs } = require("../src/lib/seo");
const {
  createPageQualityAudit,
  createSeoAudits,
  createInternalLinkAudit,
  createPerformanceReport
} = require("../src/lib/audit");
const { renderStickyMobileCta } = require("../src/lib/conversionBlocks");

const distDir = path.resolve("dist");
const publicDir = path.resolve("public");

function ensureDir(targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

function writeFile(routePath, html) {
  const outputPath = pathToOutputPath(routePath);
  ensureDir(outputPath);
  fs.writeFileSync(outputPath, html, "utf8");
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }

  fs.mkdirSync(destination, { recursive: true });
  const entries = fs.readdirSync(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function optimizeImagesForPerformance(imageDir) {
  const summary = {
    enabled: false,
    optimizedFiles: 0,
    bytesSaved: 0,
    generatedResponsiveVariants: 0,
    warnings: []
  };
  const responsiveImageIndex = {};

  if (!fs.existsSync(imageDir)) {
    summary.warnings.push("image_directory_missing");
    return { summary, responsiveImageIndex };
  }

  let sharp;
  try {
    sharp = require("sharp");
    summary.enabled = true;
  } catch (error) {
    summary.warnings.push("sharp_not_installed_image_compression_skipped");
    return { summary, responsiveImageIndex };
  }

  const files = fs
    .readdirSync(imageDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => /\.(jpg|jpeg|png)$/i.test(name))
    .filter((name) => !/-\d+w\.webp$/i.test(name));

  for (const filename of files) {
    const fullPath = path.join(imageDir, filename);
    const beforeBytes = fs.statSync(fullPath).size;
    const ext = path.extname(filename).toLowerCase();

    let optimizedBuffer = null;
    try {
      if (ext === ".jpg" || ext === ".jpeg") {
        optimizedBuffer = await sharp(fullPath).rotate().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();
      } else if (ext === ".png") {
        optimizedBuffer = await sharp(fullPath).rotate().png({ compressionLevel: 9, quality: 80 }).toBuffer();
      }
    } catch (error) {
      summary.warnings.push(`optimization_failed:${filename}`);
    }

    if (optimizedBuffer && optimizedBuffer.length < beforeBytes) {
      try {
        const tempPath = `${fullPath}.tmp`;
        fs.writeFileSync(tempPath, optimizedBuffer);
        fs.renameSync(tempPath, fullPath);
        summary.optimizedFiles += 1;
        summary.bytesSaved += beforeBytes - optimizedBuffer.length;
      } catch (error) {
        summary.warnings.push(`write_optimized_file_failed:${filename}`);
      }
    }

    try {
      const metadata = await sharp(fullPath).metadata();
      const widths = [480, 768, 1200].filter((width) => !metadata.width || width < metadata.width);
      const baseName = filename.replace(/\.[^.]+$/, "");
      const srcsetParts = [];

      for (const width of widths) {
        const variantName = `${baseName}-${width}w.webp`;
        const variantPath = path.join(imageDir, variantName);
        await sharp(fullPath)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 76 })
          .toFile(variantPath);
        srcsetParts.push(`/assets/images/${variantName} ${width}w`);
        summary.generatedResponsiveVariants += 1;
      }

      if (srcsetParts.length) {
        responsiveImageIndex[`/assets/images/${filename}`] = {
          srcset: srcsetParts.join(", "),
          sizes: "(max-width: 768px) 100vw, 1200px"
        };
      }
    } catch (error) {
      summary.warnings.push(`responsive_variant_failed:${filename}`);
    }
  }

  summary.bytesSaved = Math.max(0, summary.bytesSaved);
  return { summary, responsiveImageIndex };
}

function createImagePlaceholders(imageNames) {
  const imageDir = path.join(distDir, "assets", "images");
  fs.mkdirSync(imageDir, { recursive: true });

  const tinyJpegBase64 =
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQEBQVFhUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcBAv/EADUQAAEDAgQEAwYEBwAAAAAAAAECAwQFEQAhBhIxQVEHExQiYXGBkaGx8BUjQlJyweHx/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAdEQEBAQADAAMBAAAAAAAAAAAAAQIREiExQVEi/9oADAMBAAIRAxEAPwD3iIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiP/2Q==";

  const jpeg = Buffer.from(tinyJpegBase64, "base64");
  for (const imageName of imageNames) {
    const fullPath = path.join(imageDir, imageName);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, jpeg);
    }
  }
}

function isRouteListed(route, list) {
  return list.some((entry) => entry === route || entry === `${route}/` || `${entry}/` === route);
}

function routeChangeFreq(pageType) {
  if (pageType === "home") {
    return sitemap.changeFreqByType.home;
  }
  if (pageType === "hub") {
    return sitemap.changeFreqByType.hub;
  }
  if (pageType === "money") {
    return sitemap.changeFreqByType.money;
  }
  if (pageType === "project") {
    return sitemap.changeFreqByType.project;
  }
  if (pageType === "blog") {
    return sitemap.changeFreqByType.blog;
  }
  return sitemap.changeFreqByType.utility;
}

function routePriority(route, pageType) {
  if (Object.prototype.hasOwnProperty.call(sitemap.priorities, route)) {
    return sitemap.priorities[route];
  }
  if (pageType === "money") {
    return 0.9;
  }
  if (route.startsWith("/services/")) {
    return 0.9;
  }
  if (route.startsWith("/cities/") || /-carpentry\/?$/.test(route)) {
    return 0.8;
  }
  if (pageType === "project") {
    return 0.7;
  }
  if (pageType === "blog") {
    return 0.6;
  }
  if (pageType === "home") {
    return 1.0;
  }
  return sitemap.defaultPriority;
}

function buildSitemap(pages) {
  const sitemapPages = pages
    .filter((page) => !page.excludeFromSitemap && !page.noindex)
    .map((page) => ({
      route: page.route,
      canonical: canonicalFor(page.route),
      changefreq: routeChangeFreq(page.type),
      priority: routePriority(page.route, page.type)
    }))
    .sort((a, b) => a.route.localeCompare(b.route));

  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages
    .map(
      (page) =>
        `  <url><loc>${page.canonical}</loc><lastmod>${now}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority.toFixed(
          1
        )}</priority></url>`
    )
    .join("\n")}\n</urlset>\n`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf8");

  const txtMap = sitemapPages.map((page) => page.canonical).join("\n");
  fs.writeFileSync(path.join(distDir, "sitemap.txt"), `${txtMap}\n`, "utf8");

  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${business.website}/sitemap.xml\n`,
    "utf8"
  );

  return sitemapPages;
}

function hasAttribute(tag, attrName) {
  return new RegExp(`\\b${attrName}\\s*=\\s*["'][^"']*["']`, "i").test(tag);
}

function getAttributeValue(tag, attrName) {
  const match = tag.match(new RegExp(`\\b${attrName}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? match[1].trim() : "";
}

function isSeoFriendlyImageFilename(filename) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp|avif|gif)$/.test(filename);
}

function normalizeImageTags(html, responsiveImageIndex = {}) {
  return html.replace(/<img\b[^>]*>/gim, (tag) => {
    const attrsToAdd = [];
    const src = getAttributeValue(tag, "src");

    const responsiveData = src ? responsiveImageIndex[src] : null;
    if (responsiveData && !hasAttribute(tag, "srcset")) {
      attrsToAdd.push(`srcset="${responsiveData.srcset}"`);
    }
    if (responsiveData && !hasAttribute(tag, "sizes")) {
      attrsToAdd.push(`sizes="${responsiveData.sizes}"`);
    }

    if (!hasAttribute(tag, "loading")) {
      attrsToAdd.push('loading="lazy"');
    }
    if (!hasAttribute(tag, "decoding")) {
      attrsToAdd.push('decoding="async"');
    }
    if (!hasAttribute(tag, "width")) {
      attrsToAdd.push('width="1200"');
    }
    if (!hasAttribute(tag, "height")) {
      attrsToAdd.push('height="800"');
    }
    if (!attrsToAdd.length) {
      return tag;
    }
    return tag.replace(/>$/, ` ${attrsToAdd.join(" ")}>`);
  });
}

function findImageIssues(pages) {
  const issues = [];
  pages.forEach((page) => {
    const matches = page.html.match(/<img[^>]*>/gim) || [];
    matches.forEach((imgTag) => {
      const src = getAttributeValue(imgTag, "src");
      const alt = getAttributeValue(imgTag, "alt");
      const loading = getAttributeValue(imgTag, "loading");
      const hasWidth = hasAttribute(imgTag, "width");
      const hasHeight = hasAttribute(imgTag, "height");

      if (!alt) {
        issues.push({ route: page.route, issue: "missing_image_alt", snippet: imgTag });
      }

      if (loading.toLowerCase() !== "lazy") {
        issues.push({ route: page.route, issue: "missing_lazy_loading", snippet: imgTag });
      }

      if (!hasWidth || !hasHeight) {
        issues.push({ route: page.route, issue: "missing_image_dimensions", snippet: imgTag });
      }

      if (src && !src.startsWith("data:")) {
        const filename = path.basename(src.split("?")[0]);
        if (filename && !isSeoFriendlyImageFilename(filename)) {
          issues.push({
            route: page.route,
            issue: "non_seo_friendly_image_filename",
            filename
          });
        }
      }
    });
  });
  return issues;
}

function renderRedirectHtml(destinationRoute, canonicalUrl) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex,follow">
  <meta http-equiv="refresh" content="0; url=${destinationRoute}">
  <link rel="canonical" href="${canonicalUrl}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${destinationRoute}">${destinationRoute}</a>.</p>
</body>
</html>`;
}

function createCanonicalAudit(seoAudit) {
  return {
    canonicalMap: seoAudit.pageAudits.map((page) => ({ route: page.route, canonical: page.canonical })),
    duplicateCanonicals: seoAudit.duplicateCanonicals,
    missingCanonicals: seoAudit.pageAudits.filter((page) => !page.canonical).map((page) => page.route)
  };
}

function renderPageEntry(pageEntry, responsiveImageIndex = {}) {
  const breadcrumbs = pageEntry.page.breadcrumbs || buildBreadcrumbs(pageEntry.route, pageEntry.page.h1 || pageEntry.page.title);
  pageEntry.breadcrumbs = breadcrumbs;
  pageEntry.canonical = canonicalFor(pageEntry.route);
  pageEntry.pageType = pageEntry.type || inferPageType(pageEntry.route);

  const html = renderLayout({
    route: pageEntry.route,
    title: pageEntry.page.title,
    description: pageEntry.page.description,
    canonical: pageEntry.canonical,
    content: pageEntry.page.content,
    extraSchema: pageEntry.page.extraSchema || [],
    robots: resolveRobots(pageEntry.noindex),
    ogImage: pageEntry.page.ogImage,
    breadcrumbs,
    stickyMobileCta: renderStickyMobileCta(),
    preloadImages: pageEntry.page.preloadImages || []
  });

  pageEntry.html = normalizeImageTags(html, responsiveImageIndex);
  pageEntry.textContent = pageEntry.page.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  pageEntry.type = pageEntry.pageType;
}

function addPage(pageEntries, route, page, explicitType = "") {
  const inferredType = explicitType || inferPageType(route);
  const entry = {
    route,
    page,
    type: inferredType,
    noindex: isRouteListed(route, indexation.noindexRoutes) || Boolean(page.noindex),
    excludeFromSitemap: isRouteListed(route, indexation.excludeFromSitemapRoutes) || Boolean(page.excludeFromSitemap),
    localTokens: page.localTokens || { city: "", service: "" },
    faqSetKey: page.faqSetKey || "none",
    uniquenessFingerprint: page.uniquenessFingerprint || "",
    uniquenessSource: page.uniquenessSource || ""
  };
  const existingIndex = pageEntries.findIndex((existing) => existing.route === route);
  if (existingIndex >= 0) {
    pageEntries[existingIndex] = entry;
    return;
  }
  pageEntries.push(entry);
}

async function build() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  // Copies static verification files (Google Search Console, etc.) to root of deployment
  copyDirectory(publicDir, distDir);
  const imageDir = path.join(distDir, "assets", "images");
  const imageOptimization = await optimizeImagesForPerformance(imageDir);

  const pageEntries = [];

  const topPages = [
    ["/", renderHomePage({ services, cities, projects }), "home"],
    ["/services", renderServicesIndex({ services, cities }), "hub"],
    ["/projects", renderProjectsIndex({ projects }), "hub"],
    ["/cities", renderCitiesIndex({ cities, services }), "hub"],
    ["/blog", renderBlogIndex({ blogTopics }), "hub"],
    ["/about", renderAboutPage(), "utility"],
    ["/contact", renderContactPage({ cities }), "utility"]
  ];

  topPages.forEach(([route, page, type]) => addPage(pageEntries, route, page, type));

  services.forEach((service) => {
    const route = `/services/${serviceSlug(service.name)}`;
    addPage(pageEntries, route, renderServiceHub({ service, cities }), "hub");
  });

  cities.forEach((city) => {
    const route = `/cities/${citySlug(city)}-carpentry`;
    addPage(pageEntries, route, renderCityHub({ city, services, projects }), "hub");
  });

  services.forEach((service) => {
    cities.forEach((city) => {
      const route = `/services/${serviceSlug(service.name)}-${citySlug(city)}`;
      const relatedProjects = projects.filter(
        (project) => project.service === service.name || (project.city === city.name && project.state === city.state)
      );

      const page = renderServiceCityPage({
        service,
        city,
        allCities: cities,
        allServices: services,
        relatedProjects: relatedProjects.length ? relatedProjects : projects.slice(0, 3),
        route
      });
      addPage(pageEntries, route, page, "money");
    });
  });

  const generatedSeoPages = createSeoPageEntries({ projectPool: projects });
  generatedSeoPages.entries.forEach((entry) => {
    addPage(pageEntries, entry.route, entry.page, entry.type);
  });

  projects.forEach((project) => {
    const route = `/projects/${project.slug}`;
    addPage(pageEntries, route, renderProjectPage({ project, services, cities }), "project");
  });

  blogTopics.forEach((topic) => {
    const post = renderBlogPost({ topic, cities, services });
    const route = `/blog/${post.slug}`;
    addPage(pageEntries, route, post, "blog");
  });

  pageEntries.forEach((entry) => renderPageEntry(entry, imageOptimization.responsiveImageIndex));

  const qualityAudit = pageEntries.map((entry) => createPageQualityAudit({ page: entry }));

  qualityAudit.forEach((result) => {
    const entry = pageEntries.find((page) => page.route === result.route);
    if (!entry) {
      return;
    }

    if (result.noindexRecommended && indexation.markNoindexOnFail) {
      entry.noindex = true;
    }

    if (result.excludeFromSitemapRecommended && indexation.excludeFromSitemapOnFail) {
      entry.excludeFromSitemap = true;
    }
  });

  pageEntries.forEach((entry) => renderPageEntry(entry, imageOptimization.responsiveImageIndex));

  pageEntries.forEach((entry) => {
    writeFile(entry.route, entry.html);
  });

  const legacyHomeRedirect = renderRedirectHtml("/", canonicalFor("/"));
  writeFile("/home", legacyHomeRedirect);

  const sitemapPages = buildSitemap(pageEntries);

  const seoAudit = createSeoAudits(pageEntries);
  const internalLinkAudit = createInternalLinkAudit(pageEntries);
  const canonicalAudit = createCanonicalAudit(seoAudit);
  const imageIssues = findImageIssues(pageEntries);

  const imageManifest = projects.flatMap((project) =>
    project.images.map((filename, idx) => ({
      route: `/projects/${project.slug}`,
      filename,
      alt: `${project.service} installed in ${project.city} ${project.state} home - image ${idx + 1}`,
      caption: `${project.service} detail ${idx + 1} in ${project.city} ${project.state}`
    }))
  );

  const allImageNames = new Set([business.defaultOgImage.replace("/assets/images/", "")]);
  imageManifest.forEach((image) => allImageNames.add(image.filename));
  createImagePlaceholders(allImageNames);

  const performanceReport = createPerformanceReport(pageEntries, imageManifest, distDir);
  const performanceReportWithOptimization = {
    ...performanceReport,
    imageOptimization: imageOptimization.summary
  };

  const qualityWarnings = qualityAudit.filter((item) => item.issues.length > 0);
  const excludedFromSitemap = pageEntries.filter((page) => page.excludeFromSitemap).map((page) => page.route);
  const noindexPages = pageEntries.filter((page) => page.noindex).map((page) => page.route);
  const pageTypeCounts = pageEntries.reduce((acc, page) => {
    acc[page.type] = (acc[page.type] || 0) + 1;
    return acc;
  }, {});
  const imageIssueCounts = imageIssues.reduce((acc, issue) => {
    acc[issue.issue] = (acc[issue.issue] || 0) + 1;
    return acc;
  }, {});
  const duplicateRiskAverage =
    Math.round(
      (seoAudit.pageAudits.reduce((sum, page) => sum + page.duplicateRiskScore, 0) /
        Math.max(1, seoAudit.pageAudits.length)) *
        1000
    ) / 1000;
  const duplicateRiskMax = Math.max(...seoAudit.pageAudits.map((page) => page.duplicateRiskScore));
  const missingSeoElements = seoAudit.pageAudits.reduce(
    (sum, page) => sum + page.issues.filter((issue) => issue.startsWith("missing_")).length,
    0
  );

  const buildSummary = {
    totalPages: pageEntries.length + 1,
    generatedRoutes: pageEntries.length + 1,
    pageTypes: pageTypeCounts,
    serviceCityPages: services.length * cities.length,
    generatedSeoPagesTotal: generatedSeoPages.summary.totalPagesGenerated,
    generatedSeoLandingPages: generatedSeoPages.summary.serviceCityPages,
    generatedSeoCityHubs: generatedSeoPages.summary.cityHubPages,
    generatedSeoServiceHubs: generatedSeoPages.summary.serviceHubPages,
    serviceHubs: services.length,
    cityHubs: cities.length,
    projectPages: projects.length,
    blogPages: blogTopics.length,
    averageWordCount:
      Math.round(
        qualityAudit.reduce((sum, item) => sum + item.wordCount, 0) / Math.max(1, qualityAudit.length)
      ),
    wordCountMin: Math.min(...qualityAudit.map((item) => item.wordCount)),
    wordCountMax: Math.max(...qualityAudit.map((item) => item.wordCount)),
    qualityFlaggedPages: qualityWarnings.length,
    excludedFromSitemap: excludedFromSitemap.length,
    noindexPages: noindexPages.length,
    sitemapUrls: sitemapPages.length,
    uniquenessFingerprints: pageEntries.filter((page) => page.uniquenessFingerprint).length,
    duplicateRiskScore: {
      average: duplicateRiskAverage,
      max: duplicateRiskMax,
      flaggedPages: seoAudit.pageAudits.filter((page) => page.duplicateRiskScore > 0.65).length
    },
    missingSeoElements,
    imageIssues: imageIssueCounts
  };
  buildSummary.imageOptimization = imageOptimization.summary;

  const pageQualityReport = {
    thresholds: contentRules,
    summary: {
      flaggedPages: qualityWarnings.length,
      pagesExcludedFromSitemap: excludedFromSitemap.length,
      pagesMarkedNoindex: noindexPages.length
    },
    flaggedPages: qualityWarnings,
    allPages: qualityAudit
  };

  const seoAuditReport = {
    ...seoAudit,
    seoChecks: {
      missingTitles: seoAudit.pageAudits.filter((page) => page.issues.includes("missing_title")).map((page) => page.route),
      missingMetaDescriptions: seoAudit.pageAudits
        .filter((page) => page.issues.includes("missing_meta_description"))
        .map((page) => page.route),
      missingAltText: imageIssues
        .filter((issue) => issue.issue === "missing_image_alt")
        .map((issue) => issue.route),
      duplicateH1Groups: seoAudit.duplicateH1s,
      duplicateMetaDescriptionGroups: seoAudit.duplicateMetaDescriptions
    },
    imageIssues,
    imageIssueCounts,
    pagesMarkedNoindex: noindexPages,
    pagesExcludedFromSitemap: excludedFromSitemap
  };

  const titleMetaH1Audit = seoAudit.pageAudits.map((page) => ({
    route: page.route,
    title: page.title,
    description: page.description,
    h1: page.h1,
    canonical: page.canonical,
    robots: page.robots,
    issues: page.issues
  }));

  const buildAuditReport = {
    summary: buildSummary,
    missingMetaRoutes: seoAudit.pageAudits
      .filter((page) => page.issues.includes("missing_meta_description"))
      .map((page) => page.route),
    missingTitleRoutes: seoAudit.pageAudits
      .filter((page) => page.issues.includes("missing_title"))
      .map((page) => page.route),
    missingH1Routes: seoAudit.pageAudits
      .filter((page) => page.issues.includes("missing_h1"))
      .map((page) => page.route),
    duplicateRiskPages: seoAudit.pageAudits
      .filter((page) => page.duplicateRiskScore > 0.5)
      .map((page) => ({ route: page.route, duplicateRiskScore: page.duplicateRiskScore })),
    lowLocalizationWarnings: qualityWarnings
      .filter((page) => page.issues.includes("low_local_specificity"))
      .map((page) => page.route),
    lowServiceSpecificityWarnings: qualityWarnings
      .filter((page) => page.issues.includes("low_service_specificity"))
      .map((page) => page.route),
    repeatedFaqSetWarnings: seoAudit.repeatedFaqSets,
    duplicateMetaDescriptionWarnings: seoAudit.duplicateMetaDescriptions,
    missingImageAltWarnings: imageIssues.filter((issue) => issue.issue === "missing_image_alt"),
    repeatedTemplateWarnings: seoAudit.pageAudits
      .filter((page) => page.duplicateRiskScore > 0.65)
      .map((page) => page.route)
  };

  const uniquenessReport = pageEntries
    .filter((page) => page.uniquenessFingerprint)
    .map((page) => ({
      route: page.route,
      fingerprint: page.uniquenessFingerprint,
      sourceSummary: page.uniquenessSource.slice(0, 260)
    }));

  fs.writeFileSync(path.join(distDir, "build-summary.json"), JSON.stringify(buildSummary, null, 2), "utf8");
  writeSeoSummary(generatedSeoPages.summary, distDir);
  fs.writeFileSync(path.join(distDir, "page-quality-audit.json"), JSON.stringify(pageQualityReport, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "seo-audit.json"), JSON.stringify(seoAuditReport, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "title-meta-h1-audit.json"), JSON.stringify(titleMetaH1Audit, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "internal-link-audit.json"), JSON.stringify(internalLinkAudit, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "canonical-audit.json"), JSON.stringify(canonicalAudit, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "build-audit.json"), JSON.stringify(buildAuditReport, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "performance-report.json"), JSON.stringify(performanceReportWithOptimization, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "image-manifest.json"), JSON.stringify(imageManifest, null, 2), "utf8");
  fs.writeFileSync(path.join(distDir, "content-uniqueness.json"), JSON.stringify(uniquenessReport, null, 2), "utf8");

  console.log("Build complete.");
  console.log(JSON.stringify(buildSummary, null, 2));
}

build().catch((error) => {
  console.error("Build failed.", error);
  process.exit(1);
});

