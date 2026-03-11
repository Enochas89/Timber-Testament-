# Timber & Testament Local SEO System

## Overview

This project is a static Node.js local SEO site generator for `Timber & Testament Custom Carpentry`.

Current generated footprint:

- 289 total routes (including legacy `/home` redirect page)
- 225 `service + city` money pages
- 15 service hubs
- 15 city hubs
- 6 project pages
- 20 blog posts

Build command:

```bash
npm run build
```

Output directory: `dist/`

## Architecture

### Routing rules

- `/` is the canonical homepage route and contains the full home content.
- `/home` and `/home/` are legacy aliases and permanently redirect to `/` via `vercel.json`.
- A fallback static redirect page is also generated at `dist/home/index.html`.

### Core generation flow

- `scripts/generate-site.js`
  - builds all routes
  - applies quality guardrails
  - applies noindex/sitemap exclusions based on config
  - renders final HTML with canonical/meta/schema
  - generates audit reports

### Templates

- `src/templates/layout.js`
  - shared SEO head renderer (React Helmet equivalent in static generation)
  - canonical/robots/OG/Twitter
  - global schema blocks
  - breadcrumb markup
  - mobile sticky CTA insertion point
- `src/templates/serviceCityPage.js`
  - long-form money page with variation engine
  - FAQ + Service schema
  - conversion blocks + internal link modules
- `src/templates/pageBuilders.js`
  - hubs, core pages, project pages, blog pages

### Helper modules

- `src/lib/contentEngine.js`
  - deterministic uniqueness composition per `service + city`
  - FAQ/process pool rotation
  - uniqueness fingerprint generation
- `src/lib/schema.js`
  - modular JSON-LD generators:
    - `Carpenter` / LocalBusiness
    - `Organization`
    - `WebPage`
    - `BreadcrumbList`
    - `FAQPage`
    - `Service`
    - `ImageObject`
- `src/lib/linking.js`
  - relevance-based internal link and anchor variation logic
- `src/lib/conversionBlocks.js`
  - reusable quote/call/trust/review/project highlight blocks
- `src/lib/audit.js`
  - page quality checks
  - SEO/meta/canonical/H1 checks
  - internal linking graph checks
  - lightweight performance report
- `src/lib/seo.js`
  - canonical builder
  - robots policy resolution
  - breadcrumb trail generation

## Config Structure

Primary config file: `src/config.js`

### Includes

- `business`: identity, contact, address, map embed, social/profile URLs, tracking placeholders
- `services[]`: richer service metadata (selling points, benefits, use-cases, FAQ/process pool keys)
- `cities[]`: county, nearby communities, neighborhoods, landmarks, local notes, service-area wording
- `blogTopics[]`: topic metadata + related services/cities
- `projects[]`: summary, scope of work, before/after, materials, image sets
- `variation`: reusable content structures
- `faqPools` and `processPools`
- `conversion`: CTA/review/trust block content
- `contentRules`: thin/quality thresholds
- `indexation`: noindex + sitemap exclusion behavior
- `sitemap`: priorities and change frequency
- `technicalSeo`: title/description/robots standards

## Uniqueness Engine

Service-city pages use deterministic content assembly:

- intro structures
- local relevance blurbs
- process pool variations
- FAQ pool rotations
- service-level selling points/benefits/use-cases
- city-level neighborhoods/landmarks/community mentions
- varied internal anchor text and CTA phrasing

Each money page emits:

- uniqueness fingerprint
- source summary entries in `dist/content-uniqueness.json`

## Doorway/Thin-Content Guardrails

Build-time checks include:

- min/max word count (money pages)
- low local specificity
- low service specificity
- duplicate paragraph risk scoring
- repeated FAQ set threshold
- duplicate title/canonical/H1 group detection
- duplicate meta description group detection
- missing title/meta/canonical/robots/H1 detection
- image SEO checks (missing alt, non-SEO filename, missing lazy loading, missing dimensions)

Actions are configurable:

- auto-mark `noindex`
- auto-exclude from sitemap

Config section: `indexation` + `contentRules`

## Technical SEO

Per-page technical SEO output includes:

- self-referencing canonical
- unique title + meta description generation
- robots meta support (`index,follow` or `noindex,follow`)
- Open Graph + Twitter card tags
- breadcrumb HTML + `BreadcrumbList` schema
- consistent single H1
- canonical and sitemap URL consistency pinned to `https://www.timbertestament.com`

Generated crawl/index assets:

- `dist/robots.txt`
- `dist/sitemap.xml`
- `dist/sitemap.txt`

Sitemap logic:

- Home: `1.0`
- Service routes: `0.9`
- City routes: `0.8`
- Project routes: `0.7`
- Blog routes: `0.6`
- All sitemap URLs are absolute and use the production canonical domain.

Robots output:

- `User-agent: *`
- `Allow: /`
- `Sitemap: https://www.timbertestament.com/sitemap.xml`

## Image rules

- All generated `<img>` tags are normalized to include:
  - `loading="lazy"`
  - `width` and `height` attributes
  - `decoding="async"`
- Build audit checks report:
  - missing `alt`
  - non-SEO-friendly image filenames
  - missing lazy loading
  - missing image dimensions

## Internal Linking Strategy

Implemented rules:

- service-city pages link to related services in same city
- service-city pages link to same service in nearby cities
- service-city pages link to service hub + city hub
- city hubs link to full service set + top services
- project pages link to matching service-city and city hubs
- blog posts link to related money pages
- anchor text uses deterministic variation patterns

Audit output: `dist/internal-link-audit.json`

## Conversion Blocks

Reusable static conversion modules:

- quote CTA block
- click-to-call block
- trust statement block
- review snippets block
- recent project highlights block
- service area reassurance block
- mobile sticky CTA (lightweight)

Inserted across key templates with configurable copy.

## Homepage SEO Content

Homepage now includes:

- primary keyword H1: `Custom Carpentry, Built-Ins & Cabinetry in Cleveland Tennessee`
- hero paragraph covering custom carpentry, built-ins, cabinetry, finish carpentry, Cleveland TN, and Southeast Tennessee
- service area text explicitly mentioning Cleveland TN, Athens TN, Charleston TN, Chattanooga TN, and Ooltewah TN
- service spotlight cards for:
  - Custom Built-Ins
  - Cabinetry
  - Floating Shelves
  - Custom Libraries
  - Mantels
  - Finish Carpentry
- process section:
  - Consultation
  - Design
  - Workshop Fabrication
  - Installation
- visible trust/contact block (phone, email, service area)

## Project Page Enhancements

Project pages now include:

- project summary
- service + city association
- materials list
- scope of work list
- before/after narrative
- image captions/alt and SEO filenames
- internal links to related money pages
- `ImageObject` schema per image
- conversion CTA blocks

## Build Reports

Generated in `dist/`:

- `build-summary.json`
- `build-audit.json`
- `page-quality-audit.json`
- `seo-audit.json`
- `title-meta-h1-audit.json`
- `canonical-audit.json`
- `internal-link-audit.json`
- `performance-report.json`
- `image-manifest.json`
- `content-uniqueness.json`

`seo-audit.json` includes explicit checks for:

- missing titles
- missing meta descriptions
- missing image alt text
- duplicate H1 groups
- duplicate meta description groups

## Deployment Notes

- Output is static HTML/CSS/JS and can be hosted on Netlify, Vercel static output, Cloudflare Pages, S3+CloudFront, or any static host.
- Contact form currently uses `mailto:` fallback in `/contact`.
- Replace placeholder social/profile links, tracking IDs, and phone/address data in `src/config.js` before production launch.
- Replace placeholder image files in `dist/assets/images` (or adapt build to pull from a source image folder).
