const d = document;
const $main = d.getElementById("main");

fetch("../public/blogs/personal-profile-blog.md")
.then((res)=> res.ok ? res.text() : Promise.reject(res))
.then((text)=> {
    $main.innerHTML  = new showdown.Converter().makeHtml(text);
})
.catch((err)=> {
    let message = err.statusText || 'Ocurrió un error';
    $main.innerHTML = `Error ${err.status}: ${message}`;
});
