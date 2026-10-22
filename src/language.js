for(const link of document.querySelectorAll('[data-language-link]')){
 const target=new URL(link.getAttribute('href'),location.href);
 target.search=location.search;target.hash=location.hash;link.href=target.href;
}
