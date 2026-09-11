/**
 * i18n.js — Simple language toggle for static HTML
 * Loads translations from JSON files, uses textContent for safety
 */
const I18n = (() => {
  const STORAGE_KEY = 'ue-cpe-lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'fil'];
  let dict = {};
  let currentLang = DEFAULT_LANG;

  async function load(lang) {
    try {
      const res = await fetch(`Assets/i18n/${lang}.json`);
      if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
      dict = await res.json();
      currentLang = lang;
      document.documentElement.lang = lang === 'fil' ? 'tl' : 'en';
      apply();
      sessionStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      console.error('[i18n] Load error:', err);
      if (lang !== DEFAULT_LANG) load(DEFAULT_LANG);
    }
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        // Use textContent for safety (no innerHTML)
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) el.placeholder = dict[key];
    });

    // Update language toggle buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
      const isActive = btn.dataset.lang === currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    // Update current language display
    document.querySelectorAll('[data-i18n="lang.current"]').forEach(el => {
      el.textContent = dict[`lang.${currentLang === 'en' ? 'english' : 'filipino'}`] || (currentLang === 'en' ? 'English' : 'Filipino');
    });
  }

  function init() {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    const initial = SUPPORTED.includes(saved) ? saved : DEFAULT_LANG;
    load(initial);

    // Attach click handlers to language toggle buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        load(btn.dataset.lang);
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    load,
    current: () => currentLang,
    dict: () => dict
  };
})();
