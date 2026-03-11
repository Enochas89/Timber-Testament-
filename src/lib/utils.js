const path = require("path");

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cityLabel(city) {
  return `${city.name} ${city.state}`;
}

function citySlug(city) {
  return `${slugify(city.name)}-${city.state.toLowerCase()}`;
}

function serviceSlug(service) {
  return slugify(service);
}

function pathToOutputPath(routePath) {
  const normalized = routePath.replace(/^\//, "");
  if (!normalized || normalized === "index") {
    return path.join("dist", "index.html");
  }
  return path.join("dist", normalized, "index.html");
}

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickVariant(list, key, offset = 0) {
  const idx = (hashString(key) + offset) % list.length;
  return list[idx];
}

function pickVariants(list, key, count = 2) {
  if (!Array.isArray(list) || list.length === 0) {
    return [];
  }

  const picked = [];
  const used = new Set();
  let i = 0;

  while (picked.length < Math.min(count, list.length) && i < list.length * 2) {
    const idx = (hashString(`${key}-${i}`) + i) % list.length;
    if (!used.has(idx)) {
      used.add(idx);
      picked.push(list[idx]);
    }
    i += 1;
  }

  return picked;
}

function sentenceCase(input) {
  if (!input) {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function normalizeWhitespace(input) {
  return input.replace(/\s+/g, " ").trim();
}

function countOccurrences(haystack, needle) {
  if (!haystack || !needle) {
    return 0;
  }
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = haystack.match(new RegExp(escaped, "gi"));
  return matches ? matches.length : 0;
}

function extractParagraphs(html) {
  const matches = html.match(/<p[^>]*>(.*?)<\/p>/gims) || [];
  return matches.map((raw) => normalizeWhitespace(stripTags(raw).toLowerCase())).filter(Boolean);
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/ims);
  return match ? normalizeWhitespace(stripTags(match[1])) : "";
}

function extractLinks(html) {
  const re = /<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gims;
  const links = [];
  let match = re.exec(html);
  while (match) {
    const href = match[1];
    const anchorText = normalizeWhitespace(stripTags(match[2]));
    links.push({ href, anchorText });
    match = re.exec(html);
  }
  return links;
}

function truncate(input, maxLength) {
  if (!input || input.length <= maxLength) {
    return input;
  }
  return `${input.slice(0, maxLength - 3).trim()}...`;
}

function uniq(array) {
  return [...new Set(array)];
}

function estimateReadingTime(words) {
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

module.exports = {
  slugify,
  cityLabel,
  citySlug,
  serviceSlug,
  pathToOutputPath,
  hashString,
  pickVariant,
  pickVariants,
  sentenceCase,
  normalizeWhitespace,
  countOccurrences,
  extractParagraphs,
  extractH1,
  extractLinks,
  truncate,
  uniq,
  estimateReadingTime,
  stripTags
};
