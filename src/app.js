const $=s=>document.querySelector(s);
const container=$('#cards');
const original=[...container.querySelectorAll('.card')];
const controls={q:$('#search'),category:$('#category'),company:$('#company'),power:$('#power'),confirmed:$('#confirmed'),sort:$('#sort')};
let limit=24,filtered=[];
const params=new URLSearchParams(location.search);
for(const [k,e] of Object.entries(controls)){if(k==='confirmed')e.checked=params.get(k)==='1';else if(params.has(k))e.value=params.get(k)}
function update(reset=true){
 if(reset)limit=24;
 const q=controls.q.value.trim().toLocaleLowerCase('it');
 filtered=original.filter(c=>(!q||q.split(/\s+/).every(term=>c.dataset.search.includes(term)))&&['category','company','power'].every(k=>!controls[k].value||c.dataset[k]===controls[k].value)&&(!controls.confirmed.checked||c.dataset.confirmed==='true'));
 if(controls.sort.value==='model')filtered.sort((a,b)=>a.dataset.model.localeCompare(b.dataset.model));
 if(controls.sort.value==='company')filtered.sort((a,b)=>a.dataset.company.localeCompare(b.dataset.company)||a.dataset.model.localeCompare(b.dataset.model));
 original.forEach(c=>c.hidden=true);
 filtered.forEach((c,i)=>{container.append(c);c.hidden=i>=limit});
 $('#result-count').textContent=`${filtered.length} ${filtered.length===1?'scheda trovata':'schede trovate'}`;
 $('#empty').hidden=filtered.length!==0;
 $('#more').hidden=filtered.length<=limit;
 $('#shown').textContent=filtered.length?`Mostrate ${Math.min(filtered.length,limit)} di ${filtered.length} schede`:'';
 const query=new URLSearchParams();for(const [k,e] of Object.entries(controls)){const v=k==='confirmed'?(e.checked?'1':''):e.value;if(v&&!(k==='sort'&&v==='featured'))query.set(k,v)}
 history.replaceState(null,'',location.pathname+(query.size?'?'+query:'')+location.hash);
}
for(const e of Object.values(controls))e.addEventListener(e.type==='search'?'input':'change',()=>update());
function reset(){for(const [k,e] of Object.entries(controls)){if(k==='confirmed')e.checked=false;else e.value=k==='sort'?'featured':''}update()}
$('#reset').addEventListener('click',reset);$('#empty-reset').addEventListener('click',reset);
$('#more').addEventListener('click',()=>{limit+=24;update(false)});
$('#view').addEventListener('click',()=>{const list=container.classList.toggle('list');$('#view').setAttribute('aria-pressed',list);$('#view').setAttribute('aria-label',list?'Passa alla vista griglia':'Passa alla vista elenco')});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();controls.q.focus()}});
update();
