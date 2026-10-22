import fs from 'node:fs';
import matter from 'gray-matter';
import {validate} from '../../lib/product.mjs';
import {languages,localize,translate} from '../../lib/i18n.mjs';
export default function(){
 const images=JSON.parse(fs.readFileSync('content/images.json','utf8'));
 const products=fs.readdirSync('content/products').filter(file=>file.endsWith('.md')).map(file=>{
  const record=matter(fs.readFileSync('content/products/'+file,'utf8'));
  const product={...validate(record.data),body:record.content.trim(),slug:file.slice(0,-3),file};
  const image=images[product.ian];
  if(image)product.image={...image,local:fs.existsSync(`.cache/product-images/${product.ian}.jpg`)?`assets/products/${product.ian}.jpg`:null};
  return product;
 }).sort((a,b)=>a.ian==='544816'?-1:b.ian==='544816'?1:a.model.localeCompare(b.model));
 const ids=new Set();for(const p of products){const key=p.model+'|'+p.ian;if(ids.has(key))throw Error('Duplicate record: '+key);ids.add(key)}
 const localized=Object.fromEntries(languages.map(lang=>[lang,products.map(p=>localize(p,lang))]));
 const options=Object.fromEntries(languages.map(lang=>[lang,{
  categories:[...new Set(products.map(p=>p.category))].sort().map(value=>({value,label:translate(value,lang)})),
  power:[...new Set(products.map(p=>p.power))].sort().map(value=>({value,label:translate(value,lang)})),
  companies:[...new Set(products.map(p=>p.company))].sort().map(value=>({value,label:value}))
 }]));
 return {products,localized,options,entries:languages.flatMap(lang=>localized[lang].map(product=>({lang,product}))),count:products.length,models:new Set(products.map(p=>p.model)).size,verified:products.filter(p=>p.manufacturer).length,photoCount:products.filter(p=>p.image).length};
}
