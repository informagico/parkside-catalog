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
 // Self-host every OCR asset. No CDN or remote recognition endpoint.
 eleventyConfig.addPassthroughCopy({'node_modules/tesseract.js/dist/tesseract.esm.min.js':'assets/ocr/tesseract.esm.min.js'});
 eleventyConfig.addPassthroughCopy({'node_modules/tesseract.js/dist/worker.min.js':'assets/ocr/worker.min.js'});
 eleventyConfig.addPassthroughCopy({'node_modules/@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz':'assets/ocr/eng.traineddata.gz'});
 for(const file of fs.readdirSync('node_modules/tesseract.js-core').filter(file=>/\.wasm(?:\.js)?$/.test(file))){
  eleventyConfig.addPassthroughCopy({['node_modules/tesseract.js-core/'+file]:'assets/ocr/core/'+file});
 }
 // The visual model, index, worker and WASM are all served by this site.
 eleventyConfig.addPassthroughCopy({'assets/visual':'assets/visual'});
 eleventyConfig.addPassthroughCopy({'assets/fonts':'assets/fonts'});
 eleventyConfig.addPassthroughCopy({'.cache/visual-search/index.json':'assets/visual/index.json','.cache/visual-search/vectors.bin':'assets/visual/vectors.bin','.cache/visual-search/worker.js':'assets/visual/worker.js'});
 for(const file of ['ort-wasm-simd-threaded.mjs','ort-wasm-simd-threaded.wasm'])eleventyConfig.addPassthroughCopy({['node_modules/onnxruntime-web/dist/'+file]:'assets/visual/'+file});
 eleventyConfig.addPassthroughCopy({'node_modules/tesseract.js/dist/tesseract.min.js.LICENSE.txt':'assets/ocr/LICENSE-tesseract.txt','node_modules/tesseract.js-core/LICENSE':'assets/ocr/LICENSE-core.txt','node_modules/tesseract.js/dist/worker.min.js.LICENSE.txt':'assets/ocr/worker.min.js.LICENSE.txt'});
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
 eleventyConfig.addFilter('clientMessages',lang=>Object.fromEntries(['resultOne','resultMany','shown','listView','gridView','activeFilters',...Object.keys(uiDictionary(lang)).filter(key=>key.startsWith('scan'))].map(key=>[key,uiDictionary(lang)[key]])));
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
