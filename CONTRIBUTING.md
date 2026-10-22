# Contributing

Tooltrace is an Eleventy site. Start with the [official Eleventy documentation](https://www.11ty.dev/docs/).

## Setup

Use Node.js 22. On an existing checkout run `npm ci`, then `npm run dev`. Before submitting changes run `npm run build` and `npm test`.

## Product records

Copy `templates/product.md` into `content/products/`. Each model + IAN pair gets a separate file. Write all product fields and Markdown bodies in English. Use standard YAML frontmatter and Markdown. Field definitions are in `schemas/product.schema.json` and the template.

Preserve the distinction between a declared manufacturer and a catalog/spare-parts relationship. Include a primary-source URL, the consultation date, the relevant document page and the complete IAN suffix when available. Unknown values remain `null`. Evidence never automatically carries across IANs.

## Translations

Interface dictionaries are `locales/it.json` and `locales/en.json`. Italian translations of canonical English product text are in `locales/it-content.json`. Keep model names, IANs, company identities and technical facts unchanged. Missing text translations fail the build.

## Photos

Add an entry keyed by the exact IAN to `content/images.json`: `url`, `source`, `owner` and `checked`. Use an official product photo and a source page associating that photo with the correct model/IAN. Do not substitute a similar model. Keep the image owner's credit. Verify reuse permissions before publishing images publicly.

`npm run images` optionally caches the original photos for offline output. Missing downloads fall back to their source URL; failed browser loads reveal the original category icon. Do not commit image caches.

## Design and templates

Shared layouts and components use Nunjucks under `site/_includes/`. Catalog, product and methodology templates are separate `.njk` files. Styles live in `src/`; the readability and photo adjustments are in `src/refinements.css`.

Keep pages responsive and preserve accessible labels, alternate-language links and keyboard navigation. Do not add a database, runtime framework or credentials to the browser code.

## Pull requests

Describe the user-visible change, identify any new evidence, and report build/test results. Do not change repository visibility or publish a public site as part of an unrelated contribution.
