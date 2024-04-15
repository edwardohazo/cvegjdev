export function Post(props) {
  let { title, content, date, slug, _embedded } = props;

  const dateFormat = new Date(date).toLocaleString(),
    urlPoster = _embedded['wp:featuredmedia']
      ? _embedded['wp:featuredmedia'][0].source_url
      : './app/assets/perfil-shadow.png';
  return `
  <section class="post-page">
    <aside>
        <h2>${title.rendered}</h2>
        <time datetime="${date}">${dateFormat}</time>
    </aside>
    <hr>
    <article>${content.rendered}</article>
  </section>
  `;
}
