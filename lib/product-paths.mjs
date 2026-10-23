export function productSlug({model,ian}){
 if(typeof ian!=='string'||!/^\d+$/.test(ian))throw Error('IAN must be a numeric string');
 if(model===null)return ian;
 const name=model.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 if(!name)throw Error('Model cannot produce a filename: '+model);
 return name+'-'+ian;
}

export function productRedirects(products,aliases){
 const byIan=new Map(products.map(p=>[p.ian,p]));
 const bySlug=new Map(products.map(p=>[p.slug,p.ian]));
 if(bySlug.size!==products.length)throw Error('Duplicate product slug');
 return Object.entries(aliases).flatMap(([from,ian])=>{
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(from))throw Error('Unsafe product alias: '+from);
  const product=byIan.get(ian);
  if(!product)throw Error('Unknown alias IAN: '+ian);
  if(bySlug.has(from)&&bySlug.get(from)!==ian)throw Error('Product alias collision: '+from);
  return from===product.slug?[]:[{from,to:product.slug}];
 });
}
