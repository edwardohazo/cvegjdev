export function SearchForm() {
  let d = document;
  let $form = d.createElement('form');
  $form.classList = 'search-form';
  let $input = d.createElement('input');
  $input.name = 'search';
  $input.type = 'search';
  $input.autocomplete = 'off';
  $form.appendChild($input);

  if (location.hash.includes('#/search')) {
    $input.value = localStorage.getItem('wpSearch');
  }

  d.addEventListener('search', (e) => {
    if (!e.target.matches("input[type='search']")) return false;
    if (!e.target.value) localStorage.removeItem('wpSearch');
  });

  d.addEventListener('submit', (e) => {
    if (!e.target.matches('.search-form')) return false;
    e.preventDefault();
    localStorage.setItem('wpSearch', e.target.search.value);
    location.hash = `#/search?search=${e.target.search.value}`;
  });
  return $form;
}
