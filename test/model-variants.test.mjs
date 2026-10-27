import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadProducts} from '../lib/catalog.mjs';
import {sameModel,variantDifferences} from '../lib/identity.mjs';
import {previewMetadata} from '../lib/preview.mjs';
import {t,localize} from '../lib/i18n.mjs';
import {esc} from '../lib/product.mjs';

const products=loadProducts();

test('multiple IANs for a model are separate from multiple models in one IAN',()=>{
 const battery=products.find(p=>p.ian==='478218');
 const group=sameModel(products,battery.model,battery.category);
 for(const ian of ['478218','485628','505105'])assert(group.some(p=>p.ian===ian));
 assert(!group.some(p=>p.model==='PAPP 2012 A1'));
 const preview=previewMetadata(battery,group.length);
 assert.equal(preview.modelIanCount,group.length);assert.equal(preview.multipleModels,false);
 const kit=previewMetadata({model:'PAP 20 B1 / PLG 20 C1',specifications:{}},2);
 assert.equal(kit.modelIanCount,2);assert.equal(kit.multipleModels,true);
 assert.equal(previewMetadata({model:null}).modelIanCount,0);
});

test('every shared model has a matching badge and complete comparison table in both languages',()=>{
 for(const lang of ['it','en']){
  const home=fs.readFileSync(`dist/${lang}/index.html`,'utf8');
  const cards=new Map([...home.matchAll(/<article class="card"[\s\S]*?<\/article>/g)].map(m=>[m[0].match(/IAN (\d{5,6})<\/span>/)?.[1],m[0]]));
  assert.equal(cards.size,products.length);
  for(const p of products){
   const group=sameModel(products,p.model,p.category),shared=group.length>1;
   const card=cards.get(p.ian),html=fs.readFileSync(`dist/${lang}/products/${p.slug}/index.html`,'utf8');
   assert.equal(card.includes('badge-ians'),shared,lang+' '+p.ian+' preview badge');
   assert.equal(html.includes('badge-ians'),shared,lang+' '+p.ian+' detail badge');
   assert.equal(html.includes('id="model-variants-title"'),shared,lang+' '+p.ian+' comparison table');
   if(!shared)continue;
   const label=t(lang,'multipleIansForModel',{count:group.length});
   assert(card.includes(label));assert(html.includes(label));
   assert(html.includes('href="#model-variants-title"'));
   const table=html.match(/<table class="variant-table">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/)?.[1];assert(table);
   assert.equal((table.match(/<tr\b/g)||[]).length,group.length,p.ian+' row count');
   assert.equal((table.match(/class="current-variant"/g)||[]).length,1);
   assert(table.includes(`aria-current="page">${p.ian}</span>`));
   for(const other of group.filter(q=>q.ian!==p.ian))assert(table.includes(`href="../${other.slug}/"`),p.ian+' missing peer '+other.ian);
  }
 }
});

test('the comparison renders each IAN own values and leaves undocumented values blank',()=>{
 const current=products.find(p=>p.ian==='478218'),group=sameModel(products,current.model,current.category);
 for(const lang of ['it','en']){
  const localized=group.map(p=>localize(p,lang)),keys=variantDifferences(localized);
  const html=fs.readFileSync(`dist/${lang}/products/${current.slug}/index.html`,'utf8');
  const table=html.match(/<table class="variant-table">[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/)[1];
  const rows=[...table.matchAll(/<tr\b[\s\S]*?<\/tr>/g)].map(m=>m[0]);
  for(const p of localized){
   const row=rows.find(row=>row.includes('>'+p.ian+'</span>')||row.includes('>'+p.ian+' <span'));
   assert(row,p.ian);
   const cells=[...row.matchAll(/<td(?: [^>]*)?>([\s\S]*?)<\/td>/g)].map(m=>m[1]);
   assert.deepEqual(cells,[p.manufacturer||t(lang,'unknown'),p.power,...keys.map(key=>p.specifications[key]||'—')].map(esc),lang+' '+p.ian);
  }
 }
});
