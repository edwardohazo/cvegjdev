document.addEventListener('DOMContentLoaded', (e) => {
  const includeHTML = (el, url) => {
    console.log("ejecutando");
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        el.outerHTML = xhr.responseText;

        // -----Una vez que es incluida la información se obtienen los elementos del DOM...
        // WORDPRESS REST API:
        const d = document,
          w = window,
          $site = d.getElementById('site'),
          $posts = d.getElementById('posts'),
          $loader = d.querySelector('.loader'),
          $template = d.getElementById('post-template').content,
          $fragment = d.createDocumentFragment(),
          DOMAIN = 'https://css-tricks.com/',
          SITE = `${DOMAIN}/wp-json`,
          API = `${SITE}/wp/v2`,
          POSTS = `${API}/posts?_embed`,
          MEDIA = `${API}/media`,
          USERS = `${API}/users`,
          CATEGORIES = `${API}/categories`;

        let page = 1;
        let perPage = 1;

        function getSiteData() {
          fetch(SITE)
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            // Lanzando un error:
            // .then((res) => Promise.reject(res))
            .then((json) => {
              console.log(json);
              $site.innerHTML = `
              <h3>Infinite Scroll | Eduardo Jasso</h3>
              <h2>
                <a href="${json.url}" target="_blank">${json.name}</a>
              </h2>
              <p>${json.description}</p>
              <p>${json.timezone_string}</p>
              `;
            })
            .catch((err) => {
              console.log(err);
              let message = err.textStatus || 'Ocurrió un error';
              $site.innerHTML = `<p>Error: ${err.status} ${message}</p>`;
            });
        }
        function getSitePosts(pagination) {
          $loader.style.display = 'block';
          fetch(`${POSTS}${pagination}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
              console.log(json);
              json.forEach((el) => {
                let categories = '',
                  tags = '';
                el._embedded['wp:term'][0].forEach((el) => {
                  categories += `<li>${el.name}</li>`;
                });
                el._embedded['wp:term'][1].forEach((el) => {
                  tags += `<li>${el.name}</li>`;
                });

                $template.querySelector('.post-image').alt = el.title.rendered;
                $template.querySelector('.post-image').src = el._embedded[
                  'wp:featuredmedia'
                ]
                  ? el._embedded['wp:featuredmedia'][0].source_url
                  : '';
                $template.querySelector('.post-title').innerHTML =
                  el.title.rendered;
                $template.querySelector(
                  '.post-author'
                ).innerHTML = `<img src="${el._embedded.author[0].avatar_urls['48']}" alt="${el._embedded.author[0]}">
                  <figcaption></figcaption>`;
                $template.querySelector('.post-date').innerHTML = new Date(
                  el.date
                ).toLocaleDateString();
                $template.querySelector('.post-link').href = el.link;
                $template.querySelector('.post-excerpt').innerHTML =
                  el.excerpt.rendered;
                $template.querySelector('.post-categories').innerHTML = `
                <p>Categories:</p>
                <ul>
                  ${categories}
                </ul>
                `;
                $template.querySelector('.post-tags').innerHTML = `
                <p>Etiquetas:</p>
                <ul>
                  ${tags}
                </ul>
                `;
                $template.querySelector('.post-content > article').innerHTML =
                  el.content.rendered;

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
              });

              $posts.appendChild($fragment);
              $loader.style.display = 'none';
            })
            .catch((err) => {
              console.log(err);
              let message = err.textStatus || 'Ocurrió un error';
              console.log($site);
              $site.innerHTML = `<p>Error: ${err.status} ${message}</p>`;
              $loader.style.display = 'none';
            });
        }

        getSiteData();
        getSitePosts('&per_page=1&page=1');
        w.addEventListener('scroll', (e) => {
          const { scrollTop, clientHeight, scrollHeight } = d.documentElement;
          console.log('suma', scrollTop + clientHeight, 'total:', scrollHeight);
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            console.log('Cargar más posts...');

            fetch(POSTS)
              .then((res) => (res.ok ? res.json() : Promise.reject(res)))
              .then((json) => {
                page = ++page;
                // if (page <= json.length) {
                  console.log(json.length);
                  console.log(page);
                  getSitePosts(`&per_page=${perPage}&page=${page}`);
                // }
              });
          }
        });
      } else {
        let message =
          xhr.statusText ||
          'Error al cargar el archivo, verifica que estés haciendo la petición por http o https';
          console.error(message);
      }
    });

    xhr.open('GET', url);

    xhr.setRequestHeader('Content', 'text/html; charset=utf-8;');

    xhr.send();
  };
  document.querySelectorAll('[data-include]').forEach((el) => {
    includeHTML(el, el.getAttribute('data-include'));
  });
});
