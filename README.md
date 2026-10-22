# Tooltrace

An independent Parkside tool catalog built with **[Eleventy (11ty)](https://www.11ty.dev/)**, standard Markdown/YAML frontmatter and Nunjucks templates. The output is plain static HTML, CSS and JavaScript. There is no database or application server.

Repository: https://github.com/informagico/parkside-catalog (private).

## Quick start

Use Node.js 22.

```sh
npm ci
npm run dev
```

Eleventy builds the site and starts its local preview server. For the production output:

```sh
npm run images
npm run build
npm test
```

The image step is optional locally. The complete website is generated in `dist/`. You can deploy that directory to any static host, or open `dist/index.html` directly. All internal links include explicit filenames and work under a project subpath.

If a new checkout does not yet contain a lockfile, use `npm install` once instead of `npm ci`.

## Technology and conventions

| Concern | Technology |
| --- | --- |
| Static site generation, pagination, data cascade and dev server | Eleventy 3 |
| Layouts and reusable UI components | Nunjucks, `.njk` |
| Product records | Markdown with YAML frontmatter |
| Frontmatter parsing | gray-matter |
| Markdown rendering | markdown-it |
| Interface and content translations | JSON dictionaries |
| Documented product field structure | JSON Schema, draft 2020-12 |
| Validation | Node.js test runner and project-specific provenance checks |
| CI and downloadable static site | GitHub Actions |

Eleventy replaces the original custom generator. The project follows Eleventy’s standard configuration, input-directory, data-file, layout and pagination conventions. Category drawings, provenance rules, translations and catalog filters are specific to this catalog.

This is a technology/conventions choice, not a claim of certification against every accessibility, security or data standard. The JSON Schema documents the data contract; provenance and translation rules are enforced by the build and tests.

## Project structure

```text
eleventy.config.js             Eleventy configuration and template filters
site/
  _data/catalog.js             Loads and localizes the product records
  _includes/layouts/base.njk   Shared page layout
  _includes/components/       Reusable components, including photo/icon fallback
  catalog.njk                 Catalog pages, paginated by language
  products.njk                Product pages, paginated by record and language
  method.njk                  Methodology pages
  index.njk                   Language selection
content/
  products/*.md               One canonical record per model + IAN
  images.json                 Official photo URLs, source pages and owner credits
locales/                      Italian and English translation dictionaries
lib/                          Catalog validation, translations and original SVG icons
src/                          CSS and small browser scripts
schemas/product.schema.json   Product frontmatter data contract
templates/product.md          New-record template
test/                         Integrity, translation, photo and link checks
```

## Languages

Italian and English pages are generated at build time:

- `/index.html`: language selection.
- `/it/index.html`, `/en/index.html`: localized catalogs.
- `/{language}/products/{model-ian}/index.html`: product records.
- `/{language}/method/index.html`: methodology.
- `/{language}/data/catalog.json`: localized export.
- `/data/catalog.json`: canonical data.
- `/data/markdown/`: original English Markdown.

The language switch preserves the current product, query, filters and fragment. Search covers both Italian and English product names. There is no runtime translation service.

UI strings live in `locales/it.json` and `locales/en.json`. Italian versions of canonical English product text are in `locales/it-content.json`, keyed by the exact source string. Missing translations fail the build. Model codes, IANs, company names, document URLs and numerical facts remain unchanged between languages.

To add a language, register it in `lib/i18n.mjs`, provide complete UI and content dictionaries, and update the root language label. Eleventy’s pagination generates the matching routes.

## Product data and evidence

There are 127 records for 92 distinct models. Most records are deliberately partial. A spare-parts listing does **not** establish the legal manufacturer or the physical factory.

A model with three IANs gets three records. Keep IANs as strings and record the complete batch suffix in the evidence when available. Do not copy evidence automatically to another IAN.

The `manufacturer` field names the manufacturer explicitly documented for that IAN, or stays `null`. The archived `role` and `oem` fields preserve source information, but are not displayed as fields on product pages. Source links and evidence remain visible.

Three records have verified declared manufacturers: Grizzly for PAMRC 250 A1 (IAN 507557) and PWD 25 C4 (IAN 458741), and Scheppach for PKS 1500 C4 (IAN 465511). PIFDS 120 B2 (IAN 472024) documents C.M.C. as conformity declarant and service provider. PWDL 40 A1 includes official Lidl specifications.

## Product photos

31 records currently have an official product-photo reference matched to their IAN. The registry stores the original URL, source page, publisher and consultation date. Photos appear in cards, product pages and the featured item. Original category icons are used when no photo is available or an image fails to load.

`npm run images` attempts to cache the photos in `.cache/product-images/`. The build bundles successful downloads into `dist/assets/products/`, so the GitHub ZIP can contain the photos themselves. Failed downloads retain the original URL and browser icon fallback. Image caches are not committed.

Photos belong to their respective owners. Credits and source links do not themselves grant a reuse license; verify permissions before public publication. Tooltrace's logo and category illustrations are original.

## Contribution workflow

See [CONTRIBUTING.md](CONTRIBUTING.md). In short:

1. Copy `templates/product.md` to `content/products/model-IAN.md`.
2. Add primary-source evidence and only verified facts.
3. Add translations for new text.
4. Add an exact-IAN photo reference where available.
5. Run the build and tests, then submit a pull request.

Standard YAML syntax, including multiline values, is supported by gray-matter. Product descriptions use normal Markdown rendered by markdown-it, with embedded HTML disabled.

## GitHub and hosting

Every push to `main` installs the locked dependencies, caches available photos, runs Eleventy and the tests, and uploads the `catalogo-statico` artifact. The migration lockfile is reviewed and committed as an ordinary source update; later builds use `npm ci`. GitHub Actions retains read-only repository access and never pushes source changes.

The repository remains private. The generated website never fetches private GitHub data from a visitor’s browser and contains no credentials.

To use GitHub Pages, first confirm that your plan supports Pages for private repositories and check the intended site audience. Select **Settings → Pages → Source: GitHub Actions**, then run the workflow manually with `publish_pages: true`. A private repository does not necessarily mean a private Pages site. Normal pushes build and validate without publishing.

The output can instead be deployed by any static hosting provider connected to the repository.

## Validation

Checks cover required metadata, duplicate identities, provenance constraints, translation completeness, matching locale catalogs, product pages, photo-source associations, browser fallback behavior and internal links. Visual QA still needs an environment where the browser can reach the preview.
