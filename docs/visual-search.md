# Browser visual product search

Open **Search by photo**, select or capture an image, optionally crop one product,
and choose **Find similar products**. **Read label** remains available for exact
IAN/model text searches. The existing dialog, crop controls and catalog styles are
reused in both languages.

**Also match text in the photo** is enabled by default. For a leaflet screenshot,
crop one product together with its nearby description. The exact same crop is
passed to image matching and local OCR. Disable the checkbox for image-only search.
The **Text read from the photo** disclosure shows the OCR output as plain text;
it is cleared with the photo and never interpreted as HTML or instructions.

Full documented models and explicitly labelled IANs take priority over appearance.
Product names in both languages and unit-qualified specification values provide
smaller ranking boosts. Decimal commas, thousand separators and common speed
notation are normalized. Prices, unlabelled numbers and generic promotional terms
do not count as identifiers. Missing specifications are never treated as
contradictions. These are heuristic text matches, not language-model reasoning.
Related IANs remain separate and no inferred facts are written to their records.

Text candidates are considered across the whole catalog, including records absent
from the visual shortlist or without a photo. Results show the detected code or
text clues that helped their ranking. Codes for different model/category groups
produce a warning to crop one article; they do not silently choose an identity.
OCR failure falls back to images; visual-model failure can still return text
candidates. Empty or generic OCR text preserves the image-only ordering.

Visual search suggests six visually similar model groups. It never confirms an
IAN, manufacturer, technical specification or accessory compatibility. Multiple
IANs are grouped only by the full normalized model code and canonical category;
every related record remains individually accessible. Unknown models are kept
separate. Results may include the wrong revision or a similar-looking tool.

## Privacy and runtime

Photo decoding, cropping, OCR, image features and ranking run on the visitor's device.
The selected photo, OCR text and embedding are not uploaded, persisted in browser
storage, logged or used to update the public index. Closing the dialog terminates
the worker and clears the preview/results. Choosing another file cancels pending
work. A timeout or unsupported browser leaves manual and label search available.

The first explicit combined search fetches about 50 MB from this site's origin:
the quantized model, single-threaded ONNX WASM runtime, OCR runtime/language,
generated photo index and localized result metadata. Image-only search needs
about 40 MB. Nothing is preloaded on ordinary catalog visits.
Static assets may use the browser's normal HTTP cache; selected photos do not.
No CDN, hosted inference, analytics endpoint, remote model fallback, WebGPU or
cross-origin isolation headers are required. A secure browser context supporting
WebAssembly SIMD, module workers and Web Crypto is required (HTTPS or localhost).
The existing Barlow Condensed and DM Sans fonts are self-hosted too, with their
original SIL Open Font License notices under `assets/fonts/`.

The model is DINOv2 small with quantized ONNX weights and a pinned SHA-256, checked
at build time and before inference. See [model provenance and license](../assets/visual/README.md).
The upstream model is used for image embeddings; it has not been trained to
certify Parkside product identity. The weak-match hint uses a heuristic cosine
threshold, not a calibrated probability. Similarity scores are not shown as
confidence percentages.

## Index maintenance

`npm run build` and `npm run dev` prepare the worker and index automatically.
`npm run visual:setup` restores missing pinned weights. No model download occurs
during a normal build. `npm run visual:index` regenerates just the photo index.

The indexer reads only the public images declared in canonical product Markdown:
local raster files, embedded raster bytes in local SVG wrappers, and successfully
cached public remote images. SVG code and external SVG references are never
executed. A missing or unreadable photo does not block an English contribution;
that record is omitted from image matching. Records without indexed photos remain
available in text, hybrid and label search. No separate photo registry is introduced.

SHA-256 of the image bytes, model checksum and preprocessing version key the
incremental `.cache/visual-search/embeddings` cache. Exact duplicate images share
an embedding but retain all their IANs. Removed images are dropped on the next
build. Changed metadata is regenerated in both languages; no product facts are
copied between IANs. Generated index files and embeddings are not committed.
GitHub Actions caches embeddings to avoid recomputing unchanged photos. A missing
cache is safe; the first build computes the full index on CPU. CI disables optional
CUDA downloads. Publication remains limited to successful builds of `main`.

Never use photographs privately supplied in chat for index assets, fixtures,
benchmarks, commits or website examples. Validation uses public catalog photos.

## Validation

Run `npm run build` and `npm test`. Browser validation must also check an actual
inference, a non-root deployment path, no external requests or upload requests,
crop/rotation, cancellation, combined leaflet search and label/manual search.
Verify each one-sided failure still returns the other side's candidates and that
generic promotional text does not reorder image results. Unit tests cover shared
preprocessing, quantized cosine retrieval, model/category grouping and index
integrity. Retrieval from transformed catalog photos is a useful regression test,
but does not measure accuracy on arbitrary real-world photographs.
