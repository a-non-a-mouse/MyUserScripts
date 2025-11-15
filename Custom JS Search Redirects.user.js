// ==UserScript==
// @name         Custom JS Search Redirects
// @description  Redirect Safari searches to custom search engines.  Using JS because Safari is choking on domain redirects
// @match        https://www.google.com/search*
// @run-at       document-start
// ==/UserScript==

function parseDatesFromSearchTerm(searchTerm) {
  let match;
  const dateRangeRegex = /(\d{1,2}\/\d{1,2})-(\d{1,2}\/\d{1,2})/;

  if ((match = searchTerm.match(dateRangeRegex))) {
    const startDate = match[1];
    const endDate = match[2];
    const cleanedSearchTerm = searchTerm.replace(dateRangeRegex, '').trim();
    const today = new Date();
    const currentYear = today.getFullYear();

    const parseDate = (dateStr) => {
      const [month, day] = dateStr.split('/').map(Number);
      const date = new Date(currentYear, month - 1, day, 12, 0, 0, 0);

      if (date < today) {
        date.setFullYear(currentYear + 1);
      }

      return date;
    };

    const startDateObj = parseDate(startDate);
    const endDateObj = parseDate(endDate);

    return { searchTerm: cleanedSearchTerm, dates: [startDateObj, endDateObj] };
  }

  return { searchTerm, dates: null };
}

function getDateQueryParams(
  dates,
  fromDateParam = 'checkin',
  toDateParam = 'checkout',
  dateFormatter = (date) => date.toISOString().split('T')[0]
) {
  if (!dates) {
    return '';
  }
  const [checkin, checkout] = dates;

  return `${fromDateParam}=${dateFormatter(
    checkin
  )}&${toDateParam}=${dateFormatter(checkout)}`;
}

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
    air: (inputSearchTerm) => {
      const { searchTerm, dates } = parseDatesFromSearchTerm(inputSearchTerm);
      const transformed = searchTerm.replace(/,\s*/, '--').replace(/\s+/g, '-');
      const url = `https://www.airbnb.com/s/${transformed}/homes?adults=1&${getDateQueryParams(
        dates
      )}`;

      return url;
    },
    b: (inputSearchTerm) => {
      const { searchTerm, dates } = parseDatesFromSearchTerm(inputSearchTerm);
      const url = `https://www.booking.com/searchresults.html?ss=${searchTerm}&group_adults=1&no_rooms=1&group_children=0&${getDateQueryParams(
        dates
      )}`;

      return url;
    },
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
    const regex = new RegExp(`^${prefix}(?: (.+))?$`);
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
