---
layout: "projectLayout"
title: "Notion Boost - Browser extension to make Notion more productive and less distractive"
desc: "Boost Notion productivity with 15+ customizations like outline,small text full width for all,back to top button,hide slash command menu etc"
date: "09-12-2020"
og: "notion-boost/img/og.png"
---

import { Img, A } from "@/components/tags";

import { Title, Social, NavbarNotion } from "@/components/notionBoost";
import Link from "next/link";

import og from "./img/og.png";
import logo from "./img/logo.svg";
import boldertext from "./img/boldertext.gif";
import commenthide from "./img/commenthide.gif";
import disableslashmenu from "./img/disableslashmenu.gif";
import header from "./img/header.jpg";
import helpbtn from "./img/helpbtn.gif";
import hideslash from "./img/hideslash.gif";
import outline from "./img/outline.gif";
import firefox_icon from "./img/firefox_icon.png";
import scrollbtn from "./img/scrollbtn.gif";
import toggle from "./img/toggle.gif";
import showHoverText from "./img/showHoverText.gif";
import leftAlignImage from "./img/leftAlignImage.gif";
import hideHiddenColumns from "./img/hideHiddenColumns.gif";
import disablepopup from "./img/disablepopup.gif";
import hidebacklinks from "./img/hidebacklinks.gif";
import hidenotification from "./img/hidenotification.gif";
import moreheight from "./img/moreheight.gif";
import codelines from "./img/codelines.jpg";
import spellcheck from "./img/spellcheck.jpg";

<Title logo={logo} txt="Notion Boost" homeURL = "/notion-boost" />

<p className="lead">
  Chrome and Firefox extension to make Notion more productive and less distractive. Add 15+ customizations to Notion like sticky
  outline, small text & full width by default,scroll to top button, hide slash
  command menu, and more.
</p>
<NavbarNotion />

## ⬇ Download

- [Chrome / Brave / Chromium extension](#chrome--brave--chromium)
- [Firefox addon](#firefox)

## ✅ Currently added features

- [Show sticky outline](#-show-sticky-outline)
- [Set small text for all pages](#-set-small-text-for-all-pages)
- [Set full width for all pages](#-set-full-width-for-all-pages)
- ['Scroll to top' button](#-scroll-to-top-button)
- [Show full text on hover](#-show-full-text-on-hover)
- [Close Slash command menu after space](#-close-slash-command-menu-after-space)
- [Don't show Slash command menu when pressing '/'](#-dont-show-slash-command-menu-when-pressing-)
- [Hide floating help button from all pages](#-hide-floating-help-button-from-all-pages)
- [Hide 'Hidden columns' in board view](#-hide-hidden-columns-in-board-view)
- [Left align images](#-left-align-images)
- [Bolder text in dark mode](#-bolder-text-in-dark-mode)
- [Hide comments section from all pages](#-hide-comments-section-from-all-pages)
- [Show code line numbers](#-show-code-line-numbers)
- [Enable spellcheck inside code blocks](#-enable-spellcheck-inside-code-blocks)
- [Don't show popup menu when pasting external links](#-dont-show-popup-menu-when-pasting-external-links)
- [Hide backlinks](#-hide-backlinks)
- [Hide notification icon](#-hide-notification-icon)
- [Add more height to page](#-add-more-height-to-page)

- Missing something? [suggest / feedback](https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues/new)

<p>See{" "}
<Link href="/notion-boost/whats-new">
<a className="" title="https://gourav.io/notion-boost/whats-new">
what's new</a></Link> in latest update ✨</p>

## ⚙ How to use

#### Chrome / Brave / Chromium

1. Install [Notion Boost Chrome extension](https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd)
2. Visit any notion page.
3. Click on the extension icon (clickable **only** when you are on a notion page).
4. A popup menu will appear, you can toggle features from there.

#### Firefox

1. Install [Notion Boost Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/notion-boost/)
2. Visit any notion page.
3. Click on the extension icon (it will be visible inside URL bar **only** when you are on a notion page).
4. A popup menu will appear, you can toggle features from there.

<Img src={firefox_icon} type="ss" />

---

### 🖤 Support

<!-- 💲 Support continuous development [Buy me a Coffee](https://ko-fi.com/gorvgoyl)

<p align="center">
  <a href="https://ko-fi.com/gorvgoyl">
  <img src="/bmc.png" width="200" alt="Buy me a Coffee"/>
  </a>
</p> -->

<Social />

---

## Features details

### ✔ Show sticky outline

Show sticky outline (table of contents) for pages that have headings or sub-headings. The outline will be shown on the right side of the page. Very useful for navigating a page with lots of content.

<Img src={outline} type="ss" />

### ✔ Set small text for all pages

Set small text for all pages by default. This locally adjusts the text without clicking on the Notion page toggles.

### ✔ Set full width for all pages

Set full width for all pages by default. This locally adjusts the width without clicking on the Notion page toggles.

### ✔ 'Scroll to top' button

Added button at the bottom-right corner of page for scrolling back to top. Quite useful for lengthy pages. The button will be visible only when the page has scrolled down a bit.

<Img src={scrollbtn} type="ss" />

### ✔ Show full text on hover

Show full text in table cells on mouse hover.

<Img src={showHoverText} type="ss" />

### ✔ Close Slash command menu after space

Slash command menu which appears when pressing '/' key will be closed back by pressing the space key.

<Img src={hideslash} type="ss" />

### ✔ Don't show Slash command menu when pressing '/'

Don't show the Slash command menu when pressing '/' key. Slash command menu will still be shown by clicking + ⁝⁝ icon. This setting can't be enabled along with 'Close Slash command menu after space' and vice-versa.

<Img src={disableslashmenu} type="ss" />

### ✔ Hide floating help button from all pages

This button is located on the bottom-right corner of pages.

<Img src={helpbtn} type="ss" />

### ✔ Hide 'Hidden columns' in board view

Truly hide 'Hidden columns' in Kanban board view.

<Img src={hideHiddenColumns} type="ss" />

### ✔ Left align images

Align document images to left instead of center.

<Img src={leftAlignImage} type="ss" />

### ✔ Bolder text in dark mode

Fix poorly recognizable bold text when using Notion in dark mode

<Img src={boldertext} type="ss" />

### ✔ Hide comments section from all pages

Comment section is useless when working solo

<Img src={commenthide} type="ss" />

### ✔ Show code line numbers

Show line numbers for code blocks

<Img src={codelines} type="ss" />

### ✔ Enable spellcheck inside code blocks

Show squiggly red lines for any spelling mistakes inside code blocks

<Img src={spellcheck} type="ss" />

### ✔ Don't show popup menu when pasting external links

Don't show popup menu i.e (dismiss, create bookmark, create embed) when pasting external links

<Img src={disablepopup} type="ss" />

### ✔ Hide backlinks

Hide backlinks section from all pages

<Img src={hidebacklinks} type="ss" />

### ✔ Hide notification icon

Hide red notification icon from sidebar when it's in closed state and hide notification number from tab title

_(It's a `pro` feauture. [learn more.](https://gourav.io/notion-boost/whats-new#announcement))_

<Img src={hidenotification} type="ss" />

### ✔ Add more height to page

Add more height to page by hiding top padding, image cover, & icon

_(It's a `pro` feauture. [learn more.](https://gourav.io/notion-boost/whats-new#announcement))_

<Img src={moreheight} type="ss" />

> Missing something? [suggest / feedback](https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues/new)

## Who made this?

Notion Boost is made by Gourav Goyal (https://gourav.io). I am a developer, productivity freak, and an ex-founder who relies heavily on Notion to organize things and manage work. I made this extension to make Notion more productive (and less distractive) by filling the gaps which I feel are lacked in Notion.

## Privacy Policy

Notion Boost extension has no ads, no analytics, no trackers, and no use of cookies. Furthermore, Notion Boost extension **does not store or send any data** from your Notion account.
