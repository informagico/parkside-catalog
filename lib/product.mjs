import fs from 'node:fs';
import matter from 'gray-matter';
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function parse(text){
 const {data,content}=matter(text);
 return {...data,body:content.trim()};
}
export const categories=JSON.parse(fs.readFileSync('content/categories.json','utf8'));
export function validate(input){
 for(const key of ['manufacturer','specifications'])if(!Object.hasOwn(input,key))throw Error('Missing field: '+key);
 const p={manufacturer:null,oem:null,market:null,specifications:{},...input};
 for(const k of ['model','ian','title','category','power','company','source','evidence'])if(typeof p[k]!=='string'||!p[k].trim())throw Error('Missing field: '+k);
 if(!/^\d{5,6}$/.test(p.ian))throw Error('Invalid IAN');
 if(!categories.includes(p.category))throw Error('Unknown category: '+p.category+'. Choose from content/categories.json');
 if(Object.hasOwn(p,'checked'))throw Error('The checked field has been removed');
 const https=u=>{const url=new URL(u);if(url.protocol!=='https:'||url.username||url.password)throw Error('Expected an HTTPS source');};
 for(const u of [p.source,p.technical_source].filter(Boolean))https(u);
 p.role??=p.manufacturer?(p.manufacturer_basis==='owner_confirmation'?'Manufacturer confirmed by catalog owner':'Declared manufacturer'):'Spare parts catalog';
 if(p.manufacturer&&p.role!=='Declared manufacturer'&&!(p.role==='Manufacturer confirmed by catalog owner'&&p.manufacturer_basis==='owner_confirmation'))throw Error('Manufacturer without supporting provenance');
 if(!p.specifications||typeof p.specifications!=='object'||Array.isArray(p.specifications)||Object.values(p.specifications).some(v=>typeof v!=='string'))throw Error('Specifications must be an object of string values');
 if(p.image){
  if(typeof p.image!=='object'||Array.isArray(p.image))throw Error('Invalid image');
  for(const key of Object.keys(p.image))if(!['url','source','credit'].includes(key))throw Error('Unknown image field: '+key);
  for(const k of ['url','source','credit'])if(typeof p.image[k]!=='string'||!p.image[k].trim())throw Error('Missing image field: '+k);
  https(p.image.source);
  if(p.image.url.startsWith('assets/products/')){
   if(!/^assets\/products\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/.test(p.image.url)||!fs.existsSync(p.image.url))throw Error('Invalid or missing local image: '+p.image.url);
  }else https(p.image.url);
 }
 return p;
}
const icons={
 'Welding & Soldering':'<path d="M58 33h64v69l-32 26-32-26zM69 52h42v27H69zM76 90h28M90 128v12M33 49l12 5m-5 25 11-5m88-25-12 5m13 25-11-5"/>',
 'Measuring & Detection':'<path d="M36 55h108v50H36zM49 55v17m15-17v11m15-11v17m15-17v11m15-11v17m15-17v11M49 92h39M103 92h28"/>',
 'Batteries & Accessories':'<path d="M55 48h70v80H55zM75 48V35h30v13M68 68h17m-8-8v16m20-8h17M69 103h42M69 113h42"/>',
 'Cleaning & Extraction':'<path d="M69 42h34v10H69zM61 58h50v53H61zM58 64h56M62 104h48M72 42v-9h29v9M108 68c31-9 26 48 41 46M66 112v10m40-10v10"/><circle cx="66" cy="124" r="8"/><circle cx="106" cy="124" r="8"/><path d="M145 113v-55m-5 0h10"/>',
 'Drilling & Fastening':'<path d="M44 48h69v39H65L44 74zM113 55h18v25h-18M131 62h22m-85 25-6 32h25l10-32M57 119h37v15H57zM55 59h33m-33 8h25"/>',
 'Gardening':'<path d="m37 119 77-77 14 14-77 77zM107 49l20-20 17 17-20 20M62 94l-14-14m30-2L64 64m30-2L80 48M34 127l-9 9M128 31l12-12"/>',
 'Sawing & Cutting':'<path d="M50 76a44 44 0 0 1 85 0M50 76h85l-13 21H65zM73 97v24h42V97M40 122h103v10H40zM80 38v-9h31v13"/><circle cx="93" cy="75" r="24"/><circle cx="93" cy="75" r="5"/><path d="m93 51 5 11m15 1-12 5m15 13-13-1M89 97l4-13M71 71l12 4"/>',
 'Sanding & Grinding':'<path d="M55 79h69l12 30H43zM67 79V53h37v26M75 53V42h30l13 15M43 109v14h93v-14M55 116h68M104 67h28l11 19"/>',
 'Workshop Equipment':'<path d="M43 67h94v60H43zM35 58h110v17H35zM69 58V43h42v15M43 98h94M82 91h16v15H82zM58 79v12m64-12v12"/>'
};
export function art(category,cls=''){return `<svg class="tool-art ${cls}" viewBox="0 0 180 160" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[category]||icons['Workshop Equipment']}</svg>`}
