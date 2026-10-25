# Local visual search model

The application serves these weights from its own origin. No Hugging Face API or
other hosted inference service is contacted by the browser.

- Architecture: DINOv2 small, 384-dimensional image embeddings.
- Original model: https://huggingface.co/facebook/dinov2-small
- ONNX conversion: https://huggingface.co/Xenova/dinov2-small
- Pinned conversion revision: `c2bb04a51fab207c420665f1946016107bffc701`
- File: `onnx/model_quantized.onnx`, 24,451,943 bytes.
- SHA-256: `3afdc8bc63b50558d6e5770f5b799bb82455c2311183a2de43803f343a29d917`
- License: Apache 2.0; see `LICENSE-DINOv2.txt` (Facebook Research DINOv2).
- License source: https://github.com/facebookresearch/dinov2/blob/main/LICENSE

The build checks the model checksum. `npm run visual:setup` can restore the pinned
weights; it is an explicit maintainer download and does not run in visitors'
browsers. The offline indexer and browser worker use the same letterbox and
ImageNet normalization in `src/visual-core.js`. This differs from the upstream
center crop so long tools remain visible in the input image.

ONNX Runtime Web is MIT licensed. Its retained distribution notices are included
in the built worker and WASM loader. Source: https://github.com/microsoft/onnxruntime.
