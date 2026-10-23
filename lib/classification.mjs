// Audit only: never silently reassign a contributor's product.
export function classificationIssue(product){
 const title=product.title.toLowerCase();
 const rules=[
  [/^(?:set of )?(?:diamond )?cutting disc(?:s| set| assortment)?(?:,.*)?$/, 'Sawing & Cutting'],
  [/^(?:circular saw blade|jigsaw blades?|reciprocating saw blades?|router bit set|saw blade set)(?:\b.*)$/, 'Sawing & Cutting'],
  [/^(?:sandpaper(?: set)?|mesh sanding discs|set of sanding meshes|set of sandpaper sheets)$/, 'Sanding & Grinding'],
  [/^(?:\d+-piece )?drill bit set(?:\b.*)$/, 'Drilling & Fastening'],
  [/leaf (?:vacuum|blower)/, 'Gardening'],
  [/^(?:\d+ socket cable reel|cable reel extension|extension cord with socket block|power strip with carabiners)/, 'Workshop Equipment'],
  [/^(?:automatic welding helmet|welding wire)$/, 'Welding & Soldering']
 ];
 for(const [pattern,expected] of rules){
  if(pattern.test(title)&&product.category!==expected)return {ian:product.ian,title:product.title,category:product.category,expected};
 }
 return null;
}
