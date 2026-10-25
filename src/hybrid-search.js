import {extractCodes} from './scanner-codes.js';
import {groupMatches} from './visual-core.js';

const normalize=value=>String(value??'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase();
const stop=new Set(('a ad ai al alla alle allo all and are as at battery batteries batteria batterie by con cordless da dal dalla dalle dei del della delle dello di e ed for from gli i il in included inclusa incluse inclusi incluso is it la le li lo max maximum massimo massima min minimo minimum non not of on o or per piu parkside performance prezzo price rechargeable ricaricabile ricaricabili solo set team the to tool tools un una uno v volt volts w watt watts ah nm mm cm m rpm led anni years garanzia warranty pezzi pieces incluso brand nuovo new').split(' '));
for(const word of 'ian ean serial model modello numero number giri vuoto velocita speed diametro diameter coppia torque nominale rated with without senza regolabile adjustable eur euro euros usd price prezzo offerta offer'.split(' '))stop.add(word);
const aliases={trapani:'drill',trapano:'drill',drills:'drill',avvitatore:'driver',avvitatori:'driver',screwdriver:'driver',screwdrivers:'driver',percussione:'impact',battente:'impact',smerigliatrice:'grinder',smerigliatrici:'grinder',grinders:'grinder',angolare:'angle',angular:'angle',levigatrice:'sander',levigatrici:'sander',sanders:'sander',eccentrica:'orbital',orbitale:'orbital',motosega:'chainsaw',motoseghe:'chainsaw',chainsaws:'chainsaw',sega:'saw',seghe:'saw',saws:'saw',seghetto:'saw',circolare:'circular',gattuccio:'reciprocating',cricco:'ratchet',cricchetto:'ratchet',martello:'hammer',demolitore:'demolition',piastrelle:'tile',tiles:'tile',lampada:'lamp',torcia:'flashlight',compressore:'compressor',pompa:'pump',pistola:'gun',termica:'heat',digitale:'digital',lucidatrice:'polisher',colla:'glue',sparapunti:'stapler',multifunzione:'multifunction',multiuso:'multipurpose',elettroutensile:'multitool',pinza:'pliers',crimpatrice:'crimping',occhiali:'glasses',ingrandimento:'magnifying',misuratore:'meter',umidita:'moisture',temperatura:'temperature',infrarossi:'infrared',distanza:'distance',livella:'level',croce:'cross',bussole:'socket',bussola:'socket',chiavi:'wrench',chiave:'wrench',cacciaviti:'driver',cacciavite:'driver'};
export function textTerms(text){
 return [...new Set((normalize(text).match(/[a-z]{3,}/g)||[]).filter(word=>!stop.has(word)).map(word=>aliases[word]||word))];
}

function number(value){
 let text=value.replace(/\s/g,'');
 if(/^\d{1,3}(?:[.,]\d{3})+$/.test(text))text=text.replace(/[.,]/g,'');
 else text=text.replace(',','.');
 const result=Number(text);return Number.isFinite(result)?String(result):null;
}
export function textQuantities(text){
 const source=normalize(text).replace(/[−–—]/g,'-').replace(/\bmin\s*[-⁻]\s*[1¹]/g,'rpm').replace(/\bgiri\s*\/?\s*min(?:uto)?\b/g,'rpm');
 const units={nm:'Nm',v:'V',volt:'V',volts:'V',w:'W',watt:'W',watts:'W',ah:'Ah',mm:'mm',cm:'cm',m:'m',lm:'lm',rpm:'rpm',bpm:'bpm',bar:'bar',kg:'kg',hz:'Hz',j:'J','m/s':'m/s','l/min':'l/min','°c':'°C',celsius:'°C'};
 const quantities=new Set();
 for(const match of source.matchAll(/(?<![a-z0-9_.,])(-?\d+(?:[.,]\d+)?(?:[ \u00a0]\d{3})*)(?:\s*[-/]\s*(-?\d+(?:[.,]\d+)?(?:[ \u00a0]\d{3})*))?\s*(m\s*\/\s*s|l\s*\/\s*min|°\s*c|celsius|n[\s·.]*m|volts?|v|watts?|w|ah|mm|cm|lm|rpm|bpm|bar|kg|hz|j|m)\b/g)){
  const unit=units[match[3].replace(/[\s·.]/g,'')];
  for(const value of [match[1],match[2]].filter(Boolean)){const parsed=number(value);if(parsed!==null&&(Number(parsed)>0||unit==='°C'))quantities.add(parsed+' '+unit);}
 }
 return [...quantities];
}

const catalogCache=new WeakMap();
function prepare(products){
 if(catalogCache.has(products))return catalogCache.get(products);
 const frequency=new Map(),patterns=new Map();
 const records=products.map(product=>{
  const text=[product.title,...(product.searchTitles||[]),product.category,product.searchText||''].join(' ');
  const terms=new Set(textTerms(text)),quantities=new Set(textQuantities((product.quantities||[]).join(' ')));
  for(const term of terms)frequency.set(term,(frequency.get(term)||0)+1);
  for(const quantity of quantities)frequency.set('#'+quantity,(frequency.get('#'+quantity)||0)+1);
  const models=String(product.model||'').split('/').map(model=>model.trim()).filter(Boolean).map(model=>{
   if(!patterns.has(model))patterns.set(model,new RegExp('\\b'+(normalize(model).match(/[a-z]+|[0-9]+/g)||[]).join('[\\s._/–—-]*')+'\\b','i'));
   return {model,key:normalize(model).replace(/[^a-z0-9]/g,''),pattern:patterns.get(model)};
  });
  return {product,terms,quantities,models};
 });
 const prepared={records,weight:term=>Math.min(4,Math.log(1+products.length/(1+(frequency.get(term)||0))))};
 catalogCache.set(products,prepared);return prepared;
}

export function hybridMatches(ranked,products,rawText='',limit=6){
 const text=String(rawText).slice(0,32000),queryTerms=textTerms(text),queryQuantities=textQuantities(text);
 const normalizedText=normalize(text);
 const labels=new Map();for(const word of normalize(text).match(/[a-z]{3,}/g)||[]){const term=aliases[word]||word;if(!labels.has(term))labels.set(term,word);}
 const codes=extractCodes(text),ians=new Set(codes.filter(c=>c.kind==='ian').map(c=>c.query));
 const parsedModels=new Set(codes.filter(c=>c.kind==='model').map(c=>normalize(c.query).replace(/[^a-z0-9]/g,'')));
 const {records,weight}=prepare(products),visual=new Map();
 for(const match of ranked)for(const ian of match.ians)visual.set(ian,Math.max(visual.get(ian)??-1,match.score));
 const scored=[];const codeGroups=new Set();
 for(const {product,terms,quantities,models} of records){
  const matchedTerms=queryTerms.filter(term=>terms.has(term)).sort((a,b)=>weight(b)-weight(a)||a.localeCompare(b)),matchedQuantities=queryQuantities.filter(q=>quantities.has(q));
  const model=models.find(({pattern,key})=>parsedModels.has(key)||pattern.test(normalizedText))?.model;
  const ian=ians.has(product.ian),evidence=[];
  if(ian)evidence.push({kind:'ian',value:product.ian});
  if(model)evidence.push({kind:'model',value:model});
  if(ian||model)codeGroups.add(product.group||product.ian);
  // Bare numbers/prices never enter the text score. Missing specifications are not contradictions.
  const words=matchedTerms.reduce((sum,term)=>sum+weight(term),0),measurements=matchedQuantities.reduce((sum,q)=>sum+weight('#'+q)*1.4,0);
  const textScore=.35*(words+measurements)/(10+words+measurements),visualScore=visual.get(product.ian);
  const hasDescription=words+measurements>=2.5;
  if(visualScore===undefined&&!ian&&!model&&!(hasDescription&&matchedTerms.length&&words+measurements>=6))continue;
  if(!ian&&!model&&hasDescription){
   evidence.push(...matchedQuantities.slice(0,3).map(value=>({kind:'quantity',value})),...matchedTerms.slice(0,2).map(term=>({kind:'word',value:labels.get(term)||term})));
  }
  scored.push({ians:[product.ian],score:(ian?4:model?2:0)+(visualScore??.25)+textScore,evidence,visualScore:visualScore??null});
 }
 if(!scored.some(item=>item.evidence.length))return {results:groupMatches(ranked,products,limit),hasText:false,ambiguous:false};
 scored.sort((a,b)=>b.score-a.score||a.ians[0].localeCompare(b.ians[0]));
 const byIan=new Map(scored.map(item=>[item.ians[0],item]));
 const results=groupMatches(scored,products,limit).map(result=>({...result,evidence:byIan.get(result.product.ian).evidence,visualScore:byIan.get(result.product.ian).visualScore}));
 return {results,hasText:true,ambiguous:codeGroups.size>1};
}
