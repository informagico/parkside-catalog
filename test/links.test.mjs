import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
test('Il sito generato non contiene collegamenti locali interrotti',()=>{
 if(!fs.existsSync('dist/index.html'))return;
 const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
 const errors=[];
 for(const file of walk('dist').filter(f=>f.endsWith('.html'))){
  for(const m of fs.readFileSync(file,'utf8').matchAll(/(?:href|src)="([^"]+)"/g)){
   if(/^(https?:|data:|#)/.test(m[1]))continue;
   const target=path.resolve(path.dirname(file),m[1].split('#')[0]);
   if(!fs.existsSync(target))errors.push(`${file}: ${m[1]}`);
  }
 }
 assert.deepEqual(errors,[]);
});
