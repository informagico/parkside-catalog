import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {MODEL_SHA256} from '../src/visual-core.js';
const root='assets/visual';
const revision='c2bb04a51fab207c420665f1946016107bffc701';
fs.mkdirSync(root,{recursive:true});
const target=root+'/model_quantized.onnx';
if(!fs.existsSync(target)||createHash('sha256').update(fs.readFileSync(target)).digest('hex')!==MODEL_SHA256){
 const response=await fetch(`https://huggingface.co/Xenova/dinov2-small/resolve/${revision}/onnx/model_quantized.onnx`,{signal:AbortSignal.timeout(180000)});
 if(!response.ok)throw Error('Visual model download failed: '+response.status);
 const bytes=Buffer.from(await response.arrayBuffer());
 if(createHash('sha256').update(bytes).digest('hex')!==MODEL_SHA256)throw Error('Visual model checksum mismatch');
 fs.writeFileSync(target,bytes);
}
console.log('Visual model ready (SHA-256 verified, 24.5 MB).');
