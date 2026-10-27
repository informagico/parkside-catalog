import {MAX_PRODUCTS,readSelection,idsFromQuery,comparisonRows} from './compare-core.js';
const $=selector=>document.querySelector(selector);
const messages=JSON.parse($('#comparison-i18n').textContent);
const locale=document.documentElement.lang;
const message=(key,values={})=>messages[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name]));
const key='parkside:comparison:v1';
let selected=[];
try{selected=readSelection(JSON.parse(localStorage.getItem(key)||'[]'));}catch{}
const page=$('#comparison');
const moduleRoot=new URL('../',import.meta.url);
const pageRoot=page?new URL(page.dataset.root,location.href):null;
let products=null,invalid=false,statusTimer;
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!=null)node.textContent=text;if(className)node.className=className;return node;};
const announce=text=>{
 clearTimeout(statusTimer);$('#compare-status').textContent=text;
 statusTimer=setTimeout(()=>$('#compare-status').textContent='',6000);
};
function compareUrl(){
 const url=new URL(locale+'/compare/',moduleRoot);
 if(selected.length)url.searchParams.set('ians',selected.map(p=>p.ian).join(','));
 return url;
}
function persist(){try{localStorage.setItem(key,JSON.stringify(selected));}catch{}}
function remove(ian){
 const product=selected.find(p=>p.ian===ian);selected=selected.filter(p=>p.ian!==ian);
 persist();sync();if(product)announce(message('compareRemoved',{model:product.model+' · IAN '+product.ian}));
}
function removeButton(product){
 const button=el('button','×');button.type='button';button.dataset.removeIan=product.ian;
 button.setAttribute('aria-label',message('compareRemove',{model:product.model+' · IAN '+product.ian}));
 button.addEventListener('click',()=>{
  remove(product.ian);
  // Removing a column/chip replaces its DOM. Give keyboard focus a stable target.
  const target=document.querySelector(`[data-remove-ian="${selected[0]?.ian}"]`)||(selected.length?$('#compare-share'):$('.comparison-actions a'))||$('.compare-catalog-link');
  if(target&&!target.hidden)target.focus();
 });return button;
}
function sync(){
 const tray=$('#compare-tray');tray.hidden=!selected.length||!!page;
 document.body.classList.toggle('has-comparison',!tray.hidden);
 $('#compare-count').textContent=message('compareCount',{count:selected.length});
 $('#compare-items').replaceChildren(...selected.map(p=>{
  const chip=el('span',null,'compare-chip');chip.append(el('span',p.model+' · '+p.ian),removeButton(p));return chip;
 }));
 for(const button of document.querySelectorAll('[data-compare-ian]')){
  const active=selected.some(p=>p.ian===button.dataset.compareIan);
  button.hidden=false;button.setAttribute('aria-pressed',String(active));
  button.textContent=message(active?'compareSelected':'compareAdd');
 }
 for(const link of document.querySelectorAll('[data-compare-link]'))link.href=compareUrl().href;
 if(page&&products){
  const url=new URL(location.href);
  if(selected.length)url.searchParams.set('ians',selected.map(p=>p.ian).join(','));else url.searchParams.delete('ians');
  history.replaceState(history.state,'',url);
  render();
  for(const link of document.querySelectorAll('[data-language-link]')){const target=new URL(link.href);target.search=url.search;link.href=target.href;}
 }
}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-compare-ian]');if(!button)return;
 const ian=button.dataset.compareIan;
 if(selected.some(p=>p.ian===ian)){remove(ian);return;}
 if(selected.length>=MAX_PRODUCTS){announce(message('compareLimit'));return;}
 const product={ian,model:button.dataset.compareModel};selected=readSelection([...selected,product]);
 persist();sync();announce(message('compareAdded',{model:product.model+' · IAN '+product.ian}));
});
$('#compare-clear').addEventListener('click',()=>{selected=[];persist();sync();$('.compare-catalog-link')?.focus();});
addEventListener('storage',event=>{if(event.key!==key)return;try{selected=readSelection(JSON.parse(event.newValue||'[]'));}catch{selected=[];}if(products)selected=selected.filter(p=>products.has(p.ian));sync();});
function render(){
 const chosen=selected.map(p=>products.get(p.ian)).filter(Boolean),host=$('#comparison-table');
 host.replaceChildren();
 $('#compare-share').hidden=!chosen.length;
 $('#compare-diff-label').hidden=chosen.length<2;
 $('#compare-notes').hidden=!chosen.length;
 $('#compare-hint').hidden=chosen.length<2;
 const mixed=new Set(chosen.map(p=>p.categoryKey)).size>1;
 $('#compare-warning').hidden=!invalid&&!mixed;
 $('#compare-warning').textContent=[invalid?message('compareInvalid'):'',mixed?message('compareMixed'):''].filter(Boolean).join(' ');
 if(!chosen.length){host.append(el('h2',message('compareEmpty')));$('#compare-summary').textContent='';return;}
 const table=el('table',null,'comparison-table');table.style.setProperty('--products',chosen.length);
 const head=el('thead'),header=el('tr'),corner=el('th',message('compareField'));corner.scope='col';header.append(corner);
 for(const p of chosen){
  const cell=el('th');cell.scope='col';
  cell.append(removeButton({ian:p.ian,model:p.model||p.title}));
  if(p.image){const img=el('img');img.src=new URL(p.image,pageRoot).href;img.alt='';img.loading='lazy';cell.append(img);}
  const link=el('a',p.model||p.title);link.href=new URL(`${locale}/products/${p.slug}/`,pageRoot).href;
  cell.append(link,el('small',p.title),el('small','IAN '+p.ian));header.append(cell);
 }
 head.append(header);table.append(head);
 const body=el('tbody'),rows=comparisonRows(chosen,messages),stats={same:0,different:0,incomplete:0};
 const statuses={same:'compareSame',different:'compareDifferent',incomplete:'compareIncomplete'};
 let shown=0;
 for(const row of rows){
  stats[row.status]++;
  if(chosen.length>=2&&$('#compare-diff').checked&&row.status==='same')continue;
  shown++;
  const tr=el('tr',null,'comparison-'+row.status),th=el('th',row.label);th.scope='row';
  if(chosen.length>=2)th.append(el('span',message(statuses[row.status]),'comparison-badge'));
  tr.append(th);
  row.display.forEach((value,index)=>tr.append(el('td',row.values[index]==null||!value?message('compareMissing'):String(value))));
  body.append(tr);
 }
 table.append(body);host.append(table);
 requestAnimationFrame(()=>$('#compare-hint').hidden=host.scrollWidth<=host.clientWidth);
 $('#compare-summary').textContent=chosen.length<2?message('compareNeedTwo'):message('compareSummary',stats);
 if(!shown)host.append(el('p',message('compareNoDiff')));
}
document.addEventListener('catalog:updated',sync);
addEventListener('pageshow',event=>{
 if(!event.persisted)return;
 try{selected=readSelection(JSON.parse(localStorage.getItem(key)||'[]'));}catch{}
 sync();
});
sync();
if(page){
 new ResizeObserver(()=>{const host=$('#comparison-table');$('#compare-hint').hidden=host.scrollWidth<=host.clientWidth;}).observe($('#comparison-table'));
 // Load the data only on the comparison page; selecting products needs no fetch.
 try{
  const response=await fetch(page.dataset.source);if(!response.ok)throw Error('Catalog data unavailable');
  products=new Map((await response.json()).map(p=>[p.ian,p]));
  const query=new URLSearchParams(location.search);
  const ids=query.has('ians')?idsFromQuery(query.get('ians')):selected.map(p=>p.ian);
  invalid=ids.some(id=>!products.has(id))||(query.has('ians')&&ids.join(',')!==query.get('ians'));
  selected=ids.filter(id=>products.has(id)).map(id=>({ian:id,model:products.get(id).model||products.get(id).title}));
  persist();sync();
  $('#compare-diff').addEventListener('change',render);
  $('#compare-share').addEventListener('click',async()=>{
   try{await navigator.clipboard.writeText(compareUrl().href);announce(message('compareCopied'));}
   catch{announce(message('compareCopyFailed'));}
  });
 }catch{
  $('#compare-summary').textContent=message('compareLoadFailed');
 }
}
