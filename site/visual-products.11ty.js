import {modelKey} from '../lib/identity.mjs';
export default class {
 data(){return {pagination:{data:'languages',size:1,alias:'lang'},permalink:data=>`${data.lang}/data/visual-products.json`,eleventyExcludeFromCollections:true};}
 render({catalog,lang}){
  return JSON.stringify(catalog.localized[lang].map(p=>({ian:p.ian,model:p.model,title:p.title,titleLanguage:p.textLanguages.title,slug:p.slug,category:p.category,group:p.model?JSON.stringify([p.categoryKey,modelKey(p.model)]):p.ian,image:p.image?.local||null,searchTitles:p.searchTitles,searchText:[p.body,...Object.keys(p.specifications)].join(' '),quantities:[p.powerKey,...Object.values(p.specifications)]})));
 }
}
