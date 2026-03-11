# Page Template Reference

## 1) Service + City Money Page

Pattern:

`/services/{service-slug}-{city-slug}`

Template:

- `src/templates/serviceCityPage.js`

Required blocks:

1. Hero with local primary keyword H1
2. Local market context using city metadata
3. Homeowner benefits and service-specific points
4. Process section from deterministic process pools
5. Project examples
6. FAQ section from pool rotation
7. Related links (same city services + nearby city service pages)
8. Conversion blocks (quote/call/trust/reviews/highlights)
9. Closing summary + uniqueness fingerprint marker

Schema:

- `FAQPage`
- `Service`
- plus global `WebPage`, `BreadcrumbList`, `Carpenter`, `Organization`

## 2) City Hub

Pattern:

`/cities/{city-slug}-carpentry`

Template:

- `renderCityHub` in `src/templates/pageBuilders.js`

Blocks:

1. City intro with county/local note context
2. Full service links for city
3. Top services for city
4. Related project highlights
5. Conversion CTA

## 3) Service Hub

Pattern:

`/services/{service-slug}`

Template:

- `renderServiceHub` in `src/templates/pageBuilders.js`

Blocks:

1. Service intro + use cases
2. All city variants for service
3. Supporting conversion/contact block

Schema:

- `Service`

## 4) Project Page

Pattern:

`/projects/{project-slug}`

Template:

- `renderProjectPage` in `src/templates/pageBuilders.js`

Blocks:

1. Project intro and summary
2. Gallery with SEO image filename + alt + caption
3. Scope of work
4. Materials
5. Before/after narrative
6. Internal links to matching money pages
7. Conversion CTA

Schema:

- `ImageObject` for each image
- global page schema stack

## 5) Blog Page

Pattern:

`/blog/{post-slug}`

Template:

- `renderBlogPost` in `src/templates/pageBuilders.js`

Blocks:

1. Intent-led homeowner guide intro
2. Planning framework
3. Related links to money pages and city hubs
4. Conversion CTA block

## 6) Core Pages

Core routes:

- `/home`
- `/services`
- `/projects`
- `/cities`
- `/blog`
- `/about`
- `/contact`

Templates:

- `renderHomePage`, `renderServicesIndex`, `renderProjectsIndex`, `renderCitiesIndex`, `renderBlogIndex`, `renderAboutPage`, `renderContactPage`

Contact form note:

- `/contact` currently uses `mailto:` fallback and should be wired to deployment form handling if needed.
