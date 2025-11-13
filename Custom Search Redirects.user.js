// ==UserScript==
// @name         Custom Search Redirects
// @description  Redirect Safari searches to custom search engines
// @match        https://www.google.com/search*
// @run-at       request
// ==/UserScript==

[
  {
    "id": 1,
    "priority": 9,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\2+site:reddit.com&tbs=qdr:\\1&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=r\\+-([hdwmy])\\+([^&]+)",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 2,
    "priority": 8,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\1+site:reddit.com&tbs=qdr:\\2&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=r\\+([^&]+)\\+-([hdwmy])",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 3,
    "priority": 7,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\1+site:reddit.com&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=r\\+([^&]+)",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 4,
    "priority": 6,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\2&udm=2&tbs=qdr:\\1&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=i\\+-([hdwmy])\\+([^&]+)",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 5,
    "priority": 5,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\1&udm=2&tbs=qdr:\\2&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=i\\+([^&]+)\\+-([hdwmy])",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 6,
    "priority": 4,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\1&udm=2&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=i\\+([^&]+)",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 7,
    "priority": 3,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\2&tbs=qdr:\\1&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=-([hdwmy])\\+([^&]+)",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 8,
    "priority": 2,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\1&tbs=qdr:\\2&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=([^&]+)\\+-([hdwmy])",
      "resourceTypes": ["main_frame"]
    }
  },
  {
    "id": 9,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": "https://www.google.com/search?q=\\1&hl=en&lr=lang_en"
      }
    },
    "condition": {
      "regexFilter": "^https://www\\.google\\.com/search\\?client=safari.*[&?]q=([^&]+)",
      "resourceTypes": ["main_frame"]
    }
  }
]
