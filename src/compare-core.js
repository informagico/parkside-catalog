export const MAX_PRODUCTS=3;
export function readSelection(value){
 if(!Array.isArray(value))return [];
 const seen=new Set();
 return value.filter(p=>p&&typeof p.ian==='string'&&/^\d{5,6}$/.test(p.ian)&&!seen.has(p.ian)&&seen.add(p.ian))
  .slice(0,MAX_PRODUCTS).map(p=>({ian:p.ian,model:typeof p.model==='string'?p.model.slice(0,200):p.ian}));
}
export function idsFromQuery(query){
 return [...new Set((query||'').split(',').filter(id=>/^\d{5,6}$/.test(id)))].slice(0,MAX_PRODUCTS);
}
const valueKey=value=>String(value??'').normalize('NFKC').replace(/\s+/g,' ').trim().toLowerCase();
const missing=value=>value==null||value===''||['unverified','to be verified','unknown','—','not available','not specified'].includes(valueKey(value));
export function rowStatus(values){
 if(values.some(missing))return 'incomplete';
 return new Set(values.map(valueKey)).size===1?'same':'different';
}
export function comparisonRows(products,labels){
 const row=(key,label,values,display=values)=>({key,label,values,display,status:rowStatus(values)});
 const rows=[
  row('model',labels.compareModel,products.map(p=>p.model)),
  row('category',labels.category,products.map(p=>p.categoryKey),products.map(p=>p.category)),
  row('manufacturer',labels.manufacturer,products.map(p=>p.manufacturer)),
  row('power',labels.power,products.map(p=>p.powerKey),products.map(p=>missing(p.powerKey)?null:p.power)),
 ];
 const keys=[...new Set(products.flatMap(p=>p.specifications.map(s=>s.key)))].sort();
 for(const key of keys){
  const specs=products.map(p=>p.specifications.find(s=>s.key===key));
  rows.push(row('spec:'+key,specs.find(Boolean).label,specs.map(s=>key==='Battery system'?s?.value?.replace(/\bX(12|20)\s*V[\s-]*Team\b/gi,'X$1V-Team'):s?.value),specs.map(s=>s?.display)));
 }
 return rows;
}
