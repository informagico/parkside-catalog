import {build} from 'esbuild';
await build({entryPoints:['src/visual-worker.js'],outfile:'.cache/visual-search/worker.js',bundle:true,format:'esm',platform:'browser',conditions:['onnxruntime-web-use-extern-wasm'],minify:true,legalComments:'eof'});
