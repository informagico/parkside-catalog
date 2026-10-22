import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse,validate,esc} from '../lib/product.mjs';
test('Tutte le schede hanno metadati validi e identità univoche',()=>{
 const ids=new Set();for(const f of fs.readdirSync('content/products')){const p=validate(parse(fs.readFileSync('content/products/'+f,'utf8')));const k=p.model+'|'+p.ian;assert(!ids.has(k),'Duplicato '+k);ids.add(k);assert(!p.manufacturer||p.role==='Declared manufacturer');assert.equal(p.oem,null)}assert(ids.size>100);
});
test('Una relazione di ricambi non diventa un produttore',()=>{const p=parse(fs.readFileSync('content/products/pwdl-40-a1-544816.md','utf8'));assert.equal(p.manufacturer,null);assert.equal(p.role,'Spare parts catalog');assert.equal(p.specifications['Tank capacity'],'40 L');assert(p.technical_source)});
test('Le fonti non sicure e i produttori senza prova sono rifiutati',()=>{const p=parse(fs.readFileSync('content/products/pwdl-40-a1-544816.md','utf8'));assert.throws(()=>validate({...p,source:'javascript:alert(1)'}));assert.throws(()=>validate({...p,manufacturer:'Nome inventato'}));assert.equal(esc('<script>'),'&lt;script&gt;')});
