for(const image of document.querySelectorAll('[data-product-photo]')){
 const fallback=()=>image.closest('.product-media').classList.remove('has-photo');
 image.addEventListener('error',fallback,{once:true});
 if(image.complete&&image.naturalWidth===0)fallback();
}
