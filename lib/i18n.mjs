import fs from 'node:fs';
export const languages=['it','en'];
const dictionaries=Object.fromEntries(languages.map(lang=>[lang,JSON.parse(fs.readFileSync(`locales/${lang}.json`,'utf8'))]));
const content=JSON.parse(fs.readFileSync('locales/it-content.json','utf8'));
export function t(lang,key,values={}){
 const value=dictionaries[lang]?.[key];
 if(typeof value!=='string')throw Error(`Missing ${lang} UI translation: ${key}`);
 return value.replace(/\{(\w+)\}/g,(_,k)=>{if(!(k in values))throw Error(`Missing placeholder: ${k}`);return String(values[k])});
}
export function translate(value,lang,required=true){
 if(value===null||value===undefined||lang==='en')return value;
 if(Object.hasOwn(content,value))return content[value];
 if(required)throw Error(`Missing ${lang} content translation: ${value}`);
 return value;
}
export function localize(product,lang){
 const p={...product,language:lang,categoryKey:product.category,powerKey:product.power};
 for(const key of ['title','body','evidence','category','role','power','market'])p[key]=translate(p[key],lang);
 p.companyLabelKey=/^(Catalog|Spare parts)/.test(product.role)?'sparesCompany':'documentCompany';
 p.companyNoteKey=/^(Catalog|Spare parts)/.test(product.role)?'sparesCompanyNote':'documentCompanyNote';
 p.searchTitles=[product.title,translate(product.title,'it')];
 p.specifications=Object.fromEntries(Object.entries(product.specifications||{}).map(([key,value])=>{
  const neutral=String(value).replace(/\b(?:Airwatt|IPX4|V|W|A|Hz|kg|mm|cm|m|L|s|rpm|II)\b/g,'').replace(/[\d\s.,×–−+\-\/()%°∼~]/g,'')==='';
  return [translate(key,lang),translate(value,lang,!neutral)];
 }));
 return p;
}
export const uiDictionary=lang=>dictionaries[lang];
