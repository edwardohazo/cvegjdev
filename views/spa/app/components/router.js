import api from '../helpers/wp_api.js';
import { ajax } from '../helpers/ajax.js';
import { PostCard } from './Postcard.js';
import { Post } from '../components/Post.js';
import { SearchCard } from '../components/SearchCard.js';

export async function Router() {
  const d = document;

  const $main = d.getElementById('main');

  let { hash } = location;

  // POSTS
  if (!hash || hash === '#/') {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        let html = '';
        posts.forEach((post) => {
          html += PostCard(post);
        });
        $main.innerHTML = html;
      },
    });

    // SEARCHES
  } else if (hash.includes('#/search')) {
    let query = localStorage.getItem('wpSearch');

    if (!query) {
      d.querySelector('.loader').style.display = 'none';
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        let html = '';
        if (search.length === 0) {
          html = `<p class="error">No existen resultados de búsqueda para el término <mark>${query}</mark></p>`;
        } else {
          search.forEach((post) => {
            html += SearchCard(post);
          });
        }
        $main.innerHTML = html;
      },
    });

    // POST
  }  else {
    await ajax({
      url: `${api.POST}/${localStorage.getItem('wpPostId')}?_embed`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.matches('.post-card a')) {
      localStorage.setItem('wpPostId', e.target.dataset.id);
    }
  });

  d.querySelector('.loader').style.display = 'none';
}
