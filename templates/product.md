---
# Use null if the model code is unknown; never use the IAN as a model.
model: "MODEL A1"
ian: "123456"
title: "Descriptive tool name"
# Choose an exact value from content/categories.json.
category: "Workshop Equipment"
power: "Unverified"
# Keep null when the manufacturer is unknown.
manufacturer: null
specifications: {}
# Optional: remove the manual and image blocks when unavailable.
manual: "https://example.com/product-manual.pdf"
# For separate variant manuals under one IAN, see the optional manuals list in CONTRIBUTING.md.
# Warranty and service leaflets belong in the optional documents list; see CONTRIBUTING.md.
image:
  url: "https://example.com/product-photo.jpg"
---

Write a concise English description of the tool and its documented features.
