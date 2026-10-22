const $=s=>document.querySelector(s);
const container=$('#cards');
const original=[...container.querySelectorAll('.card')];
const messages=JSON.parse($('#client-i18n').textContent);
const locale=document.documentElement.lang;
const message=(key,values={})=>messages[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name]));
const controls={q:$('#search'),category:$('#category'),company:$('#company'),power:$('#power'),confirmed:$('#confirmed'),sort:$('#sort')};
let limit=24,filtered=[];
const params=new URLSearchParams(location.search);
for(const [k,e] of Object.entries(controls)){if(k==='confirmed')e.checked=params.get(k)==='1';else if(params.has(k))e.value=params.get(k)}
function update(reset=true){
 if(reset)limit=24;
 const q=controls.q.value.trim().toLocaleLowerCase(locale);
 filtered=original.filter(c=>(!q||q.split(/\s+/).every(term=>c.dataset.search.includes(term)))&&['category','company','power'].every(k=>!controls[k].value||c.dataset[k]===controls[k].value)&&(!controls.confirmed.checked||c.dataset.confirmed==='true'));
 if(controls.sort.value==='model')filtered.sort((a,b)=>a.dataset.model.localeCompare(b.dataset.model));
 if(controls.sort.value==='company')filtered.sort((a,b)=>a.dataset.company.localeCompare(b.dataset.company)||a.dataset.model.localeCompare(b.dataset.model));
 original.forEach(c=>c.hidden=true);
 filtered.forEach((c,i)=>{container.append(c);c.hidden=i>=limit});
 $('#result-count').textContent=message(filtered.length===1?'resultOne':'resultMany',{count:filtered.length});
 $('#empty').hidden=filtered.length!==0;
 $('#more').hidden=filtered.length<=limit;
 $('#shown').textContent=filtered.length?message('shown',{shown:Math.min(filtered.length,limit),count:filtered.length}):'';
 const query=new URLSearchParams();for(const [k,e] of Object.entries(controls)){const v=k==='confirmed'?(e.checked?'1':''):e.value;if(v&&!(k==='sort'&&v==='featured'))query.set(k,v)}
 history.replaceState(null,'',location.pathname+(query.size?'?'+query:'')+location.hash);
 for(const link of document.querySelectorAll('[data-language-link]')){const target=new URL(link.href,location.href);target.search=location.search;target.hash=location.hash;link.href=target.href;}
}
for(const e of Object.values(controls))e.addEventListener(e.type==='search'?'input':'change',()=>update());
function reset(){for(const [k,e] of Object.entries(controls)){if(k==='confirmed')e.checked=false;else e.value=k==='sort'?'featured':''}update()}
$('#reset').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);
$('#more').addEventListener('click',()=>{limit+=24;update(false)});
$('#view').addEventListener('click',()=>{const list=container.classList.toggle('list');$('#view').setAttribute('aria-pressed',list);$('#view').setAttribute('aria-label',message(list?'gridView':'listView'))});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();controls.q.focus()}});
update();
