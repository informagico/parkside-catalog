export default class {
 data(){return {pagination:{data:'languages',size:1,alias:'lang'},permalink:data=>`${data.lang}/data/catalog.json`,eleventyExcludeFromCollections:true}}
 render(data){return JSON.stringify(data.catalog.localized[data.lang],null,2)}
}
