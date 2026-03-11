# Timber & Testament SEO Site Generator

Static local SEO site generator for `Timber & Testament Custom Carpentry`.

## Quick start

```bash
npm run build
```

Generated output is written to `dist/`.

## What gets generated

- Core pages: `/home`, `/services`, `/projects`, `/cities`, `/blog`, `/about`, `/contact`
- 225 service-city landing pages under `/services/{service}-{city}`
- 15 service hubs, 15 city hubs
- 6 project pages with SEO image filenames/alt/captions + ImageObject schema
- 20 blog pages
- `sitemap.xml`, `sitemap.txt`, `robots.txt`
- SEO and quality audit reports in `dist/*.json`

## Main reports

- `build-summary.json`
- `build-audit.json`
- `page-quality-audit.json`
- `seo-audit.json`
- `title-meta-h1-audit.json`
- `internal-link-audit.json`
- `canonical-audit.json`
- `performance-report.json`
- `content-uniqueness.json`

## Documentation

- [docs/LOCAL_SEO_SYSTEM.md](docs/LOCAL_SEO_SYSTEM.md)
- [docs/PAGE_TEMPLATES.md](docs/PAGE_TEMPLATES.md)
