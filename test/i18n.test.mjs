import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse} from '../lib/product.mjs';
import {languages,localize,t,translate,uiDictionary} from '../lib/i18n.mjs';

test('Every UI language has the same keys and interpolation placeholders',()=>{
 const source=uiDictionary('it');
 for(const lang of languages){
  const target=uiDictionary(lang);assert.deepEqual(Object.keys(target).sort(),Object.keys(source).sort());
  for(const key of Object.keys(source)){
   const placeholders=s=>[...s.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort();
   assert.deepEqual(placeholders(target[key]),placeholders(source[key]),`${lang}:${key}`);
  }
 }
 assert.throws(()=>t('en','missing-key'));
 assert.equal(translate('New shared label','it'),'New shared label');
});

test('Canonical English product records have complete Italian translations',()=>{
 const files=fs.readdirSync('content/products').filter(f=>f.endsWith('.md'));
 for(const file of files){
  const original=parse(fs.readFileSync('content/products/'+file,'utf8'));
  const en=localize(original,'en');const it=localize(original,'it');
  assert.equal(en.model,original.model);assert.equal(en.ian,original.ian);
  assert.equal(en.manufacturer,original.manufacturer);assert.equal(en.oem,original.oem);
  assert.equal(en.title,original.title);assert.equal(en.evidence,original.evidence||'');assert.equal(it.translationMissing,false);assert.equal(it.translationNeedsReview,false);
  assert.equal(en.categoryKey,original.category);assert.equal(en.powerKey,original.power);
  assert.equal(Object.keys(en.specifications).length,Object.keys(original.specifications).length);
  assert.deepEqual(localize(original,'it').searchTitles,en.searchTitles);
  assert.equal(localize({...original,title:original.title+' updated'},'it').translationNeedsReview,true);
 }
});

test('Both static catalogs have identical identities and translated product pages',()=>{
 const it=JSON.parse(fs.readFileSync('dist/it/data/catalog.json','utf8'));
 const en=JSON.parse(fs.readFileSync('dist/en/data/catalog.json','utf8'));
 assert.deepEqual(en.map(p=>p.model+'|'+p.ian),it.map(p=>p.model+'|'+p.ian));
 for(const lang of languages){
  const home=fs.readFileSync(`dist/${lang}/index.html`,'utf8');
  assert(home.includes(`<html lang="${lang}">`));
  assert(home.includes('hreflang="it"'));assert(home.includes('hreflang="en"'));
  const page=fs.readFileSync(`dist/${lang}/products/pwdl-40-a1-544816/index.html`,'utf8');
  const other=lang==='it'?'en':'it';
  assert(page.includes(`../../../${other}/products/pwdl-40-a1-544816/index.html`));
  assert(page.includes('1500 W'));assert(page.includes('Grizzly Tools'));
 }
 const enPage=fs.readFileSync('dist/en/products/pwdl-40-a1-544816/index.html','utf8');
 assert(enPage.includes('Wet and dry vacuum cleaner, 40 L'));
 assert(enPage.includes('Input power'));assert(enPage.includes('Up to 2200 W, automatic start'));
 assert(!enPage.includes('Capacità serbatoio'));assert(!enPage.includes('Produttore da verificare'));
});

test('New English records need no translation and stale prose is held back',()=>{
 const original=parse(fs.readFileSync('content/products/pwdl-40-a1-544816.md','utf8'));
 const missing=localize({...original,ian:'999999'},'it');
 assert.equal(missing.title,original.title);assert.equal(missing.body,original.body);assert.equal(missing.translationMissing,true);assert.equal(missing.translationNeedsReview,false);
 const changed=localize({...original,evidence:'Updated evidence'},'it');
 assert.equal(changed.translationNeedsReview,true);assert.equal(changed.evidence,'Updated evidence');assert.equal(changed.title,original.title);
 const photoOnly=localize({...original,image:{url:'https://example.com/new.jpg'}},'it');assert.equal(photoOnly.translationNeedsReview,false);assert.notEqual(photoOnly.title,original.title);
});
