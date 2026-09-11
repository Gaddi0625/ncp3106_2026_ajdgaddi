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
  let latestRequest = 0;

  async function load(lang) {
    const request = ++latestRequest;
    try {
      const res = await fetch(`Assets/i18n/${lang}.json`);
      if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
      const translations = await res.json();
      if (request !== latestRequest) return;
      dict = translations;
      currentLang = lang;
      document.documentElement.lang = lang;
      apply();
      try {
        sessionStorage.setItem(STORAGE_KEY, lang);
      } catch (err) {
        console.warn('[i18n] Language preference could not be saved:', err);
      }
      document.dispatchEvent(new CustomEvent('i18n:changed'));
    } catch (err) {
      if (request !== latestRequest) return;
      console.error('[i18n] Load error:', err);
      if (lang !== DEFAULT_LANG) load(DEFAULT_LANG);
    }
  }

  function setTranslatedText(el, value) {
    if (el.tagName === 'META') {
      el.setAttribute('content', value);
      return;
    }

    const listItems = [...el.children].filter(child => child.matches('li'));
    if (listItems.length === el.children.length && listItems.length > 1) {
      const values = value.split('; ');
      if (values.length === listItems.length) {
        listItems.forEach((item, index) => { item.textContent = values[index]; });
        return;
      }
    }

    const firstChild = el.firstElementChild;
    if (firstChild?.tagName === 'STRONG' && value.includes(':')) {
      const separator = value.indexOf(':') + 1;
      firstChild.textContent = value.slice(0, separator);
      while (firstChild.nextSibling) firstChild.nextSibling.remove();
      el.append(document.createTextNode(` ${value.slice(separator).trimStart()}`));
      return;
    }

    if (firstChild?.getAttribute('aria-hidden') === 'true') {
      while (firstChild.nextSibling) firstChild.nextSibling.remove();
      el.append(document.createTextNode(` ${value}`));
      return;
    }

    el.textContent = value;
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (Object.hasOwn(dict, key)) setTranslatedText(el, dict[key]);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (Object.hasOwn(dict, key)) el.placeholder = dict[key];
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.dataset.i18nAriaLabel;
      if (Object.hasOwn(dict, key)) el.setAttribute('aria-label', dict[key]);
    });

    // Update language toggle buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
      const isActive = btn.dataset.lang === currentLang;
      btn.classList.toggle('active', isActive);
      if (isActive) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });

    // Update current language display
    document.querySelectorAll('[data-i18n="lang.current"]').forEach(el => {
      el.textContent = dict[`lang.${currentLang === 'en' ? 'english' : 'filipino'}`] || (currentLang === 'en' ? 'English' : 'Filipino');
    });
  }

  function init() {
    let saved = null;
    try {
      saved = sessionStorage.getItem(STORAGE_KEY);
    } catch (err) {
      console.warn('[i18n] Language preference could not be read:', err);
    }
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
