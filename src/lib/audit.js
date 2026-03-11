const fs = require("fs");
const path = require("path");
const { contentRules, audits, technicalSeo } = require("../config");
const {
  stripTags,
  extractParagraphs,
  extractH1,
  extractLinks,
  countOccurrences,
  normalizeWhitespace,
  uniq
} = require("./utils");

function scoreParagraphSimilarity(a, b) {
  if (!a || !b) {
    return 0;
  }
  if (a === b) {
    return 1;
  }
  const aTokens = new Set(a.split(" ").filter(Boolean));
  const bTokens = new Set(b.split(" ").filter(Boolean));
  const intersection = [...aTokens].filter((token) => bTokens.has(token)).length;
  const union = new Set([...aTokens, ...bTokens]).size;
  return union ? intersection / union : 0;
}

function extractMeta(html, name) {
  const pattern = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i");
  const match = html.match(pattern);
  return match ? normalizeWhitespace(match[1]) : "";
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  return match ? normalizeWhitespace(match[1]) : "";
}

function extractTitle(html) {
  const match = html.match(/<title>(.*?)<\/title>/i);
  return match ? normalizeWhitespace(match[1]) : "";
}

function findParagraphReuse(paragraphs, globalParagraphMap) {
  const duplicates = [];
  for (const paragraph of paragraphs) {
    if (paragraph.length < 140) {
      continue;
    }
    const existing = globalParagraphMap.get(paragraph);
    if (existing) {
      duplicates.push(existing);
    }
  }
  return duplicates;
}

function createPageQualityAudit({ page }) {
  const wordCount = stripTags(page.html).split(/\s+/).filter(Boolean).length;
  const paragraphs = extractParagraphs(page.html);
  const localMentions = countOccurrences(page.textContent, page.localTokens.city || "");
  const serviceMentions = countOccurrences(page.textContent, page.localTokens.service || "");

  const issues = [];
  if (page.type === "money" && wordCount < contentRules.serviceCityWordRange.min) {
    issues.push("thin_content");
  }
  if (page.type === "money" && wordCount > contentRules.serviceCityWordRange.max) {
    issues.push("excessive_word_count");
  }
  if (page.type === "money" && localMentions < contentRules.minLocalMentions) {
    issues.push("low_local_specificity");
  }
  if (page.type === "money" && serviceMentions < contentRules.minServiceMentions) {
    issues.push("low_service_specificity");
  }

  return {
    route: page.route,
    pageType: page.type,
    wordCount,
    localMentions,
    serviceMentions,
    paragraphCount: paragraphs.length,
    issues,
    noindexRecommended: issues.length > 0,
    excludeFromSitemapRecommended: issues.length > 0
  };
}

function createSeoAudits(pages) {
  const titleMap = new Map();
  const descriptionMap = new Map();
  const canonicalMap = new Map();
  const h1Map = new Map();
  const faqSetMap = new Map();
  const globalParagraphMap = new Map();

  const pageAudits = [];

  for (const page of pages) {
    const title = extractTitle(page.html);
    const description = extractMeta(page.html, "description");
    const robots = extractMeta(page.html, "robots");
    const canonical = extractCanonical(page.html);
    const h1 = extractH1(page.html);
    const paragraphs = extractParagraphs(page.html);
    const faqKey = page.faqSetKey || "none";

    titleMap.set(title, [...(titleMap.get(title) || []), page.route]);
    descriptionMap.set(description, [...(descriptionMap.get(description) || []), page.route]);
    canonicalMap.set(canonical, [...(canonicalMap.get(canonical) || []), page.route]);
    h1Map.set(h1, [...(h1Map.get(h1) || []), page.route]);
    faqSetMap.set(faqKey, (faqSetMap.get(faqKey) || 0) + 1);

    const paragraphReuse = findParagraphReuse(paragraphs, globalParagraphMap);
    paragraphs.forEach((paragraph) => {
      if (!globalParagraphMap.has(paragraph)) {
        globalParagraphMap.set(paragraph, page.route);
      }
    });

    const issues = [];
    if (!title) {
      issues.push("missing_title");
    }
    if (!description) {
      issues.push("missing_meta_description");
    }
    if (!canonical) {
      issues.push("missing_canonical");
    }
    if (!h1) {
      issues.push("missing_h1");
    }
    if (!robots) {
      issues.push("missing_robots_meta");
    }

    if (description && description.length > technicalSeo.descriptionMaxLength + 20) {
      issues.push("meta_description_too_long");
    }
    if (title && title.length > technicalSeo.titleMaxLength + 20) {
      issues.push("title_too_long");
    }

    const duplicateParagraphRisk = paragraphReuse.length ? Math.min(1, paragraphReuse.length / Math.max(1, paragraphs.length)) : 0;

    pageAudits.push({
      route: page.route,
      title,
      description,
      canonical,
      h1,
      robots,
      faqSetKey: faqKey,
      duplicateParagraphSources: paragraphReuse,
      duplicateRiskScore: Number(duplicateParagraphRisk.toFixed(3)),
      issues
    });
  }

  const repeatedFaqSets = [...faqSetMap.entries()]
    .filter(([, count]) => count > contentRules.repeatedFaqSetThreshold)
    .map(([setKey, count]) => ({ setKey, count }));

  const duplicateTitles = [...titleMap.entries()]
    .filter(([key, routes]) => key && routes.length > audits.maxTitleDupes)
    .map(([title, routes]) => ({ title, routes }));

  const duplicateMetaDescriptions = [...descriptionMap.entries()]
    .filter(([key, routes]) => key && routes.length > audits.maxTitleDupes)
    .map(([description, routes]) => ({ description, routes }));

  const duplicateCanonicals = [...canonicalMap.entries()]
    .filter(([key, routes]) => key && routes.length > audits.maxCanonicalDupes)
    .map(([canonical, routes]) => ({ canonical, routes }));

  const duplicateH1s = [...h1Map.entries()]
    .filter(([key, routes]) => key && routes.length > 1)
    .map(([h1, routes]) => ({ h1, routes }));

  return {
    pageAudits,
    duplicateTitles,
    duplicateMetaDescriptions,
    duplicateCanonicals,
    duplicateH1s,
    repeatedFaqSets,
    summary: {
      pagesWithMissingMeta: pageAudits.filter((page) => page.issues.some((issue) => issue.startsWith("missing_"))).length,
      pagesWithHighDuplicateRisk: pageAudits.filter((page) => page.duplicateRiskScore > audits.maxDuplicateRiskScore).length,
      duplicateTitleGroups: duplicateTitles.length,
      duplicateMetaDescriptionGroups: duplicateMetaDescriptions.length,
      duplicateCanonicalGroups: duplicateCanonicals.length,
      repeatedFaqSetGroups: repeatedFaqSets.length
    }
  };
}

function createInternalLinkAudit(pages) {
  const outbound = new Map();
  const inbound = new Map();
  const anchorByRoute = new Map();

  pages.forEach((page) => {
    outbound.set(page.route, []);
    inbound.set(page.route, 0);
  });

  for (const page of pages) {
    const links = extractLinks(page.html).filter((link) => link.href.startsWith("/"));
    links.forEach((link) => {
      const normalized = link.href.endsWith("/") ? link.href.slice(0, -1) : link.href;
      const target = normalized || "/";
      const existing = outbound.get(page.route) || [];
      existing.push({ target, anchor: link.anchorText });
      outbound.set(page.route, existing);

      if (inbound.has(target)) {
        inbound.set(target, inbound.get(target) + 1);
      }
    });

    anchorByRoute.set(page.route, links.map((item) => item.anchorText));
  }

  const orphanPages = [...inbound.entries()]
    .filter(([route, count]) => route !== "/" && count === 0)
    .map(([route]) => route);

  const lowLinkPages = [...inbound.entries()]
    .filter(([route, count]) => route !== "/" && count < contentRules.lowLinkThreshold)
    .map(([route, count]) => ({ route, inboundLinks: count }));

  const overlinkedPages = [...outbound.entries()]
    .filter(([, links]) => links.length > contentRules.overLinkThreshold)
    .map(([route, links]) => ({ route, outboundLinks: links.length }));

  const anchorSamples = [...anchorByRoute.entries()].slice(0, 25).map(([route, anchors]) => ({
    route,
    anchors: uniq(anchors).slice(0, 10)
  }));

  return {
    orphanPages,
    lowLinkPages,
    overlinkedPages,
    anchorSamples,
    summary: {
      totalOrphans: orphanPages.length,
      totalLowLinkPages: lowLinkPages.length,
      totalOverlinkedPages: overlinkedPages.length,
      averageOutboundLinks:
        Math.round(
          ([...outbound.values()].reduce((sum, links) => sum + links.length, 0) / Math.max(1, outbound.size)) * 10
        ) / 10
    }
  };
}

function createPerformanceReport(pages, imageManifest, distDir = "") {
  const htmlBytes = pages.reduce((sum, page) => sum + Buffer.byteLength(page.html, "utf8"), 0);
  const imageCount = imageManifest.length;
  const htmlImageCount = pages.reduce((sum, page) => {
    const matches = page.html.match(/<img[^>]*>/gim);
    return sum + (matches ? matches.length : 0);
  }, 0);
  const lazyImageCount = pages.reduce((sum, page) => {
    const matches = page.html.match(/<img[^>]*loading="lazy"[^>]*>/gim);
    return sum + (matches ? matches.length : 0);
  }, 0);
  const dimensionedImageCount = pages.reduce((sum, page) => {
    const matches = page.html.match(/<img[^>]*width="[^"]+"[^>]*height="[^"]*"[^>]*>/gim) || [];
    return sum + matches.length;
  }, 0);

  let largestImageBytes = 0;
  const compressionWarnings = [];
  const imageDir = distDir ? path.join(distDir, "assets", "images") : "";

  if (imageDir && fs.existsSync(imageDir)) {
    const entries = fs.readdirSync(imageDir, { withFileTypes: true }).filter((entry) => entry.isFile());
    entries.forEach((entry) => {
      const filePath = path.join(imageDir, entry.name);
      const size = fs.statSync(filePath).size;
      if (size > largestImageBytes) {
        largestImageBytes = size;
      }
      if (size > 300 * 1024) {
        compressionWarnings.push({
          filename: entry.name,
          bytes: size,
          kilobytes: Math.round((size / 1024) * 10) / 10
        });
      }
    });
  }

  return {
    htmlBytes,
    averageHtmlBytes: Math.round(htmlBytes / Math.max(1, pages.length)),
    imageCount,
    htmlImageCount,
    lazyImageCount,
    dimensionedImageCount,
    lazyLoadCoverage: htmlImageCount ? Math.round((lazyImageCount / htmlImageCount) * 100) : 0,
    dimensionCoverage: htmlImageCount ? Math.round((dimensionedImageCount / htmlImageCount) * 100) : 0,
    largestImageBytes,
    compressionWarnings,
    hints: [
      "Static pre-rendered HTML",
      "Single stylesheet and single deferred script",
      "Lazy-loaded project images",
      "No runtime framework payload",
      "Image compression warnings reported for assets larger than 300KB"
    ]
  };
}

module.exports = {
  scoreParagraphSimilarity,
  createPageQualityAudit,
  createSeoAudits,
  createInternalLinkAudit,
  createPerformanceReport
};

