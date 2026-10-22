# Catalog rules

- Write all canonical Markdown records and templates in English. Product records live in content/products, one file per model and IAN. Keep IANs as strings.
- Do not infer a manufacturer from visual similarity or a spare parts catalog. Preserve the role explicitly stated by the source.
- Do not automatically carry evidence or specifications across IANs.
- Use primary sources and record the consultation date, document and verification limits in evidence.
- Keep manufacturer and oem null unless a source explicitly supports that role for the exact product.
- Never include GitHub tokens or other secrets in source, content, builds or logs.
- The repository is private. Do not change visibility or enable public hosting without the user's instruction.
- Run npm run build and npm test after content or generator changes.
- Keep Italian and English pages available and the README in English. UI dictionaries live in locales; Italian product translations live in locales/it-content.json. Preserve model, IAN, company, source and technical facts across languages.
- Use Eleventy and Nunjucks templates in site; do not introduce a custom static generator or Markdown parser.
- Keep technical data, translations, templates and styles separate. Document contributor workflows in CONTRIBUTING.md.
