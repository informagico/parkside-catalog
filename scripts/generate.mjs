import fs from 'node:fs';
import path from 'node:path';
import {esc,parse,validate,art} from './model.mjs';
import {languages,t,translate,localize,uiDictionary} from './i18n.mjs';
const write=(file,content)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,content)};
const external=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
const bodyHtml=body=>body.split(/\n\s*\n/).map(p=>p.startsWith('## ')?`<h2>${esc(p.slice(3))}</h2>`:`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');
function readProducts(){
 const products=fs.readdirSync('content/products').filter(f=>f.endsWith('.md')).map(file=>({...validate(parse(fs.readFileSync(`content/products/${file}`,'utf8'))),slug:file.slice(0,-3),file}));
 const ids=new Set();for(const p of products){const key=p.model+'|'+p.ian;if(ids.has(key))throw Error('Duplicate record: '+key);ids.add(key)}
 return products.sort((a,b)=>a.ian==='544816'?-1:b.ian==='544816'?1:a.model.localeCompare(b.model));
}
function renderer(lang,route,cfg){
 const tr=(key,values)=>t(lang,key,values);
 const href=target=>esc(path.posix.relative(path.posix.dirname(route),target)||'index.html');
 const home=`${lang}/index.html`, method=`${lang}/method/index.html`;
 const productPath=p=>`${lang}/products/${p.slug}/index.html`;
 const badge=p=>`<span class="badge ${p.manufacturer?'confirmed':''}"><i></i>${tr(p.manufacturer?'manufacturerVerified':'manufacturerUnknown')}</span>`;
 const paragraph=(key,values)=>`<p>${esc(tr(key,values))}</p>`;
 function shell(title,body,catalog=false){
  const links=languages.map(code=>`<a class="language-link ${code===lang?'active':''}" data-language-link="${code}" href="${href(route.replace(new RegExp(`^${lang}/`),code+'/'))}" lang="${code}" hreflang="${code}" ${code===lang?'aria-current="page"':''}>${code.toUpperCase()}</a>`).join('');
  const alternates=languages.map(code=>`<link rel="alternate" hreflang="${code}" href="${href(route.replace(new RegExp(`^${lang}/`),code+'/'))}">`).join('');
  const messages=Object.fromEntries(['resultOne','resultMany','shown','listView','gridView'].map(key=>[key,uiDictionary(lang)[key]]));
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(tr('description'))}"><title>${esc(title)} · Officina Index</title>${alternates}<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='9' fill='%231b4037'/%3E%3Cpath d='M10 12h20v5H15v6h15v5H10z' fill='%23c5ee80'/%3E%3C/svg%3E"><link rel="stylesheet" href="${href('assets/style.css')}"></head><body><a class="skip" href="#main">${tr('skip')}</a><header><a class="brand" href="${href(home)}"><span class="brandmark">OI<span>↗</span></span><span>OFFICINA<span class="brand-sub">INDEX / ${tr('archive')}</span></span></a><nav aria-label="${tr('navigation')}"><a href="${href(home)}#catalogue" ${catalog?'aria-current="page"':''}>${tr('catalog')}</a><a class="method-nav" href="${href(method)}">${tr('method')}</a><div class="language-switch" aria-label="${tr('language')}">${links}</div><a class="repo-link" href="${esc(cfg.repository)}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a></nav></header><main id="main">${body}</main><footer><a class="footer-brand" href="${href(home)}">OFFICINA INDEX <span>↗</span></a>${paragraph('footer')}<small>${tr('trademark')}<br>${tr('illustrations')} ${tr('lastCollection')}</small><a href="${href(method)}">${tr('sourcesCriteria')} ↗</a></footer><script src="${href('assets/language.js')}" defer></script>${catalog?`<script id="client-i18n" type="application/json">${JSON.stringify(messages).replace(/</g,'\\u003c')}</script><script src="${href('assets/app.js')}" defer></script>`:''}</body></html>`;
 }
 function card(p,index){
  return `<article class="card" data-model="${esc(p.model)}" data-search="${esc([p.model,p.ian,...p.searchTitles,p.company].join(' ').toLocaleLowerCase(lang))}" data-category="${esc(p.categoryKey)}" data-company="${esc(p.company)}" data-power="${esc(p.powerKey)}" data-confirmed="${Boolean(p.manufacturer)}"><a class="card-link" href="${href(productPath(p))}"><div class="card-art"><span class="micro">${esc(p.category)}</span>${art(p.categoryKey)}<span class="art-index">${String(index+1).padStart(3,'0')} / OI</span><span class="open-arrow">↗</span></div><div class="card-info"><div class="card-meta"><span>IAN ${p.ian}</span><span>${esc(p.power)}</span></div><h3>${esc(p.model)}</h3><p class="product-name">${esc(p.title)}</p><div class="company"><span>${esc(p.company)}</span><small>${esc(p.role)}</small></div>${badge(p)}</div></a></article>`;
 }
 function catalog(products){
  const total=products.length, models=new Set(products.map(p=>p.model)).size, confirmed=products.filter(p=>p.manufacturer).length;
  const hero=`<section class="hero"><div class="hero-copy"><div class="eyebrow"><i></i> ${tr('eyebrow')}</div><h1>${tr('heroTitle')}<br><em>${tr('heroAccent')}</em></h1>${paragraph('heroText')}<a class="primary" href="#catalogue">${tr('explore')} <span>↓</span></a><div class="hero-numbers">${[[total,'records'],[models,'models'],[String(confirmed).padStart(2,'0'),'documented']].map(([n,key])=>`<div><b>${n}</b><span>${tr(key)}</span></div>`).join('')}</div></div><a class="featured" href="${href(productPath(products.find(p=>p.ian==='544816')))}"><div class="feature-top"><span>${tr('fromArchive')}</span><span>001 / 2026</span></div><div class="feature-art"><div class="orbit"></div>${art('Aspirazione')}<span class="callout left">40 L<span>${tr('tank')}</span></span><span class="callout right">1500 W<span>${tr('wattage')}</span></span></div><div class="feature-bottom"><div><small>${tr('vacuum')}</small><h2>PWDL 40 A1</h2>${paragraph('featuredCompany')}</div><span class="feature-arrow">↗</span></div></a></section><div class="manifesto"><span>${tr('traceability')}</span>${paragraph('manifesto')}<a href="${href(method)}">${tr('verification')} ↗</a></div>`;
  function select(id,label,all,options){return `<label>${tr(label)}<select id="${id}"><option value="">${tr(all)}</option>${options.map(([value,text])=>`<option value="${esc(value)}">${esc(text)}</option>`).join('')}</select></label>`}
  const opts=key=>[...new Set(products.map(p=>p[key]))].sort().map(value=>[value,translate(value,lang)]);
  const filters=`<aside class="filters" aria-label="${tr('filters')}"><div class="filter-heading">${tr('filters')}<button id="reset" type="button">${tr('reset')}</button></div>${select('category','category','allCategories',opts('categoryKey'))}${select('company','company','allCompanies',[...new Set(products.map(p=>p.company))].sort().map(v=>[v,v]))}${select('power','power','allPower',opts('powerKey'))}<label class="checkbox"><input type="checkbox" id="confirmed">${tr('onlyDocumented')}</label><div class="filter-note"><span>↳ ${tr('oneSource')}</span>${paragraph('filterNote')}<a href="${href(method)}">${tr('readMethod')} ↗</a></div></aside>`;
  const listing=`<section id="catalogue" class="catalog"><div class="section-heading"><div><span class="eyebrow">${tr('openArchive')}</span><h2>${tr('catalogHeading')}</h2></div><a href="${href(`${lang}/data/catalog.json`)}" download>${tr('export')} ↓</a></div><div class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" aria-label="${tr('search')}" placeholder="${tr('search')}"><kbd>/</kbd></div><div class="catalog-layout">${filters}<div class="results"><div class="results-toolbar"><span id="result-count" aria-live="polite">${tr('resultMany',{count:total})}</span><label class="sort-label">${tr('sort')}<select id="sort" aria-label="${tr('sort')}"><option value="featured">${tr('featured')}</option><option value="model">${tr('modelSort')}</option><option value="company">${tr('companySort')}</option></select></label><button class="view-toggle" id="view" aria-label="${tr('listView')}" aria-pressed="false">☷</button></div><div id="cards" class="cards">${products.map(card).join('')}</div><div id="empty" class="empty" hidden><h3>${tr('emptyTitle')}</h3>${paragraph('emptyText')}<button id="empty-reset">${tr('resetFilters')}</button></div><div class="more-wrap"><button id="more" class="secondary" hidden>${tr('more')} ↓</button><p id="shown"></p></div></div></div></section>`;
  return shell(tr('catalog'),hero+listing,true);
 }
 function product(p,products){
  const rows=entries=>`<dl>${entries.map(([key,value])=>`<dt>${esc(key)}</dt><dd>${esc(value)}</dd>`).join('')}</dl>`;
  const specs=Object.entries(p.specifications||{}),variants=products.filter(q=>q.model===p.model&&q.slug!==p.slug);
  const source=cfg.repository+'/blob/'+cfg.branch+'/content/products/'+p.file;
  const visual=`<div class="detail-top"><div class="detail-visual">${art(p.categoryKey)}<span>${tr('categoryArt')}</span></div><div><span class="eyebrow">${esc(p.category)} / IAN ${p.ian}</span><h1>${esc(p.model)}</h1><p class="detail-title">${esc(p.title)}</p>${badge(p)}<div class="detail-tags"><span>${esc(p.power)}</span><span>${esc(p.market||tr('unknownMarket'))}</span></div></div></div>`;
  const identity=`<section class="panel"><span class="eyebrow">${tr('identity')}</span><h2>${tr('behind')}</h2>${rows([[tr('company'),p.company],[tr('role'),p.role],[tr('manufacturer'),p.manufacturer||tr('unknown')],[tr('oem'),p.oem||tr('unidentified')]])}<div class="evidence"><strong>${tr('evidence')}</strong><p>${esc(p.evidence)}</p></div></section>`;
  const technical=`<section class="panel"><span class="eyebrow">${tr('technical')}</span><h2>${tr('details')}</h2>${specs.length?rows(specs):`<p class="muted">${tr('missingSpecs')}</p>`}${bodyHtml(p.body)}</section>`;
  const sources=`<section class="panel sources"><span class="eyebrow">${tr('documentation')}</span><h2>${tr('followSources')}</h2>${external(p.source,tr((p.manufacturer||/\.pdf(?:[?#]|$)/.test(p.source))?'manual':'officialCatalog'))}${p.technical_source?external(p.technical_source,tr('technicalSource')):''}<a href="${href('data/markdown/'+p.file)}" download>${tr('downloadMarkdown')} ↓</a>${external(source,tr('openGithub'))}<small>${tr('lastChecked')}: ${p.checked}<br>${tr('privateRepo')}</small></section>`;
  const related=variants.length?`<section class="panel"><h2>${tr('variants')}</h2>${variants.map(q=>`<a class="variant" href="${href(productPath(q))}">IAN ${q.ian} →</a>`).join('')}</section>`:'';
  return shell(p.model,`<div class="detail"><a class="back" href="${href(home)}#catalogue">← ${tr('back')}</a>${visual}<div class="detail-columns"><div>${identity}${technical}</div><aside>${sources}${related}</aside></div></div>`);
 }
 function methodPage(products){
  const stats={count:products.length,verified:products.filter(p=>p.manufacturer).length};
  const definitions=[['manufacturer','manufacturerDefinition'],['importer','importerDefinition'],['spares','sparesDefinition'],['oem','oemDefinition']].map(([key,value])=>`<dt>${tr(key)}</dt><dd>${tr(value)}</dd>`).join('');
  const sections=[['ianTitle','ianText'],['missingTitle','missingText'],['contribute','contributeText']].map(([heading,text])=>`<h2>${tr(heading)}</h2>${paragraph(text)}`).join('');
  return shell(tr('method'),`<article class="method detail"><a class="back" href="${href(home)}#catalogue">← ${tr('back')}</a><span class="eyebrow">${tr('methodEyebrow')}</span><h1>${tr('methodTitle')}</h1><p class="lead">${tr('methodLead',stats)}</p><section class="panel"><h2>${tr('rolesTitle')}</h2><dl>${definitions}</dl></section><section class="panel">${sections}<a class="primary" href="${esc(cfg.repository)}">${tr('repository')} ↗</a></section><p class="muted">${tr('translationNote')}</p><p class="muted">${tr('methodLegal')}</p></article>`);
 }
 return {catalog,product,methodPage};
}
export function build(){
 const cfg=JSON.parse(fs.readFileSync('config.json','utf8')),products=readProducts();
 const localized=Object.fromEntries(languages.map(lang=>[lang,products.map(p=>localize(p,lang))]));
 const out=path.resolve('dist');if(path.dirname(out)!==path.resolve('.'))throw Error('Invalid output directory');
 fs.rmSync(out,{recursive:true,force:true});
 for(const file of ['style.css','app.js','language.js'])write(`dist/assets/${file}`,fs.readFileSync('src/'+file));
 fs.appendFileSync('dist/assets/style.css',fs.readFileSync('src/locales.css'));
 for(const lang of languages){
  const records=localized[lang];
  write(`dist/${lang}/index.html`,renderer(lang,`${lang}/index.html`,cfg).catalog(records));
  write(`dist/${lang}/method/index.html`,renderer(lang,`${lang}/method/index.html`,cfg).methodPage(records));
  for(const p of records){const route=`${lang}/products/${p.slug}/index.html`;write('dist/'+route,renderer(lang,route,cfg).product(p,records))}
  write(`dist/${lang}/data/catalog.json`,JSON.stringify(records,null,2));
 }
 for(const p of products)write('dist/data/markdown/'+p.file,fs.readFileSync('content/products/'+p.file));
 write('dist/data/catalog.json',JSON.stringify(products,null,2));write('dist/.nojekyll','');
 write('dist/index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Officina Index · Choose language</title><link rel="stylesheet" href="assets/style.css"></head><body><main class="language-landing"><span class="eyebrow">OFFICINA INDEX</span><h1>Choose your language.<br>Scegli la tua lingua.</h1><a class="primary" href="it/index.html" lang="it">Italiano →</a> <a class="primary" href="en/index.html" lang="en">English →</a></main><script src="assets/language.js" defer></script></body></html>`);
 console.log(`Built ${products.length} records in ${languages.join(', ')} (${new Set(products.map(p=>p.model)).size} models).`);
}
