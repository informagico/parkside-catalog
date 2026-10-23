// Use explicit catalog metadata, never infer a range from voltage or model names.
export function previewMetadata(product){
 const specifications=product.specifications||{};
 const ranges=[...new Set(['Product range','Battery system'].flatMap(key=>
  (specifications[key]||'').split(/\s+\/\s+/).map(value=>value.trim()).filter(Boolean)
 ))];
 // A slash inside a single code (such as CMVT1/250) is not a model separator.
 const multipleModels=(product.model||'').split(/\s+\/\s+/).length>1;
 return {ranges,multipleModels};
}
