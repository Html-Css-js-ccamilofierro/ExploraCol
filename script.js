document.addEventListener('DOMContentLoaded', function() {
    // Cargar el header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // Una vez que el header está cargado, inicializar la funcionalidad del menú
            initializeMenu();

            highlightActivePage();
        });

    // Cargar el footer (si tienes un footer separado)
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
});

function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.encabezado__navegacion');
    const header = document.querySelector('.encabezado__container');

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.encabezado__navegacion--elemento a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnMenuToggle && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    function toggleMenu() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (nav.classList.contains('active')) {
            menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        } else {
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }
    }

    function closeMenu() {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }
}

function highlightActivePage() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.encabezado__navegacion--elemento a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}