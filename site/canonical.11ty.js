export default class {
 data(){return {permalink:'data/catalog.json',eleventyExcludeFromCollections:true}}
 render(data){return JSON.stringify(data.catalog.products,null,2)}
}
