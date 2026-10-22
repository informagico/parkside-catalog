import fs from 'node:fs';
import path from 'node:path';
const out=path.resolve('dist');
if(path.dirname(out)!==path.resolve('.'))throw Error('Invalid output path');
fs.rmSync(out,{recursive:true,force:true});
