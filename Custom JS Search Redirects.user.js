// ==UserScript==
// @name         Custom JS Search Redirects
// @description  Redirect Safari searches to custom search engines.  Using JS because Safari is choking on domain redirects
// @match        https://www.google.com/search*
// @run-at       document-start
// ==/UserScript==

(() => {
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
    air: 'https://www.airbnb.com/s/%s/homes?adults=1&checkin=%d1&checkout=%d2',
    b: 'https://www.booking.com/searchresults.html?ss=%s&group_adults=1&no_rooms=1&group_children=0&checkin=%d1&checkout=%d2',
    m: 'https://www.google.com/maps/search/%s',
    mh: 'https://www.google.com/maps/search/hotels+near+%s',
    t: 'https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate',
    yt: 'https://www.youtube.com/results?search_query=%s',
  };

  function parseDatesFromSearchTerm(searchTerm) {
    let date1 = '';
    let date2 = '';

    const today = new Date();
    const currentYear = today.getFullYear();

    const parseToYYYYMMDD = (mm, dd, yyyy = currentYear) => {
      const date = new Date(yyyy, mm - 1, dd, 12, 0, 0, 0);

      if (date < today) {
        date.setFullYear(currentYear + 1);
      }

      return date.toISOString().split('T')[0];
    };

    const dateRangeRegex =
      /(?:(\d{4})[-\/])?(\d{1,2})[-\/](\d{1,2})[-\/](?:(\d{4})[-\/])?(\d{1,2})[-\/](\d{1,2})/;
    const match = searchTerm.match(dateRangeRegex);
    if (match) {
      date1 = parseToYYYYMMDD(match[2], match[3], match[1]);
      date2 = parseToYYYYMMDD(match[5], match[6], match[4]);
      if (date2 < date1) {
        date2 = parseToYYYYMMDD(match[5], match[6], currentYear + 1);
      }
      const cleanedSearchTerm = searchTerm.replace(dateRangeRegex, '').trim();

      return { searchTerm: cleanedSearchTerm, date1, date2 };
    }

    return { searchTerm, date1, date2 };
  }

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
    const regex = new RegExp(`^${prefix}(?: (.+))?$`);
    const match = query.match(regex);

    if (match) {
      const inputSearchTerm = match[1] || '';
      const { searchTerm, date1, date2 } =
        parseDatesFromSearchTerm(inputSearchTerm);

      let redirectUrl = urlTemplate
        .replace('%s', encodeURIComponent(searchTerm))
        .replace('%d1', date1)
        .replace('%d2', date2);

      window.location.replace(redirectUrl);
      return;
    }
  }
})();
