import fs from 'node:fs';
import path from 'node:path';
import {loadProducts} from '../lib/catalog.mjs';
import {createManualClient,digest,isPdf,manualsPage,missingFields,missingInformation,reusableManualResult,searchPage,selectManualSearchProducts} from '../lib/manual-search.mjs';

const help=`Search the official Parkside manual service for catalog IANs.
Usage: npm run manuals -- [options]
  --ian IAN[,IAN...]       Search specific catalog IANs, including complete records
  --missing FIELD[,FIELD] Filter missing manual,manufacturer,model,specifications
  --limit N               Maximum records (default 25, highest IANs first)
  --all                   Search every matching catalog record
  --download              Also cache candidate PDFs for inspection
  --refresh               Ignore search results cached in the last 7 days
  --delay-ms N            Delay between requests (default 1000, minimum 500)
  --plan                  List selected IANs without making network requests
  --help                  Show this help

Results: .cache/manual-search/report.json and report.md.
No product records or translations are edited. Documents need review before use.`;
async function main(){
 const args=process.argv.slice(2),options={ians:[],missing:missingFields,limit:25},flags=new Set();let intervalMs=1000;
 for(let i=0;i<args.length;i++){
  const arg=args[i];
  if(arg==='--help'){console.log(help);return;}
  if(['--all','--download','--refresh','--plan'].includes(arg)){flags.add(arg);continue;}
  if(!['--ian','--missing','--limit','--delay-ms'].includes(arg))throw Error('Unknown option: '+arg);
  const value=args[++i];if(!value||value.startsWith('--'))throw Error('Missing value for '+arg);
  if(arg==='--ian')options.ians.push(...value.split(','));
  if(arg==='--missing')options.missing=value.split(',');
  if(arg==='--limit'){if(!/^\d+$/.test(value)||Number(value)<1||Number(value)>10000)throw Error('Limit must be 1–10000');options.limit=Number(value);}
  if(arg==='--delay-ms'){if(!/^\d+$/.test(value)||Number(value)<500||Number(value)>60000)throw Error('Delay must be 500–60000 ms');intervalMs=Number(value);}
 }
 if(flags.has('--all')&&args.includes('--limit'))throw Error('Use either --all or --limit');
 if(flags.has('--all'))options.limit=Infinity;
 const products=selectManualSearchProducts(loadProducts(),options);
 if(flags.has('--plan')){console.log(JSON.stringify(products.map(p=>({ian:p.ian,model:p.model,missing:missingInformation(p)})),null,2));return;}
 const root='.cache/manual-search',client=createManualClient({intervalMs}),results=[];
 fs.mkdirSync(root+'/results',{recursive:true});
 let stopped=false;const stop=()=>{stopped=true;};process.once('SIGINT',stop);
 const markdownCell=value=>String(value??'').replace(/[\r\n]/g,' ').replaceAll('|','\\|').replaceAll('<','&lt;').replaceAll('>','&gt;');
 function report(){
  const summary=Object.fromEntries(['found','not-found','needs-review','error'].map(s=>[s,results.filter(r=>r.status===s).length]));
  const payload={schemaVersion:1,generatedAt:new Date().toISOString(),source:manualsPage,selected:products.length,processed:results.length,stopped,summary,results};
  fs.writeFileSync(root+'/report.json',JSON.stringify(payload,null,2)+'\n');
  const lines=['# Parkside manual search','',`Processed ${results.length} of ${products.length} selected IANs.`,
   '', 'Candidate documents only: inspect the exact IAN/model and document scope before editing the catalog. Manufacturer attribution requires an explicit manufacturer declaration.','',
   '| IAN | Catalog model | Missing information | Result | Candidate PDFs |','| --- | --- | --- | --- | --- |'];
  for(const r of results)lines.push(`| [${r.ian}](${r.searchUrl}) | ${markdownCell(r.model)} | ${r.missing.join(', ')} | ${r.status}${r.error?': '+markdownCell(r.error):''} | ${r.manuals.map((m,i)=>`[PDF ${i+1}](${m.url})${m.file?' (cached)':''}`).join(', ')} |`);
  fs.writeFileSync(root+'/report.md',lines.join('\n')+'\n');
 }
 try{
  report();
  for(const product of products){
   if(stopped)break;
   const ian=product.ian,file=root+'/results/'+ian+'.json';let result;
   try{
    if(!flags.has('--refresh')&&fs.existsSync(file)){
     try{const cached=JSON.parse(fs.readFileSync(file,'utf8'));if(reusableManualResult(cached,ian))result={...cached,cached:true};}catch{}
    }
    result??={schemaVersion:1,ian,searchedAt:new Date().toISOString(),...await client.lookup(ian),cached:false};
    if(flags.has('--download'))for(const manual of result.manuals){
     const pdfFile=root+'/pdfs/'+ian+'/'+digest(manual.url).slice(0,24)+'.pdf';
     let bytes=fs.existsSync(pdfFile)?fs.readFileSync(pdfFile):null;
     if(!bytes||!isPdf(bytes)||!manual.sha256||digest(bytes)!==manual.sha256||flags.has('--refresh')){
      bytes=await client.download(manual.url);fs.mkdirSync(path.dirname(pdfFile),{recursive:true});fs.writeFileSync(pdfFile,bytes);
     }
     manual.file=pdfFile;manual.sha256=digest(bytes);
    }
   }catch(error){result={...result,schemaVersion:1,ian,searchedAt:new Date().toISOString(),status:'error',manuals:result?.manuals||[],error:error.message};}
   const record={...result,model:product.model,title:product.title,missing:missingInformation(product),searchUrl:searchPage(ian)};
   fs.writeFileSync(file,JSON.stringify(record,null,2)+'\n');results.push(record);report();
   console.log(`${ian}: ${record.status}; ${record.manuals.length} candidate PDF(s)${record.cached?' (cached)':''}`);
  }
 }finally{process.removeListener('SIGINT',stop);report();}
 console.log(`Report: ${root}/report.md (${results.length}/${products.length} IANs)`);
 if(results.some(r=>r.status==='error'))process.exitCode=1;
 if(stopped)process.exitCode=130;
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
