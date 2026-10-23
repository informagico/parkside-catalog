import fs from 'node:fs';
import {readTranslation,translationHash} from './translations.mjs';
export const languages=['it','en'];
const dictionaries=Object.fromEntries(languages.map(lang=>[lang,JSON.parse(fs.readFileSync('locales/'+lang+'.json','utf8'))]));
const fields={it:JSON.parse(fs.readFileSync('locales/fields/it.json','utf8'))};
export function t(lang,key,values={}){
 const value=dictionaries[lang]?.[key];
 if(typeof value!=='string')throw Error('Missing '+lang+' UI translation: '+key);
 return value.replace(/\{(\w+)\}/g,(_,k)=>{if(!(k in values))throw Error('Missing placeholder: '+k);return String(values[k])});
}
export function translate(value,lang){return fields[lang]?.[value]??value;}
export function localize(product,lang){
 const candidate=lang==='en'?null:readTranslation(product.ian,lang);
 const stale=!!candidate&&candidate._sourceHash!==translationHash(product);
 const translation=stale?null:candidate;
 if(translation?.specifications)for(const key of Object.keys(translation.specifications))if(!Object.hasOwn(product.specifications||{},key))throw Error('Unknown translated specification: '+key+' for IAN '+product.ian);
 const p={...product,language:lang,categoryKey:product.category,powerKey:product.power,translationNeedsReview:stale,translationMissing:false,textLanguages:{}};
 for(const key of ['title','body','evidence']){
  const value=translation?.[key];const translated=lang!=='en'&&typeof value==='string'&&!!value.trim();
  p[key]=translated?value:product[key];p.textLanguages[key]=translated?lang:'en';
  if(lang!=='en'&&!translated)p.translationMissing=true;
 }
 for(const key of ['category','role','power','market'])p[key]=translate(product[key],lang);
 p.companyLabelKey=/^(Catalog|Spare parts)/.test(product.role)?'sparesCompany':product.role==='Conformity declarant and service provider'?'serviceCompany':'documentCompany';
 p.searchTitles=[product.title,...(translation?.title?[translation.title]:[])];
 if(lang==='en'){const italian=readTranslation(product.ian,'it');if(italian?._sourceHash===translationHash(product)&&italian.title)p.searchTitles.push(italian.title);}
 p.specifications=Object.fromEntries(Object.entries(product.specifications||{}).map(([key,value])=>{const override=translation?.specifications?.[key];return [translate(key,lang),override?.trim()?override:translate(value,lang)];}));
 return p;
}
export const uiDictionary=lang=>dictionaries[lang];
