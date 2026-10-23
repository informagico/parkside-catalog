import {loadProducts} from '../lib/catalog.mjs';
import {modelIndex} from '../lib/identity.mjs';
const products=loadProducts(),groups=modelIndex(products);
const missing=Object.fromEntries(['model','manufacturer','manual','image'].map(key=>[key,products.filter(p=>!p[key]).length]));
const aliases=[...groups.values()].filter(group=>new Set(group.map(p=>p.model)).size>1).map(group=>({models:[...new Set(group.map(p=>p.model))],ians:group.map(p=>p.ian)}));
console.log(JSON.stringify({products:products.length,distinctModels:groups.size,modelsWithMultipleIANs:[...groups.values()].filter(g=>g.length>1).length,missing,spellingVariants:aliases},null,2));
