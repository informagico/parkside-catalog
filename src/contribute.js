const body = document.querySelector('#contribution-rows');
const rows = [...body.children];
const search = document.querySelector('#contribution-search');
const category = document.querySelector('#contribution-category');
const fields = [...document.querySelectorAll('#contribution-missing input[name="missing"]')];
const count = document.querySelector('#contribution-count');
const more = document.querySelector('#contribution-more');
const all = document.querySelector('#contribution-all');
const params = new URLSearchParams(location.search);
const requestedLimit = Number(params.get('limit'));
let limit = Number.isSafeInteger(requestedLimit) && requestedLimit >= 50
  ? Math.min(requestedLimit, Math.max(50, rows.length)) : 50;
let matchingCount = 0;
const initialFields = new Set(params.getAll('missing'));
search.value = params.get('q') || '';
category.value = params.get('category') || '';
fields.forEach(input => { input.checked = initialFields.has(input.value); });

function matchesMissing(row, selected) {
  if (!selected.length) return true;
  const missing = row.dataset.missing.trim().split(/\s+/).filter(Boolean);
  return missing.length === selected.length && selected.every(field => missing.includes(field));
}

function render() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const selected = fields.filter(input => input.checked).map(input => input.value);
  const matching = rows.filter(row =>
    terms.every(term => row.dataset.search.includes(term)) &&
    (!category.value || row.dataset.category === category.value) &&
    matchesMissing(row, selected)
  );
  matchingCount = matching.length;
  const shown = Math.min(limit, matchingCount);
  body.replaceChildren(...matching.slice(0, limit));
  count.textContent = count.dataset.resultShown.replace('{shown}', shown).replace('{count}', matchingCount);
  const remaining = matchingCount - shown;
  more.hidden = remaining === 0;
  all.hidden = remaining === 0;
  more.textContent = more.dataset.label.replace('{count}', Math.min(50, remaining));
  all.textContent = all.dataset.label.replace('{count}', matchingCount);
  const url = new URL(location.href);
  for (const [key, value] of [['q', search.value], ['category', category.value]]) {
    value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
  }
  url.searchParams.delete('missing');
  selected.forEach(field => url.searchParams.append('missing', field));
  limit > 50 ? url.searchParams.set('limit', limit) : url.searchParams.delete('limit');
  history.replaceState(history.state, '', url);
}

search.addEventListener('input', render);
category.addEventListener('change', render);
fields.forEach(input => input.addEventListener('change', render));
more.addEventListener('click', () => {
  limit = Math.min(limit + 50, Math.max(50, rows.length));
  render();
});
all.addEventListener('click', () => {
  limit = Math.max(limit, matchingCount);
  render();
});
document.querySelector('#contribution-reset').addEventListener('click', () => {
  search.value = '';
  category.value = '';
  fields.forEach(input => { input.checked = false; });
  limit = 50;
  render();
});
render();
