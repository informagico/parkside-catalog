import fs from 'node:fs';
const images=JSON.parse(fs.readFileSync('content/images.json','utf8'));
fs.mkdirSync('.cache/product-images',{recursive:true});
let downloaded=0,failed=0;
const queue=Object.entries(images);
await Promise.all(Array.from({length:4},async()=>{
 while(queue.length){
  const [ian,image]=queue.shift();
  try{
   if(!/^\d{5,6}$/.test(ian)||!['www.kompernass.com','www.lidl.de'].includes(new URL(image.url).hostname))throw Error('Unapproved image source');
   const response=await fetch(image.url,{signal:AbortSignal.timeout(15000)});
   if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw Error('Image unavailable');
   const bytes=Buffer.from(await response.arrayBuffer());
   if(bytes.length>8*1024*1024)throw Error('Image too large');
   fs.writeFileSync(`.cache/product-images/${ian}.jpg`,bytes);downloaded++;
  }catch{failed++}
 }
}));
console.log(`Product photos: ${downloaded} cached; ${failed} will use their original URL with icon fallback.`);
