# Catalog rules

- Canonical product Markdown and documentation are English. Keep one file per IAN in content/products. Use lowercase model-ian.md when the model is known and ian.md when it is null. Run npm run filenames -- --write after model corrections to align filenames and retain old public URLs in content/product-redirects.json. Preserve IANs as strings.
- Contributions need only one English Markdown file. Images belong in its image block; local images are included in assets/products. Never reintroduce a separate photo registry or the checked field.
- Translate product prose by IAN and stable field name in content/translations/<language>/<IAN>.json. Missing or outdated translations must never block valid English contributions. Hold stale translations back and show the English source with a notice.
- Shared category, power and specification labels are translated centrally in locales/fields. UI text lives in locales/<language>.json. Never use full product sentences as translation keys.
- The maintainer may add translations later. Use npm run translation -- IAN it for a scaffold; --reviewed updates the source fingerprint only after human review.
- Categories must match content/categories.json exactly. Use the ten approved categories and classification rules in docs/categories.md. Batteries and Accessories are separate; Batteries records require capacity in #.# Ah format and the documented battery system where applicable. Changes to the taxonomy itself still require user approval.
- Do not infer manufacturers from visual similarity or a spare parts catalog, and do not carry evidence across IANs. Use primary documents for manufacturer attributions. Descriptive catalog data may be added without publishing collection-site citations. Unknown manufacturers must remain null.
- Keep unknown manufacturer and OEM values null. Explicit catalog-owner confirmations may be recorded separately with manufacturer_basis: owner_confirmation; do not present them as archived documentary evidence.
- Never include credentials in source, content, builds or logs. The user approved a public repository and a public GitHub Pages site. Successful pushes to main publish automatically; pull requests must never deploy. Preserve this approved scope.
- Run npm run build and npm test after content or generator changes. Use Eleventy, Nunjucks and standard YAML/Markdown parsing; keep data, translations, templates and styles separate.
- Keep the contribution guide and PR checklist aligned. New design, naming and taxonomy decisions require the user's approval before applying.

- NEVER upload, publish, embed, attach or cite photographs supplied by the user in chat, including as evidence or reference files. Inspect them privately only to transcribe facts. Use externally sourced public product photos for public assets. This applies to repository files, history, website output and source links.

- Product descriptions must be concise, factual English prose about the tool and its documented features. Do not include drafting history, maintainer decisions, AI analysis, verification promises, or explanations of absent data. Keep any documentary references in optional metadata; do not render evidence notes as product descriptions. Use a short unknown-manufacturer label where needed. Review corresponding translations whenever prose changes.

- The product Identity section must show only Manufacturer, or Not identified when unknown. Do not add company, spare-parts-catalog, label-company or service-provider rows to this section.

- Whenever a model is added or corrected, check for other IANs with the same full normalized model code and category. Generate the multi-IAN badge and comparison table automatically in both languages, including the current IAN and links to all related records. Keep kits, generations and reused codes in different categories separate; never copy specifications or manufacturer evidence between IANs.

- Product pages contain product information and optional PDF manuals, without collection-site citations, image-source links or research notes. Source, evidence, company and image credit/reference metadata are optional. Never invent a source or manufacturer to satisfy a field. Local SVG photo assets may embed the original JPEG bytes without modifying the photo.
