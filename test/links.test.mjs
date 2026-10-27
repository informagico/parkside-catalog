import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const localTarget=(file,href)=>path.resolve(path.dirname(file),href.split(/[?#]/)[0]);
test('Versioned local asset URLs resolve to their files and missing assets remain errors',()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'parkside-links-'));
 const page=path.join(directory,'index.html'),asset=path.join(directory,'style.css');
 fs.writeFileSync(asset,'body{}');
 try{
  assert.equal(fs.existsSync(localTarget(page,'style.css?v=release-1')),true);
  assert.equal(fs.existsSync(localTarget(page,'style.css?v=release-1#theme')),true);
  assert.equal(fs.existsSync(localTarget(page,'missing.css?v=release-1')),false);
 }finally{
  fs.unlinkSync(asset);
  fs.rmdirSync(directory);
 }
});
test('Il sito generato non contiene collegamenti locali interrotti',()=>{
 if(!fs.existsSync('dist/index.html'))return;
 const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
 const errors=[];
 for(const file of walk('dist').filter(f=>f.endsWith('.html'))){
  for(const m of fs.readFileSync(file,'utf8').matchAll(/(?:href|src)="([^"]+)"/g)){
   if(/^(https?:|data:|#)/.test(m[1]))continue;
   const target=localTarget(file,m[1]);
   if(!fs.existsSync(target))errors.push(`${file}: ${m[1]}`);
  }
 }
 assert.deepEqual(errors,[]);
});
