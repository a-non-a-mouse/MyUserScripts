// ==UserScript==
// @name         Custom JS Search Redirects
// @description  Redirect Safari searches to custom search engines.  Using JS because Safari is choking on domain redirects
// @match        https://www.google.com/search*
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  const searchEngines = {
    'a fr': 'https://www.amazon.fr/s?k=%s',
    'a de': 'https://www.amazon.de/s?k=%s',
    'a jp': 'https://www.amazon.co.jp/s?k=%s',
    'a uk': 'https://www.amazon.co.uk/s?k=%s',
    'a se': 'https://www.amazon.se/s?k=%s',
    'a': 'https://www.amazon.com/s?k=%s',
  };

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const query = params.get('q');

  for (const [prefix, urlTemplate] of Object.entries(searchEngines)) {
    const regex = new RegExp('^' + prefix + ' (.+)$');
    const match = query.match(regex);
    
    if (match) {
      const searchTerm = match[1];
      const redirectUrl = urlTemplate.replace('%s', encodeURIComponent(searchTerm));
      window.location.replace(redirectUrl);
      return;
    }
  }
})();
