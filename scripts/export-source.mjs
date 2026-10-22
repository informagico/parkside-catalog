import fs from 'node:fs';
import path from 'node:path';
const dirs=['content','scripts','src','templates','test','locales','site','lib','schemas','.github'];
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.posix.join(dir,e.name)):[path.posix.join(dir,e.name)]);
const excluded=['seed.mjs','enrich.mjs','extract-model.mjs'];
const files=['.gitignore','.editorconfig','AGENTS.md','README.md','CONTRIBUTING.md','eleventy.config.js','config.json','package.json',...dirs.flatMap(walk)].filter(p=>!excluded.includes(path.posix.basename(p)));
if(fs.existsSync('package-lock.json'))files.push('package-lock.json');
console.log('SOURCE_JSON:'+JSON.stringify(files.map(p=>({path:p,mode:'100644',type:'blob',content:fs.readFileSync(p,'utf8')}))));
