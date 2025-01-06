export function ContactForm() {
  // SINGLE FILE COMPONENT (STYLES, STRUCTURE AND LOGIC) AND STYLED COMPONENT (inject styles on the html file)
  const d = document,
  $form = d.createElement('form'),
  $styles = d.getElementById('dynamic-styles');
  $form.classList.add('contact_form');
  $form.setAttribute('id', 'contact_form');
  console.log("wago");

  // STYLES
  // injecting styles:
  $styles.innerHTML = `
  html {
    font-family: sans-serif;
    font-size: 10px;
  }

  .social-media-container_column-two li > a > i {
    font-size: 30px;
  }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  
    /* **********     ContactForm Validations     ********** */
    .contact_form {
      font-size: 16px;
      --form-ok-color: #4caf50;
      --form-error-color: #f44336;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
    }
  
    .contact_form > * {
      padding: 1rem;
      margin: 1rem auto;
      display: block;
      width: 100%;
    }
  
    .contact_form textarea {
      resize: none;
    }
  
    .contact_form legend,
    .contact_form-response {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }
  
    .contact_form input,
    .contact_form textarea {
      font-size: 1.7rem;
      font-family: sans-serif;
    }
  
    .contact_form input[type='submit'] {
      width: 50%;
      font-weight: bold;
      cursor: pointer;
      font-size: 1.7rem;
    }
  
    .contact_form *::placeholder {
      color: #000;
    }
  
    .contact_form [required]:valid {
      border: thin solid var(--form-ok-color);
    }
  
    .contact_form [required]:invalid {
      border: thin solid var(--form-error-color);
    }
  
    .contact_form-error {
      margin-top: -1rem;
      font-size: 80%;
      background-color: var(--form-error-color);
      color: #fff;
      transition: all 800ms ease;
    }
  
    .contact_form-error.is-active {
      display: block;
      animation: show-message 1s 1 normal 0s ease-out both;
    }

    .contact_form-loader {
      text-align: center;
      width:50px;
      height:50px;
      border-radius:50%;
      background:conic-gradient(#0000 10%,#766DF4);
      -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
      animation:s3 1s infinite linear;
    }
    @keyframes s3 {to{transform: rotate(1turn)}}
  
    .none {
      display: none;
    }
  
    @keyframes show-message {
      0% {
        visibility: hidden;
        opacity: 0;
      }
  
      100% {
        visibility: visible;
        opacity: 1;
      }
    }
  .dark-theme-btn {
    width: 3rem;
    height: 3rem;
  }
  
    `;
  // STRUCTURE
  const getForm = (url) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
      $form.innerHTML = xhr.responseText;
      }
    });
      
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-type", "text/html; charset=utf-8");
    xhr.send();
  }
  getForm("./app/components/contact-form.ejs");
  // LOGIC
  function validationsForm() {
    const $form = d.querySelector('.contact_form'),
      $inputs = d.querySelectorAll('.contact_form [required]');

    $inputs.forEach((input) => {
      const $span = d.createElement('span');
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add('contact_form-error', 'none');
      input.insertAdjacentElement('afterend', $span);
    });

    d.addEventListener('keyup', (e) => {
      if (e.target.matches('.contact_form [required]')) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== '') {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add('is-active')
            : d.getElementById($input.name).classList.remove('is-active');
        }

        if (pattern) {
          return ($input.value = '')
            ? d.getElementById($input.name).classList.add('is-active')
            : d.getElementById($input.name).classList.remove('is-active');
        }
      }
    });

    d.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("INFO",new FormData(e.target));
      console.log('Eviando fromulario...');

      const $loader = d.querySelector('.contact_form-loader'),
      $response = d.querySelector('.contact_form-response');

      $loader.classList.remove('none');

      fetch('https://formsubmit.co/ajax/eduardo.gonzalez.dev@gmail.com', {
        // Replace naked email:
        // 1251f84c103b85c8e6e0826991e72cb3
        method: 'POST',
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log('Respuesta recivida:');
          console.log(json);
          $loader.classList.add('none');
          console.log('Removiendo none');
          $response.classList.remove('none');
          $response.innerHtml = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message =
            err.statusText || `An error occurred while sending. Please try again.`;
          $response.innerHTML = `<p>Error ${err.status}: ${message}`;
        })
        .finally(() => {
          setTimeout(() => {
            $response.classList.add('none');
            $response.innerHTML = '';
          }, 3000);
        });
    });
  }
  setTimeout(() => {
    validationsForm();
  }, 100);
  return $form;
}
