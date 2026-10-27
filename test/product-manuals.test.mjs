import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse,validate} from '../lib/product.mjs';
import {localize} from '../lib/i18n.mjs';
import {translationHash} from '../lib/translations.mjs';

const file='content/products/pamsp-20-li-a1-paesp-20-li-a1-472728.md';
const product=()=>parse(fs.readFileSync(file,'utf8'));

test('IAN 472728 keeps distinct labelled manuals for its two variants in both languages',()=>{
 const p=validate(product());
 assert.deepEqual(p.manuals.map(manual=>manual.model),['PAMSP 20-Li A1','PAESP 20-Li A1']);
 assert.equal(p.manuals[0].url,p.manual);
 assert.equal(p.manuals[1].url,'https://media.sit-connect.com/public/articlemanual/327f1a04-1d84-4a0b-a15a-c0bbdf5a3e2a.pdf');
 for(const lang of ['it','en']){
  const localized=localize(p,lang);
  assert.deepEqual(localized.manuals,p.manuals);
  const page=fs.readFileSync(`dist/${lang}/products/pamsp-20-li-a1-paesp-20-li-a1-472728/index.html`,'utf8');
  for(const manual of p.manuals)assert(page.includes(`href="${manual.url}"`));
 }
});

test('Variant manual lists provide a primary URL without changing legacy manuals or prose fingerprints',()=>{
 const p=product(),{manuals,...legacy}=p;
 assert.equal(validate(legacy).manual,p.manual);
 assert.equal(validate({...p,manual:undefined}).manual,manuals[0].url);
 assert.equal(translationHash(legacy),translationHash(p));
});

test('Variant manuals reject unsafe URLs, missing labels, duplicates and an unrelated primary URL',()=>{
 const p=product();
 for(const manuals of [[],null,[{url:p.manual}],[{model:' ',url:p.manual}],[{model:'PAESP 20-Li A1',url:'javascript:alert(1)'}],[{model:'PAESP 20-Li A1',url:'https://user:secret@example.com/manual.pdf'}],[p.manuals[0],p.manuals[0]]])assert.throws(()=>validate({...p,manuals}));
 assert.throws(()=>validate({...p,manual:'https://example.com/unrelated.pdf'}));
});
