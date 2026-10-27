import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {relativeUrl} from '../lib/urls.mjs';

test('Page URLs use directories while assets, queries and fragments remain intact',()=>{
 for(const [target,page,expected] of [
  ['it/contribute/index.html','dist/it/index.html','contribute/'],
  ['it/index.html','dist/it/index.html','./'],
  ['index.html','dist/it/contribute/index.html','../../'],
  ['en/products/tool-123456/index.html','dist/it/products/tool-123456/index.html','../../../en/products/tool-123456/'],
  ['it/contribute/index.html?missing=manufacturer#filters','dist/it/index.html','contribute/?missing=manufacturer#filters'],
  ['assets/style.css?v=1','dist/it/contribute/index.html','../../assets/style.css?v=1'],
  ['it/data/catalog.json','dist/it/index.html','data/catalog.json']
 ])assert.equal(relativeUrl(target,page),expected);
});

test('Opening an old index.html address cleans the URL without losing state, query or anchor',()=>{
 const source=fs.readFileSync('site/_includes/components/clean-url.njk','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
 for(const pathname of ['/parkside-catalog/index.html','/parkside-catalog/it/index.html','/parkside-catalog/it/contribute/index.html','/parkside-catalog/en/products/tool-123456/index.html']){
  let replacement;const state={position:25};
  vm.runInNewContext(source,{location:{pathname,search:'?missing=manufacturer&limit=100',hash:'#details'},history:{state,replaceState(s,title,url){assert.equal(s,state);replacement=url;}}});
  assert.equal(replacement,pathname.slice(0,-10)+'?missing=manufacturer&limit=100#details');
 }
 let changed=false;
 vm.runInNewContext(source,{location:{pathname:'/parkside-catalog/it/contribute/'},history:{replaceState(){changed=true;}}});
 assert.equal(changed,false);
});

test('Every generated page has clean internal navigation and working directory targets',()=>{
 if(!fs.existsSync('dist/index.html'))return;
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
 for(const file of walk('dist').filter(file=>file.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
   if(/^(https?:|data:|mailto:|#)/.test(href))continue;
   assert(!/(^|\/)index\.html(?=[?#]|$)/.test(href),file+': '+href);
   const target=path.resolve(path.dirname(file),href.split(/[?#]/)[0]);
   if(fs.existsSync(target)&&fs.statSync(target).isDirectory())assert(fs.existsSync(path.join(target,'index.html')),file+': '+href);
  }
 }
});
