export function Menu() {
  let $menu = document.createElement('nav');
  $menu.innerHTML = `
  <ul class="nav">
    <li>
        <a href="#/"  >Home</a>
    </li>
    <li>
        <a href="#/search"  >Searchs</a>
    </li>
  </ul>
  `;
  return $menu;
}
