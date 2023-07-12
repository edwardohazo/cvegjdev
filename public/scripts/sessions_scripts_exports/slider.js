export default function Slider() {

  const $nextBtn = document.querySelector(".slider-btns .next"),
    $prevBtn = document.querySelector(".slider-btns .prev"),
    $slides = document.querySelectorAll(".slider-slide");

  let counter = 0;

  document.addEventListener("click", (e) => {
    if (e.target === $prevBtn) {
      e.preventDefault();
      $slides[counter].classList.remove("active");
      counter--;

      if (counter < 0) {
        counter = $slides.length - 1;
      }

      $slides[counter].classList.add("active");
    }

    if (e.target === $nextBtn) {
        e.preventDefault();
        $slides[counter].classList.remove("active");
        counter++;
  
        if (counter >= $slides.length) {
          counter = 0;
        }
  
        $slides[counter].classList.add("active");
      }
  });
}
