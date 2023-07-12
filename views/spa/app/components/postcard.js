export function PostCard(props) {
  const { title, id, date, slug, _embedded } = props;

  const dateFormat = new Date(date).toLocaleString(),
    urlPoster = _embedded['wp:featuredmedia']
      ? _embedded['wp:featuredmedia'][0].source_url
      : './app/assets/perfil-shadow.png';

  // document.addEventListener('click', (e) => {
  //   if (e.target.matches('post-card')) {
  //     console.log('done!!');
  //   }
  // });
  return `
    <article class="post-card">
    <div id="clic">clic</div>
        <img src="${urlPoster}" alt="${title.rendered}" />
        <h2>${title.rendered}</h2>
        <p>
        <time datetime="${date}">${dateFormat}</time>
        <a href="#/${slug}" data-id="${id}">
            Ver publicación
        </a>
        </p>
    </article>
  `;
}
