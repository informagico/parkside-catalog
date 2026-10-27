import fs from 'node:fs';
import path from 'node:path';
import {parse,validate} from '../lib/product.mjs';
import {productSlug,productRedirects} from '../lib/product-paths.mjs';

const write=process.argv.includes('--write');
const root=fs.realpathSync('content/products');
const safePath=file=>{
 const target=path.resolve(root,file);
 if(path.dirname(target)!==root)throw Error('Product path outside content/products: '+file);
 return target;
};
const products=fs.readdirSync(root).filter(file=>file.endsWith('.md')).map(file=>{
 const p=validate(parse(fs.readFileSync(safePath(file),'utf8')));
 return {...p,file,slug:productSlug(p)};
});
if(new Set(products.map(p=>p.ian)).size!==products.length)throw Error('Duplicate IAN');
const changes=products.filter(p=>p.file!==p.slug+'.md');
const aliasFile='content/product-redirects.json';
const aliases=fs.existsSync(aliasFile)?JSON.parse(fs.readFileSync(aliasFile,'utf8')):{};
for(const p of changes){
 const old=p.file.slice(0,-3);
 if(aliases[old]&&aliases[old]!==p.ian)throw Error('Product alias collision: '+old);
 aliases[old]=p.ian;
 if(fs.existsSync(safePath(p.slug+'.md')))throw Error('Destination already exists: '+p.slug+'.md');
}
productRedirects(products,aliases);
if(!write){
 console.log(changes.length?changes.length+' product filenames need alignment. Run npm run filenames -- --write to rename them and preserve their URLs.':'All '+products.length+' product filenames match the naming convention.');
 process.exitCode=changes.length?1:0;
}else{
 // Validate every resolved source and destination before moving any files.
 const moves=changes.map(p=>[safePath(p.file),safePath(p.slug+'.md')]);
 for(const [from,to] of moves)fs.renameSync(from,to);
 fs.writeFileSync(aliasFile,JSON.stringify(Object.fromEntries(Object.entries(aliases).sort(([a],[b])=>a.localeCompare(b))),null,2)+'\n');
 // Keep existing Markdown links to canonical source files current.
 const replacements=new Map(changes.map(p=>['content/products/'+p.file,'content/products/'+p.slug+'.md']));
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
 const docs=['AGENTS.md','README.md','CONTRIBUTING.md',...['docs','.github','templates'].flatMap(walk)].filter(file=>file.endsWith('.md'));
 for(const file of docs){
  const before=fs.readFileSync(file,'utf8');
  const after=before.replace(/content\/products\/[a-z0-9-]+\.md/g,value=>replacements.get(value)||value);
  if(after!==before)fs.writeFileSync(file,after);
 }
 console.log('Renamed '+changes.length+' product files; historical slugs recorded in '+aliasFile+' (no redirect pages are published).');
}
