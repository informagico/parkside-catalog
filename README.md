# Parkside Atlas

An independent Parkside product catalog built with [Eleventy](https://www.11ty.dev/), Markdown/YAML frontmatter and Nunjucks templates. Static HTML, CSS and JavaScript; no database or application server.

Repository: https://github.com/informagico/parkside-catalog (private).

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

## Structure

| Path | Purpose |
| --- | --- |
| content/products/*.md | English records; one IAN per file, image included |
| content/translations/it/IAN.json | Optional translated title, body, evidence and textual specification values |
| content/categories.json | Exact allowed category values |
| locales/fields/it.json | Shared field labels and enum translations |
| locales/it.json, locales/en.json | Interface translations |
| assets/products/ | Optional image files included in a PR |
| templates/product.md | Contributor template |
| templates/translation.json | Optional translation scaffold |
| .github/pull_request_template.md | PR fields and checkboxes |
| docs/categories-proposal.md | Proposed taxonomy awaiting approval |
| schemas/ | Product and translation JSON Schemas |
| site/ | Eleventy data, pages and Nunjucks layouts |
| lib/ | Validation, loading, translations and category icons |
| src/ | Styles and small browser scripts |
| test/ | Integrity, fallback, image and link checks |

## Languages

The site generates Italian and English pages. Identity, source, image and technical facts come from the English record. Product translations use stable fields, never whole sentences as keys. Shared labels are translated centrally.

Missing translations fall back to English with a notice. A fingerprint of the English title, body, evidence and specifications detects outdated translations. Stale translations are held back until reviewed; image-only edits do not invalidate prose. The fingerprint is maintenance metadata, not a checked date. There is no checked field in products or photos.

Maintainer commands:

    npm run translation -- 544816 it
    npm run translation -- 544816 it --reviewed

The first creates an empty scaffold with the current fingerprint and refuses to overwrite existing text. The second preserves edited text and updates the fingerprint after human review.

The language switch preserves the current page and filters. Search uses both product titles when a current Italian translation exists. JSON exports remain available. Product pages no longer display a Markdown download link or bundle raw Markdown downloads.

## Data and provenance

127 records cover 92 distinct models. Unknown manufacturers and physical factories remain null. A spare parts catalog does not establish manufacture. Explicit owner confirmations are labeled separately from documentary evidence. PWDL 40 A1, IAN 544816, is attributed to Grizzly Tools following owner confirmation and uses the owner-selected Lidl photo.

The 31 photo references are now in their product Markdown. Each has a source and credit. Local files can be included in a PR; remote HTTPS photos are cached during builds when available. Original category icons are the fallback. Attribution does not itself grant a reuse license.

Categories use an exact allowlist. The existing seven are retained until approval of the proposed replacement; no bulk reclassification has been applied.

## Technology and checks

Eleventy handles generation, pagination and serving. Nunjucks provides layouts; gray-matter parses YAML; markdown-it renders Markdown with embedded HTML disabled. JSON Schema documents fields; Node tests and provenance rules validate behavior. This is not a certification claim.

Pushes to main and pull requests install locked dependencies, cache photos, build both languages, run tests and upload the catalogo-statico ZIP. English-only records are valid. The workflow never automatically commits translations or source changes.

PR builds have read-only repository and Pages access. Publishing remains limited to explicit workflow_dispatch with publish_pages enabled; only the deployment job has Pages write and identity-token permissions. Repository visibility remains private. Check plan and site audience before enabling Pages: a private repository does not necessarily mean a private website. Normal pushes and PRs do not publish.

Visual verification requires a browser that can reach the preview; build and integrity checks run independently.
