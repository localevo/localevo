/* =========================================================
   LOCALEVO — MICRO-ANIMAȚII PAGINI SERVICII
   Reveal progresiv pe desktop și mobil
========================================================= */

(() => {
    'use strict';

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
        return;
    }

    const revealSelectors = [
        '.service-section-heading',
        '.service-detail-card',
        '.service-process-step',
        '.service-price-card',
        '.service-final-cta .container'
    ];

    const revealItems = Array.from(
        document.querySelectorAll(
            revealSelectors.join(',')
        )
    );

    if (!revealItems.length) {
        return;
    }


    /* Activează sistemul de reveal */
    document.documentElement.classList.add(
        'service-reveal-ready'
    );


    /* Detectăm mobilul */
    const isMobile = window.matchMedia(
        '(max-width: 767.98px)'
    ).matches;


    /* =====================================================
       CARDURI
    ===================================================== */

    document.querySelectorAll(
        '.service-detail-grid'
    ).forEach((grid) => {

        const cards = grid.querySelectorAll(
            '.service-detail-card'
        );

        cards.forEach((card, index) => {

            const delay = isMobile
                ? Math.min(index * 140, 420)
                : Math.min(index * 110, 330);

            card.style.setProperty(
                '--reveal-delay',
                `${delay}ms`
            );

        });

    });


    /* =====================================================
       PAȘII PROCESULUI
    ===================================================== */

    document.querySelectorAll(
        '.service-process-list'
    ).forEach((list) => {

        const steps = list.querySelectorAll(
            '.service-process-step'
        );

        steps.forEach((step, index) => {

            const delay = isMobile
                ? Math.min(index * 120, 360)
                : Math.min(index * 90, 270);

            step.style.setProperty(
                '--reveal-delay',
                `${delay}ms`
            );

        });

    });


    /* =====================================================
       FALLBACK
    ===================================================== */

    if (!('IntersectionObserver' in window)) {

        revealItems.forEach((item) => {
            item.classList.add('is-revealed');
        });

        return;
    }


    /* =====================================================
       OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(

        (entries, revealObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                /*
                 * Două frame-uri pentru ca browserul
                 * să aplice întâi starea invizibilă.
                 */
                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        entry.target.classList.add(
                            'is-revealed'
                        );

                    });

                });

                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: isMobile ? 0.03 : 0.05,

            rootMargin: isMobile
                ? '0px 0px -4% 0px'
                : '0px 0px -1% 0px'
        }

    );


    /* =====================================================
       PORNIRE
    ===================================================== */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            revealItems.forEach((item) => {
                observer.observe(item);
            });

        });

    });

})();