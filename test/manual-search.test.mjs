import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createManualClient,digest,isOfficialPdf,manualsPage,missingInformation,reusableManualResult,selectManualSearchProducts} from '../lib/manual-search.mjs';

const api='https://live.api.schwarz/sit/parkside-cms/content/v1/api/manuals';
const pdf='https://media.sit-connect.com/public/articlemanual/example.pdf';
const row=(ian='544754',url=pdf)=>({ian,name:'Example tool',language:'IT',version:'1',pdf:url});
const page=auth=>`<div class="psd-o-manual-search" data-url-service-manuals="${api}/single" data-auth="${auth}" data-url-service-products="${api}/list/IT" data-x-locale="it_IT">`;
const json=data=>new Response(JSON.stringify(data),{headers:{'content-type':'application/json'}});
function fixture(handler){
 const calls=[],waits=[];
 const client=createManualClient({intervalMs:0,sleep:async ms=>{waits.push(ms);},fetchImpl:async(url,options)=>{
  calls.push({url,headers:{...options.headers}});
  if(url===manualsPage)return new Response(page('test-session'));
  return handler(url,options,calls);
 }});
 return {client,calls,waits};
}
test('Manual queue preserves IAN strings, handles five-digit IANs and selects explicit complete records',()=>{
 const complete={ian:'544754',model:'Model A',manufacturer:'Example',manual:pdf,specifications:{Weight:'1 kg'}};
 const products=[complete,{ian:'97734',model:null,manufacturer:null,specifications:{}},{ian:'055950',manufacturer:null,specifications:{}}];
 assert.deepEqual(selectManualSearchProducts(products).map(p=>p.ian),['97734','055950']);
 assert.deepEqual(selectManualSearchProducts(products,{ians:['544754']}).map(p=>p.ian),['544754']);
 assert.deepEqual(selectManualSearchProducts([...products,{ian:'559502',specifications:{}}],{limit:1}).map(p=>p.ian),['559502']);
 assert.deepEqual(missingInformation(complete),[]);
 assert.throws(()=>selectManualSearchProducts(products,{ians:[544754]}),/strings/);
 assert.throws(()=>selectManualSearchProducts(products,{ians:['999999']}),/not in catalog/);
});
test('A substring search hit never supplies a manual for a different IAN',async()=>{
 const {client,calls}=fixture(()=>json({total:1,hasNextPage:false,manuals:[row('154475')]}));
 assert.deepEqual(await client.lookup('54475'),{status:'not-found',manuals:[]});
 assert.equal(calls.some(c=>c.url.includes('/single/')),false);
});
test('Exact matching follows product pages and retains distinct PDF versions only for that IAN',async()=>{
 const {client}=fixture(url=>{
  if(url.endsWith('/1'))return json({total:2,hasNextPage:true,manuals:[row('154475')]});
  if(url.endsWith('/2'))return json({total:2,hasNextPage:false,manuals:[row('54475')]});
  return json({total:4,manuals:[row('54475'),row('54475'),row('54475',pdf.replace('example','second')),row('999999')]});
 });
 const result=await client.lookup('54475');
 assert.equal(result.status,'needs-review');assert.equal(result.rejected,1);assert.equal(result.manuals.length,2);
});
test('A normal empty search is distinct from HTTP, schema and incomplete-result failures',async()=>{
 assert.equal((await fixture(()=>json({total:0,hasNextPage:false,manuals:[]})).client.lookup('544754')).status,'not-found');
 for(const data of [{total:0},{total:1,manuals:[]},{total:1,manuals:[{pdf}]},{total:2,hasNextPage:false,manuals:[row('999999')]}]){
  await assert.rejects(fixture(()=>json(data)).client.lookup('544754'),/format|Incomplete/);
 }
 await assert.rejects(fixture(()=>new Response('upstream response is deliberately not exposed',{status:403})).client.lookup('544754'),/^Error: HTTP 403$/);
});
test('Rate limiting retries without turning a temporary failure into not-found',async()=>{
 let attempts=0;
 const {client,waits}=fixture(()=>++attempts===1?new Response('',{status:429,headers:{'retry-after':'2'}}):json({total:0,manuals:[]}));
 assert.equal((await client.lookup('544754')).status,'not-found');assert(waits.includes(2000));
 const failure=fixture(()=>new Response('',{status:503}));
 await assert.rejects(failure.client.lookup('544754'),/HTTP 503/);
 assert.equal(failure.calls.filter(c=>c.url!==manualsPage).length,3);
 const network=fixture(()=>{throw Error('Transport detail must not escape');});
 await assert.rejects(network.client.lookup('544754'),/^Error: Network request failed or timed out$/);
});
test('Session configuration refreshes once after 401 and never accompanies PDF requests or results',async()=>{
 let apiCalls=0;
 const {client,calls}=fixture(url=>{
  if(url===pdf)return new Response('%PDF-1.7\nexample');
  if(++apiCalls===1)return new Response('',{status:401});
  return json({total:1,manuals:[row()]});
 });
 const result=await client.lookup('544754');await client.download(pdf);
 assert.equal(calls.filter(c=>c.url===manualsPage).length,2);
 assert.equal(calls.find(c=>c.url===pdf).headers.Authorization,undefined);
 assert.equal(JSON.stringify(result).includes('test-session'),false);
 assert(calls.filter(c=>c.url.startsWith(api)).every(c=>c.headers.Authorization==='test-session'));
});
test('Candidate URLs reject credentials, foreign hosts and non-PDF responses',async()=>{
 for(const url of ['http://media.sit-connect.com/public/articlemanual/example.pdf','https://user:pass@media.sit-connect.com/public/articlemanual/example.pdf','https://127.0.0.1/example.pdf',pdf+'?token=example',pdf.replace('.pdf','.zip')])assert.equal(isOfficialPdf(url),false);
 const {client}=fixture(()=>new Response('<html>temporary error</html>'));
 await assert.rejects(client.download(pdf),/not a PDF/);
 const large=fixture(()=>new Response('%PDF-1.7',{headers:{'content-length':String(33*1024*1024)}}));
 await assert.rejects(large.client.download(pdf),/size limit/);
});
test('Response stream failures retry and changed configuration never sends session headers to another host',async()=>{
 let attempts=0;
 const retry=fixture(()=>++attempts===1?new Response(new ReadableStream({start(c){c.error(Error('Internal transport detail'));}})):json({total:0,manuals:[]}));
 assert.equal((await retry.client.lookup('544754')).status,'not-found');assert.equal(attempts,2);
 const calls=[];
 const changed=createManualClient({intervalMs:0,fetchImpl:async url=>{calls.push(url);return new Response(page('test-session').replace(api+'/single','https://example.invalid/single'));}});
 await assert.rejects(changed.lookup('544754'),/configuration changed/);
 assert.deepEqual(calls,[manualsPage]);
});
test('Cached searches expire, remain bound to one IAN and retry errors on the next run',()=>{
 const now=Date.now(),r={schemaVersion:1,ian:'544754',status:'found',manuals:[{url:pdf}],searchedAt:new Date(now-1000).toISOString()};
 assert.equal(reusableManualResult(r,'544754',now),true);
 for(const changed of [{ian:'999999'},{status:'error'},{status:'needs-review'},{manuals:[]},{manuals:[null]},{searchedAt:new Date(now-8*86400000).toISOString()}])assert.equal(reusableManualResult({...r,...changed},'544754',now),false);
 assert.equal(digest(Buffer.from('example')),digest('example'));
});
