/**
 * main.js — Shared utilities: filters, scroll-to-top, and anchor navigation
 */
(() => {
  const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

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
    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: scrollBehavior });
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
          c.setAttribute('aria-pressed', c === chip);
        });
        specCards.forEach(card => {
          const categories = card.dataset.category.split(' ');
          const show = filter === 'all' || categories.includes(filter);
          card.hidden = !show;
        });
      });
    });
  }

  // ===== FAQ Search/Filter =====
  const faqSearch = document.getElementById('faqSearch');
  const faqItems = document.querySelectorAll('.faq-accordion .accordion-item');
  const faqGroups = document.querySelectorAll('.faq-accordion');
  const faqSearchStatusLabel = document.getElementById('faqSearchStatusLabel');
  const faqSearchCount = document.getElementById('faqSearchCount');
  if (faqSearch && faqItems.length) {
    const filterFaqs = () => {
      const query = faqSearch.value.toLowerCase().trim();
      let matches = 0;
      faqItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const body = item.querySelector('.accordion-body');
        const text = (button?.textContent + ' ' + body?.textContent).toLowerCase();
        const match = !query || text.includes(query);
        item.hidden = !match;
        if (match) matches += 1;
      });

      faqGroups.forEach(group => {
        group.closest('section').hidden = ![...group.querySelectorAll('.accordion-item')].some(item => !item.hidden);
      });

      if (faqSearchStatusLabel && faqSearchCount) {
        const translations = typeof I18n !== 'undefined' ? I18n.dict() : {};
        const label = query ? translations['faq.search.results'] || 'Matching questions:' : translations['faq.search.status'] || 'Questions available:';
        faqSearchStatusLabel.textContent = label;
        faqSearchCount.textContent = matches;
      }
    };

    faqSearch.addEventListener('input', filterFaqs);
    document.addEventListener('i18n:changed', () => {
      faqSearch.value = '';
      filterFaqs();
    });
  }

  // ===== Demo Contact Form =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', event => event.preventDefault());
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        if (this.classList.contains('skip-link')) {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

})();
