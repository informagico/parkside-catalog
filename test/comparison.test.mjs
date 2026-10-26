import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {readSelection,idsFromQuery,comparisonRows,rowStatus} from '../src/compare-core.js';
import {comparisonProduct} from '../lib/comparison.mjs';
import {localize,uiDictionary} from '../lib/i18n.mjs';
const product={ian:'012345',model:'TEST A1',category:'Batteries',power:'Battery',manufacturer:null,specifications:{Capacity:'2.0 Ah'},slug:'test-a1-012345',title:'Test battery'};
test('Comparison selection preserves string IANs, removes duplicates and enforces the three-product limit',()=>{
 const data=[{ian:'012345',model:'Test'}, {ian:'012345'}, {ian:123456}, {ian:'<bad>'}, {ian:'123456'}, {ian:'234567'}, {ian:'345678'}];
 assert.deepEqual(readSelection(data).map(p=>p.ian),['012345','123456','234567']);
 assert.deepEqual(readSelection({}),[]);
 assert.deepEqual(idsFromQuery('012345,123456,012345,234567,345678,invalid'),['012345','123456','234567']);
});
test('Comparison distinguishes unknown values from documented differences and does not convert units or infer equivalence',()=>{
 assert.equal(rowStatus(['1500 W',' 1500  W ']),'same');
 assert.equal(rowStatus(['1500 W','1600 W']),'different');
 assert.equal(rowStatus([null,'1600 W']),'incomplete');
 assert.equal(rowStatus([null,null]),'incomplete');
 assert.equal(rowStatus(['Unverified','Battery']),'incomplete');
 assert.equal(rowStatus(['1.5 kW','1500 W']),'different');
});
test('Comparison uses the union of canonical specification keys with localized values for display',()=>{
 const en=comparisonProduct(product,localize(product,'en'),'en');
 const it=comparisonProduct(product,localize(product,'it'),'it');
 assert.equal(it.specifications[0].key,'Capacity');
 assert.equal(it.specifications[0].value,en.specifications[0].value);
 const other={...en,model:'TEST A2',specifications:[{key:'Weight',label:'Weight',value:'1 kg',display:'1 kg'}]};
 const rows=comparisonRows([en,other],uiDictionary('en'));
 assert.equal(rows.find(r=>r.key==='manufacturer').status,'incomplete');
 assert.equal(rows.find(r=>r.key==='model').status,'different');
 assert.equal(rows.find(r=>r.key==='spec:Capacity').status,'incomplete');
 assert.equal(rows.find(r=>r.key==='spec:Weight').status,'incomplete');
 assert.equal(rows.find(r=>r.key==='category').status,'same');
 const system=value=>({...en,specifications:[{key:'Battery system',label:'Battery system',value,display:value}]});
 assert.equal(comparisonRows([system('X20V-Team'),system('X20 V-Team')],uiDictionary('en')).find(r=>r.key==='spec:Battery system').status,'same');
});
test('Both generated comparison pages and datasets preserve canonical keys and expose translated controls',()=>{
 for(const lang of ['it','en']){
  const html=fs.readFileSync(`dist/${lang}/compare/index.html`,'utf8');
  assert(html.includes('id="comparison-table"'));
  assert(html.includes('id="compare-diff"'));
  assert(html.includes('assets/compare.js'));
  assert(html.includes(uiDictionary(lang).compareTitle));
  const data=JSON.parse(fs.readFileSync(`dist/${lang}/data/comparison.json`,'utf8'));
  assert(data.length>0);assert(data.every(p=>typeof p.ian==='string'));
  assert(data.every(p=>p.specifications.every(s=>s.key&&s.label&&s.display)));
 }
});
