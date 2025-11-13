// ==UserScript==
// @name         Custom JS Search Redirects
// @description  Redirect Safari searches to custom search engines.  Using JS because Safari is choking on domain redirects
// @match        https://www.google.com/search*
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const searchEngines = {
    a: 'https://www.amazon.com/s?k=%s',
    'a au': 'https://www.amazon.com.au/s?k=%s',
    'a be': 'https://www.amazon.com.be/s?k=%s',
    'a br': 'https://www.amazon.com.br/s?k=%s',
    'a ca': 'https://www.amazon.ca/s?k=%s',
    'a de': 'https://www.amazon.de/s?k=%s',
    'a es': 'https://www.amazon.es/s?k=%s',
    'a fr': 'https://www.amazon.fr/s?k=%s',
    'a it': 'https://www.amazon.it/s?k=%s',
    'a jp': 'https://www.amazon.co.jp/s?k=%s',
    'a uk': 'https://www.amazon.co.uk/s?k=%s',
    abnb: (searchTerm) => {
      const transformed = searchTerm
        .toLowerCase()
        .replace(/,\s*/, '--')
        .replace(/\s+/g, '-');
      return `https://www.airbnb.com/s/${transformed}/homes`;
    },
    b: 'https://www.booking.com/searchresults.html?ss=%s',
    m: 'https://www.google.com/maps/search/%s',
  };

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const query = params.get('q');

  for (const [prefix, urlTemplate] of Object.entries(searchEngines).sort(
    ([a], [b]) => {
      if (b.startsWith(a)) return 1;
      if (a.startsWith(b)) return -1;
      return b.length - a.length;
    }
  )) {
    const regex = new RegExp('^' + prefix + '(?: (.+))?$');
    const match = query.match(regex);

    if (match) {
      const searchTerm = match[1] || '';
      const redirectUrl =
        typeof urlTemplate === 'function'
          ? urlTemplate(searchTerm)
          : urlTemplate.replace('%s', encodeURIComponent(searchTerm));
      window.location.replace(redirectUrl);
      return;
    }
  }
})();
