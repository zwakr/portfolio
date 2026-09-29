/**
 * GSAP ScrollTrigger - Full Page Card Stacking & Scale-Down
 * Each project card starts full page and smoothly shrinks on scroll,
 * revealing clean white margins around it before the next card stacks on top.
 */
(function() {
  function getHeaderHeight() {
    const header = document.querySelector('.sticky-header');
    return header ? header.offsetHeight : 85;
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
      const inner = wrapper.querySelector('.project-card-inner');
      if (!card || !inner) return;

      // Z-index progressif pour empiler naturellement la carte suivante par-dessus la précédente
      card.style.zIndex = 10 + visibleIndex;
      visibleIndex++;

      // Animation liée au scroll (scrub: true)
      gsap.fromTo(inner, 
        { 
          scale: 1
        }, 
        { 
          scale: 0.88, // Réduit à 88% pour dégager un cadre blanc régulier tout autour
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: `top ${headerHeight}px`,
            end: `bottom ${headerHeight}px`,
            scrub: 0.5, // Amorti très doux pour un scroll soyeux
            invalidateOnRefresh: true
          }
        }
      );
    });

    // Recalcule toutes les hauteurs et positions de scroll
    ScrollTrigger.refresh();
  }

  // Initialisation automatique après chargement du DOM et des projets
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initWorkCardScroll, 120);
    });
  } else {
    setTimeout(initWorkCardScroll, 120);
  }

  // Rendre accessible globalement pour les filtres
  window.initWorkCardScroll = initWorkCardScroll;

  // Rafraîchir lors du redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
})();
