import * as ort from 'onnxruntime-web/wasm';
import {IMAGE_SIZE,VECTOR_SIZE,MODEL_SHA256,imageTensor,normalizeVector,validateIndex,rankImages} from './visual-core.js';

const base=new URL('./',import.meta.url);
ort.env.wasm.wasmPaths=base.href;
ort.env.wasm.numThreads=1; // Works on Pages without cross-origin isolation headers.
ort.env.wasm.proxy=false; // Already inside a dedicated, same-origin worker.
let session,index,vectors,loading;
async function checkedFetch(url){
 const target=new URL(url,base);
 if(target.origin!==self.location.origin)throw Error('External asset refused');
 const response=await fetch(target,{credentials:'same-origin'});
 if(!response.ok)throw Error('Visual asset unavailable');
 return response;
}
async function load(){
 self.postMessage({type:'status',stage:'loading'});
 const [manifest,data]=await Promise.all([checkedFetch('index.json').then(r=>r.json()),checkedFetch('vectors.bin').then(r=>r.arrayBuffer())]);
 index=manifest;vectors=new Int8Array(data);validateIndex(index,vectors);
 const response=await checkedFetch('model_quantized.onnx?v='+MODEL_SHA256);
 const total=Number(response.headers.get('content-length'))||24451943;
 let bytes;
 if(response.body){
  const reader=response.body.getReader(),chunks=[];let loaded=0;
  while(true){const {done,value}=await reader.read();if(done)break;chunks.push(value);loaded+=value.length;self.postMessage({type:'status',stage:'download',loaded,total});}
  bytes=new Uint8Array(loaded);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 }else bytes=new Uint8Array(await response.arrayBuffer());
 // Verify the deployed weights too, before executing the model.
 const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(x=>x.toString(16).padStart(2,'0')).join('');
 if(digest!==MODEL_SHA256)throw Error('Visual model checksum mismatch');
 self.postMessage({type:'status',stage:'engine'});
 session=await ort.InferenceSession.create(bytes,{executionProviders:['wasm'],graphOptimizationLevel:'all'});
}
self.onmessage=async({data})=>{
 try{
  loading??=load();await loading;
  self.postMessage({type:'status',stage:'matching'});
  const pixels=imageTensor(data.rgba,data.width,data.height);
  const outputs=await session.run({pixel_values:new ort.Tensor('float32',pixels,[1,3,IMAGE_SIZE,IMAGE_SIZE])});
  const output=outputs.pooler_output||outputs.last_hidden_state;
  if(!output)throw Error('Missing model embedding');
  const embedding=normalizeVector(output.data.subarray(0,VECTOR_SIZE));
  self.postMessage({type:'result',matches:rankImages(embedding,vectors,index.entries,80),count:new Set(index.entries.flatMap(e=>e.ians)).size});
 }catch{self.postMessage({type:'error'});}
};
