import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import {art} from './lib/product.mjs';
import {loadProducts} from './lib/catalog.mjs';
import {t,uiDictionary,languages} from './lib/i18n.mjs';
import {sameModel,variantDifferences} from './lib/identity.mjs';
const markdown=new MarkdownIt({html:false,linkify:false});
export default function(eleventyConfig){
 eleventyConfig.addPassthroughCopy({'src':'assets'});
 if(fs.existsSync('assets/products'))eleventyConfig.addPassthroughCopy({'assets/products':'assets/products'});
 for(const p of loadProducts()){
  const cached='.cache/product-images/'+p.ian+'.jpg';
  if(p.image&&!p.image.url.startsWith('assets/')&&fs.existsSync(cached))eleventyConfig.addPassthroughCopy({[cached]:'assets/products/'+p.ian+'.jpg'});
 }
 eleventyConfig.addWatchTarget('content/');
 eleventyConfig.addWatchTarget('locales/');
 eleventyConfig.addFilter('t',(key,lang,values={})=>t(lang,key,values));
 eleventyConfig.addFilter('art',category=>art(category));
 eleventyConfig.addFilter('markdown',value=>markdown.render(value||''));
 eleventyConfig.addFilter('rel',(target,outputPath)=>path.relative(path.dirname(outputPath),path.join('dist',target)).replaceAll('\\','/')||'index.html');
 eleventyConfig.addFilter('localeTarget',(outputPath,lang)=>path.relative('dist',outputPath).replaceAll('\\','/').replace(/^(it|en)\//,lang+'/'));
 eleventyConfig.addFilter('json',value=>JSON.stringify(value));
 eleventyConfig.addFilter('jsonScript',value=>JSON.stringify(value).replace(/</g,'\\u003c'));
 eleventyConfig.addFilter('clientMessages',lang=>Object.fromEntries(['resultOne','resultMany','shown','listView','gridView'].map(key=>[key,uiDictionary(lang)[key]])));
 eleventyConfig.addFilter('unique',values=>[...new Set(values)]);
 eleventyConfig.addFilter('keys',value=>Object.keys(value||{}));
 eleventyConfig.addFilter('sameModel',(products,model,slug,category)=>sameModel(products,model,category).filter(p=>p.slug!==slug));
 eleventyConfig.addFilter('modelVariants',(products,model,category)=>sameModel(products,model,category));
 eleventyConfig.addFilter('variantDifferences',variantDifferences);
 eleventyConfig.addFilter('correctionUrl',p=>{
  const q=new URLSearchParams({template:'product-correction.yml',title:`Correction: IAN ${p.ian}`,ian:p.ian,model:p.model||''});
  return JSON.parse(fs.readFileSync('config.json','utf8')).repository+'/issues/new?'+q;
 });
 eleventyConfig.addFilter('pad',value=>String(value).padStart(3,'0'));
 eleventyConfig.addFilter('primaryLabel',p=>p.source==='https://www.owim.com/'?'companyWebsite':((p.manufacturer&&p.manufacturer_basis!=='owner_confirmation')||/\.pdf(?:[?#]|$)/.test(p.source))?'manual':'officialCatalog');
 eleventyConfig.addGlobalData('languages',languages);
 eleventyConfig.addGlobalData('site',JSON.parse(fs.readFileSync('config.json','utf8')));
 return {dir:{input:'site',includes:'_includes',data:'_data',output:'dist'},templateFormats:['njk','md','11ty.js'],markdownTemplateEngine:false,htmlTemplateEngine:'njk'};
}
