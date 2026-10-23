# Contributing to Parkside Atlas

## Add a product without installing anything

1. Open [templates/product.md](templates/product.md) on GitHub and copy its raw contents.
2. Open content/products and choose **Add file → Create new file**. Name it model-IAN.md, for example pwdl-40-a1-544816.md. If that IAN already exists, edit its file instead.
3. Paste the template. Replace the examples with English product information. Choose an exact category from [content/categories.json](content/categories.json). Remove the optional image block when no photo is available.
4. Choose **Propose changes** on a new branch, or work in a fork if you do not have write access. Open a pull request and fill in the prepared product fields and checkboxes.
5. GitHub Actions builds and tests the proposal. The maintainer reviews the evidence and merges it.

One English Markdown file is enough. Translations are optional and may be added later by the maintainer. No checked field or separate photo registry is used. The repository is public: external contributors can fork it and open a pull request. A merged change publishes automatically after the main-branch build and tests pass.

## Product fields

The template and [JSON Schema](schemas/product.schema.json) document the fields. Required: model, ian, title, category, power, manufacturer (null is valid) and specifications (an empty object is valid). Use model: null when the model code is unknown; never put the IAN or a guessed code in model. Existing product filenames and URLs remain stable after model corrections. The manual, company, source and evidence fields are optional. Use strings for IANs and specification values. Product descriptions are normal Markdown after the frontmatter. Describe the tool, its intended use and documented features in concise, factual prose. Omit drafting history, contributor decisions, analysis notes and promises to verify missing data. Keep references and page numbers in evidence; this metadata is not displayed as product prose. Available PDF manuals are linked on product pages; collection-site citations and research notes are not displayed.

Do not infer manufacturers from appearance or a spare parts catalog. Keep manufacturer null unless evidence explicitly supports it. If confirmed in a manufacturer document, give the relevant passage in evidence. The maintainer can explicitly record owner_confirmation provenance; keep this provenance in the metadata, separate from documentary evidence. Never carry manufacturer claims or specifications across IANs.

Check the scope of the manual before adding data: a supplied charger's input power is not the cordless tool's power, and a component manual does not establish the identity of a whole kit. Record technical page references in optional technical_source and technical_evidence metadata. Model codes can be reused for unrelated products; comparisons group the same normalized model code within its functional category.

### Photos in the same Markdown

Images shared privately with the assistant in chat must never be uploaded to this repository, embedded on the website or published as evidence/reference files. Use official public product imagery instead.

Use image.url in the product frontmatter. Optional image.source and image.credit metadata can accompany an existing attribution. The URL can be an HTTPS official photo or a file included in the PR, for example assets/products/544816.jpg. Local filenames may contain letters, numbers, hyphens and underscores; supported formats are JPG, JPEG, PNG, WebP and SVG. A local SVG can wrap an unchanged JPEG photo.

Do not invent publisher or owner credits. Confirm that the photo shows the exact model and IAN, and that reuse is permitted. Upload local files with **Add file → Upload files**, on the same branch as the product change. Do not paste a GitHub attachment URL for an image you intend to include as a repository asset.

The build bundles local files and successfully downloaded remote photos. If the photo is unavailable, the original category icon is shown. Do not commit generated image caches.

## Categories

Use one exact canonical English value from [content/categories.json](content/categories.json). The nine approved function-based categories and classification examples are documented in [docs/categories.md](docs/categories.md). Shared Italian category labels are maintained centrally. Do not invent an ad hoc category; ask the maintainer if a tool does not fit.

## Optional translations — maintainer workflow

Each language gets a separate file per IAN: content/translations/it/544816.json. Stable fields are title, body and evidence. An optional specifications object translates textual values, keyed by their canonical English specification label. Do not repeat model, IAN, company, manufacturer, image or numeric facts.

Shared labels (category names, power types and specification labels) live in locales/fields/it.json. Interface text lives in locales/it.json and locales/en.json. Product sentences are never dictionary keys.

To create a translation scaffold locally:

    npm ci
    npm run translation -- 544816 it

Fill the title and body fields with Italian text. Translate evidence only when that optional field is present in the English record. The command supplies _sourceHash, a fingerprint of the current English text; maintainers do not calculate it by hand. JSON strings can contain Markdown, with paragraph breaks written as \n\n.

For a browser-only contribution, copy templates/translation.json into content/translations/it/IAN.json and fill the text. A missing fingerprint marks it for review; the maintainer completes the review step before the site uses it.

After editing an existing translation against changed English text, confirm the review with:

    npm run translation -- 544816 it --reviewed

This preserves the translation and records the new fingerprint. Only run it after reviewing the text. New or changed English records do not require translation work to pass CI. Missing fields fall back to English. A stale translation is held back and the page displays the English original with a review notice. Photo-only changes do not invalidate prose translations.

## Optional local preview

Use Node.js 22. Run npm ci, npm run dev. Before submitting code changes, run npm run build and npm test. Run npm run images if you want remote photos bundled locally. The static website is generated in dist.

## Quality checks

Run `npm run audit` to list missing data and spelling variants of model codes. IANs remain unique; model comparisons never combine different generations or copy facts between IANs. Model corrections preserve existing filenames and public URLs. Set an unknown model to null, and link only a product operating manual in manual (not warranty sheets, accessory-only instructions or data-access notices).

## Consistency checks

Run `npm run audit` alongside the build and tests. The audit checks high-confidence contradictions in IANs, numeric dimensions, power sources and attachment types. Keep tightening and breakaway torque separate, retain the original tool-specific scope of kit specifications, and verify square versus hex drives and SDS-Plus versus SDS-Max directly in the relevant IAN manual. A shared model name or photo does not establish accessory compatibility across IANs.
