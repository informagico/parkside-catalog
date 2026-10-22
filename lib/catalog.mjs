import fs from 'node:fs';
import {parse,validate} from './product.mjs';
export function loadProducts(){
 const ids=new Set();
 return fs.readdirSync('content/products').filter(file=>file.endsWith('.md')).map(file=>{
  const product={...validate(parse(fs.readFileSync('content/products/'+file,'utf8'))),slug:file.slice(0,-3),file};
  if(ids.has(product.ian))throw Error('Duplicate IAN: '+product.ian);ids.add(product.ian);
  if(product.image)product.image={...product.image,local:product.image.url.startsWith('assets/products/')?product.image.url:(fs.existsSync('.cache/product-images/'+product.ian+'.jpg')?'assets/products/'+product.ian+'.jpg':null)};
  return product;
 }).sort((a,b)=>a.ian==='544816'?-1:b.ian==='544816'?1:a.model.localeCompare(b.model));
}
