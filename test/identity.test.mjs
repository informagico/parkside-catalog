import test from 'node:test';import assert from 'node:assert/strict';
import {modelKey,modelIndex,sameModel,variantDifferences} from '../lib/identity.mjs';
import {validate} from '../lib/product.mjs';
test('Unknown models never form a shared model group; generations and kits stay separate',()=>{
 const rows=[{ian:'123456',model:null},{ian:'123457',model:null},{ian:'123458',model:'PWSA 20-Li A1'},{ian:'123459',model:'pwsa 20 – li a1'},{ian:'123460',model:'PWSA 20-Li A2'},{ian:'123461',model:'PAP 20 B1 / PLG 20 C3'},{ian:'123462',model:'PAP 20 B1'}];
 assert.equal(modelKey(null),null);assert.equal(modelKey('IAN 123456'),null);assert.equal(modelIndex(rows).size,4);assert.deepEqual(sameModel(rows,rows[2].model).map(p=>p.ian),['123458','123459']);assert.deepEqual(sameModel(rows,null),[]);
});
test('Variant comparison shows missing and differing values without carrying facts between IANs',()=>{
 const a={specifications:{Voltage:'20 V',Speed:'3000 rpm'}},b={specifications:{Voltage:'20 V',Speed:'4000 rpm',Weight:'2 kg'}};
 assert.deepEqual(variantDifferences([a,b]),['Speed','Weight']);assert.equal(a.specifications.Weight,undefined);
});
test('Records support an unknown model but reject an IAN disguised as a model',()=>{
 const p={model:null,ian:'123456',title:'Tool',category:'Workshop Equipment',power:'Manual',manufacturer:null,specifications:{}};
 assert.equal(validate(p).model,null);assert.throws(()=>validate({...p,model:'IAN 123456'}));
});
test('Reused model codes in different product functions remain separate',()=>{
 const rows=[{ian:'361688',model:'PLSA 20-Li A1',category:'Welding & Soldering'},{ian:'517555',model:'PLSA 20-Li A1',category:'Workshop Equipment'}];
 assert.equal(modelIndex(rows).size,2);
 assert.deepEqual(sameModel(rows,'PLSA 20-Li A1','Welding & Soldering').map(p=>p.ian),['361688']);
 assert.deepEqual(sameModel(rows,'PLSA 20-Li A1','Workshop Equipment').map(p=>p.ian),['517555']);
});
