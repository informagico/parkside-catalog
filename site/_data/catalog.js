import {loadProducts} from '../../lib/catalog.mjs';
import {languages,localize,translate} from '../../lib/i18n.mjs';
export default function(){
 const products=loadProducts();
 const localized=Object.fromEntries(languages.map(lang=>[lang,products.map(p=>localize(p,lang))]));
 const options=Object.fromEntries(languages.map(lang=>[lang,{
  categories:[...new Set(products.map(p=>p.category))].sort().map(value=>({value,label:translate(value,lang)})),
  power:[...new Set(products.map(p=>p.power))].sort().map(value=>({value,label:translate(value,lang)})),
  companies:[...new Set(products.map(p=>p.company))].sort().map(value=>({value,label:value}))
 }]));
 return {products,localized,options,entries:languages.flatMap(lang=>localized[lang].map(product=>({lang,product}))),count:products.length,models:new Set(products.map(p=>p.model)).size,verified:products.filter(p=>p.manufacturer).length,photoCount:products.filter(p=>p.image).length};
}
