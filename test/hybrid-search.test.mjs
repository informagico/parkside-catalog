import {test} from 'node:test';
import assert from 'node:assert/strict';
import {hybridMatches,textQuantities,textTerms} from '../src/hybrid-search.js';
import {groupMatches} from '../src/visual-core.js';
import {extractCodes} from '../src/scanner-codes.js';

const product=(ian,model,extra={})=>({ian,model,title:'Cordless impact drill',searchTitles:['Trapano a percussione ricaricabile'],category:'Drilling & Fastening',group:'drill:'+model,quantities:['20 V','45 Nm'],...extra});
const products=[product('111111','PSBSA 20-Li C3'),product('222222','PSBSA 20-Li E4'),product('333333','PABS 20-Li I9',{title:'Cordless drill driver',searchTitles:['Trapano avvitatore ricaricabile']}),product('444444','PWSA 20-Li G4',{title:'Cordless angle grinder',searchTitles:['Smerigliatrice angolare'],category:'Sanding & Grinding',quantities:['20 V','125 mm','2500–11000 rpm']})];

test('An exact IAN read from text retrieves a record outside the image shortlist, including no-photo records',()=>{
 const catalog=[...products,product('555555','PSBM 500 E5',{image:null,quantities:['500 W']})];
 const result=hybridMatches([{ians:['444444'],score:.99}],catalog,'IAN 555555_2601');
 assert.equal(result.results[0].product.ian,'555555');assert.equal(result.results[0].visualScore,null);
 assert.deepEqual(result.results[0].evidence,[{kind:'ian',value:'555555'}]);
});

test('A complete OCR model outweighs a similar-looking image and handles spaced letters and I9 revisions',()=>{
 const ranked=[{ians:['444444'],score:.99},{ians:['111111'],score:.95}];
 const result=hybridMatches(ranked,products,'PABS 20-LI I 9');
 assert.equal(result.results[0].product.ian,'333333');
 assert(result.results[0].evidence.some(e=>e.kind==='model'&&e.value==='PABS 20-Li I9'));
 assert.equal(extractCodes('PABS 20-Li I9')[0].value,'PABS 20-Li I9');
 assert.equal(hybridMatches(ranked,products,'PSBSA 20-L1 C3').results[0].product.ian,'111111');
});

test('Model matching does not confuse a model prefix or omit the complete revision',()=>{
 const catalog=[...products,product('555555','PPWSA 20-Li A1',{title:'Angle grinder'})];
 assert.equal(hybridMatches([{ians:['444444'],score:.99}],catalog,'PPWSA20-LiA1').results[0].product.ian,'555555');
 const partial=hybridMatches([{ians:['222222'],score:.9}],products,'PSBSA 20-Li');
 assert(!partial.results.some(r=>r.evidence?.some(e=>e.kind==='model')));
 const noisy=hybridMatches([], [...products,product('666666','PPSBSA 20-Li C3')],'=P\nPSBSA 20-Li C3');
 assert(!noisy.ambiguous);assert(!noisy.results.some(r=>r.evidence?.some(e=>e.value==='PPSBSA 20-Li C3')));
});

test('Italian names and unit-qualified specifications refine close visual candidates',()=>{
 const catalog=[product('111111','MODEL A',{quantities:['20 V','25 Nm','0–1500 rpm']}),product('222222','MODEL B',{quantities:['20 V','45 Nm','0–1650 rpm']})];
 const result=hybridMatches([{ians:['111111'],score:.83},{ians:['222222'],score:.81}],catalog,'Trapano a percussione 45 Nm, 1650 giri/min. 29,99 €');
 assert.equal(result.results[0].product.ian,'222222');
 assert(result.results[0].evidence.some(e=>e.value==='45 Nm'));
 assert(result.results[0].evidence.some(e=>e.value==='1650 rpm'));
 assert(!result.results[0].evidence.some(e=>e.value.includes('29')));
});

test('Decimal commas, thousand separators, capacity and speed notation normalize without treating prices as facts',()=>{
 assert.deepEqual(textQuantities('45 Nm · 125 mm · 0–11 000 min⁻¹ · 4,0 Ah · 19,99 €'),['45 Nm','125 mm','11000 rpm','4 Ah']);
 assert.deepEqual(textQuantities('2.500–11.000 rpm; 20V; 2000W'),['2500 rpm','11000 rpm','20 V','2000 W']);
 assert.deepEqual(textQuantities('10 m/s, 380 l/min, 3 J, -38–365 °C'),['10 m/s','380 l/min','3 J','-38 °C','365 °C']);
 assert(!textQuantities('10 m/s').includes('10 m'));
 assert.deepEqual(textQuantities('IAN 123456_2601 EAN 4055334999999 19,99 € 3 anni'),[]);
 assert.deepEqual(textTerms('PARKSIDE PERFORMANCE ricaricabile cordless prezzo 29,99 € 3 anni garanzia'),[]);
 assert.deepEqual(textTerms('Offerta PARKSIDE 29,99 EUR'),[]);
});

test('Several specification agreements still separate candidates when both match many words',()=>{
 const common={title:'Compact impact hammer drill',searchTitles:[]};
 const catalog=[product('111111','MODEL A',{...common,quantities:['35 mm','13 mm','20 V']}),product('222222','MODEL B',{...common,quantities:['35 mm','13 mm','20 V','45 Nm','1650 rpm','26400 rpm']}),...Array.from({length:20},(_,i)=>product(String(600000+i),'OTHER '+i,{title:'Accessory',searchTitles:[],quantities:[]}))];
 const result=hybridMatches([],catalog,'Compact impact hammer drill 35 mm 13 mm 20 V 45 Nm 1650 rpm 26400 rpm');
 assert.equal(result.results[0].product.ian,'222222');assert(result.results[0].score>result.results[1].score);
});

test('Unreadable, absent or generic promotional text preserves image-only ranking exactly',()=>{
 const ranked=[{ians:['444444'],score:.89},{ians:['111111'],score:.85}];
 for(const text of ['', 'PARKSIDE PERFORMANCE 29,99 € 3 anni garanzia', 'EAN 4055334999999']){
  const result=hybridMatches(ranked,products,text);
  assert.equal(result.hasText,false);assert.deepEqual(result.results,groupMatches(ranked,products));
 }
});

test('Missing product specifications are not treated as contradictory evidence',()=>{
 const catalog=[product('111111','PSBSA 20-Li C3',{quantities:[]}),product('222222','PSBSA 20-Li E4',{quantities:['45 Nm']})];
 const result=hybridMatches([{ians:['111111'],score:.9},{ians:['222222'],score:.8}],catalog,'PSBSA 20-Li C3, 45 Nm');
 assert.equal(result.results[0].product.ian,'111111');
 assert(!result.results[0].evidence.some(e=>e.value==='45 Nm'));
});

test('Codes from multiple articles are flagged; duplicate IANs for one model remain grouped',()=>{
 const ranked=[{ians:['444444'],score:.95}];
 const mixed=hybridMatches(ranked,products,'IAN 111111 · IAN 444444');assert(mixed.ambiguous);
 const catalog=[...products,product('555555','PSBSA 20-Li C3')];
 const same=hybridMatches(ranked,catalog,'PSBSA 20-Li C3 IAN 111111');assert(!same.ambiguous);
 assert.deepEqual(same.results[0].variants.map(p=>p.ian),['111111','555555']);
});

test('An IAN contradicting the read model stays visible alongside the conflicting candidate',()=>{
 const result=hybridMatches([],products,'IAN 111111 PWSA 20-Li G4');
 assert(result.ambiguous);assert.equal(result.results[0].product.ian,'111111');
 assert(result.results.some(r=>r.product.ian==='444444'));
});

test('Text-only fallback finds a documented model and ignores an unlabelled IAN-sized number',()=>{
 assert.equal(hybridMatches([],products,'PWSA 20-Li G4').results[0].product.ian,'444444');
 assert.equal(hybridMatches([],products,'444444').results.length,0);
});
