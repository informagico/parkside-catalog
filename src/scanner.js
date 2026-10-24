import {extractCodes,searchCode} from './scanner-codes.js';
const $=selector=>document.querySelector(selector);
const dialog=$('#label-scanner'),open=$('#scan-open');
if(dialog&&typeof dialog.showModal==='function'){
 const messages=JSON.parse($('#client-i18n').textContent);
 const message=(key,values={})=>messages[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name]));
 const canvas=$('#scan-preview'),context=canvas.getContext('2d');
 const selection=$('#scan-selection'),query=$('#scan-query'),status=$('#scan-status'),progress=$('#scan-progress');
 const candidates=$('#scan-candidates');
 let image=null,crop=null,start=null,worker=null,busy=false,generation=0,rotation=0;
 const locked=['#scan-camera','#scan-gallery','#scan-read','#scan-rotate','#scan-reset-crop'];
 const setBusy=value=>{busy=value;dialog.setAttribute('aria-busy',String(value));for(const id of locked)$(id).disabled=value;progress.hidden=!value;};
 const clearCandidates=()=>{candidates.replaceChildren();candidates.hidden=true;};
 const stop=()=>{generation++;if(worker){const previous=worker;worker=null;void previous.terminate().catch(()=>{});}setBusy(false);};
 const resetCrop=()=>{crop=null;start=null;selection.hidden=true;};
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
 open.addEventListener('click',()=>{dialog.showModal();status.textContent=message('scanManualHint');});
 $('#scan-close').addEventListener('click',close);
 dialog.addEventListener('close',()=>{
  stop();image=null;canvas.width=canvas.height=1;resetCrop();clearCandidates();query.value='';status.textContent='';$('#scan-image').hidden=true;
  for(const id of ['#scan-camera-file','#scan-gallery-file'])$(id).value='';
  open.focus();
 });
 for(const type of ['camera','gallery']){
  const input=$('#scan-'+type+'-file');
  $('#scan-'+type).addEventListener('click',()=>input.click());
  input.addEventListener('change',async()=>{
   const file=input.files[0];input.value='';if(!file)return;
   stop();const token=generation;clearCandidates();query.value='';status.textContent='';
   image=null;$('#scan-image').hidden=true;
   if(file.size>25*1024*1024){status.textContent=message('scanSizeError');return;}
   const url=URL.createObjectURL(file);
   try{
    const photo=new Image();photo.src=url;await photo.decode();
    if(token!==generation||!dialog.open)return;
    image=photo;rotation=0;draw();$('#scan-image').hidden=false;
   }catch{if(token===generation)status.textContent=message('scanImageError');}
   finally{URL.revokeObjectURL(url);}
  });
 }
 $('#scan-rotate').addEventListener('click',()=>{if(image&&!busy){rotation=(rotation+1)%4;draw();}});
 $('#scan-reset-crop').addEventListener('click',resetCrop);
 const point=event=>{const rect=canvas.getBoundingClientRect();return {x:Math.max(0,Math.min(canvas.width,(event.clientX-rect.left)*canvas.width/rect.width)),y:Math.max(0,Math.min(canvas.height,(event.clientY-rect.top)*canvas.height/rect.height))};};
 canvas.addEventListener('pointerdown',event=>{if(busy||!image||!event.isPrimary)return;canvas.setPointerCapture(event.pointerId);resetCrop();start=point(event);});
 canvas.addEventListener('pointermove',event=>{
  if(!start)return;const end=point(event);
  crop={x:Math.min(start.x,end.x),y:Math.min(start.y,end.y),width:Math.abs(end.x-start.x),height:Math.abs(end.y-start.y)};
  selection.hidden=false;Object.assign(selection.style,{left:crop.x/canvas.width*100+'%',top:crop.y/canvas.height*100+'%',width:crop.width/canvas.width*100+'%',height:crop.height/canvas.height*100+'%'});
 });
 canvas.addEventListener('pointerup',()=>{start=null;if(crop&&(crop.width<20||crop.height<20))resetCrop();});
 canvas.addEventListener('pointercancel',resetCrop);
 $('#scan-read').addEventListener('click',async()=>{
  if(!image||busy)return;
  const token=++generation;setBusy(true);clearCandidates();query.value='';status.textContent=message('scanLoading');progress.removeAttribute('value');
  let timeout;
  try{
   // URLs relative to this module also work under a GitHub Pages project path.
   const base=new URL('./ocr/',import.meta.url);
   const {default:{createWorker}}=await import(new URL('tesseract.esm.min.js',base).href);
   if(token!==generation)return;
   const timeoutPromise=new Promise((_,reject)=>{timeout=setTimeout(()=>reject(new Error('timeout')),90000);});
   const recognition=(async()=>{
    const current=await createWorker('eng',1,{
     workerPath:new URL('worker.min.js',base).href,
     corePath:new URL('core/',base).href,
     langPath:base.href.replace(/\/$/,''),workerBlobURL:false,
     errorHandler:()=>{},
     logger:event=>{if(token!==generation)return;if(event.status==='recognizing text'){progress.value=event.progress;status.textContent=message('scanReading',{percent:Math.round(event.progress*100)});}}
    });
    if(token!==generation){await current.terminate();return null;}
    worker=current;
    const source=document.createElement('canvas');const region=crop||{x:0,y:0,width:canvas.width,height:canvas.height};
    source.width=Math.round(region.width);source.height=Math.round(region.height);
    source.getContext('2d').drawImage(canvas,region.x,region.y,region.width,region.height,0,0,source.width,source.height);
    const result=await current.recognize(source);source.width=source.height=1;
    return result;
   })();
   const result=await Promise.race([recognition,timeoutPromise]);
   if(token!==generation||!result)return;
   const codes=extractCodes(result.data.text);
   for(const code of codes){
    const button=document.createElement('button');button.type='button';button.textContent=(code.kind==='ian'?'IAN ':'')+code.value;
    button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{query.value=code.value;for(const candidate of candidates.children)candidate.setAttribute('aria-pressed',String(candidate===button));});candidates.append(button);
   }
   candidates.hidden=!codes.length;
   if(codes.length)candidates.firstElementChild.click();
   status.textContent=message(codes.length?'scanReady':'scanNoCode');query.focus();
  }catch(error){if(token===generation)status.textContent=message(error.message==='timeout'?'scanTimeout':'scanError');}
  finally{clearTimeout(timeout);if(token===generation)stop();}
 });
 query.addEventListener('input',()=>{for(const button of candidates.children)button.setAttribute('aria-pressed','false');});
 $('#scan-form').addEventListener('submit',event=>{
  event.preventDefault();const value=searchCode(query.value);if(!value){query.focus();return;}
  document.dispatchEvent(new CustomEvent('catalog:scan-search',{detail:{query:value}}));close();$('#search').focus();
 });
}
