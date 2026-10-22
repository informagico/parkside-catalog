import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from './generate.mjs';
export {esc,parse,validate,art} from './model.mjs';
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))build();
