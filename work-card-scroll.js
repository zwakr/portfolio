/**
 * GSAP ScrollTrigger - Museum Gallery Card Stacking & Side Meta Reveal
 * Starts in pure FULL PAGE (fill edge-to-edge), then shrinks on scroll
 * leaving massive whitespace (extra wide for vertical) with Satoshi Light side typography.
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

      // Z-index progressif
      card.style.zIndex = 10 + visibleIndex;
      visibleIndex++;

      // Détecter si le projet est vertical ou horizontal
      const isPortrait = wrapper.classList.contains('is-portrait');
      
      // Facteur d'agrandissement initial pour être véritablement en PLEIN ÉCRAN (fill edge-to-edge)
      // Paysage : 1.82x pour déborder complètement sur tout l'écran
      // Portrait : 1.45x pour couvrir toute la hauteur de l'écran
      const startScale = isPortrait ? 1.45 : 1.85;

      // 1. Rétrécissement du média (de Plein Écran à l'affiche musée centrée)
      gsap.fromTo(mediaFrame, 
        { 
          scale: startScale
        }, 
        { 
          scale: 1.0, // Revient à sa taille musée au centre
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

      // 2. Apparition douce des textes latéraux (Satoshi Light) sur les flancs
      if (sideLeft && sideRight) {
        gsap.fromTo([sideLeft, sideRight],
          {
            opacity: 0,
            y: 12
          },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapper,
              start: `top ${headerHeight}px`,
              end: `center ${headerHeight}px`,
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
