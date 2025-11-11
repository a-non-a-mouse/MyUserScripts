// ==UserScript==
// @name        De-Reddit Reddit, Request Level
// @description Blocks all reddit pages except for post pages, redirects to old.reddit.com for posts
// @run-at      request
// ==/UserScript==

[
    {
        "id": 1,
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": {
                "url": "https://www.google.com"
            }
        },
        "condition": { 
            "urlFilter": "||reddit.com",
            "resourceTypes": ["main_frame"] 
        }
    },
    {
        "id": 2,
        "priority": 2,
        "action": {
            "type": "allow"
        },
        "condition": { 
            "urlFilter": "*reddit.com*/comments/*",
            "resourceTypes": ["main_frame"] 
        }
    },
    {
        "id": 3,
        "priority": 3,
        "action": {
            "type": "redirect",
            "redirect": {
                "regexSubstitution": "https://old.\\1"
            }
        },
        "condition": { 
            "regexFilter": "^https://www\\.(reddit\\.com/.*comments/.*)$",
            "resourceTypes": ["main_frame"] 
        }
    }
]