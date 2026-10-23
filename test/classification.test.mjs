import test from 'node:test';
import assert from 'node:assert/strict';
import {loadProducts} from '../lib/catalog.mjs';
import {classificationIssue} from '../lib/classification.mjs';
const products=loadProducts();
test('dedicated consumables and complete tools follow their documented function',()=>{
 assert.deepEqual(products.map(classificationIssue).filter(Boolean),[]);
 const byId=new Map(products.map(p=>[p.ian,p]));
 assert.equal(byId.get('449839').category,'Sawing & Cutting');
 assert.equal(byId.get('472055').category,'Accessories');
 assert.equal(byId.get('472055').model,'PLG 20 C1');
 assert.match(byId.get('472055').title,/charger/i);
});
test('classification audit preserves mixed disc assortments and flags clear misfilings',()=>{
 assert.equal(classificationIssue({ian:'1',title:'Cutting and grinding disc set',category:'Sanding & Grinding'}),null);
 assert.equal(classificationIssue({ian:'2',title:'Cutting disc',category:'Accessories'}).expected,'Sawing & Cutting');
});
test('drill rotation speed is distinct from the impact rate',()=>{
 const p=products.find(p=>p.ian==='537225');
 assert.equal(p.specifications['Gear 1 speed'],'0–630 rpm');
 assert.equal(p.specifications['Gear 2 speed'],'0–2100 rpm');
 assert.equal(p.specifications['Impact rate'],'0–10810 / 0–36000 bpm');
 assert.match(p.technical_source,/#page=\d+$/);
});
