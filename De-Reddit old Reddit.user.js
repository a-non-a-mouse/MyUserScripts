// ==UserScript==
// @name        De-Reddit old Reddit
// @description Blocks all reddit pages except for post pages, redirects to old.reddit.com, and removes everything except the post content itself.
// @match       *://*.reddit.com/*
// ==/UserScript==

// Only allow viewing reddit posts.  No browsing of any kind
if (!/\/(comments|media)(\/|\?)/.test(location.href)) {
    window.location = 'https://www.google.com';
}

if (!/(old\.reddit\.com|\/media\?)/.test(location.href)) {
    location.href = location.href.replace(/^https?:\/\/([^.]+\.)?reddit\.com/, 'https://old.reddit.com');
}

// remove subreddit stylesheet
document.querySelector('link[ref=applied_subreddit_stylesheet]')?.remove();

const style = document.createElement('style');

// remove all reddit "stuff".  Votes, header, footer, links to sub-reddits & profiles, commenting
style.textContent = `
.midcol, .infobar, .side, .footer-parent, .flair, #header, .score, .buttons, .thumbnail, .seo-comments-recommendations, .domain {
    display: none !important;
}
a:not(.expand, .choice, [id^=more_], .usertext a:not([href^="/u/"])) {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: inherit !important;
}`;

document.head.appendChild(style);
