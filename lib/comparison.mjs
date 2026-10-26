import {translate} from './i18n.mjs';
export function comparisonProduct(original,localized,lang){
 return {ian:original.ian,model:original.model,title:localized.title,slug:original.slug,
  categoryKey:original.category,category:localized.category,manufacturer:original.manufacturer,
  powerKey:original.power,power:localized.power,market:localized.market,
  image:original.image?.local||null,
  specifications:Object.entries(original.specifications||{}).map(([key,value])=>({
   key,value,label:translate(key,lang),display:localized.specifications[translate(key,lang)]
  }))};
}
