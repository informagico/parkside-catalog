import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Exercise the real scanner event handlers without loading OCR or the visual model.
async function scanner(){
 const elements=new Map();
 function element(){
  const handlers=new Map(),classes=new Set();
  return {hidden:true,style:{},width:1000,height:1800,value:'',files:[],children:[],
   classList:{toggle(name,on){if(on)classes.add(name);else classes.delete(name);},contains:name=>classes.has(name),add:name=>classes.add(name),remove:name=>classes.delete(name)},
   addEventListener(name,fn){handlers.set(name,fn);},emit(name,event={}){return handlers.get(name)?.(event);},
   setAttribute(name,value){this[name]=value;},replaceChildren(){this.children=[];},focus(){},scrollIntoView(){},
   getContext(){return {save(){},translate(){},rotate(){},drawImage(){},restore(){}};},
   getBoundingClientRect(){return {left:10,top:20,width:200,height:360};},
   setPointerCapture(){this.captures=(this.captures||0)+1;},
   showModal(){this.open=true;},close(){this.open=false;this.emit('close');}
  };
 }
 const get=id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id);};
 get('#client-i18n').textContent=fs.readFileSync('locales/en.json','utf8');
 const root=element();
 vm.runInNewContext(fs.readFileSync('src/scanner.js','utf8').replace(/^import .*$/gm,'').replaceAll('import.meta.url',JSON.stringify('https://example.test/assets/scanner.js')),{
  document:{querySelector:get,documentElement:root},
  Image:class{width=1000;height=1800;async decode(){}},
  URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},
  console,Set,Error
 });
 get('#scan-open').emit('click');
 get('#scan-gallery-file').files=[{size:100}];
 await get('#scan-gallery-file').emit('change');
 return {get,root,canvas:get('#scan-preview'),selection:get('#scan-selection'),
  drag(){const canvas=get('#scan-preview');canvas.emit('pointerdown',{isPrimary:true,button:0,pointerId:1,clientX:30,clientY:56});canvas.emit('pointermove',{clientX:130,clientY:236});canvas.emit('pointerup');}};
}

test('Swiping on the preview cannot start or erase a crop outside crop mode',async()=>{
 const s=await scanner();
 s.drag();assert.equal(s.canvas.captures,undefined);assert.equal(s.selection.hidden,true);
 s.get('#scan-crop').emit('click');s.drag();
 assert.equal(s.canvas.captures,1);assert.equal(s.selection.hidden,false);
 assert.deepEqual({...s.selection.style},{left:'10%',top:'10%',width:'50%',height:'50%'});
 assert.equal(s.get('#scan-crop')['aria-pressed'],'false');
 assert.equal(s.canvas.classList.contains('is-cropping'),false);
 s.drag();assert.equal(s.canvas.captures,1);assert.equal(s.selection.hidden,false);
});

test('Cancelled and accidental selections preserve the previous crop',async()=>{
 const s=await scanner();s.get('#scan-crop').emit('click');s.drag();
 const previous={...s.selection.style};
 s.get('#scan-crop').emit('click');
 s.canvas.emit('pointerdown',{isPrimary:true,button:0,pointerId:2,clientX:40,clientY:60});
 s.canvas.emit('pointermove',{clientX:80,clientY:100});s.canvas.emit('pointercancel');
 assert.deepEqual({...s.selection.style},previous);
 s.canvas.emit('pointerdown',{isPrimary:true,button:0,pointerId:3,clientX:40,clientY:60});
 s.canvas.emit('pointermove',{clientX:41,clientY:61});s.canvas.emit('pointerup');
 assert.deepEqual({...s.selection.style},previous);
 s.get('#scan-reset-crop').emit('click');assert.equal(s.selection.hidden,true);
 assert.equal(s.canvas.classList.contains('is-cropping'),false);
});

test('Closing the scanner releases page scroll and resets crop mode on reopening',async()=>{
 const s=await scanner();assert.equal(s.root.classList.contains('scanner-open'),true);
 s.get('#scan-crop').emit('click');s.get('#scan-close').emit('click');
 assert.equal(s.root.classList.contains('scanner-open'),false);
 assert.equal(s.canvas.classList.contains('is-cropping'),false);
 s.get('#scan-open').emit('click');assert.equal(s.get('#scan-image').hidden,true);
});
