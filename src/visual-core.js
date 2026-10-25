// Shared by the offline catalog indexer and the browser worker.
export const VISUAL_VERSION='dinov2-small-q8-letterbox-v1';
export const VECTOR_SIZE=384;
export const IMAGE_SIZE=224;
export const MODEL_SHA256='3afdc8bc63b50558d6e5770f5b799bb82455c2311183a2de43803f343a29d917';

export function imageTensor(rgba,width,height){
 if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||rgba.length!==width*height*4)throw Error('Invalid image pixels');
 const size=IMAGE_SIZE,area=size*size,out=new Float32Array(area*3);
 const means=[.485,.456,.406],std=[.229,.224,.225];
 const scale=Math.min(size/width,size/height),w=Math.max(1,Math.round(width*scale)),h=Math.max(1,Math.round(height*scale));
 const left=Math.floor((size-w)/2),top=Math.floor((size-h)/2);
 // Letterbox rather than center-crop: keep long saws and drills in view.
 for(let c=0;c<3;c++)out.fill((1-means[c])/std[c],c*area,(c+1)*area);
 const sample=(x,y,c)=>{const i=(y*width+x)*4,a=rgba[i+3]/255;return rgba[i+c]*a+255*(1-a);};
 for(let y=0;y<h;y++){
  const sy=Math.max(0,Math.min(height-1,(y+.5)*height/h-.5)),y0=Math.floor(sy),y1=Math.min(height-1,y0+1),fy=sy-y0;
  for(let x=0;x<w;x++){
   const sx=Math.max(0,Math.min(width-1,(x+.5)*width/w-.5)),x0=Math.floor(sx),x1=Math.min(width-1,x0+1),fx=sx-x0;
   for(let c=0;c<3;c++){
    const a=sample(x0,y0,c)*(1-fx)+sample(x1,y0,c)*fx,b=sample(x0,y1,c)*(1-fx)+sample(x1,y1,c)*fx;
    out[c*area+(y+top)*size+x+left]=((a*(1-fy)+b*fy)/255-means[c])/std[c];
   }
  }
 }
 return out;
}

export function normalizeVector(values){
 if(values.length!==VECTOR_SIZE)throw Error('Invalid embedding size');
 const out=Float32Array.from(values),norm=Math.hypot(...out);
 if(!Number.isFinite(norm)||norm===0)throw Error('Invalid embedding');
 for(let i=0;i<out.length;i++)out[i]/=norm;
 return out;
}
export function quantizeVector(values){return Int8Array.from(normalizeVector(values),value=>Math.max(-127,Math.min(127,Math.round(value*127))));}

export function validateIndex(index,vectors){
 if(index.version!==VISUAL_VERSION||index.dimensions!==VECTOR_SIZE||index.modelSha256!==MODEL_SHA256||!Array.isArray(index.entries)||vectors.length!==index.entries.length*VECTOR_SIZE)throw Error('Incompatible visual index');
 if(index.entries.some(entry=>!Array.isArray(entry.ians)||!entry.ians.length||entry.ians.some(ian=>!/^\d{5,6}$/.test(ian))))throw Error('Invalid visual index entries');
}

export function rankImages(query,vectors,entries,limit=60){
 const normalized=normalizeVector(query),ranked=[];
 for(let row=0;row<entries.length;row++){
  let dot=0,norm=0;const offset=row*VECTOR_SIZE;
  for(let i=0;i<VECTOR_SIZE;i++){const value=vectors[offset+i];dot+=normalized[i]*value;norm+=value*value;}
  if(norm)ranked.push({ians:entries[row].ians,score:Math.max(-1,Math.min(1,dot/Math.sqrt(norm)))});
 }
 return ranked.sort((a,b)=>b.score-a.score||a.ians[0].localeCompare(b.ians[0])).slice(0,limit);
}

// A similarity is not a probability or proof of IAN, manufacturer or compatibility.
export function groupMatches(ranked,products,limit=6){
 const byIan=new Map(products.map(product=>[product.ian,product])),groups=new Map();
 for(const match of ranked)for(const ian of match.ians){
  const product=byIan.get(ian);if(!product)continue;
  const key=product.group||product.ian;
  if(!groups.has(key))groups.set(key,{product,score:match.score,variants:products.filter(p=>(p.group||p.ian)===key)});
 }
 return [...groups.values()].sort((a,b)=>b.score-a.score||a.product.ian.localeCompare(b.product.ian)).slice(0,limit);
}
