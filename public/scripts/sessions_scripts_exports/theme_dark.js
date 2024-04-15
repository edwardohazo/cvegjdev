export default function DarkTheme (btn, classDark) {
        const $themeBtn = document.querySelector(btn),
        $selectors = document.querySelectorAll("[data-dark]");

        let moon = "🌙",
        sun = "☀️";

        const lightMode = () => {
            $selectors.forEach((el)=> el.classList.remove(classDark));
            $themeBtn.textContent = moon;
            localStorage.setItem("theme", "light");
        }

        const darkMode = () => {
            $selectors.forEach((el)=> el.classList.add(classDark));
            $themeBtn.textContent = sun;
            localStorage.setItem("theme", "dark");
        }

        document.addEventListener("click", (e) => {
            if (e.target.matches(btn)) {
                if ($themeBtn.textContent === moon) {
                    darkMode();
                } else {
                    lightMode();
                }
            };
        });

        document.addEventListener("DOMContentLoaded",()=>{
            if (localStorage.getItem("theme") === null) {
                localStorage.setItem("theme", "light");
                console.log(localStorage.getItem("theme"));
            }

            if (localStorage.getItem("theme") === "light")  lightMode();
            if (localStorage.getItem("theme") === "dark") darkMode();
        });
        
        /** FLASHLIGHT **/

        function updateFlashlight(e) {
          let style = document.body.style;
          style.backgroundPositionX = e.pageX - 250 + 'px';
          style.backgroundPositionY = e.pageY - 250 + 'px';
        }
        
        window.addEventListener("load", (event) => {
            let body = document.body;
            let headerImg = document.querySelector('.img-header');
            let darkSkew = document.querySelector('.skew-abajo');
            let cvLink = document.querySelector('.cv-link');
            let hi = document.querySelector('.hi');
            let darkModeElements = document.querySelectorAll("[data-darkBackground]");
            let social = document.querySelectorAll("[data-darkSocialBackground]");
            if (body.classList.contains('dark-mode')) {
              headerImg.classList.add('dark-mode-header');
              darkSkew.classList.add('skew-dark');
              cvLink.style.color = "var(--main)";
              hi.style.display = 'none';
              darkModeElements.forEach((el) => {
                el.classList.add('dark-mode-element');
              });
              social.forEach((icon) => {
                icon.classList.add('dark-social');
              });
                updateFlashlight(event);
                ['mousemove', 'touchstart', 'touchmove', 'touchend'].forEach(function(s) {
                  document.documentElement.addEventListener(s, updateFlashlight, false);
                });
              } 
              else {
                headerImg.classList.remove('dark-mode-header');
                darkSkew.classList.remove('skew-dark');
                cvLink.style.color = "blue";
                hi.style.display = 'inline-block';
                darkModeElements.forEach((el) => {
                  el.classList.remove('dark-mode-element');
                });
                social.forEach((icon) => {
                  icon.classList.remove('dark-social');
                });
                ['mousemove', 'touchstart', 'touchmove', 'touchend'].forEach(function(s) {
                  document.documentElement.removeEventListener(s, updateFlashlight, false);
                });
              }
            
            $themeBtn.onclick = function(e) {
              body.classList.toggle('dark-mode');
              if (body.classList.contains('dark-mode')) {
                headerImg.classList.add('dark-mode-header');
                darkSkew.classList.add('skew-dark');

                cvLink.style.color = "var(--main)";
                hi.style.display = 'none';

                darkModeElements.forEach((icon) => {
                  icon.classList.add('dark-mode-element');
                });

                social.forEach((icon) => {
                  icon.classList.add('dark-social');
                });

                updateFlashlight(e);
                ['mousemove', 'touchstart', 'touchmove', 'touchend'].forEach(function(s) {
                  document.documentElement.addEventListener(s, updateFlashlight, false);
                });
              } else {
                headerImg.classList.remove('dark-mode-header');
                darkSkew.classList.remove('skew-dark');
                cvLink.style.color = "blue";
                hi.style.display = 'inline-block';
                darkModeElements.forEach((icon) => {
                  icon.classList.remove('dark-mode-element');
                });
                social.forEach((icon) => {
                  icon.classList.remove('dark-social');
                });
                ['mousemove', 'touchstart', 'touchmove', 'touchend'].forEach(function(s) {
                  document.documentElement.removeEventListener(s, updateFlashlight, false);
                });
              }
            }
        });
} 