import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse,validate} from '../lib/product.mjs';

test('Warranty leaflets remain downloadable product documents without filling the operating manual gap',()=>{
 for(const [file,ian] of [['hg13942-510795.md','510795'],['pcza-1801-b1-459720.md','459720']]){
  const p=validate(parse(fs.readFileSync('content/products/'+file,'utf8')));
  assert.equal(p.ian,ian);
  assert(!p.manual);
  assert.equal(p.documents.length,1);
  for(const lang of ['it','en']){
   const page=fs.readFileSync(`dist/${lang}/products/${file.slice(0,-3)}/index.html`,'utf8');
   assert(page.includes(`href="${p.documents[0].url}"`));
   assert(page.includes(lang==='it'?'Garanzia e assistenza (PDF)':'Warranty and service information (PDF)'));
  }
 }
});

test('Product documents reject unsupported types, incomplete entries, unsafe URLs and duplicates',()=>{
 const p=parse(fs.readFileSync('content/products/hg13942-510795.md','utf8'));
 for(const documents of [[],null,[{type:'warranty'}],[{type:'unknown',url:p.documents[0].url}],[{type:'warranty',url:'javascript:alert(1)'}],[p.documents[0],p.documents[0]]])assert.throws(()=>validate({...p,documents}));
});
