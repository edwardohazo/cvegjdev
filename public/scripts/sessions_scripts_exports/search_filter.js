export default function SearchFilters (input, selector) {

    document.addEventListener("keyup",(e)=>{

        if (e.target.matches(input)) {
            document.querySelectorAll(selector).
            forEach((el)=>{
                el.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ?
                el.classList.remove("filter"):
                el.classList.add("filter");
            });
        } 

    });
}