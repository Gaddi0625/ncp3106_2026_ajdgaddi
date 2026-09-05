/**
 * navbar.js — Scroll state + mobile drawer backdrop
 */
(() => {
  const navbar = document.querySelector('.navbar');
  const drawer = document.querySelector('.navbar-collapse');
  const backdrop = document.querySelector('.navbar-drawer-backdrop');
  const toggler = document.querySelector('.navbar-toggler');

  if (!navbar) return;

  // Scroll state: add shadow when scrolled
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 10;
    navbar.classList.toggle('scrolled', scrolled);
  }, { passive: true });

  // Mobile drawer backdrop handling
  if (drawer && backdrop && toggler) {
    // Show backdrop when drawer opens
    const handleDrawerToggle = () => {
      const isOpen = drawer.classList.contains('show');
      backdrop.classList.toggle('show', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    // Listen for Bootstrap collapse events
    drawer.addEventListener('show.bs.collapse', handleDrawerToggle);
    drawer.addEventListener('hide.bs.collapse', handleDrawerToggle);

    // Close drawer when clicking backdrop
    backdrop.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(drawer);
      if (bsCollapse) bsCollapse.hide();
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(drawer);
        if (bsCollapse) bsCollapse.hide();
      }
    });

    // Close drawer when clicking a nav link (on mobile)
    drawer.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          const bsCollapse = bootstrap.Collapse.getInstance(drawer);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
})();