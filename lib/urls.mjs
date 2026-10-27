import path from 'node:path';

export function relativeUrl(target, outputPath) {
  const [, pathname, suffix] = String(target).match(/^([^?#]*)(.*)$/);
  const relative = path.relative(path.dirname(outputPath), path.join('dist', pathname)).replaceAll('\\', '/') || 'index.html';
  return (relative.replace(/(^|\/)index\.html$/, '$1') || './') + suffix;
}
