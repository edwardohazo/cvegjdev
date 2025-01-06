import { Title } from './title.js';
import { Menu } from './menu.js';
import { SearchForm } from './SearchForm.js';

export function Header() {
  const $header = document.createElement('HEADER');
  $header.classList.add('header');
  $header.appendChild(Title());
  $header.appendChild(Menu());
  $header.appendChild(SearchForm());
  return $header;
}
