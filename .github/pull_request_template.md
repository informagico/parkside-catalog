## Product contribution

<!-- For code-only changes, replace this section with a description and validation. -->

| Field | Value |
| --- | --- |
| Change | New product / correction / photo / translation |
| Model | |
| IAN | |
| Product file | content/products/...md |
| Category (exact value) | |
| Primary source URL | |
| Source page or relevant passage | |
| Photo source and credit (if supplied) | |

### What does the source confirm?

<!-- Describe the facts supported for this exact IAN. A spare parts catalog alone does not establish a manufacturer. -->

### Contributor checklist

- [ ] I copied templates/product.md or edited an existing product record.
- [ ] The canonical product text is in English.
- [ ] I checked the model and IAN; this is not a duplicate.
- [ ] The filename is lowercase model-ian.md, or ian.md for an unknown model; existing page URLs are retained with `npm run filenames -- --write` after a rename.
- [ ] I checked other IANs for the same full model and category; the generated multi-IAN badge and comparison table include the related records without copying their data.
- [ ] I selected an exact category from content/categories.json.
- [ ] For Batteries records, I included capacity in `#.# Ah` format and the documented battery system where applicable; standalone chargers use Accessories.
- [ ] I linked a primary source and explained what it confirms.
- [ ] Unknown manufacturer information remains null.
- [ ] If I supplied a photo, it matches this model/IAN and includes its source and credit.
- [ ] If I supplied a local photo, the image file is included in this PR.
- [ ] Photos come from public sources, not private chat attachments; generated image/embedding caches are not included.

### Optional maintainer follow-up

Translations are not a contributor requirement and do not block this PR.

For candidate manual discovery, see [the manual search workflow](../docs/manual-search.md). Verify the exact IAN and document scope before using any result; keep search caches and research PDFs uncommitted.

- [ ] Add or review content/translations/it/IAN.json.
- [ ] Check shared field labels in locales/fields/it.json, if new labels were introduced.

### Automated checks

GitHub Actions validates the product, builds both languages, runs tests and produces a downloadable static preview. No local setup is required for content-only contributions.

For recognition changes, also verify browser inference, combined image/text
ranking, cancellation, one-sided failure fallbacks and same-origin requests using
[the visual search checks](../docs/visual-search.md).
