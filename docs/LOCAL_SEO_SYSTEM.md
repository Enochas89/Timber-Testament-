# Timber & Testament Local SEO System

## Overview

This project is a static Node.js SEO site generator for **Timber & Testament Custom Carpentry**.

The generator now runs two SEO layers together:

1. Legacy matrix and core pages from `src/config.js`
2. Expanded local SEO matrix from `src/data/seoConfig.js`

Expanded local SEO footprint:

- `150` root service-city pages (`6 services x 25 cities`)
- `25` root city hub pages
- `6` primary service hub pages

Examples:

- `/custom-built-ins-cleveland-tn`
- `/cabinetry-chattanooga-tn`
- `/cleveland-tn-carpentry`
- `/services/custom-built-ins`

## Build Command

```bash
npm run build
```

Optional standalone generator run:

```bash
npm run generate:seo
```

Output directory: `dist/`

## Core Files

- `src/data/seoConfig.js`
  - expanded city + service metadata model
  - deterministic content variation pools
- `src/templates/serviceCityTemplate.js`
  - root-level service-city page template (800-1200 words)
- `src/templates/seoHubTemplates.js`
  - city hub and service hub templates
- `scripts/generateSeoPages.js`
  - generates SEO entries and summary counts
- `scripts/generate-site.js`
  - full build pipeline, audits, sitemap, robots, reports

## Expanded Data Model

### Service schema (`src/data/seoConfig.js`)

Each service includes:

- `name`
- `slug`
- `shortDescription`
- `longDescription`
- `commonUseCases[]`
- `roomTypes[]`
- `benefits[]`
- `materials[]`
- `processNotes[]`
- `faqSeeds[]`
- `relatedServices[]`
- `serviceEmphasis`

### City schema (`src/data/seoConfig.js`)

Each city includes:

- `tier`
- `name`
- `slug`
- `state`
- `county`
- `nearbyCities[]`
- `landmarks[]`
- `localAreas[]`
- `localNotes[]`
- `serviceEmphasis[]`
- optional `introPhrases[]`

## Routing Structure

### Root service-city pages

Pattern:

- `/{service-slug}-{city-slug}`

Examples:

- `/custom-built-ins-cleveland-tn`
- `/floating-shelves-apison-tn`

### Root city hubs

Pattern:

- `/{city-slug}-carpentry`

Examples:

- `/cleveland-tn-carpentry`
- `/signal-mountain-tn-carpentry`

### Primary service hubs

Pattern:

- `/services/{service-slug}`

Examples:

- `/services/custom-built-ins`
- `/services/cabinetry`

## Breadcrumb Strategy

Breadcrumbs are visible and crawlable on:

- service hubs
- city hubs
- root service-city pages
- deeper legacy pages (via default fallback)

Examples:

- Service hub: `Home > Services > Custom Built-Ins`
- City hub: `Home > Service Areas > Cleveland TN`
- Service-city: `Home > Services > Custom Built-Ins > Cleveland TN`

Each breadcrumb trail also outputs matching `BreadcrumbList` JSON-LD.

## Internal Linking Lattice

### Layer 1: Homepage

Links to:

- `/services`
- `/cities`
- `/projects`
- `/blog`
- `/contact`

### Layer 2: Service hubs

Links to:

- all city versions of that service
- related service hubs
- relevant projects

### Layer 3: City hubs

Links to:

- all services for that city
- nearby city hubs
- related projects

### Layer 4: Service-city pages

Links to:

- parent service hub
- parent city hub
- nearby city pages for same service
- related services in same city
- `/projects`
- `/contact`

Anchor text variation is deterministic and data-driven to avoid repetitive exact-match anchors.

## Uniqueness Engine

Deterministic variation uses:

- intro templates
- service explanation templates
- city-local paragraphs
- process wording pools
- FAQ variation with service seed topics
- CTA variation
- nearby city references
- service/city metadata fields

Each generated page includes a uniqueness fingerprint and source summary in build outputs.

## FAQ + Schema Rules

FAQs are rendered on:

- service-city pages
- city hubs
- service hubs

Schema included only when FAQ content is visible:

- `FAQPage`
- `Service`
- global `LocalBusiness`, `Organization`, `WebPage`, `BreadcrumbList`

## Technical SEO Consistency

All generated pages include:

- unique title
- unique meta description
- canonical
- robots meta
- Open Graph tags
- Twitter card tags
- semantic heading structure
- breadcrumb HTML + BreadcrumbList schema

Canonical domain is pinned to:

- `https://www.timbertestament.com`

Legacy `/home` routes redirect to `/`.

## Sitemaps + Reports

Generated outputs include:

- `dist/sitemap.xml`
- `dist/sitemap.txt`
- `dist/robots.txt`
- `dist/seo-pages-summary.json`
- `dist/build-summary.json`
- `dist/seo-audit.json`
- `dist/internal-link-audit.json`
- `dist/page-quality-audit.json`
- `dist/canonical-audit.json`
- `dist/content-uniqueness.json`

`seo-pages-summary.json` now includes:

- `serviceCityPages`
- `cityHubPages`
- `serviceHubPages`
- `servicesCount`
- `citiesCount`

## Maintaining Cities and Services

### Add a city

1. Add city object to `src/data/seoConfig.js` with required fields.
2. Rebuild with `npm run build`.

### Add a service

1. Add service object to `src/data/seoConfig.js`.
2. Ensure `relatedServices` slugs are valid.
3. Rebuild with `npm run build`.

The generator automatically creates:

- service-city pages for all city combinations
- one service hub
- city hub links and internal lattice updates