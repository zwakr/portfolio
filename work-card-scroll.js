/**
 * GSAP ScrollTrigger - Museum Gallery Card Stacking & Controlled Sequence
 * 1. Shrinks from true full page to centered gallery size with side text.
 * 2. STAYS AT REST (frozen in place) so the viewer can read and admire the project.
 * 3. The next project ONLY arrives once this scroll is fully completed.
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

      // Détecter si le projet est vertical ou horizontal
      const isPortrait = wrapper.classList.contains('is-portrait');
      const startScale = isPortrait ? 1.45 : 1.85;

      // Création d'une timeline séquencée liée au scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${headerHeight}px`,
          end: `bottom ${headerHeight}px`,
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      // PHASE 1 (0% à 38% du scroll) : Rétrécissement vers le centre & apparition des textes
      tl.fromTo(mediaFrame, 
        { scale: startScale }, 
        { scale: 1.0, ease: "power1.out", duration: 0.38 }, 
        0
      );

      if (sideLeft && sideRight) {
        tl.fromTo([sideLeft, sideRight],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: "power1.out", duration: 0.32 },
          0.06
        );
      }

      // PHASE 2 (38% à 100% du scroll) : TEMPS DE CONTEMPLATION / REPOS TOTAL
      // La carte reste parfaitement figée, l'internaute profite du projet et lit le texte.
      // Le projet suivant n'arrive QUE lorsque l'internaute a fini de scroller cette section !
      tl.to({}, { duration: 0.62 });
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
