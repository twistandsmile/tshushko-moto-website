// Tshushko Moto — internationalisation core.
//
// The language is resolved from (in order):
//   1. the ?lang= URL parameter (one-shot display override, not persisted)
//   2. localStorage — the user's choice, persistent across pages and visits
//   3. the browser language (navigator.language)
//   4. the default language (en)
//
// Usage:
//   Static HTML: <span data-i18n="nav.adventures">Adventures</span>
//   Rich HTML:   <h2 data-i18n-html="home.all.title">…</h2>
//   JS text:     window.TM.t('unit.km')
//   Ride data:   window.TM.rideText(ride) → { title, location, description }
//   Switching:   window.TM.setLang('fr') — persists and re-renders in place
//   Re-render:   window.TM.onChange(function (lang) { … }) — pages register a
//                callback that redraws their JS-generated content (the YouTube
//                embed and Leaflet maps are never re-created).

(function () {
  var STORAGE_KEY = 'tm-lang';
  var SUPPORTED = ['en', 'fr', 'bg'];
  var DEFAULT = 'en';
  var strings = window.TM_STRINGS || {};
  var listeners = [];
  var lang = DEFAULT;

  function inList(l) {
    return SUPPORTED.indexOf(l) !== -1;
  }

  function fromBrowser() {
    var nav = (window.navigator.language || '').toLowerCase();
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (nav.indexOf(SUPPORTED[i]) === 0) return SUPPORTED[i];
    }
    return DEFAULT;
  }

  function resolve() {
    var param = new URLSearchParams(window.location.search).get('lang');
    if (param) {
      param = param.toLowerCase().split('-')[0];
      if (inList(param)) return param;
    }
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (inList(stored)) return stored;
    } catch (e) { /* localStorage unavailable (private mode, etc.) */ }
    return fromBrowser();
  }

  function lookup(dict, key) {
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      var v = dict[key];
      if (v !== '' && v != null) return v;
    }
    return null;
  }

  function t(key, fallback) {
    var v = lookup(strings[lang], key);
    if (v == null) v = lookup(strings[DEFAULT], key);
    return v != null ? v : (fallback != null ? fallback : key);
  }

  function apply(root) {
    var scope = root || document;
    var i, el, key, n;
    n = scope.querySelectorAll('[data-i18n]');
    for (i = 0; i < n.length; i++) {
      el = n[i];
      key = el.getAttribute('data-i18n');
      el.textContent = t(key, el.textContent);
    }
    n = scope.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < n.length; i++) {
      el = n[i];
      key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key, el.innerHTML);
    }
  }

  function syncLangUI() {
    var flag = document.getElementById('tm-lang-flag');
    if (flag) flag.setAttribute('src', 'img/flags/' + lang + '.svg');
    var code = document.getElementById('tm-lang-code');
    if (code) code.textContent = lang.toUpperCase();
    var items = document.querySelectorAll('.tm-lang-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', items[i].getAttribute('data-lang') === lang);
    }
  }

  function setLang(next, persist) {
    if (!inList(next)) next = DEFAULT;
    var changed = next !== lang;
    lang = next;
    document.documentElement.setAttribute('lang', next);
    if (persist !== false) {
      try { window.localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    }
    var html = document.documentElement;
    var tKey = html.getAttribute('data-i18n-title');
    if (tKey) document.title = t(tKey);
    var mKey = html.getAttribute('data-i18n-meta');
    if (mKey) {
      var m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', t(mKey));
    }
    apply(document);
    syncLangUI();
    if (changed) {
      for (var i = 0; i < listeners.length; i++) listeners[i](next);
    }
    return next;
  }

  function onChange(fn) {
    if (typeof fn === 'function') listeners.push(fn);
  }

  // Ride content (title / location / description) lives in data/videos.js,
  // with per-language copies in the entry's `i18n` field. Missing pieces
  // fall back to the English values.
  function rideText(v) {
    var alt = (v && v.i18n && v.i18n[lang]) || {};
    return {
      title: alt.title || (v && v.title) || '',
      location: alt.location || (v && v.location) || '',
      description: alt.description || (v && v.description) || ''
    };
  }

  function bindLangSwitcher() {
    var items = document.querySelectorAll('.tm-lang-item');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function (e) {
        e.preventDefault();
        setLang(this.getAttribute('data-lang'));
      });
    }
  }

  function init() {
    lang = resolve();
    setLang(lang, false);
    bindLangSwitcher();
  }

  window.TM = {
    SUPPORTED: SUPPORTED,
    DEFAULT: DEFAULT,
    get lang() { return lang; },
    t: t,
    setLang: setLang,
    onChange: onChange,
    rideText: rideText,
    strings: strings
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
