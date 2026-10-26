const $=s=>document.querySelector(s);
const container=$('#cards'),original=[...container.querySelectorAll('.card')];
const resultsScroller=$('#catalog-results');
const siteHeader=document.querySelector('body > header');
const sizeIntro=()=>document.documentElement.style.setProperty('--site-header-height',siteHeader.getBoundingClientRect().height+'px');
sizeIntro();
if(typeof ResizeObserver!=='undefined')new ResizeObserver(sizeIntro).observe(siteHeader);
const messages=JSON.parse($('#client-i18n').textContent),locale=document.documentElement.lang;
const message=(key,values={})=>messages[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name]));
const controls={q:$('#search'),category:$('#category'),company:$('#company'),power:$('#power'),confirmed:$('#confirmed'),sort:$('#sort')};
const params=new URLSearchParams(location.search),storageKey='parkside:catalog:'+locale;
const pageSize=24;
const mobile=matchMedia('(max-width:760px)'),filterToggle=$('#filter-toggle'),filters=$('#catalog-filters');
let filtersOpen=false;
function syncFilters(){
 filterToggle.hidden=!mobile.matches;
 filters.hidden=mobile.matches&&!filtersOpen;
 filterToggle.setAttribute('aria-expanded',String(!filters.hidden));
}
filterToggle.addEventListener('click',()=>{filtersOpen=!filtersOpen;syncFilters();});
mobile.addEventListener('change',syncFilters);syncFilters();
$('#search-clear').addEventListener('click',()=>{clearTimeout(timer);controls.q.value='';update();controls.q.focus();});
let limit=Math.max(pageSize,Math.min(original.length,Number(params.get('limit'))||pageSize)),filtered=[],timer;
const list=params.get('view')==='list';container.classList.toggle('list',list);
$('#view').setAttribute('aria-pressed',String(list));$('#view').setAttribute('aria-label',message(list?'gridView':'listView'));
for(const [k,e] of Object.entries(controls)){if(k==='confirmed')e.checked=params.get(k)==='1';else if(params.has(k))e.value=k==='sort'&&params.get(k)==='featured'?'model':params.get(k);}
const normalize=s=>s.normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase(locale);
const searchText=new Map(original.map(c=>[c,normalize(c.dataset.search)]));
function save(){try{sessionStorage.setItem(storageKey,JSON.stringify({url:location.href,scroll:scrollY,resultsScroll:resultsScroller.scrollTop}));}catch{}}
function update(reset=true){
 if(reset)limit=pageSize;
 $('#search-clear').hidden=!controls.q.value;
 const active=['category','company','power'].filter(key=>controls[key].value).length+Number(controls.confirmed.checked);
 $('#filter-count').hidden=!active;$('#filter-count').textContent=message('activeFilters',{count:active});
 const terms=normalize(controls.q.value.trim()).split(/\s+/).filter(Boolean);
 filtered=original.filter(c=>terms.every(t=>searchText.get(c).includes(t))&&['category','company','power'].every(k=>!controls[k].value||c.dataset[k]===controls[k].value)&&(!controls.confirmed.checked||c.dataset.confirmed==='true'));
 const compare=(a,b)=>(controls.sort.value==='company'?a.dataset.company.localeCompare(b.dataset.company,locale):0)||a.dataset.model.localeCompare(b.dataset.model,locale,{numeric:true})||a.dataset.search.localeCompare(b.dataset.search,locale);
 filtered.sort(compare);
 const visible=filtered.slice(0,limit);visible.forEach(c=>c.hidden=false);container.replaceChildren(...visible);
 if(reset)resultsScroller.scrollTop=0;
 $('#result-count').textContent=message(filtered.length===1?'resultOne':'resultMany',{count:filtered.length});$('#empty').hidden=filtered.length!==0;$('#more').hidden=filtered.length<=limit;$('#shown').textContent=filtered.length?message('shown',{shown:visible.length,count:filtered.length}):'';
 const query=new URLSearchParams();for(const [k,e] of Object.entries(controls)){const v=k==='confirmed'?(e.checked?'1':''):e.value;if(v&&!(k==='sort'&&v==='model'))query.set(k,v);}
 if(limit>pageSize)query.set('limit',String(limit));if(container.classList.contains('list'))query.set('view','list');
 history.replaceState(history.state,'',location.pathname+(query.size?'?'+query:'')+location.hash);
 for(const link of document.querySelectorAll('[data-language-link]')){const target=new URL(link.href,location.href);target.search=location.search;target.hash=location.hash;link.href=target.href;}
 document.dispatchEvent(new Event('catalog:updated'));
}
for(const e of Object.values(controls))e.addEventListener(e.type==='search'?'input':'change',()=>{clearTimeout(timer);if(e.type==='search'){$('#search-clear').hidden=!e.value;timer=setTimeout(()=>update(),120);}else update();});
function reset(){clearTimeout(timer);for(const [k,e] of Object.entries(controls)){if(k==='confirmed')e.checked=false;else e.value=k==='sort'?'model':'';}update();}
$('#reset').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);
$('#more').addEventListener('click',()=>{limit+=pageSize;update(false);});
$('#view').addEventListener('click',()=>{const list=container.classList.toggle('list');$('#view').setAttribute('aria-pressed',String(list));$('#view').setAttribute('aria-label',message(list?'gridView':'listView'));update(false);});
container.addEventListener('click',save);addEventListener('pagehide',save);
document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();controls.q.focus();}});
let saved;try{saved=JSON.parse(sessionStorage.getItem(storageKey)||'null');}catch{}
const restore=params.get('restore')==='1'||performance.getEntriesByType('navigation')[0]?.type==='back_forward';
update(false);
if(restore&&saved){const u=new URL(saved.url,location.href);if(u.origin===location.origin&&u.pathname===location.pathname&&u.search===location.search){const restoreScroll=()=>requestAnimationFrame(()=>{scrollTo({top:Number(saved.scroll)||0,behavior:'instant'});resultsScroller.scrollTop=Number(saved.resultsScroll)||0;});if(document.readyState==='complete')restoreScroll();else addEventListener('load',restoreScroll,{once:true});}}

// A confirmed scan replaces the search and clears filters that could hide it.
document.addEventListener('catalog:scan-search',event=>{
 clearTimeout(timer);
 for(const key of ['category','company','power'])controls[key].value='';
 controls.confirmed.checked=false;controls.q.value=event.detail.query;update();
});
