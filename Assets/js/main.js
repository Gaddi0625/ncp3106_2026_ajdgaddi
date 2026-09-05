/**
 * main.js — Shared utilities: filters, scroll-to-top, mailto form helper
 */
(() => {
  // ===== Scroll to Top =====
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.hidden = false;
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
        setTimeout(() => { if (window.scrollY <= 300) scrollTopBtn.hidden = true; }, 250);
      }
    };
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Specializations Filter =====
  const filterChips = document.querySelectorAll('.filter-chip');
  const specCards = document.querySelectorAll('.spec-card[data-category]');
  if (filterChips.length && specCards.length) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        filterChips.forEach(c => {
          c.classList.toggle('active', c === chip);
          c.setAttribute('aria-selected', c === chip);
        });
        specCards.forEach(card => {
          const categories = card.dataset.category.split(' ');
          const show = filter === 'all' || categories.includes(filter);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ===== Careers Filter (optional enhancement) =====
  const careerFilterChips = document.querySelectorAll('.career-filter-chip');
  const careerCards = document.querySelectorAll('.career-card[data-category]');
  if (careerFilterChips.length && careerCards.length) {
    careerFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        careerFilterChips.forEach(c => c.classList.toggle('active', c === chip));
        careerCards.forEach(card => {
          const categories = card.dataset.category.split(' ');
          const show = filter === 'all' || categories.includes(filter);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ===== FAQ Search/Filter =====
  const faqSearch = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('#faqGeneral .accordion-item, #faqUE .accordion-item, #faqAdmissions .accordion-item');
  if (faqSearch && faqItems.length) {
    faqSearch.addEventListener('input', () => {
      const query = faqSearch.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const body = item.querySelector('.accordion-body');
        const text = (button?.textContent + ' ' + body?.textContent).toLowerCase();
        const match = !query || text.includes(query);
        item.style.display = match ? '' : 'none';
      });
    });
  }

  // ===== Mailto Form Helper =====
  // Enhances mailto forms by properly encoding the body
  document.querySelectorAll('form[action^="mailto:"]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const params = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        params.append(key, value);
      }
      const action = form.getAttribute('action');
      const mailtoUrl = `${action}?${params.toString()}`;
      window.location.href = mailtoUrl;
    });
  });

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    });
  });

})();