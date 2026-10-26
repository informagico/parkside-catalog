# Parkside Atlas

An independent Parkside product catalog built with [Eleventy](https://www.11ty.dev/), Markdown/YAML frontmatter and Nunjucks templates. Static HTML, CSS and JavaScript; no database or application server.

Repository: https://github.com/informagico/parkside-catalog (public).

Website: https://informagico.github.io/parkside-catalog/

## Contribute a product

Copy [templates/product.md](templates/product.md), fill it in English, save it under content/products and open a pull request. Product information and the optional photo are in the same file. No local setup is required for content-only contributions; GitHub runs the checks. The PR description includes prepared fields and checkboxes.

Translations are optional. The maintainer can add them later, separately for each IAN. [CONTRIBUTING.md](CONTRIBUTING.md) covers the browser workflow, photo upload and translation maintenance.

## Local development

Use Node.js 22:

    npm ci
    npm run dev

For production output:

    npm run images
    npm run build
    npm test

The optional image step bundles successful remote downloads. Static output is in dist and works under a project subpath or by opening index.html directly.

Product filenames use lowercase `model-ian.md`, or `ian.md` when the model is unknown. After a model correction, run `npm run filenames -- --write` to align filenames, update source links and preserve previous public URLs. Use `npm run filenames` for a read-only check.

## Structure

| Path | Purpose |
| --- | --- |
| content/products/*.md | English records; one IAN per file, image included |
| content/product-redirects.json | Previous product URL slugs mapped to their IANs |
| content/translations/it/IAN.json | Optional translated title, body, evidence and textual specification values |
| content/categories.json | Exact allowed category values |
| locales/fields/it.json | Shared field labels and enum translations |
| locales/it.json, locales/en.json | Interface translations |
| assets/products/ | Optional image files included in a PR |
| templates/product.md | Contributor template |
| templates/translation.json | Optional translation scaffold |
| .github/pull_request_template.md | PR fields and checkboxes |
| docs/categories.md | Approved categories, scope and classification rules |
| schemas/ | Product and translation JSON Schemas |
| site/ | Eleventy data, pages and Nunjucks layouts |
| lib/ | Validation, loading, translations and category icons |
| src/ | Styles and small browser scripts |
| test/ | Integrity, fallback, image and link checks |

## Languages

The site generates Italian and English pages. Identity, image and technical facts come from the English record. Product translations use stable fields, never whole sentences as keys. Shared labels are translated centrally.

Missing translations fall back to English with a notice. A fingerprint of the English title, body, evidence and specifications detects outdated translations. Stale translations are held back until reviewed; image-only edits do not invalidate prose. The fingerprint is maintenance metadata, not a checked date. There is no checked field in products or photos.

Maintainer commands:

    npm run translation -- 544816 it
    npm run translation -- 544816 it --reviewed

The first creates an empty scaffold with the current fingerprint and refuses to overwrite existing text. The second preserves edited text and updates the fingerprint after human review.

The language switch preserves the current page and filters. Search uses both product titles when a current Italian translation exists. JSON exports remain available. Product pages no longer display a Markdown download link or bundle raw Markdown downloads.

## Data and provenance

The catalog stores one English Markdown file per IAN, with optional Italian translations, technical specifications, photographs and PDF manuals. Unknown manufacturers remain null.

Product photos are defined inline in the product Markdown. Local JPG, JPEG, PNG, WebP and SVG assets are bundled directly; HTTPS photos can be cached during builds. Original category icons are the fallback.

Categories use an exact allowlist of ten approved groups, with Batteries separate from Accessories. Battery records include capacity in `#.# Ah` format and the documented battery system where applicable. Shared Italian labels are centralized. Category-only edits do not invalidate product prose translations. See docs/categories.md for definitions and examples.

## Technology and checks

Eleventy handles generation, pagination and serving. Nunjucks provides layouts; gray-matter parses YAML; markdown-it renders Markdown with embedded HTML disabled. JSON Schema documents fields; Node tests and provenance rules validate behavior. This is not a certification claim.

Pushes to main and pull requests install locked dependencies, cache photos, build both languages, run tests and upload the catalogo-statico ZIP. English-only records are valid. The workflow never automatically commits translations or source changes.

The repository and GitHub Pages site are public. Every successful push to main publishes the validated static output, including merged PRs. PR builds have read-only repository and Pages access and never deploy. Manual workflow_dispatch publication is also available on main with publish_pages enabled. Only the deployment job has Pages write and identity-token permissions. The workflow never pushes source commits.

Visual verification requires a browser that can reach the preview; build and integrity checks run independently.

## Browser photo and label search

**Search by photo** can find visually similar catalog products entirely on the
visitor's device. Select one product, optionally crop/rotate it and choose
**Find similar products**. By default it also reads text in the same crop to
cross-check IANs, full model codes, names and documented specifications. For a
leaflet, include one article's image and description. Text can find records without
a photo, and result clues explain which text matched. Disable **Also match text**
to search images alone. The first combined use downloads about 50 MB of self-hosted
model/runtime/index assets; photos, OCR text and embeddings are never uploaded or
saved. Results are candidates, with related IAN links, and never establish an
exact identity or manufacturer. **Read label** remains available for IAN/model OCR. See
[visual search maintenance and privacy](docs/visual-search.md).

The photo search dialog includes **Read label** in Italian and English. Take a photo or
choose an image, optionally drag a crop around the label or rotate it, then run
OCR. Confirm or edit the detected IAN/model before searching. IAN batch suffixes
are shown for review but omitted from the catalog query; confirmed scans clear
category, manufacturer, power and identified-manufacturer filters. No manufacturer
is inferred from the photo.

Images are decoded and processed in memory in the browser, never uploaded or
stored. Tesseract.js, its Web Worker, WebAssembly cores and English OCR model are
copied from locked npm dependencies into `assets/ocr/` during the Eleventy build.
All OCR requests stay on the site's origin, including under a GitHub Pages
project subpath. OCR loads only after **Read label** or an explicit photo search
with **Also match text** enabled. The language
model may be cached locally by Tesseract; photos are not cached. Closing the
scanner releases the image and terminates an active recognition worker. The
catalog itself remains online; this feature does not promise offline access.

Supported browsers need modules, WebAssembly, Web Workers and native HTML dialogs.
Camera capture uses the device's file picker; on desktop it may open a file
chooser instead. Unsupported image formats can be retried as JPEG, PNG or WebP.

## Product comparison

Use **Compare** on a catalog card or product page to select up to three IANs.
The selection stays in this browser while navigating and is shared between the
Italian and English interfaces. Open the comparison tray to see the union of
available specifications. **Differences only** hides matching rows while keeping
incomplete rows visible. Missing manufacturer or technical data is never treated
as evidence of a product difference. Values are compared using their canonical
English fields, ignoring case and whitespace; units and differently worded
specifications are not assumed equivalent.

**Copy link** creates a comparison URL with the selected IANs. Opening that link
restores its selection. Comparison works in the browser with a static catalog
JSON file; no third-party service is used. On small screens the table scrolls
horizontally with sticky product headers and field labels.
