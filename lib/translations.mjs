import fs from 'node:fs';
import crypto from 'node:crypto';
export function translationHash(product){
 return crypto.createHash('sha256').update(JSON.stringify({title:product.title,body:product.body,evidence:product.evidence,specifications:product.specifications||{}})).digest('hex');
}
export function readTranslation(ian,lang){
 if(!/^\d{5,6}$/.test(ian)||!['it','en'].includes(lang))return null;
 const file='content/translations/'+lang+'/'+ian+'.json';
 if(!fs.existsSync(file))return null;
 const data=JSON.parse(fs.readFileSync(file,'utf8'));
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid translation: '+file);
 for(const key of Object.keys(data))if(!['_sourceHash','title','body','evidence','specifications'].includes(key))throw Error('Unknown translation field '+key+': '+file);
 for(const key of ['_sourceHash','title','body','evidence'])if(data[key]!==undefined&&typeof data[key]!=='string')throw Error('Invalid '+key+': '+file);
 if(data.specifications!==undefined&&(!data.specifications||typeof data.specifications!=='object'||Array.isArray(data.specifications)||Object.values(data.specifications).some(v=>typeof v!=='string')))throw Error('Invalid specifications: '+file);
 return data;
}
