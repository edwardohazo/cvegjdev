import { digitalClock, alarm } from './sessions_scripts_exports/alarm-section-script.js';
import Countdown from './sessions_scripts_exports/countdown.js';
import DarkTheme from './sessions_scripts_exports/theme_dark.js';
import ResponsiveMedia from './sessions_scripts_exports/responsive_design_javascript.js';
import ResponsiveTester from './sessions_scripts_exports/responsive_tester.js';
import ConectionStatus from './sessions_scripts_exports/conection_state.js';
import WebCamDetection from './sessions_scripts_exports/web_cam_detection.js';
import GetGeolocation from './sessions_scripts_exports/geolocation.js';
import SearchFilters from './sessions_scripts_exports/search_filter.js';
import Lottery from './sessions_scripts_exports/lottery.js';
import Slider from './sessions_scripts_exports/slider.js';
import ScrollSpy from './sessions_scripts_exports/scrollspy.js';


window.addEventListener("load", ()=> {

    // // PENDIENTE: Buscar una mejor alternativa a setTimeout()
    setTimeout(()=>{
    
        digitalClock('#watch', '#enable-watch', '#disable-watch');
        alarm("./public/assets/alarma.mp3", '#enable-alarm', '#disable-alarm');
        // Countdown("countdown", "Oct 22, 2023 12:00:00", "¡Week is over!");
        Countdown("countdown", "Jan 01, 2025 00:00:00", "¡Happy new year!");
        ResponsiveMedia("youtube","(min-width: 1024px)", '<a href="https://youtu.be/UfcAVejslrU" target="_blank">Ver video</a>', '<iframe width="560" height="315" src="https://www.youtube.com/embed/0nnqGDZnWhU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        ResponsiveMedia("gmaps","(min-width: 1024px)", '<a href="https://goo.gl/maps/hNYxByQyqXk13DJVA" target="_blank">Ver mapa</a>', '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d59712.59390259048!2d-103.4237582!3d20.70871725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1669129802072!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');
        ResponsiveTester("responsive-tester");
        WebCamDetection("web-cam");
        GetGeolocation("geolocation");
        SearchFilters(".card-filter", ".card");
        Lottery("#winner-btn", ".player");
        Slider();
        ScrollSpy();

    },10);
});

DarkTheme(".dark-theme-btn", "dark-mode");
ConectionStatus();
