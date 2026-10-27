# Contributing to Parkside Atlas

## Add a product without installing anything

1. Open [templates/product.md](templates/product.md) on GitHub and copy its raw contents.
2. Open content/products and choose **Add file → Create new file**. Use a lowercase model-ian.md name, for example pwdl-40-a1-544816.md. Replace spaces and punctuation in the model with hyphens. If the model is unknown, use only the IAN, for example 478092.md. If that IAN already exists, edit its file instead.
3. Paste the template. Replace the examples with English product information. Choose an exact category from [content/categories.json](content/categories.json). Remove the optional image block when no photo is available.
4. Choose **Propose changes** on a new branch, or work in a fork if you do not have write access. Open a pull request and fill in the prepared product fields and checkboxes.
5. GitHub Actions builds and tests the proposal. The maintainer reviews the evidence and merges it.

One English Markdown file is enough. Translations are optional and may be added later by the maintainer. No checked field or separate photo registry is used. The repository is public: external contributors can fork it and open a pull request. A merged change publishes automatically after the main-branch build and tests pass.

## Product fields

The template and [JSON Schema](schemas/product.schema.json) document the fields. Required: model, ian, title, category, power, manufacturer (null is valid) and specifications (an empty object is valid). Use model: null when the model code is unknown; never put the IAN or a guessed code in model. Filenames follow the current model and IAN; model corrections retain old public URLs through redirects. The manual, company, source and evidence fields are optional. Use strings for IANs and specification values. Product descriptions are normal Markdown after the frontmatter. Describe the tool, its intended use and documented features in concise, factual prose. Omit drafting history, contributor decisions, analysis notes and promises to verify missing data. Keep references and page numbers in evidence; this metadata is not displayed as product prose. Available PDF manuals are linked on product pages; collection-site citations and research notes are not displayed.

Do not infer manufacturers from appearance or a spare parts catalog. Keep manufacturer null unless evidence explicitly supports it. If confirmed in a manufacturer document, give the relevant passage in evidence. The maintainer can explicitly record owner_confirmation provenance; keep this provenance in the metadata, separate from documentary evidence. Never carry manufacturer claims or specifications across IANs.

Check the scope of the manual before adding data: a supplied charger's input power is not the cordless tool's power, and a component manual does not establish the identity of a whole kit. Record technical page references in optional technical_source and technical_evidence metadata. Model codes can be reused for unrelated products; comparisons group the same normalized model code within its functional category.

If an IAN covers separate articles with different manuals, add an optional `manuals` list in the same product file. Each entry needs `model` (the covered variant's model code) and `url` (its HTTPS PDF URL). The product page displays each manual with its model label in both languages. Keep `manual` as the primary URL when already present and include it in the list; when omitted, the first entry becomes the primary manual. Avoid duplicate URLs and keep specifications scoped to the variant documented by each PDF.

For a PDF containing warranty and service information, use an optional `documents` list with `type: "warranty"` and its HTTPS `url`. It appears as a labelled product document in both languages. A warranty leaflet does not fill the missing operating-manual field and does not establish technical specifications.

When adding or correcting a model code, check the other IANs for that full model and category. The site automatically displays their IAN count and comparison table in both languages. Keep each IAN's own specifications, manual and manufacturer provenance; a shared model is not permission to copy data between records. Different generations, kits and reused codes in different categories remain separate.

### Photos in the same Markdown

Images shared privately with the assistant in chat must never be uploaded to this repository, embedded on the website or published as evidence/reference files. Use official public product imagery instead.

Use image.url in the product frontmatter. Optional image.source and image.credit metadata can accompany an existing attribution. The URL can be an HTTPS official photo or a file included in the PR, for example assets/products/544816.jpg. Local filenames may contain letters, numbers, hyphens and underscores; supported formats are JPG, JPEG, PNG, WebP and SVG. A local SVG can wrap an unchanged JPEG photo.

Do not invent publisher or owner credits. Confirm that the photo shows the exact model and IAN, and that reuse is permitted. Upload local files with **Add file → Upload files**, on the same branch as the product change. Do not paste a GitHub attachment URL for an image you intend to include as a repository asset.

The build bundles local files and successfully downloaded remote photos. If the photo is unavailable, the original category icon is shown. Do not commit generated image caches.

The build also updates the visual search index from these public photos. Missing
or unreadable photos do not block a contribution; those products remain searchable
by text and label. Never add private chat photos or generated embedding caches to
a PR. For recognition changes, verify actual browser inference and same-origin
requests, combined image/text ranking and each one-sided failure fallback as
described in [visual search](docs/visual-search.md).

## Categories

Use one exact canonical English value from [content/categories.json](content/categories.json). The ten approved categories and classification examples are documented in [docs/categories.md](docs/categories.md). Batteries and battery/charger kits belong to Batteries; standalone chargers, battery adapters and general accessories belong to Accessories. Shared Italian category labels are maintained centrally. Do not invent an ad hoc category; ask the maintainer if a tool does not fit.

For Batteries records, include `Battery capacity` in specifications using `#.# Ah`, such as `2.0 Ah` or `2.5 Ah`. List separate documented capacities for alternatives under one IAN, such as `2.0 Ah / 4.0 Ah`. Include the documented `Battery system` (for example `X20V-Team` or `X12V-Team`) when applicable. Power banks need their cell capacity converted from mAh to Ah and do not receive a tool battery platform. Verify these facts for the exact IAN in its own source.

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

Maintainers can discover candidate manuals for incomplete records with `npm run manuals -- --limit 25 --download`. See [the manual search workflow](docs/manual-search.md) for selection, cached reports and document review. Discovery does not edit product records; verify each exact IAN and document scope before contributing its data.

Run `npm run audit` to list missing data and spelling variants of model codes. IANs remain unique; model comparisons never combine different generations or copy facts between IANs. After correcting a model, run `npm run filenames -- --write` to rename its file and preserve the previous public URL. Set an unknown model to null, and link only a product operating manual in manual (not warranty sheets, accessory-only instructions or data-access notices).

Run `npm run filenames` to check the naming convention without changing files. The write command updates Markdown source links and records old page slugs in `content/product-redirects.json`, keyed by old slug with the IAN as its string value. Keep these entries when a model changes again: every old URL redirects directly to the current product page in the same language. Product translations and images stay keyed by IAN.

## Consistency checks

Run `npm run audit` alongside the build and tests. The audit checks high-confidence contradictions in IANs, numeric dimensions, power sources and attachment types. Keep tightening and breakaway torque separate, retain the original tool-specific scope of kit specifications, and verify square versus hex drives and SDS-Plus versus SDS-Max directly in the relevant IAN manual. A shared model name or photo does not establish accessory compatibility across IANs.
