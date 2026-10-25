// Pure parsing shared by the browser scanner and regression tests.
export function extractCodes(text){
 const source=String(text).normalize('NFKC').toUpperCase();
 const result=[],seen=new Set();
 const add=(kind,value,query)=>{if(!seen.has(kind+query)){seen.add(kind+query);result.push({kind,value,query});}};
 // Only a number explicitly introduced by IAN is an IAN. EANs, serials and
 // power ratings must never turn into product identifiers.
 for(const match of source.matchAll(/\bI[ A]?N\s*[:.#-]?\s*([\dOIL|](?:[\dOIL|\t ]{3,10})[\dOIL|])(?:\s*[_-]\s*(\d{4}))?/g)){
  const number=match[1].replace(/\s/g,'').replace(/O/g,'0').replace(/[IL|]/g,'1');
  if(/^\d{5,6}$/.test(number))add('ian',number+(match[2]?'_'+match[2]:''),number);
 }
 for(const match of source.matchAll(/\b(P[A-Z]{1,9})[\s-]+(\d{1,4}(?:[.,]\d)?)[\s-]*(?:(LI|L I|L[I1]|L[I1]-ION)[\s-]*)?([A-Z])\s*([1-9])\b/g)){
  const model=match[1]+' '+match[2]+(match[3]?'-Li':'')+' '+match[4]+match[5];
  add('model',model,model);
 }
 return result;
}
export function searchCode(value){
 const trimmed=String(value).trim();
 const ian=trimmed.match(/^(?:IAN\s*[:.#-]?\s*)?(\d{5,6})(?:\s*[_-]\s*\d{4})?$/i);
 return ian?ian[1]:trimmed;
}
