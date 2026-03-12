# Timber & Testament Website

SEO-first website scaffold for a custom carpentry company, optimized for local search in:

- Cleveland, TN
- Chattanooga, TN
- Athens, TN
- Dalton, GA
- Collegedale, TN
- Ooltewah, TN
- Apison, TN
- Charleston, TN

## Stack

- Next.js (App Router) + TypeScript
- Static generation for service, city, and city-service pages
- Vercel deployment

## Local SEO Features Included

- Dynamic metadata with canonical URLs
- `sitemap.xml` and `robots.txt`
- JSON-LD schema:
  - `LocalBusiness`
  - `Service`
  - `FAQPage`
  - `BreadcrumbList`
- Internal linking between:
  - service pages
  - city pages
  - city/service pages
  - project case studies
- Conversion-focused contact page

## Routes

- `/`
- `/about`
- `/contact`
- `/services`
- `/services/[service]`
- `/cities`
- `/cities/[city]`
- `/cities/[city]/[service]`
- `/projects`
- `/projects/[project]`

## Content Intake

Drop content into `content-intake/`:

- `content-intake/business-profile.md`
- `content-intake/projects/`
- `content-intake/photos/`
- `content-intake/cities/`

Then map that content into `src/data/*.ts`.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Set environment variables in Vercel project settings.
4. Trigger deploy.
5. Submit `https://yourdomain.com/sitemap.xml` to Google Search Console and Bing Webmaster.

## Recommended Next SEO Actions

1. Replace placeholder NAP and geo in `src/data/business.ts`.
2. Replace placeholder projects with real case studies and photos.
3. Add Google Business Profile URL and active review process.
4. Publish 2 localized blog posts per month and internally link to service/city pages.
