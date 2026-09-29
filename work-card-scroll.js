/**
 * GSAP ScrollTrigger - Museum Gallery Card Stacking & Side Meta Reveal
 * Project starts full screen, then shrinks on scroll revealing wide whitespace
 * and side editorial text on both flanks (adapting to both landscape and vertical).
 */
(function() {
  function getHeaderHeight() {
    const header = document.querySelector('.sticky-header');
    return header ? header.offsetHeight : 80;
  }

  function initWorkCardScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[WorkCardScroll] GSAP ou ScrollTrigger n\'est pas chargé.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Nettoyer les anciens triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    const wrappers = document.querySelectorAll('.project-card-wrapper');
    if (!wrappers || wrappers.length === 0) return;

    const headerHeight = getHeaderHeight();
    let visibleIndex = 0;

    wrappers.forEach((wrapper) => {
      if (wrapper.style.display === 'none' || wrapper.classList.contains('hidden')) {
        return;
      }

      const card = wrapper.querySelector('.project-card');
      const mediaFrame = wrapper.querySelector('.project-media-frame');
      const sideLeft = wrapper.querySelector('.side-left');
      const sideRight = wrapper.querySelector('.side-right');
      if (!card || !mediaFrame) return;

      // Z-index progressif pour empiler les cartes proprement
      card.style.zIndex = 10 + visibleIndex;
      visibleIndex++;

      // 1. Rétrécissement de l'image (de plein écran vers le cadre musée au centre)
      gsap.fromTo(mediaFrame, 
        { 
          scale: 1.28 // Pleine page au départ
        }, 
        { 
          scale: 0.92, // Rétrécit élégamment au centre
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: `top ${headerHeight}px`,
            end: `bottom ${headerHeight}px`,
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        }
      );

      // 2. Apparition des textes latéraux sur les côtés au fil du rétrécissement
      if (sideLeft && sideRight) {
        gsap.fromTo([sideLeft, sideRight],
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: `top ${headerHeight}px`,
              end: `center ${headerHeight}px`, // Les textes sont pleinement lisibles à mi-scroll
              scrub: 0.5,
              invalidateOnRefresh: true
            }
          }
        );
      }
    });

    ScrollTrigger.refresh();
  }

  // Initialisation automatique après chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initWorkCardScroll, 120);
    });
  } else {
    setTimeout(initWorkCardScroll, 120);
  }

  window.initWorkCardScroll = initWorkCardScroll;

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
})();
