import {loadProducts} from '../../lib/catalog.mjs';
import {languages,localize,translate} from '../../lib/i18n.mjs';
import {modelIndex} from '../../lib/identity.mjs';
import {previewMetadata} from '../../lib/preview.mjs';
import fs from 'node:fs';
import {productRedirects} from '../../lib/product-paths.mjs';
export default function(){
 const products=loadProducts(),groups=modelIndex(products),modelIanCounts=new Map();
 for(const group of groups.values())for(const p of group)modelIanCounts.set(p.ian,group.length);
 const localized=Object.fromEntries(languages.map(lang=>[lang,products.map(p=>({...localize(p,lang),preview:previewMetadata(p,modelIanCounts.get(p.ian)||0)}))]));
 const options=Object.fromEntries(languages.map(lang=>[lang,{
  categories:[...new Set(products.map(p=>p.category))].sort().map(value=>({value,label:translate(value,lang)})),
  power:[...new Set(products.map(p=>p.power))].sort().map(value=>({value,label:translate(value,lang)})),
  companies:[...new Set(products.map(p=>p.manufacturer).filter(Boolean))].sort().map(value=>({value,label:value}))
 }]));
 const redirects=productRedirects(products,JSON.parse(fs.readFileSync('content/product-redirects.json','utf8')));
 return {products,localized,options,redirectEntries:languages.flatMap(lang=>redirects.map(p=>({...p,lang}))),entries:languages.flatMap(lang=>localized[lang].map(product=>({lang,product}))),count:products.length,models:groups.size,verified:products.filter(p=>p.manufacturer).length,photoCount:products.filter(p=>p.image).length};
}
