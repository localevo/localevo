/*!
* Start Bootstrap - Creative v7.0.7
*/

window.addEventListener('DOMContentLoaded', event => {

    // Navbar permanent în varianta shrink
    const mainNav = document.body.querySelector('#mainNav');

    if (mainNav) {
        mainNav.classList.add('navbar-shrink');

        // Activate Bootstrap scrollspy
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');

    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (
                navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== 'none'
            ) {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });


    // =====================================
    // PORTFOLIO CAROUSEL
    // =====================================

    const portfolioCarousel = document.querySelector('#portfolioCarousel');
    const portfolioPrev = document.querySelector('.portfolio-prev');
    const portfolioNext = document.querySelector('.portfolio-next');

    if (portfolioCarousel && portfolioPrev && portfolioNext) {

        // Scroll dreapta
        portfolioNext.addEventListener('click', () => {

            const card = portfolioCarousel.querySelector(
                '.portfolio-carousel-item'
            );

            if (!card) {
                return;
            }

            const cardWidth = card.offsetWidth;
            const gap = parseFloat(
                window.getComputedStyle(portfolioCarousel).gap
            ) || 0;

            portfolioCarousel.scrollBy({
                left: cardWidth + gap,
                behavior: 'smooth'
            });

        });


        // Scroll stânga
        portfolioPrev.addEventListener('click', () => {

            const card = portfolioCarousel.querySelector(
                '.portfolio-carousel-item'
            );

            if (!card) {
                return;
            }

            const cardWidth = card.offsetWidth;
            const gap = parseFloat(
                window.getComputedStyle(portfolioCarousel).gap
            ) || 0;

            portfolioCarousel.scrollBy({
                left: -(cardWidth + gap),
                behavior: 'smooth'
            });

        });

    }

});