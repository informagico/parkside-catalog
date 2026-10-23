import test from 'node:test';import assert from 'node:assert/strict';
import {consistencyIssues} from '../lib/consistency.mjs';
import {loadProducts} from '../lib/catalog.mjs';
const base={ian:'123456',title:'Angle grinder',power:'Mains',specifications:{}};
test('Consistency audit rejects impossible dimensions, zero power and wrong IANs',()=>{
 assert.equal(consistencyIssues({...base,specifications:{'Input power':'000 W'}}).length,1);
 assert.equal(consistencyIssues({...base,specifications:{'Disc diameter':'10 mm','Disc bore':'22.23 mm'}}).length,1);
 assert.equal(consistencyIssues({...base,specifications:{'Full IAN':'999999_2401'}}).length,1);
 assert.deepEqual(consistencyIssues({...base,specifications:{'Disc diameter':'125 mm','Disc bore':'22,23 mm','Input power':'900 W (S6 10%); 710 W (S1)'}}),[]);
});
test('Consistency audit distinguishes power sources and tool holder types',()=>{
 assert.equal(consistencyIssues({...base,title:'Petrol garden cultivator'}).length,1);
 assert.equal(consistencyIssues({...base,title:'Cordless screwdriver',power:'Manual'}).length,1);
 assert.equal(consistencyIssues({...base,title:'Impact wrench',specifications:{'Tool holder':'6.35 mm (1/4 inch) hex socket'}}).length,1);
 assert.deepEqual(consistencyIssues({...base,title:'Impact wrench',specifications:{'Tool holder':'1/2 inch square drive and 1/4 inch hex socket'}}),[]);
 assert.deepEqual(consistencyIssues({...base,title:'Impact driver',specifications:{'Tool holder':'6.35 mm (1/4 inch) hex socket'}}),[]);
});
test('Catalog keeps tightening and breakaway torque separate and passes consistency checks',()=>{
 const products=loadProducts();assert.deepEqual(products.flatMap(consistencyIssues),[]);
 const p=products.find(p=>p.ian==='490887');assert.equal(p.specifications.Torque,'120 / 400 Nm');assert.equal(p.specifications['Breakaway torque'],'≤600 Nm');
 const kit=products.find(p=>p.ian==='488387');assert.equal(kit.specifications.Torque,undefined);assert.equal(kit.specifications['Reciprocating saw stroke length'],'22 mm');
});
