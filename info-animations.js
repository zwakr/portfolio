/**
 * GSAP Animations for Info Page
 * Stable, non-destructive, full RTL/Arabic compatibility.
 */
(function() {
  function initInfoAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('[InfoAnimations] GSAP n\'est pas chargé.');
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Animation initiale soignée par section
    const sections = document.querySelectorAll('.column-set');
    sections.forEach((section) => {
      const units = section.querySelectorAll('.column-unit');
      if (!units || units.length === 0) return;

      if (typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo(units, 
          { 
            y: 24, 
            opacity: 0 
          }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.75, 
            stagger: 0.07, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      } else {
        gsap.fromTo(units, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power2.out" }
        );
      }
    });
  }

  // Animation déclenchée lors du changement de langue (FR / EN / AR)
  function onLanguageSwitched() {
    if (typeof gsap === 'undefined') return;

    const units = document.querySelectorAll('.column-unit');
    if (!units || units.length === 0) return;

    // Arrêt immédiat de toute animation précédente pour éviter les conflits
    gsap.killTweensOf(units);

    // Micro-glissement doux et fondu pour révéler la nouvelle langue
    gsap.fromTo(units, 
      { 
        opacity: 0, 
        y: 10 
      }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        stagger: 0.02, 
        ease: "power2.out",
        overwrite: "auto"
      }
    );
  }

  // Initialisation au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initInfoAnimations, 60);
    });
  } else {
    setTimeout(initInfoAnimations, 60);
  }

  // Rendre les fonctions accessibles au switchLanguage
  window.onLanguageSwitched = onLanguageSwitched;
  window.initInfoAnimations = initInfoAnimations;
})();
