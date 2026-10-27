import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {productSlug,productRedirects} from '../lib/product-paths.mjs';
import {loadProducts} from '../lib/catalog.mjs';

test('product filenames normalize complete model codes and preserve string IANs',()=>{
 for(const [model,ian,expected] of [
  ['PAPS 2012 A1','478218','paps-2012-a1-478218'],
  [null,'001234','001234'],
  ['PAPK 12 2.5 B1 / PLGK 12 6.0 B1','480899','papk-12-2-5-b1-plgk-12-6-0-b1-480899'],
  ['  Módèl / A1  ','123456','model-a1-123456'],
  ['405667-22-C','405667','405667-22-c-405667']
 ])assert.equal(productSlug({model,ian}),expected);
 assert.throws(()=>productSlug({model:'A1',ian:123456}));
 assert.throws(()=>productSlug({model:'../',ian:'123456'}));
 for(const p of loadProducts())assert.equal(p.file,productSlug(p)+'.md');
});

test('redirects resolve each historical slug to the current IAN without chains or collisions',()=>{
 const products=[{ian:'123456',slug:'new-a1-123456'},{ian:'654321',slug:'654321'}];
 assert.deepEqual(productRedirects(products,{'123456':'123456','old-a1-123456':'123456','new-a1-123456':'123456'}),[
  {from:'123456',to:'new-a1-123456'},{from:'old-a1-123456',to:'new-a1-123456'}
 ]);
 assert.throws(()=>productRedirects(products,{'654321':'123456'}),/collision/);
 assert.throws(()=>productRedirects(products,{'old':'000000'}),/Unknown/);
 assert.throws(()=>productRedirects(products,{'../old':'123456'}),/Unsafe/);
});

test('the build publishes only current product paths in both languages',()=>{
 const products=loadProducts();
 const aliases=JSON.parse(fs.readFileSync('content/product-redirects.json','utf8'));
 const current=products.map(p=>p.slug).sort();
 for(const lang of ['it','en']){
  const root=`dist/${lang}/products`;
  assert.deepEqual(fs.readdirSync(root).sort(),current);
  for(const slug of current)assert(fs.existsSync(`${root}/${slug}/index.html`));
  for(const {from} of productRedirects(products,aliases))assert(!fs.existsSync(`${root}/${from}/index.html`));
 }
});
