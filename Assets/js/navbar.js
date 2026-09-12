/**
 * navbar.js — Scroll state + mobile drawer backdrop
 */
(() => {
  const navbar = document.querySelector('.navbar');
  const drawer = document.querySelector('.navbar-collapse');
  const backdrop = document.querySelector('.navbar-drawer-backdrop');
  const toggler = document.querySelector('.navbar-toggler');
  const closeButton = document.querySelector('.navbar-drawer-close');

  if (!navbar) return;

  navbar.querySelectorAll('.nav-link.active:not(.dropdown-toggle), .dropdown-item.active').forEach(link => {
    link.setAttribute('aria-current', 'page');
  });

  // Scroll state: add shadow when scrolled
  const updateScrollState = () => {
    const scrolled = window.scrollY > 10;
    navbar.classList.toggle('scrolled', scrolled);
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  // Mobile drawer backdrop handling
  if (drawer && backdrop && toggler && closeButton) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(drawer, { toggle: false });
    let restoreTogglerFocus = false;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () => [...drawer.querySelectorAll(focusableSelector)]
      .filter(element => element.offsetParent !== null);
    const backgroundElements = [...document.body.children]
      .filter(element => ![navbar, backdrop].includes(element) && element.tagName !== 'SCRIPT');
    const navbarBackgroundElements = [...drawer.parentElement.children]
      .filter(element => element !== drawer);

    const setDrawerState = isOpen => {
      backdrop.classList.toggle('show', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      [...backgroundElements, ...navbarBackgroundElements].forEach(element => {
        element.inert = isOpen;
      });
    };

    drawer.addEventListener('show.bs.collapse', () => setDrawerState(true));
    drawer.addEventListener('shown.bs.collapse', () => {
      if (window.innerWidth >= 1400) {
        bsCollapse.hide();
        setDrawerState(false);
        return;
      }
      setDrawerState(true);
      getFocusableElements()[0]?.focus();
    });
    drawer.addEventListener('hidden.bs.collapse', () => {
      setDrawerState(false);
      if (restoreTogglerFocus) toggler.focus();
      restoreTogglerFocus = false;
    });

    // Close drawer when clicking backdrop
    backdrop.addEventListener('click', () => {
      restoreTogglerFocus = true;
      bsCollapse.hide();
    });

    closeButton.addEventListener('click', () => {
      restoreTogglerFocus = true;
      bsCollapse.hide();
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('show')) {
        restoreTogglerFocus = true;
        bsCollapse.hide();
      }

      if (e.key === 'Tab' && drawer.classList.contains('show')) {
        const focusableElements = getFocusableElements();
        const first = focusableElements[0];
        const last = focusableElements.at(-1);
        if (!first || !last) return;

        if (e.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    toggler.addEventListener('click', () => {
      if (drawer.classList.contains('show')) restoreTogglerFocus = true;
    });

    // Close drawer when clicking a nav link (on mobile)
    drawer.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1400) {
          const url = new URL(link.href, window.location.href);
          const isSameDocument = url.pathname === window.location.pathname && Boolean(url.hash);
          restoreTogglerFocus = link.hasAttribute('data-lang') || isSameDocument;
          bsCollapse.hide();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1400) {
        restoreTogglerFocus = false;
        bsCollapse.hide();
        setDrawerState(false);
      }
    });
  }
})();
