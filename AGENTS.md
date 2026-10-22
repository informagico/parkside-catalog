# Catalog rules

- Canonical product Markdown and documentation are English. Keep one file per IAN in content/products. Preserve IANs as strings.
- Contributions need only one English Markdown file. Images belong in its image block; local images are included in assets/products. Never reintroduce a separate photo registry or the checked field.
- Translate product prose by IAN and stable field name in content/translations/<language>/<IAN>.json. Missing or outdated translations must never block valid English contributions. Hold stale translations back and show the English source with a notice.
- Shared category, power and specification labels are translated centrally in locales/fields. UI text lives in locales/<language>.json. Never use full product sentences as translation keys.
- The maintainer may add translations later. Use npm run translation -- IAN it for a scaffold; --reviewed updates the source fingerprint only after human review.
- Categories must match content/categories.json exactly. Use the nine approved function-based categories and classification rules in docs/categories.md. Changes to the taxonomy itself still require user approval.
- Do not infer manufacturers from visual similarity or a spare parts catalog, and do not carry evidence across IANs. Use primary sources. Evidence and verification limits must be explicit.
- Keep unknown manufacturer and OEM values null. Explicit catalog-owner confirmations may be recorded separately with manufacturer_basis: owner_confirmation; do not present them as archived documentary evidence.
- Never include credentials in source, content, builds or logs. Preserve private repository visibility and do not publish publicly without instruction.
- Run npm run build and npm test after content or generator changes. Use Eleventy, Nunjucks and standard YAML/Markdown parsing; keep data, translations, templates and styles separate.
- Keep the contribution guide and PR checklist aligned. New design, naming and taxonomy decisions require the user's approval before applying.
