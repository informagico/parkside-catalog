# Officina Index

An independent, multilingual Parkside tool catalog, built as a fully static website from Markdown files. No database, application server or npm dependencies.

Repository: https://github.com/informagico/parkside-catalog (private).

## Quick start

Requires Node.js 22 or later.

```sh
npm run build
npm test
npm run dev
```

Open http://127.0.0.1:4173 and choose Italian or English. No `npm install` is required. You can also open `dist/index.html` directly in a browser: internal links include explicit file names, and filtering uses data already embedded in the page.

The complete output is in `dist/`. Relative links support static hosting at either a domain root or a subpath such as `/parkside-catalog/`.

## Architecture

| Path | Purpose |
| --- | --- |
| `content/products/*.md` | One canonical record per model and IAN |
| `locales/it.json`, `locales/en.json` | Interface translations |
| `locales/en-content.json` | English translations of product text and specification labels |
| `scripts/model.mjs` | Markdown frontmatter parsing, validation and category illustrations |
| `scripts/i18n.mjs` | Translation lookup, interpolation and localized records |
| `scripts/generate.mjs` | Static catalog, product and methodology page generation |
| `scripts/build.mjs` | Build entry point |
| `src/` | Shared styles and small browser scripts |
| `templates/product.md` | Template for a new product record |
| `test/` | Data integrity, provenance, translation and internal-link checks |
| `.github/workflows/pages.yml` | CI build and optional GitHub Pages deployment |

The generator supports a deliberately small Markdown subset: paragraphs and level-two headings. Frontmatter is flat YAML with JSON-formatted values, which are valid YAML. Specifications use an inline JSON object.

## Languages

Both Italian and English are generated at build time. There are no runtime translation services or database requests.

- `/index.html`: language selection.
- `/it/index.html` and `/en/index.html`: translated catalogs.
- `/{language}/products/{model-ian}/index.html`: translated product records.
- `/{language}/method/index.html`: methodology.
- `/{language}/data/catalog.json`: localized data export.
- `/data/catalog.json`: canonical source data.
- `/data/markdown/`: original Italian Markdown records.

The IT/EN switch opens the equivalent page in the other language. Search parameters, selected filters and the section fragment are retained. Filter values are shared canonical values, so the same category remains selected after switching.

The current canonical product text is Italian. English text is stored separately in `locales/en-content.json`, keyed by the exact source string. Manufacturer names, model codes, IANs, document URLs and numerical specifications are shared, not translated into different facts. Original documents remain the reference for declarations and safety instructions.

Missing UI keys and missing product translations fail the build instead of silently falling back to the wrong language. Numerical or language-neutral specification values are retained; translated specification values are listed explicitly.

### Adding another language

1. Add its code to `languages` in `scripts/i18n.mjs`.
2. Create a complete UI dictionary in `locales/{code}.json`, keeping the same keys and placeholders.
3. Add its product-content dictionary and register it in `scripts/i18n.mjs`.
4. Add the language to the root selection page in `scripts/generate.mjs`.
5. Run the build and tests. Routes, language switches and alternate-language metadata are generated for all configured languages.

## Adding or updating a record

Copy `templates/product.md` to `content/products/model-name-IAN.md`. Replace every example value. Keep the IAN as a string, including leading zeroes. Record the full batch suffix in the evidence when known.

For English, add translations of any new title, note, evidence, category, role, power description and specification labels to `locales/en-content.json`. Then run:

```sh
npm run build
npm test
```

A model with three IANs gets three records. Related IANs are linked automatically. The build rejects missing required fields, non-HTTPS sources, duplicate identities and missing translations.

## Provenance rules

| Field | Meaning |
| --- | --- |
| `manufacturer` | Company explicitly documented as the declared manufacturer for this IAN; otherwise `null` |
| `oem` | Physical factory or OEM, only when directly established; otherwise `null` |
| `company` | Company linked by the document or catalog |
| `role` | Precisely the relationship established by the source |
| `source` | Primary source supporting that relationship |
| `technical_source` | Source of specifications when different |
| `evidence` | Verified facts, document pages, full IAN and limits of the evidence |
| `checked` | Actual consultation date, not manufacturing date |
| `specifications` | Explicit technical data only |

A spare parts listing does **not** establish the legal manufacturer or the physical factory. Evidence is never automatically extended to another IAN, even when the model name is identical.

The initial collection contains **127 records for 92 distinct models**, mainly from the official Grizzly Tools and Kompernaß catalogs. Most records are intentionally incomplete. Three records have a verified declared manufacturer: Grizzly for PAMRC 250 A1 (IAN 507557) and PWD 25 C4 (IAN 458741), and Scheppach for PKS 1500 C4 (IAN 465511). The PIFDS 120 B2 (IAN 472024) record documents C.M.C. as conformity declarant and service provider without assuming the physical OEM.

The PWDL 40 A1 record includes official Lidl specifications. Categories and power descriptions derived from catalog titles are editorial classifications, not additional technical evidence. Historical Grizzly records can include non-Italian market variants.

## GitHub workflow and hosting

Edit Markdown and translation files through GitHub or a normal Git checkout. Every push to `main` runs the build, checks records and translations, and uploads the `catalogo-statico` artifact. The website never requests private repository data from a visitor's browser and contains no GitHub tokens.

The repository remains private. Publication is separate from building. To use GitHub Pages, first verify that your plan supports Pages for private repositories and confirm the site's intended audience. Configure **Settings → Pages → Source: GitHub Actions**, then run the workflow manually with `publish_pages: true`.

**A private repository does not necessarily mean a private Pages website.** Ordinary pushes only build and validate; the workflow does not automatically publish.

The generated files can also be hosted by another static provider connected to the repository. A separately created Sites preview is not automatically synchronized by GitHub pushes.

## Design and trademarks

Officina Index uses an original green/charcoal identity, its own logo and original category illustrations. The drawings are not product photographs. No Parkside or Lidl logos are reproduced.

Brand names identify the cataloged products. The site states that it is not affiliated with Lidl or Parkside. Fonts have system fallbacks, so the site remains usable if Google Fonts is unavailable.

## Validation limits

Automated checks cover metadata, provenance rules, translation completeness, matching language catalogs, generated product pages and local links. Desktop/mobile visual QA still needs to be completed in an environment where the browser can reach the preview.
