import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {IMAGE_SIZE,VECTOR_SIZE,VISUAL_VERSION,MODEL_SHA256,imageTensor,normalizeVector,quantizeVector,validateIndex,rankImages,groupMatches} from '../src/visual-core.js';

test('Visual preprocessing preserves long objects and composites transparent pixels over white',()=>{
 const transparent=new Uint8Array(8*4*4),white=imageTensor(transparent,8,4);
 assert.equal(white.length,3*IMAGE_SIZE*IMAGE_SIZE);
 assert(Math.abs(white[0]-(1-.485)/.229)<1e-6);
 const red=Uint8Array.from({length:8*4*4},(_,i)=>i%4===0||i%4===3?255:0),tensor=imageTensor(red,8,4);
 const center=112*224+112;
 assert(Math.abs(tensor[center]-(1-.485)/.229)<1e-6);
 assert(Math.abs(tensor[224*224+center]-(0-.456)/.224)<1e-6);
 assert.equal(tensor[0],white[0]);
 assert.throws(()=>imageTensor(red,0,4),/Invalid/);
});

test('Quantized cosine retrieval ignores scale and preserves all IANs sharing a photo',()=>{
 const first=new Float32Array(VECTOR_SIZE);first[0]=2;first[1]=1;
 const second=new Float32Array(VECTOR_SIZE);second[3]=4;
 const vectors=new Int8Array(VECTOR_SIZE*2);vectors.set(quantizeVector(second));vectors.set(quantizeVector(first),VECTOR_SIZE);
 const entries=[{ians:['111111']},{ians:['222222','333333']}];
 const ranked=rankImages(Float32Array.from(first,x=>x*100),vectors,entries);
 assert.deepEqual(ranked[0].ians,['222222','333333']);assert(ranked[0].score>.999);
 assert(Math.abs(Math.hypot(...normalizeVector(first))-1)<1e-6);
 assert.throws(()=>normalizeVector(new Float32Array(VECTOR_SIZE)),/Invalid/);
});

test('Visual candidates group complete models within categories and keep unknowns separate',()=>{
 const p=(ian,group)=>({ian,group,title:'Same title'});
 const products=[p('111111','drill:model-a'),p('222222','drill:model-a'),p('333333','kit:model-a'),p('444444','drill:model-b'),p('555555',null),p('666666',null)];
 const ranked=[{ians:['999999','222222','111111','333333'],score:.9},{ians:['444444','555555','666666'],score:.8}];
 const groups=groupMatches(ranked,products);
 assert.equal(groups.length,5);assert.deepEqual(groups[0].variants.map(p=>p.ian),['111111','222222']);
 assert.equal(groups[1].product.ian,'333333');assert.equal(groups[1].variants.length,1);
 assert(!groups.some(g=>g.product.ian==='999999'));
});

test('Deployed visual index has valid weights, byte length and same-origin public result photos',()=>{
 if(!fs.existsSync('dist/assets/visual/index.json'))return;
 const index=JSON.parse(fs.readFileSync('dist/assets/visual/index.json'));
 const bytes=fs.readFileSync('dist/assets/visual/vectors.bin'),vectors=new Int8Array(bytes);
 validateIndex(index,vectors);assert(index.entries.length>100);
 assert.throws(()=>validateIndex({...index,version:'stale'},vectors),/Incompatible/);
 assert.throws(()=>validateIndex(index,vectors.subarray(1)),/Incompatible/);
 const model=fs.readFileSync('dist/assets/visual/model_quantized.onnx');
 assert.equal(createHash('sha256').update(model).digest('hex'),MODEL_SHA256);
 for(const file of ['worker.js','ort-wasm-simd-threaded.mjs','ort-wasm-simd-threaded.wasm','LICENSE-DINOv2.txt'])assert(fs.existsSync('dist/assets/visual/'+file),file);
 for(const lang of ['it','en']){
  const products=JSON.parse(fs.readFileSync(`dist/${lang}/data/visual-products.json`));
  const byIan=new Map(products.map(p=>[p.ian,p]));
  for(const entry of index.entries)for(const ian of entry.ians){
   const p=byIan.get(ian);assert(p,ian);assert(/^assets\/products\//.test(p.image),ian);
   assert(fs.existsSync('dist/'+p.image),p.image);assert(!Object.hasOwn(p,'manufacturer'));
  }
  const html=fs.readFileSync(`dist/${lang}/index.html`,'utf8');
  assert(html.includes('id="scan-visual"'));assert(html.includes('id="scan-read"'));
  assert(!html.includes('rel="preload" href="../assets/visual/'));
 }
 assert.equal(index.version,VISUAL_VERSION);
 const css=fs.readFileSync('dist/assets/style.css','utf8');
 assert(!css.includes('fonts.googleapis.com'));
 for(const file of ['DMSans.ttf','BarlowCondensed-SemiBold.ttf','OFL-DMSans.txt','OFL-BarlowCondensed.txt'])assert(fs.existsSync('dist/assets/fonts/'+file),file);
});

test('Actual model retrieves transformed public catalog photos among six model groups',async t=>{
 if(!fs.existsSync('dist/assets/visual/index.json'))return t.skip('Build the photo index first');
 const [{default:sharp},ort,{loadProducts},{modelKey}]=await Promise.all([import('sharp'),import('onnxruntime-node'),import('../lib/catalog.mjs'),import('../lib/identity.mjs')]);
 const products=loadProducts().map(p=>({...p,group:p.model?JSON.stringify([p.category,modelKey(p.model)]):p.ian}));
 const ids=['540690','472051','494215','523098','523095','528029','540257','515852','505110','496285','544754','540672','523313','523312','529733','484593','525584','523317','516340','525132'];
 const selected=ids.map(ian=>products.find(p=>p.ian===ian&&p.image?.local)).filter(Boolean);
 assert(selected.length>=15);
 const index=JSON.parse(fs.readFileSync('dist/assets/visual/index.json')),vectors=new Int8Array(fs.readFileSync('dist/assets/visual/vectors.bin'));
 const session=await ort.InferenceSession.create('assets/visual/model_quantized.onnx',{executionProviders:['cpu'],intraOpNumThreads:2});
 let hits=0;const misses=[];
 try{
  for(const p of selected){
   let bytes=fs.readFileSync(p.image.local);
   if(p.image.local.endsWith('.svg'))bytes=Buffer.from(bytes.toString().match(/data:image\/jpeg;base64,([^"\s]+)/)[1],'base64');
   // Recompressed, resized and color-shifted public imagery, never chat attachments.
   const changed=await sharp(bytes).resize({width:480}).modulate({brightness:.85,saturation:.8}).rotate(4,{background:'white'}).jpeg({quality:65}).toBuffer();
   const {data,info}=await sharp(changed).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   const outputs=await session.run({pixel_values:new ort.Tensor('float32',imageTensor(data,info.width,info.height),[1,3,IMAGE_SIZE,IMAGE_SIZE])});
   const embedding=(outputs.pooler_output||outputs.last_hidden_state).data.subarray(0,VECTOR_SIZE);
   const results=groupMatches(rankImages(embedding,vectors,index.entries,80),products);
   if(results.some(result=>result.variants.some(variant=>variant.ian===p.ian)))hits++;else misses.push(p.ian);
  }
 }finally{await session.release();}
 t.diagnostic(`${hits}/${selected.length} transformed catalog photos retrieved; misses: ${misses.join(', ')||'none'}. This does not measure accuracy on real-world photos.`);
 assert(hits/selected.length>=.9,'Visual retrieval regression');
});
