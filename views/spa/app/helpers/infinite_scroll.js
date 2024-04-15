import api from './wp_api.js';
import { ajax } from './ajax.js';
import { PostCard } from '../components/Postcard.js';
import { SearchCard } from '../components/SearchCard.js';

export function InfiniteScroll() {
  const d = document,
    w = window;

    let apiURL,
    Component; //High Order Component

  w.addEventListener('scroll', async (e) => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
      { hash } = w.location;

    if (scrollTop + clientHeight >= scrollHeight - 40) {
      api.page++;
      if (!hash || hash === '#/') {
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes('#/search')) {
        apiURL = `${api.SEARCH}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }
      d.querySelector('.loader').style.display = 'block';
      await ajax({
        url: apiURL,
        cbSuccess: (posts) => {
          let html = '';
          posts.forEach((post) => (html += Component(post)));
          d.getElementById('main').insertAdjacentHTML('beforeend', html);

          //   Otra técnica:
          //   d.getElementById('main').innerHTML += html;
          d.querySelector('.loader').style.display = 'none';
        },
      });
    }
  });
}
