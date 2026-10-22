import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('Photo records cite official pages and exact existing IANs',()=>{
 const photos=JSON.parse(fs.readFileSync('content/images.json','utf8'));
 const records=JSON.parse(fs.readFileSync('dist/data/catalog.json','utf8'));
 assert(Object.keys(photos).length>=30);
 for(const [ian,image] of Object.entries(photos)){
  assert(records.some(p=>p.ian===ian));assert(image.owner);assert(image.checked);
  assert.equal(new URL(image.url).protocol,'https:');assert.equal(new URL(image.source).protocol,'https:');
 }
});
test('Failed and already failed product images reveal category icons',()=>{
 let classesRemoved=0;const handlers=[];
 const images=[{complete:true,naturalWidth:0},{complete:false,naturalWidth:0}].map(img=>({...img,closest:()=>({classList:{remove:()=>classesRemoved++}}),addEventListener:(_,handler)=>handlers.push(handler)}));
 vm.runInNewContext(fs.readFileSync('src/photos.js','utf8'),{document:{querySelectorAll:()=>images}});
 assert.equal(classesRemoved,1);handlers[1]();assert.equal(classesRemoved,2);
});
test('Product pages use actual photos and omit the two removed fields in both languages',()=>{
 for(const lang of ['it','en']){
  const html=fs.readFileSync(`dist/${lang}/products/pwdl-40-a1-544816/index.html`,'utf8');
  assert(html.includes('data-product-photo'));assert(html.includes('photo-fallback'));
  for(const label of ['Ruolo documentato','Stabilimento / OEM','Documented role','Factory / OEM'])assert(!html.includes(`<dt>${label}</dt>`));
 }
});
