import {extractCodes,searchCode} from './scanner-codes.js';
import {hybridMatches} from './hybrid-search.js';
const $=selector=>document.querySelector(selector);
const dialog=$('#label-scanner'),open=$('#scan-open');
if(dialog&&typeof dialog.showModal==='function'){
 const messages=JSON.parse($('#client-i18n').textContent);
 const message=(key,values={})=>messages[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name]));
 const canvas=$('#scan-preview'),context=canvas.getContext('2d');
 const selection=$('#scan-selection'),query=$('#scan-query'),status=$('#scan-status'),progress=$('#scan-progress');
 const candidates=$('#scan-candidates');
 const visualResults=$('#scan-visual-results'),matches=$('#scan-matches');
 let image=null,crop=null,start=null,worker=null,busy=false,generation=0,rotation=0,cropping=false,previousCrop=null;
 let visualWorker=null,visualReject=null,ocrReject=null,productsPromise=null;
 const sources=new Set(),useText=$('#scan-use-text'),ocrDetails=$('#scan-ocr-details'),ocrText=$('#scan-ocr-text');
 const locked=['#scan-camera','#scan-gallery','#scan-read','#scan-visual','#scan-use-text','#scan-rotate','#scan-reset-crop','#scan-crop'];
 const setBusy=value=>{if(value)setCropMode(false);busy=value;dialog.setAttribute('aria-busy',String(value));for(const id of locked)$(id).disabled=value;progress.hidden=!value;};
 const clearCandidates=()=>{candidates.replaceChildren();candidates.hidden=true;};
 const clearVisual=()=>{matches.replaceChildren();visualResults.hidden=true;$('#scan-visual-coverage').textContent='';ocrText.textContent='';ocrDetails.hidden=true;ocrDetails.open=false;};
 const stop=()=>{generation++;if(worker){const previous=worker;worker=null;void previous.terminate().catch(()=>{});}visualReject?.(new Error('cancelled'));visualReject=null;ocrReject?.(new Error('cancelled'));ocrReject=null;visualWorker?.terminate();visualWorker=null;for(const source of sources)source.width=source.height=1;sources.clear();setBusy(false);};
 const cropButton=$('#scan-crop');
 function setCropMode(value){
  cropping=value;canvas.classList.toggle('is-cropping',value);
  cropButton.setAttribute('aria-pressed',String(value));
  cropButton.textContent=message(value?'scanCropDone':'scanCrop');
  $('#scan-crop-hint').textContent=message(value?'scanCropEditing':crop?'scanCropSelected':'scanCropHint');
 }
 function paintSelection(){
  selection.hidden=!crop;
  if(crop)Object.assign(selection.style,{left:crop.x/canvas.width*100+'%',top:crop.y/canvas.height*100+'%',width:crop.width/canvas.width*100+'%',height:crop.height/canvas.height*100+'%'});
 }
 const resetCrop=()=>{crop=null;start=null;previousCrop=null;paintSelection();setCropMode(false);clearVisual();};
 function draw(){
  resetCrop();
  const swapped=rotation%2!==0;
  const width=swapped?image.height:image.width,height=swapped?image.width:image.height;
  const scale=Math.min(1,1800/Math.max(width,height));
  canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));
  context.save();context.translate(canvas.width/2,canvas.height/2);context.rotate(rotation*Math.PI/2);
  context.drawImage(image,-image.width*scale/2,-image.height*scale/2,image.width*scale,image.height*scale);context.restore();
 }
 function close(){dialog.close();}
 open.hidden=false;
 open.addEventListener('click',()=>{dialog.showModal();document.documentElement.classList.add('scanner-open');status.textContent=message('scanManualHint');});
 $('#scan-close').addEventListener('click',close);
 dialog.addEventListener('close',()=>{
  document.documentElement.classList.remove('scanner-open');stop();image=null;canvas.width=canvas.height=1;resetCrop();clearCandidates();query.value='';status.textContent='';$('#scan-image').hidden=true;
  for(const id of ['#scan-camera-file','#scan-gallery-file'])$(id).value='';
  open.focus();
 });
 for(const type of ['camera','gallery']){
  const input=$('#scan-'+type+'-file');
  $('#scan-'+type).addEventListener('click',()=>input.click());
  input.addEventListener('change',async()=>{
   const file=input.files[0];input.value='';if(!file)return;
   stop();const token=generation;clearCandidates();clearVisual();query.value='';status.textContent='';
   image=null;$('#scan-image').hidden=true;
   if(file.size>25*1024*1024){status.textContent=message('scanSizeError');return;}
   const url=URL.createObjectURL(file);
   try{
    const photo=new Image();photo.src=url;await photo.decode();
    if(token!==generation||!dialog.open)return;
    image=photo;rotation=0;draw();$('#scan-image').hidden=false;$('#scan-image').scrollIntoView({block:'start',behavior:'instant'});
   }catch{if(token===generation)status.textContent=message('scanImageError');}
   finally{URL.revokeObjectURL(url);}
  });
 }
 $('#scan-rotate').addEventListener('click',()=>{if(image&&!busy){rotation=(rotation+1)%4;draw();}});
 $('#scan-reset-crop').addEventListener('click',resetCrop);
 cropButton.addEventListener('click',()=>{if(!busy)setCropMode(!cropping);});
 const point=event=>{const rect=canvas.getBoundingClientRect();return {x:Math.max(0,Math.min(canvas.width,(event.clientX-rect.left)*canvas.width/rect.width)),y:Math.max(0,Math.min(canvas.height,(event.clientY-rect.top)*canvas.height/rect.height))};};
 canvas.addEventListener('pointerdown',event=>{
  if(busy||!image||!cropping||!event.isPrimary||event.button!==0)return;
  canvas.setPointerCapture(event.pointerId);previousCrop=crop;start=point(event);
 });
 canvas.addEventListener('pointermove',event=>{
  if(!start)return;const end=point(event);
  crop={x:Math.min(start.x,end.x),y:Math.min(start.y,end.y),width:Math.abs(end.x-start.x),height:Math.abs(end.y-start.y)};
  paintSelection();
 });
 canvas.addEventListener('pointerup',()=>{
  if(!start)return;start=null;
  if(!crop||crop.width<20||crop.height<20){crop=previousCrop;paintSelection();return;}
  previousCrop=null;clearVisual();clearCandidates();setCropMode(false);
 });
 canvas.addEventListener('pointercancel',()=>{if(!start)return;start=null;crop=previousCrop;previousCrop=null;paintSelection();});
 function snapshot(){
  const region=crop||{x:0,y:0,width:canvas.width,height:canvas.height},source=document.createElement('canvas');
  source.width=Math.max(1,Math.round(region.width));source.height=Math.max(1,Math.round(region.height));
  source.getContext('2d',{willReadFrequently:true}).drawImage(canvas,region.x,region.y,region.width,region.height,0,0,source.width,source.height);
  sources.add(source);return source;
 }
 const release=source=>{if(source){source.width=source.height=1;sources.delete(source);}};
 function showText(text){ocrText.textContent=text.slice(0,32000);ocrDetails.hidden=!text.trim();}
 function renderCodes(text,select=false){
  const codes=extractCodes(text);
  for(const code of codes){
   const button=document.createElement('button');button.type='button';button.textContent=(code.kind==='ian'?'IAN ':'')+code.value;
   button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{query.value=code.value;for(const candidate of candidates.children)candidate.setAttribute('aria-pressed',String(candidate===button));});candidates.append(button);
  }
  candidates.hidden=!codes.length;if(select&&codes.length)candidates.firstElementChild.click();return codes;
 }
 async function readText(source,token,hybrid=false){
  let timeout,current,ended=false,rejectCancel;
  const cancelled=new Promise((_,reject)=>{rejectCancel=reject;ocrReject=reject;});
  const recognition=(async()=>{
   const base=new URL('./ocr/',import.meta.url),{default:{createWorker}}=await import(new URL('tesseract.esm.min.js',base).href);
   if(token!==generation||ended)return null;
   current=await createWorker('eng',1,{
    workerPath:new URL('worker.min.js',base).href,corePath:new URL('core/',base).href,langPath:base.href.replace(/\/$/,''),workerBlobURL:false,errorHandler:()=>{},
    logger:event=>{if(token!==generation||ended)return;if(event.status==='recognizing text'){progress.value=event.progress;status.textContent=message(hybrid?'scanHybridReading':'scanReading',{percent:Math.round(event.progress*100)});}}
   });
   if(token!==generation||ended){await current.terminate();return null;}
   worker=current;return current.recognize(source);
  })();
  try{
   const result=await Promise.race([recognition,cancelled,new Promise((_,reject)=>{timeout=setTimeout(()=>reject(new Error('timeout')),hybrid?40000:90000);})]);
   return result?.data.text||'';
  }finally{
   ended=true;clearTimeout(timeout);if(ocrReject===rejectCancel)ocrReject=null;
   if(worker===current)worker=null;if(current)void current.terminate().catch(()=>{});
  }
 }
 async function comparePhoto(source,token){
  const pixels=source.getContext('2d',{willReadFrequently:true}).getImageData(0,0,source.width,source.height);
  visualWorker??=new Worker(new URL('./visual/worker.js',import.meta.url),{type:'module'});
  const current=visualWorker;let timeout,rejectCancel;
  try{return await new Promise((resolve,reject)=>{
   rejectCancel=reject;visualReject=reject;timeout=setTimeout(()=>reject(new Error('timeout')),180000);
   current.onerror=()=>reject(new Error('worker'));
   current.onmessage=({data})=>{
    if(token!==generation)return;
    if(data.type==='result')resolve(data);
    else if(data.type==='error')reject(new Error('visual'));
    else if(data.type==='status'){
     const keys={loading:'scanVisualLoading',download:'scanVisualDownloading',engine:'scanVisualEngine',matching:'scanVisualMatching'};
     if(data.stage==='download'){progress.value=Math.min(1,data.loaded/data.total);status.textContent=message(keys.download,{percent:Math.round(progress.value*100)});}else{progress.removeAttribute('value');status.textContent=message(keys[data.stage]||'scanVisualLoading');}
    }
   };
   current.postMessage({rgba:pixels.data,width:pixels.width,height:pixels.height},[pixels.data.buffer]);
  });}catch(error){if(visualWorker===current){current.terminate();visualWorker=null;}throw error;}
  finally{clearTimeout(timeout);if(visualReject===rejectCancel)visualReject=null;}
 }
 const products=()=>productsPromise??=fetch(new URL('../'+document.documentElement.lang+'/data/visual-products.json',import.meta.url)).then(response=>{if(!response.ok)throw Error('Catalog unavailable');return response.json();}).catch(error=>{productsPromise=null;throw error;});
 function renderMatches(results,count){
  for(const {product,variants,evidence=[]} of results){
   const item=document.createElement('li');item.className='scan-match';
   if(product.image){const img=document.createElement('img');img.src=new URL('../'+product.image,import.meta.url).href;img.alt='';img.loading='lazy';img.addEventListener('error',()=>img.hidden=true,{once:true});item.append(img);}else item.append(document.createElement('span'));
   const body=document.createElement('div'),link=document.createElement('a');
   link.href=new URL('../'+document.documentElement.lang+'/products/'+product.slug+'/',import.meta.url).href;link.textContent=product.model||product.title;body.append(link);
   if(product.model){const title=document.createElement('p');title.textContent=product.title;title.lang=product.titleLanguage;body.append(title);}else link.lang=product.titleLanguage;
   if(product.titleLanguage!==document.documentElement.lang){const notice=document.createElement('p');notice.className='scan-search-hint';notice.textContent=message('scanVisualEnglish');body.append(notice);}
   const identity=document.createElement('p');identity.textContent='IAN '+product.ian+' · '+product.category;body.append(identity);
   if(evidence.length){const clues=document.createElement('p');clues.className='scan-match-evidence';const values=evidence.map(e=>e.kind==='ian'?'IAN '+e.value:e.value).join(' · ');clues.textContent=message(evidence.some(e=>e.kind==='ian'||e.kind==='model')?'scanHybridCodeMatch':'scanHybridTextMatch',{values});body.append(clues);}
   if(variants.length>1){
    const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent=message('scanVisualVariants',{count:variants.length});details.append(summary);
    for(const variant of variants){const a=document.createElement('a');a.href=new URL('../'+document.documentElement.lang+'/products/'+variant.slug+'/',import.meta.url).href;a.textContent='IAN '+variant.ian;details.append(a);}body.append(details);
   }
   item.append(body);matches.append(item);
  }
  visualResults.hidden=!results.length;$('#scan-visual-coverage').textContent=message('scanVisualCoverage',{count});
  return results.length;
 }
 $('#scan-visual').addEventListener('click',async()=>{
  if(!image||busy)return;
  const token=++generation,withText=useText.checked;setBusy(true);clearCandidates();clearVisual();query.value='';status.textContent=message(withText?'scanHybridLoading':'scanVisualLoading');progress.removeAttribute('value');progress.setAttribute('aria-label',message('scanVisual'));
  let source;
  try{
   const catalog=await products();if(token!==generation)return;
   source=snapshot();
   const [visual,textResult]=await Promise.allSettled([comparePhoto(source,token),withText?readText(source,token,true):Promise.resolve('')]);
   if(token!==generation)return;
   const ranked=visual.status==='fulfilled'?visual.value.matches:[],text=textResult.status==='fulfilled'?textResult.value:'';
   const combined=hybridMatches(ranked,catalog,text);
   showText(text);renderCodes(text);
   const count=visual.status==='fulfilled'?visual.value.count:0;
   const length=renderMatches(combined.results,count);
   let key;
   if(!length)key=visual.status==='rejected'?'scanVisualError':'scanVisualEmpty';
   else if(combined.ambiguous)key='scanHybridMultiple';
   else if(visual.status==='rejected')key='scanHybridImageUnavailable';
   else if(withText&&textResult.status==='rejected')key='scanHybridTextUnavailable';
   else if(combined.hasText)key='scanHybridReady';
   else key=ranked[0]?.score<.6?'scanVisualWeak':'scanVisualReady';
   status.textContent=message(key);matches.querySelector('a')?.focus();
  }catch{if(token===generation)status.textContent=message('scanVisualError');}
  finally{release(source);if(token===generation)setBusy(false);}
 });
 $('#scan-read').addEventListener('click',async()=>{
  if(!image||busy)return;
  const token=++generation;setBusy(true);clearCandidates();clearVisual();query.value='';status.textContent=message('scanLoading');progress.removeAttribute('value');progress.setAttribute('aria-label',message('scanRead'));
  let source;
  try{
   source=snapshot();const text=await readText(source,token);if(token!==generation)return;
   showText(text);const codes=renderCodes(text,true);status.textContent=message(codes.length?'scanReady':'scanNoCode');query.focus();
  }catch(error){if(token===generation)status.textContent=message(error?.message==='timeout'?'scanTimeout':'scanError');}
  finally{release(source);if(token===generation)setBusy(false);}
 });
 query.addEventListener('input',()=>{for(const button of candidates.children)button.setAttribute('aria-pressed','false');});
 $('#scan-form').addEventListener('submit',event=>{
  event.preventDefault();const value=searchCode(query.value);if(!value){query.focus();return;}
  document.dispatchEvent(new CustomEvent('catalog:scan-search',{detail:{query:value}}));close();$('#search').focus();
 });
}
