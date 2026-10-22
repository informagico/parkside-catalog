import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse,validate,esc} from '../lib/product.mjs';
test('Tutte le schede hanno metadati validi e identità univoche',()=>{
 const ids=new Set();for(const f of fs.readdirSync('content/products')){const p=validate(parse(fs.readFileSync('content/products/'+f,'utf8')));const k=p.model+'|'+p.ian;assert(!ids.has(k),'Duplicato '+k);ids.add(k);assert(!p.manufacturer||p.role==='Declared manufacturer'||(p.role==='Manufacturer confirmed by catalog owner'&&p.manufacturer_basis==='owner_confirmation'));assert.equal(p.oem,null)}assert(ids.size>100);
});
test('PWDL 40 records the owner-confirmed manufacturer without claiming documentary evidence',()=>{const p=parse(fs.readFileSync('content/products/pwdl-40-a1-544816.md','utf8'));assert.equal(p.manufacturer,'Grizzly Tools');assert.equal(p.manufacturer_basis,'owner_confirmation');assert.equal(p.specifications['Tank capacity'],'40 L');assert(p.technical_source)});
test('Le fonti non sicure e i produttori senza prova sono rifiutati',()=>{const p=parse(fs.readFileSync('content/products/pwdl-40-a1-544816.md','utf8'));assert.throws(()=>validate({...p,source:'javascript:alert(1)'}));assert.throws(()=>validate({...p,role:'Spare parts catalog',manufacturer:'Nome inventato'}));assert.equal(esc('<script>'),'&lt;script&gt;')});

test('Contributor template has inline image and controlled categories',()=>{
 const p=parse(fs.readFileSync('templates/product.md','utf8'));assert(!Object.hasOwn(p,'checked'));assert(p.image.url);assert(p.image.source);assert(p.image.credit);assert.doesNotThrow(()=>validate(p));
 assert.throws(()=>validate({...p,category:'Invented category'}),/Unknown category/);
 assert.throws(()=>validate({...p,checked:'2026-01-01'}),/removed/);
 assert.throws(()=>validate({...p,image:{...p.image,url:'assets/products/nonexistent.jpg'}}),/Invalid or missing/);
});
