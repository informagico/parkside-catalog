// Use explicit catalog metadata, never infer a range from voltage or model names.
export function previewMetadata(product,modelIanCount=0){
 const specifications=product.specifications||{};
 const ranges=[...new Set(['Product range','Battery system'].flatMap(key=>
  (specifications[key]||'').split(/\s+\/\s+/).map(value=>value.trim()).filter(Boolean)
 ))];
 // A slash inside a single code (such as CMVT1/250) is not a model separator.
 const multipleModels=(product.model||'').split(/\s+\/\s+/).length>1;
 const batteryCapacity=product.category==='Batteries'?(specifications['Battery capacity']||''):'';
 return {ranges,multipleModels,batteryCapacity,modelIanCount};
}
