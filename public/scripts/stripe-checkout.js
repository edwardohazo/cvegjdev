import STRIPE_KEYS from './stripe-keys.js';


window.addEventListener("load", ()=> {
    // 1. Se toman los elementos html
    let $webServices = document.getElementById("web-services");
    let $template = document.getElementById("service-template").content;
    let $fragment = document.createDocumentFragment();
    
    // 2. Se configuran las cabeceras de las peticiones 
    let fetchOptions = {
        headers: {
            Authorization: `Bearer ${STRIPE_KEYS.secret}` 
        }
    }

    // 3. Se crean las variables que almacenan los precios y productos
    let prices, products;

    // 4. Se crea el formato de moneda
    const moneyFormat = (num) => `$${num.slice(0,-2)}.${num.slice(-2)}`;

    // 5. Se envían las peticiones con los ENDPOINTS para obtener precios y productos de la API REST STRIPE
    Promise.all([
        fetch("https://api.stripe.com/v1/products", fetchOptions),
        fetch("https://api.stripe.com/v1/prices", fetchOptions),
    ])
    .then((responses)=> Promise.all(responses.map((res)=> res.json())))
    .then((json)=> { 
        products = json[0].data;
        prices = json[1].data;

        // 5.1 Se crea cada producto de la UI con la información de la API REST STRIPE
        prices.forEach((price)=>{
            let productData = products.filter((product)=> product.id == price.product);

            $template.querySelector(".service").setAttribute("data-price", price.id);
            $template.querySelector("img").src = productData[0].images[0];
            $template.querySelector("img").alt = productData[0].name;
            $template.querySelector("figcaption").innerHTML = `
            ${productData[0].name}
            <br>
            ${moneyFormat(price.unit_amount_decimal)} ${price.currency}
            `
            let clone = document.importNode($template, true);
            $fragment.appendChild(clone);
        });

        // 5.2 Se injectan todos los productos en la UI
        $webServices.appendChild($fragment);
    })
    .catch((err)=>{
        console.log(err);
        let message = err.statusText || "Ha ocurrido un error";
        $webServices.innerHTML = message
    })

});

document.addEventListener("click",(e)=>{
    if (e.target.matches(".service *")) {
        let priceId = e.target.parentElement.getAttribute("data-price");

        // LIBRERÍA STRIPE (OBJETO CON MÉTODO QUE REDIRIGE AL CHECKOUT EXTERNO)
        Stripe(STRIPE_KEYS.public)
        .redirectToCheckout({
            lineItems: [{price: priceId,quantity: 1}],
            mode: "payment",
            successUrl: "https://egjfrontendcv.netlify.app/views/sub-view-multiple-uploads/paySuccess.html",
            cancelUrl: "https://egjfrontendcv.netlify.app/views/sub-view-multiple-uploads/payCancel.html"
        })
        .then((resCheckout) => { 
            if (resCheckout.error) {
            $webServices.insertAdjacentHTML("Afterend", res.error.message)
             }
        });
    }
});
