import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadProducts} from '../lib/catalog.mjs';
import {validate,categories} from '../lib/product.mjs';
import {previewMetadata} from '../lib/preview.mjs';
import {localize} from '../lib/i18n.mjs';

const products=loadProducts(),byId=new Map(products.map(p=>[p.ian,p]));
const batteries=products.filter(p=>p.category==='Batteries');

test('batteries are separate from chargers, adapters and complete tools',()=>{
 assert(!categories.includes('Batteries & Accessories'));
 assert(categories.includes('Batteries'));assert(categories.includes('Accessories'));
 assert.deepEqual(JSON.parse(fs.readFileSync('schemas/product.schema.json','utf8')).properties.category.enum,categories);
 assert.equal(byId.get('410300').category,'Batteries');
 assert.equal(byId.get('472055').category,'Accessories');
 assert.equal(byId.get('373426').category,'Accessories');
 assert.equal(byId.get('541091').category,'Drilling & Fastening');
 assert.equal(byId.get('480778').category,'Batteries');
 assert.equal(byId.get('514344').category,'Batteries');
});

test('battery capacities are explicit, formatted and scoped to each variant',()=>{
 assert(batteries.length>0);
 for(const p of batteries){
  assert.match(p.specifications['Battery capacity'],/^\d+\.\d Ah(?: \/ \d+\.\d Ah)*$/);
  assert.equal(previewMetadata(p).batteryCapacity,p.specifications['Battery capacity']);
  if(/^(?:12|20|40) V battery$/.test(p.power))assert(p.specifications['Battery system']);
 }
 assert.equal(byId.get('508300').specifications['Battery capacity'],'2.0 Ah / 4.0 Ah');
 assert.equal(byId.get('492252').specifications['Battery capacity'],'2.0 Ah');
 assert.equal(byId.get('480778').specifications['Battery capacity'],'10.0 Ah');
 assert.equal(byId.get('514344').specifications['Battery capacity'],'20.0 Ah');
 assert.equal(byId.get('532797').specifications['Battery system'],'X20V-Team');
 const italianBank=localize(byId.get('514344'),'it');
 assert(italianBank.title.includes('20.0 Ah'));
 assert(!/\b0\.0 Ah/.test(italianBank.title));
});

test('battery validation rejects missing or malformed capacities and missing tool platforms',()=>{
 const {image,...p}=byId.get('408019');
 for(const value of ['', '2 Ah','2,0 Ah','2000 mAh','0.0 Ah','2.25 Ah','2.0 Ah / 0.0 Ah']){
  assert.throws(()=>validate({...p,specifications:{...p.specifications,'Battery capacity':value}}),/Battery capacity/);
 }
 const {['Battery system']:system,...specifications}=p.specifications;
 assert.throws(()=>validate({...p,specifications}),/Battery system/);
 const bank=byId.get('480778');
 assert.doesNotThrow(()=>validate({...bank,image:undefined}));
 assert.equal(bank.specifications['Battery system'],undefined);
});

test('both languages show battery capacity and platform in previews and detail pages',()=>{
 for(const lang of ['it','en']){
  const home=fs.readFileSync(`dist/${lang}/index.html`,'utf8');
  const cards=[...home.matchAll(/<article class="card"[\s\S]*?<\/article>/g)].map(m=>m[0]);
  const batteryCards=cards.filter(c=>c.includes('data-category="Batteries"'));
  assert.equal(batteryCards.length,batteries.length);
  for(const p of batteries){
   const capacity=p.specifications['Battery capacity'],platform=p.specifications['Battery system'];
   const card=batteryCards.find(c=>c.includes('IAN '+p.ian+'</span>'));assert(card,p.ian);
   assert(card.includes('>'+capacity+'</span>'),p.ian+' preview capacity');
   if(platform)assert(card.includes('>'+platform+'</span>'),p.ian+' preview platform');
   const html=fs.readFileSync(`dist/${lang}/products/${p.slug}/index.html`,'utf8');
   const tags=html.match(/<div class="detail-tags">([\s\S]*?)<\/div>/)?.[1]||'';
   assert(tags.includes(capacity),p.ian+' detail capacity');
   if(platform)assert(tags.includes(platform),p.ian+' detail platform');
  }
 }
});

test('product pages keep the manufacturer identity without status badges',()=>{
 for(const lang of ['it','en'])for(const ian of ['408019','544816','515675']){
  const p=byId.get(ian),html=fs.readFileSync(`dist/${lang}/products/${p.slug}/index.html`,'utf8');
  for(const label of ['Manufacturer identified','Documented manufacturer','Manufacturer not identified','Produttore identificato','Produttore documentato','Produttore non identificato'])assert(!html.includes(label));
  assert(!html.includes('class="badge confirmed"'));
  if(p.manufacturer)assert(html.includes(p.manufacturer.replaceAll('&','&amp;')));
 }
});
