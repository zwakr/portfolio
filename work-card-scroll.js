/**
 * GSAP ScrollTrigger - Museum Gallery Card Stacking & Controlled Sequence
 * Ultra-robust: dynamically supports unlimited new projects added via CMS / data.js.
 * Protected against race conditions, video/image loading delays, and missing fields.
 */
(function() {
  function getHeaderHeight() {
    const header = document.querySelector('.sticky-header');
    return header ? header.offsetHeight : 80;
  }

  function initWorkCardScroll() {
    try {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('[WorkCardScroll] GSAP ou ScrollTrigger n\'est pas disponible.');
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // 1. Nettoyage sécurisé de tous les triggers et tweens existants
      ScrollTrigger.getAll().forEach(t => {
        try { t.kill(true); } catch(e) {}
      });

      const wrappers = document.querySelectorAll('.project-card-wrapper');
      if (!wrappers || wrappers.length === 0) return;

      const headerHeight = getHeaderHeight();
      let visibleIndex = 0;

      wrappers.forEach((wrapper) => {
        // Ignorer les cartes masquées par un filtre
        if (wrapper.style.display === 'none' || wrapper.classList.contains('hidden')) {
          return;
        }

        const card = wrapper.querySelector('.project-card');
        const mediaFrame = wrapper.querySelector('.project-media-frame');
        const sideLeft = wrapper.querySelector('.side-left');
        const sideRight = wrapper.querySelector('.side-right');
        
        // Sécurité : ignorer si éléments DOM manquants
        if (!card || !mediaFrame) return;

        // Réinitialiser les transformations pour éviter les empilements de calculs
        gsap.killTweensOf([mediaFrame, sideLeft, sideRight]);
        gsap.set(mediaFrame, { clearProps: "transform" });
        if (sideLeft) gsap.set(sideLeft, { clearProps: "opacity,transform" });
        if (sideRight) gsap.set(sideRight, { clearProps: "opacity,transform" });

        // Z-index progressif garanti pour que le projet N+1 recouvre toujours le projet N
        card.style.zIndex = 10 + visibleIndex;
        visibleIndex++;

        // Détection de format (Portrait vs Paysage)
        const isPortrait = wrapper.classList.contains('is-portrait');
        const startScale = isPortrait ? 1.45 : 1.85;

        // Création de la timeline synchronisée au défilement
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
        // La carte reste immobile et visible. Le projet suivant n'arrive QUE lorsque l'internaute scrolle plus bas.
        tl.to({}, { duration: 0.62 });
      });

      // Recalcul sécurisé de ScrollTrigger
      ScrollTrigger.refresh();
    } catch (error) {
      console.error('[WorkCardScroll] Erreur d\'initialisation sans impact sur le site :', error);
    }
  }

  // Initialisation automatique après chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initWorkCardScroll, 150);
    });
  } else {
    setTimeout(initWorkCardScroll, 150);
  }

  // Écoute de l'événement personnalisé si de nouveaux projets sont injectés dynamiquement
  window.addEventListener('portfolioRendered', () => {
    setTimeout(initWorkCardScroll, 80);
  });

  window.initWorkCardScroll = initWorkCardScroll;

  window.addEventListener('resize', () => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  });
})();
