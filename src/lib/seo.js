const { business, technicalSeo } = require("../config");
const { truncate } = require("./utils");

function canonicalFor(routePath) {
  if (routePath === "/") {
    return `${business.website}/`;
  }
  const withLeading = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${business.website}${withLeading.endsWith("/") ? withLeading : `${withLeading}/`}`;
}

function buildTitle(parts) {
  const title = parts.filter(Boolean).join(" | ");
  return truncate(title, technicalSeo.titleMaxLength);
}

function buildDescription(input) {
  return truncate(input, technicalSeo.descriptionMaxLength);
}

function resolveRobots(isNoindex) {
  return isNoindex ? technicalSeo.noindexRobots : technicalSeo.defaultRobots;
}

function inferPageType(route) {
  if (route === "/home") {
    return "home";
  }
  if (route.startsWith("/services/") && route.split("/").length === 3 && route.split("-").length > 3) {
    return "money";
  }
  if (route.startsWith("/services/") || route.startsWith("/cities/")) {
    return "hub";
  }
  if (route.startsWith("/projects/")) {
    return "project";
  }
  if (route.startsWith("/blog/")) {
    return "blog";
  }
  return "utility";
}

function buildBreadcrumbs(route, pageTitle) {
  const crumbs = [{ name: "Home", url: "/home" }];

  const chunks = route.split("/").filter(Boolean);
  if (chunks.length === 0 || route === "/home") {
    return crumbs;
  }

  let acc = "";
  for (let i = 0; i < chunks.length; i += 1) {
    acc += `/${chunks[i]}`;
    const isLast = i === chunks.length - 1;
    const name = isLast
      ? pageTitle
      : chunks[i]
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
    crumbs.push({ name, url: acc });
  }

  return crumbs;
}

module.exports = {
  canonicalFor,
  buildTitle,
  buildDescription,
  resolveRobots,
  inferPageType,
  buildBreadcrumbs
};
