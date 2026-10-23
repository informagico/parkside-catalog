export function modelKey(model){
 if(typeof model!=='string'||!model.trim()||/^IAN\s*\d/i.test(model))return null;
 return model.normalize('NFKC').toUpperCase().split('/').map(part=>part.replace(/[^A-Z0-9]/g,'')).filter(Boolean).sort().join('/');
}
export function modelIndex(products){
 const groups=new Map();
 for(const p of products){const key=modelKey(p.model);if(!key)continue;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}
 return groups;
}
const indexes=new WeakMap();
export function sameModel(products,model){if(!indexes.has(products))indexes.set(products,modelIndex(products));return indexes.get(products).get(modelKey(model))||[];}
export function variantDifferences(products){
 const keys=[...new Set(products.flatMap(p=>Object.keys(p.specifications||{})))];
 return keys.filter(key=>new Set(products.map(p=>p.specifications?.[key]||'')).size>1);
}
