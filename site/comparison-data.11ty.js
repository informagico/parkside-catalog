export default class {
 data(){return {pagination:{data:'languages',size:1,alias:'lang'},permalink:data=>`${data.lang}/data/comparison.json`,eleventyExcludeFromCollections:true};}
 render(data){return JSON.stringify(data.catalog.comparison[data.lang]);}
}
