import {t} from '../lib/i18n.mjs';

export default class {
 data(){return {
  pagination:{data:'catalog.redirectEntries',size:1,alias:'redirect'},
  permalink:data=>`${data.redirect.lang}/products/${data.redirect.from}/index.html`,
  eleventyExcludeFromCollections:true
 }}
 render({redirect:{lang,to}}){
  const target=`../${to}/index.html`;
  const label=t(lang,'openProduct');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${label}</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0;url=${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${target}">${label}</a></body></html>`;
 }
}
