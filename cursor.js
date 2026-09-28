/**
 * GSAP Custom Cursor
 * Ultra-stable, high performance, zero layout shift or hitbox collisions.
 */
(function() {
  // 1. Détection souris réelle (ignoré sur mobile et tactile)
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  // 2. Création et injection automatique des éléments du curseur
  let dot = document.querySelector('.custom-cursor-dot');
  let follower = document.querySelector('.custom-cursor-follower');
  let followerText = null;

  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
  }

  if (!follower) {
    follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    followerText = document.createElement('span');
    followerText.className = 'custom-cursor-text';
    follower.appendChild(followerText);
    document.body.appendChild(follower);
  } else {
    followerText = follower.querySelector('.custom-cursor-text');
  }

  // 3. Vérification de la disponibilité de GSAP
  if (typeof gsap === 'undefined') {
    console.warn('[Cursor] GSAP n\'est pas chargé. Chargement de secours...');
    return;
  }

  // Centrage initial sans à-coups
  gsap.set([dot, follower], { xPercent: -50, yPercent: -50 });

  // GSAP quickTo pour 60/120 fps sans lag
  const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
  const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

  const xFollower = gsap.quickTo(follower, "x", { duration: 0.32, ease: "power3.out" });
  const yFollower = gsap.quickTo(follower, "y", { duration: 0.32, ease: "power3.out" });

  let isFirstMove = true;

  window.addEventListener('mousemove', (e) => {
    if (isFirstMove) {
      document.body.classList.add('cursor-active');
      gsap.set([dot, follower], { x: e.clientX, y: e.clientY });
      isFirstMove = false;
    }

    xDot(e.clientX);
    yDot(e.clientY);
    xFollower(e.clientX);
    yFollower(e.clientY);
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active');
  });

  window.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-active');
  });

  // 4. Délégation d'événements pour les états de survol (100% stable, passif)
  document.addEventListener('mouseover', (e) => {
    // Cas 1 : Survol d'une carte projet
    const project = e.target.closest('.project-item');
    if (project && !project.classList.contains('text-block-item')) {
      follower.classList.add('is-hover-project');
      follower.classList.remove('is-hover-link');
      if (followerText) followerText.textContent = 'VIEW';
      gsap.to(dot, { opacity: 0, duration: 0.15, overwrite: "auto" });
      return;
    }

    // Cas 2 : Survol d'un lien ou d'un bouton interactif
    const interactive = e.target.closest('a, button, .nav-btn, .filter-btn, .cargo-lang-btn, #themeToggleBtn, #clearDrawBtn');
    if (interactive) {
      follower.classList.add('is-hover-link');
      follower.classList.remove('is-hover-project');
      if (followerText) followerText.textContent = '';
      gsap.to(dot, { opacity: 0.3, duration: 0.15, overwrite: "auto" });
      return;
    }

    // Cas par défaut (retour normal)
    follower.classList.remove('is-hover-project', 'is-hover-link');
    if (followerText) followerText.textContent = '';
    gsap.to(dot, { opacity: 1, duration: 0.15, overwrite: "auto" });
  }, { passive: true });

})();
