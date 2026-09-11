/* =========================================================
   LOCALEVO — MICRO-ANIMAȚII PAGINI SERVICII
   Reveal progresiv și discret la scroll
========================================================= */

(() => {
    'use strict';

    /* Respectă setarea "Reduce Motion" a utilizatorului */
    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
        return;
    }

    /* Elementele care apar progresiv la scroll */
    const revealSelectors = [
        '.service-section-heading',
        '.service-detail-card',
        '.service-process-step',
        '.service-price-card',
        '.service-final-cta .container'
    ];

    const revealItems = document.querySelectorAll(
        revealSelectors.join(',')
    );

    if (!revealItems.length) {
        return;
    }


    /* =====================================================
       CARDURI SERVICII
       Apar succesiv, cu o întârziere discretă
    ===================================================== */

    document.querySelectorAll('.service-detail-grid').forEach((grid) => {

        const cards = grid.querySelectorAll(
            '.service-detail-card'
        );

        cards.forEach((card, index) => {

            const delay = Math.min(
                index * 110,
                330
            );

            card.style.setProperty(
                '--reveal-delay',
                `${delay}ms`
            );

        });

    });


    /* =====================================================
       PAȘII PROCESULUI
       Apar progresiv 01 → 02 → 03 → 04
    ===================================================== */

    document.querySelectorAll('.service-process-list').forEach((list) => {

        const steps = list.querySelectorAll(
            '.service-process-step'
        );

        steps.forEach((step, index) => {

            const delay = Math.min(
                index * 90,
                270
            );

            step.style.setProperty(
                '--reveal-delay',
                `${delay}ms`
            );

        });

    });


    /* =====================================================
       FALLBACK
       Pentru browsere care nu suportă IntersectionObserver
    ===================================================== */

    if (!('IntersectionObserver' in window)) {

        revealItems.forEach((item) => {
            item.classList.add('is-revealed');
        });

        return;
    }


    /* =====================================================
       INTERSECTION OBSERVER

       Detectează când elementul intră în zona vizibilă.
       Elementul este animat o singură dată.
    ===================================================== */

    const observer = new IntersectionObserver(

        (entries, revealObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                /*
                 * requestAnimationFrame permite browserului
                 * să înregistreze starea inițială înainte
                 * de activarea tranziției.
                 *
                 * Ajută la evitarea efectului de "clipire".
                 */
                requestAnimationFrame(() => {

                    entry.target.classList.add(
                        'is-revealed'
                    );

                });

                /*
                 * Oprim observarea după prima apariție.
                 * Elementul nu se va anima din nou când
                 * utilizatorul urcă sau coboară pagina.
                 */
                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            /*
             * Animația începe când o mică parte din element
             * a intrat deja în viewport.
             */
            threshold: 0.08,

            /*
             * Pornire naturală, aproape de marginea
             * inferioară a ecranului.
             */
            rootMargin: '0px 0px -3% 0px'
        }

    );


    /* =====================================================
       ACTIVARE OBSERVER
    ===================================================== */

    revealItems.forEach((item) => {
        observer.observe(item);
    });

})();