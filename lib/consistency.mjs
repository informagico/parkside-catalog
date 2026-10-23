// High-confidence contradictions only; undocumented fields are handled by the completeness audit.
function scalar(value,unit){
 if(typeof value!=='string')return null;
 const match=value.match(new RegExp('^\\s*(\\d+(?:[.,]\\d+)?)\\s*'+unit+'\\s*$','i'));
 return match?Number(match[1].replace(',','.')):null;
}
export function consistencyIssues(p){
 const issues=[],s=p.specifications||{},add=reason=>issues.push({ian:p.ian,reason});
 if(s['Full IAN']&&!s['Full IAN'].startsWith(p.ian+'_')&&s['Full IAN']!==p.ian)add('Full IAN does not match the record IAN');
 for(const key of ['Input power','Disc diameter','Blade diameter','Battery capacity']){
  const value=scalar(s[key],'(?:k?W|mm|m?Ah)');if(value!==null&&value<=0)add(key+' must be greater than zero');
 }
 const diameter=scalar(s['Disc diameter'],'mm'),bore=scalar(s['Disc bore'],'mm');
 if(diameter!==null&&bore!==null&&bore>=diameter)add('Disc bore must be smaller than disc diameter');
 if(p.power==='Manual'&&/\bcordless\b/i.test(p.title))add('A cordless product cannot have manual power');
 if(p.power==='Mains'&&/\bpetrol\b/i.test(p.title))add('A petrol product cannot have mains power');
 if(/impact wrench/i.test(p.title)&&/hex (?:socket|drive)/i.test(s['Tool holder']||'')&&!/square|vierkant/i.test(s['Tool holder']||''))add('Impact wrench title conflicts with a screwdriver bit holder');
 if(/half.inch/i.test(p.title)&&/^3\/8 inch square drive$/.test(s['Tool holder']||''))add('Half-inch title conflicts with a 3/8-inch drive');
 return issues;
}
