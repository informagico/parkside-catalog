import crypto from 'node:crypto';

export const manualsPage='https://parkside-diy.com/it/assistenza/manuals';
export const missingFields=['manual','manufacturer','model','specifications'];
const apiOrigin='https://live.api.schwarz';
const apiPath='/sit/parkside-cms/content/v1/api/manuals';
export const validIan=ian=>typeof ian==='string'&&/^\d{5,6}$/.test(ian);
export function missingInformation(product){
 return missingFields.filter(key=>key==='specifications'?Object.keys(product.specifications||{}).length===0:!product[key]);
}
export function selectManualSearchProducts(products,{ians=[],missing=missingFields,limit=25}={}){
 if(ians.some(ian=>!validIan(ian)))throw Error('IANs must be strings of 5 or 6 digits');
 if(missing.some(key=>!missingFields.includes(key)))throw Error('Unknown missing field');
 for(const ian of ians)if(!products.some(p=>p.ian===ian))throw Error('IAN not in catalog: '+ian);
 return products.filter(p=>ians.length?ians.includes(p.ian):missingInformation(p).some(key=>missing.includes(key)))
  .sort((a,b)=>Number(b.ian)-Number(a.ian)||b.ian.localeCompare(a.ian)).slice(0,limit);
}
export const searchPage=ian=>{if(!validIan(ian))throw Error('Invalid IAN');return manualsPage+'?productIan='+ian;};
const decodeAttribute=value=>value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi,entity=>{
 const names={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'};
 return names[entity.toLowerCase()]??String.fromCodePoint(parseInt(entity.slice(2,-1).replace(/^x/i,''),/^&#x/i.test(entity)?16:10));
});
function pageConfiguration(html){
 const tag=html.match(/<div\b[^>]*\bclass=["'][^"']*\bpsd-o-manual-search\b[^"']*["'][^>]*>/i)?.[0];
 if(!tag)throw Error('Parkside search configuration unavailable');
 const attrs=Object.fromEntries([...tag.matchAll(/\b(data-[\w-]+)\s*=\s*(["'])(.*?)\2/g)].map(m=>[m[1],decodeAttribute(m[3])]));
 if(attrs['data-url-service-manuals']!==apiOrigin+apiPath+'/single'||attrs['data-url-service-products']!==apiOrigin+apiPath+'/list/IT'||attrs['data-x-locale']!=='it_IT')throw Error('Parkside search configuration changed');
 if(!attrs['data-auth'])throw Error('Parkside search configuration unavailable');
 // Supplied by the public page for this session only. Never serialize or log it.
 return {Authorization:attrs['data-auth'],'X-Locale':'it_IT',Accept:'application/json'};
}
async function readLimited(response,maxBytes){
 if(Number(response.headers.get('content-length'))>maxBytes){await response.body?.cancel();throw Error('Response exceeds size limit');}
 const chunks=[];let size=0;
 for await(const chunk of response.body){size+=chunk.length;if(size>maxBytes){throw Error('Response exceeds size limit');}chunks.push(chunk);}
 return Buffer.concat(chunks);
}
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export function createManualClient({fetchImpl=fetch,sleep=delay,intervalMs=1000,timeoutMs=20000,retries=2}={}){
 let session=null,requested=false;
 async function request(url,headers={},binary=false){
  for(let attempt=0;;attempt++){
   if(requested)await sleep(intervalMs);requested=true;
   let response;
   try{response=await fetchImpl(url,{headers,redirect:'error',signal:AbortSignal.timeout(timeoutMs)});}
   catch{if(attempt<retries){await sleep(1000*2**attempt);continue;}throw Error('Network request failed or timed out');}
   if(response.ok){
    try{return await readLimited(response,binary?32*1024*1024:2*1024*1024);}
    catch(error){
     if(error.message==='Response exceeds size limit')throw error;
     if(attempt<retries){await sleep(1000*2**attempt);continue;}
     throw Error('Network response failed or timed out');
    }
   }
   const status=response.status;
   await response.body?.cancel();
   if((status===408||status===429||status>=500)&&attempt<retries){
    const retryAfter=response.headers.get('retry-after');
    const seconds=Number(retryAfter);
    const wait=retryAfter?(Number.isFinite(seconds)?seconds*1000:Date.parse(retryAfter)-Date.now()):1000*2**attempt;
    if(wait>60000)throw Error('HTTP '+status+'; retry later');
    await sleep(Math.max(1000,Number.isFinite(wait)?wait:1000));continue;
   }
   throw Error('HTTP '+status);
  }
 }
 async function json(path){
  for(let refresh=0;;refresh++){
   session??=pageConfiguration((await request(manualsPage)).toString('utf8'));
   let bytes;
   try{bytes=await request(apiOrigin+apiPath+path,session);}
   catch(error){if(error.message==='HTTP 401'&&refresh===0){session=null;continue;}throw error;}
   let data;try{data=JSON.parse(bytes);}catch{throw Error('Invalid Parkside JSON response');}
   if(!data||!Number.isSafeInteger(data.total)||data.total<0||!Array.isArray(data.manuals)||data.total<data.manuals.length||data.manuals.some(row=>!row||!validIan(String(row.ian))))throw Error('Unexpected Parkside response format');
   return data;
  }
 }
 return {
  async lookup(ian){
   if(!validIan(ian))throw Error('Invalid IAN');
   let exact=false,scanned=0;
   for(let page=1;page<=50;page++){
    const data=await json('/list/IT/'+ian+'/'+page);
    if(data.hasNextPage!==undefined&&typeof data.hasNextPage!=='boolean')throw Error('Unexpected Parkside pagination format');
    if(data.total>data.manuals.length&&data.hasNextPage===undefined)throw Error('Incomplete Parkside product results');
    scanned+=data.manuals.length;
    exact||=data.manuals.some(row=>String(row.ian)===ian);
    if(!exact&&!data.hasNextPage&&scanned<data.total)throw Error('Incomplete Parkside product results');
    if(exact||!data.hasNextPage)break;
    if(page===50)throw Error('Parkside search pagination limit reached');
   }
   if(!exact)return {status:'not-found',manuals:[]};
   const data=await json('/single/'+ian),manuals=[];let rejected=0;
   for(const row of data.manuals){
    if(String(row.ian)!==ian||!isOfficialPdf(row.pdf)){rejected++;continue;}
    if(!manuals.some(m=>m.url===row.pdf))manuals.push({url:row.pdf,name:typeof row.name==='string'?row.name.slice(0,500):'',language:typeof row.language==='string'?row.language.slice(0,20):'',version:typeof row.version==='string'?row.version.slice(0,100):''});
   }
   if(data.total!==data.manuals.length)throw Error('Incomplete Parkside manual results');
   return {status:rejected?'needs-review':manuals.length?'found':'not-found',manuals,rejected};
  },
  async download(url){
   if(!isOfficialPdf(url))throw Error('Unsupported manual URL');
   const bytes=await request(url,{},true);
   if(!isPdf(bytes))throw Error('Downloaded response is not a PDF');
   return bytes;
  }
 };
}
export function isOfficialPdf(value){
 try{
  const url=new URL(value);
  const officialPath=/^\/public\/articlemanual\/(?:\d+\/)?[\w-]+\.pdf$/i.test(url.pathname)||/^\/bsionlyarticlemanuals\/bsiarticlemanual\/\d+\/[\w-]+\.pdf$/i.test(url.pathname);
  return url.protocol==='https:'&&!url.username&&!url.password&&!url.port&&url.hostname==='media.sit-connect.com'&&officialPath&&!url.search&&!url.hash;
 }
 catch{return false;}
}
export const isPdf=bytes=>bytes.subarray(0,5).toString()==='%PDF-';
export const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
export function reusableManualResult(result,ian,now=Date.now()){
 return result?.schemaVersion===1&&result.ian===ian&&['found','not-found'].includes(result.status)&&Array.isArray(result.manuals)&&(result.status==='found'?result.manuals.length>0:result.manuals.length===0)&&result.manuals.every(m=>m&&isOfficialPdf(m.url))&&Number.isFinite(Date.parse(result.searchedAt))&&now-Date.parse(result.searchedAt)>=0&&now-Date.parse(result.searchedAt)<7*24*60*60*1000;
}
