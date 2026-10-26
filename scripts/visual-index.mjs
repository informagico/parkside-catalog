import fs from 'node:fs';
import {createHash} from 'node:crypto';
import os from 'node:os';
import sharp from 'sharp';
import {loadProducts} from '../lib/catalog.mjs';
import {IMAGE_SIZE,VECTOR_SIZE,VISUAL_VERSION,MODEL_SHA256,imageTensor,quantizeVector} from '../src/visual-core.js';

const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const modelFile='assets/visual/model_quantized.onnx';
if(!fs.existsSync(modelFile)||hash(fs.readFileSync(modelFile))!==MODEL_SHA256)throw Error('Run npm run visual:setup to install the pinned visual model.');
const root='.cache/visual-search',cache=root+'/embeddings';
fs.mkdirSync(cache,{recursive:true});
const unique=new Map();let unavailable=0;
for(const p of loadProducts()){
 const file=p.image?.local;
 if(!file){unavailable++;continue;}
 try{
  const local=file===p.image.url?file:'.cache/product-images/'+p.ian+'.jpg';
  let bytes=fs.readFileSync(local);
  if(local.endsWith('.svg')){
   // Only decode an embedded raster; never execute SVG or fetch its references.
   const embedded=bytes.toString('utf8').match(/(?:href|xlink:href)="data:image\/(?:jpeg|png|webp);base64,([A-Za-z0-9+/=\s]+)"/);
   if(!embedded){unavailable++;continue;}bytes=Buffer.from(embedded[1],'base64');
  }
  const digest=hash(bytes);
  if(!unique.has(digest))unique.set(digest,{bytes,ians:[]});
  unique.get(digest).ians.push(p.ian);
 }catch{unavailable++;}
}
let session,ort,computed=0,skipped=0;
const entries=[],vectors=[];
const started=Date.now();
for(const [digest,item] of [...unique].sort(([a],[b])=>a.localeCompare(b))){
 const cacheFile=`${cache}/${VISUAL_VERSION}-${MODEL_SHA256}-${digest}.bin`;
 let vector=fs.existsSync(cacheFile)?fs.readFileSync(cacheFile):null;
 if(!vector||vector.length!==VECTOR_SIZE){
  if(process.env.VISUAL_INDEX_CACHE_ONLY==='1')throw Error('Missing visual embedding cache for IAN '+item.ians.join(', '));
  ort??=await import('onnxruntime-node');
  let decoded;
  try{decoded=await sharp(item.bytes,{limitInputPixels:40000000}).rotate().ensureAlpha().raw().toBuffer({resolveWithObject:true});}
  catch{skipped++;console.warn('Visual index: skipped unreadable photo for IAN '+item.ians.join(', '));continue;}
  session??=await ort.InferenceSession.create(modelFile,{executionProviders:['cpu'],intraOpNumThreads:Math.min(4,os.availableParallelism()),interOpNumThreads:1});
  const {data,info}=decoded;
  const outputs=await session.run({pixel_values:new ort.Tensor('float32',imageTensor(data,info.width,info.height),[1,3,IMAGE_SIZE,IMAGE_SIZE])});
  const output=outputs.pooler_output||outputs.last_hidden_state;
  if(!output)throw Error('Missing model embedding');
  vector=Buffer.from(quantizeVector(output.data.subarray(0,VECTOR_SIZE)).buffer);
  fs.writeFileSync(cacheFile,vector);computed++;
 }
 entries.push({hash:digest,ians:item.ians.sort()});vectors.push(vector);
 if(entries.length%100===0)console.log(`Visual index: ${entries.length}/${unique.size} images (${computed} new, ${Math.round((Date.now()-started)/1000)}s).`);
}
await session?.release();
if(!entries.length)throw Error('No catalog photos could be indexed');
fs.writeFileSync(root+'/index.json',JSON.stringify({version:VISUAL_VERSION,modelSha256:MODEL_SHA256,dimensions:VECTOR_SIZE,entries}));
fs.writeFileSync(root+'/vectors.bin',Buffer.concat(vectors));
console.log(`Visual index: ${entries.length} photos, ${entries.reduce((n,e)=>n+e.ians.length,0)} IANs; ${computed} new embeddings, ${unavailable+skipped} records without an indexed photo.`);
