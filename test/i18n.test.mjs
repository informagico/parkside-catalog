import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse} from '../scripts/model.mjs';
import {languages,localize,t,translate,uiDictionary} from '../scripts/i18n.mjs';

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
 assert.throws(()=>translate('Untranslated new product title','en'));
});

test('All product titles, notes, evidence and specification labels have English translations',()=>{
 const files=fs.readdirSync('content/products').filter(f=>f.endsWith('.md'));
 for(const file of files){
  const original=parse(fs.readFileSync('content/products/'+file,'utf8'));
  const en=localize(original,'en');
  assert.equal(en.model,original.model);assert.equal(en.ian,original.ian);
  assert.equal(en.manufacturer,original.manufacturer);assert.equal(en.oem,original.oem);
  assert.notEqual(en.title,original.title);assert.notEqual(en.evidence,original.evidence);
  assert.equal(en.categoryKey,original.category);assert.equal(en.powerKey,original.power);
  assert.equal(Object.keys(en.specifications).length,Object.keys(original.specifications).length);
  assert.deepEqual(localize(original,'it').searchTitles,en.searchTitles);
  assert.throws(()=>localize({...original,specifications:{'Alimentazione':'Nuova descrizione da tradurre'}},'en'));
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
