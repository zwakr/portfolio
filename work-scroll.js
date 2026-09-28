/**
 * GSAP ScrollTrigger for Work Page
 * Smooth, staggered reveals on scroll with zero layout shifts or filter collisions.
 */
(function() {
  function initWorkScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[WorkScroll] GSAP ou ScrollTrigger n\'est pas chargé.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Nettoyer d'anciens triggers s'ils existent
    ScrollTrigger.getAll().forEach(t => t.kill());

    const items = document.querySelectorAll('.project-item');
    if (!items || items.length === 0) return;

    items.forEach((item) => {
      // Si l'élément est masqué par le filtre, on ne l'anime pas
      if (item.classList.contains('hidden')) return;

      const target = item.querySelector('figure') || item;

      gsap.fromTo(target, 
        { 
          y: 40, 
          opacity: 0 
        }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // Déclenche dès que le haut de l'élément atteint 90% du bas de l'écran
            toggleActions: "play none none none",
            once: true // L'animation se joue une fois de manière élégante
          }
        }
      );
    });

    // Recalcul des positions
    ScrollTrigger.refresh();
  }

  // Initialisation automatique après le rendu des projets
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initWorkScroll, 80);
    });
  } else {
    setTimeout(initWorkScroll, 80);
  }

  // Recalcul automatique lors du changement de filtre
  document.addEventListener('click', (e) => {
    if (e.target.closest('.filter-btn')) {
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 400);
    }
  });

  // Expose globalement au cas où
  window.initWorkScroll = initWorkScroll;
})();
