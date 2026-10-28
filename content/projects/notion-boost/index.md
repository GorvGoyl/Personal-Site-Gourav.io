---
title: "Notion Boost - Browser extension to make Notion more productive with tons of features"
desc: "Boost Notion productivity with 20+ customizations like a sticky outline, small text and full width for all pages, a scroll to top button, hiding the slash command menu, and more"
date: "09-12-2020"
desktopOutline: true
---

import logo from "./img/logo.svg";
import boldertext from "./img/boldertext.gif";
import commenthide from "./img/commenthide.gif";
import disableslashmenu from "./img/disableslashmenu.gif";
import hideslash from "./img/hideslash.gif";
import outline from "./img/outline.gif";
import scrollbtn from "./img/scrollbtn.gif";
import showHoverText from "./img/showHoverText.gif";
import leftAlignImage from "./img/leftAlignImage.gif";
import hideHiddenColumns from "./img/hideHiddenColumns.gif";
import disablepopup from "./img/disablepopup.gif";
import hidebacklinks from "./img/hidebacklinks.gif";
import hidenotification from "./img/hidenotification.gif";
import moreheight from "./img/moreheight.gif";
import codelines from "./img/codelines.jpg";
import spellcheck from "./img/spellcheck.jpg";
import hideoutline from "./img/hideoutline.gif";
import openfullpage from "./img/openfullpage.gif";
import narrowspace from "./img/narrowspace.gif";
import indentation_lines from "./img/indentation_lines.jpg";
import image_frame from "./img/image_frame.gif";

<Title logo={logo} txt="Notion Boost" homeURL = "/notion-boost" />

<span className="lead">
  Chrome and Firefox extension to make [Notion](https://www.notion.com) more productive and less distracting. Add 20+ customizations to Notion like a sticky
  outline, small text & full width by default, a scroll to top button, hiding the slash
  command menu, and more.
</span>

<Badges/>

<br/>
<br/>

<NavbarNotion />

## ⬇ Download

- [Chrome / Brave / Edge extension](#chrome--brave--chromium)
- [Firefox addon](#firefox)

## ✅ Currently added features

<details>
  <summary> <h4>Show sticky outline</h4></summary>
  
Show sticky outline (table of contents) for pages that have headings or sub-headings. The outline will be shown on the right side of the page. Very useful for navigating a page with lots of content.

It lists every heading, even on long pages where Notion shows only part of the page at a time. Click a heading to jump to it, or click 'Outline' at the top of the outline to scroll back to the top of the page.

<Img src={outline} type="ss" />

You can also temporarily hide the outline on the current page with the 'Outline' button at the top of the page (until the page refresh). To turn it off on all pages, use the extension's popup.

<Img src={hideoutline} loading="lazy" type="ss" />

</details>

<details>
  <summary> <h4>Hide Table of contents</h4></summary>

Hide the table of contents that Notion shows on the right side of pages with headings. Useful when you use Notion Boost's outline instead.

</details>

<details>
  <summary> <h4>Set small text for all pages</h4></summary>

Set small text for all pages by default. This locally adjusts the text without clicking on the Notion page toggles.

</details>
<details>
  <summary> <h4>Set full width for all pages</h4></summary>

Set full width for all pages by default. This locally adjusts the width without clicking on the Notion page toggles.

</details>
<details>
  <summary> <h4>'Scroll to top' button</h4></summary>

Adds a button at the bottom-right corner of the page for scrolling back to the top. Quite useful for lengthy pages. The button shows only once the page has scrolled down a bit.

<Img src={scrollbtn} loading="lazy" type="ss" />
</details>

<details>
  <summary> <h4>Disable AI menu when pressing space key</h4> </summary>

Don't show the Notion AI menu when pressing the space key on an empty line.

</details>

<details>
  <summary> <h4>Hide AI button from pages</h4> </summary>

Hide the floating Notion AI button from the bottom-right corner of pages.

</details>

<details>
  <summary> <h4>Show full text on hover</h4></summary>

Show full text in table cells on mouse hover.

<Img src={showHoverText} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Close Slash command menu after space</h4></summary>

Slash command menu which appears when pressing '/' key will be closed back by pressing the space key.

<Img src={hideslash} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Don't show Slash command menu when pressing '/'</h4></summary>

Don't show the Slash command menu when pressing '/' key. Slash command menu will still be shown by clicking + ⁝⁝ icon. This setting can't be enabled along with 'Close Slash command menu after space' and vice-versa.

<Img src={disableslashmenu} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Hide slash command placeholder</h4> </summary>

Hide the placeholder "Press '/' for commands…" on empty lines. Pressing '/' still opens the command menu.

</details>
<details>
  <summary> <h4>Hide 'Hidden columns' in board view</h4></summary>

Truly hide 'Hidden columns' in Kanban board view.

<Img src={hideHiddenColumns} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Left align media</h4></summary>

Align document images and videos to left instead of center.

<Img src={leftAlignImage} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Bolder text in dark mode</h4></summary>

Fix poorly recognizable bold text when using Notion in dark mode

<Img src={boldertext} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Hide comments section from all pages</h4></summary>

Comment section is useless when working solo

<Img src={commenthide} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Show code line numbers</h4></summary>

Show line numbers for code blocks

<Img src={codelines} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Enable spellcheck inside code blocks</h4></summary>

Show squiggly red lines for any spelling mistakes inside code blocks

<Img src={spellcheck} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Don't show popup menu when pasting external links</h4></summary>

Don't show popup menu i.e (dismiss, create bookmark, create embed) when pasting external URLs

<Img src={disablepopup} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Hide backlinks</h4></summary>

Hide backlinks section from all pages

<Img src={hidebacklinks} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Hide notification icon</h4></summary>

Hide red notification icon from sidebar when it's in closed state and hide notification number from tab title

<Img src={hidenotification} loading="lazy" type="ss" />
</details>
<details>
  <summary> <h4>Add more height to page</h4></summary>

Add more height to page by hiding top padding, image cover, & icon

<Img src={moreheight} loading="lazy" type="ss" />
</details>

<details>
  <summary> <h4>Open full pages instead of preview</h4></summary>

Bypass preview and open full pages of a table, board, etc. by default.

<Img src={openfullpage} loading="lazy" type="ss" />
</details>

<details>
  <summary> <h4>Narrow spacing between items</h4></summary>

Fit more content on screen by reducing space between items, i.e., headings, lists (bullet, checkbox, toggle list), etc.

<Img src={narrowspace} loading="lazy" type="ss" />
</details>

<details>
  <summary> <h4>Add indentation lines to lists</h4></summary>

Add vertical indentation lines to bullet and to-do lists.

<Img src={indentation_lines} loading="lazy" type="ss" />
</details>

<details>
  <summary> <h4>Add frame to images</h4></summary>

Add frame around images to make them easily noticeable on page.

<Img src={image_frame} loading="lazy" type="ss" />
</details>

> Missing something? suggest / feedback on [Github](https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues)

<span>See{" "}<Link href="/notion-boost/whats-new" title="https://gourav.io/notion-boost/whats-new">what's new</Link> in the latest update ✨</span>

## ⚙ How to use

Notion Boost works on notion.so, notion.com and public notion.site pages.

#### Chrome / Brave / Chromium

1. Install [Notion Boost Chrome extension](https://chromewebstore.google.com/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd).
2. Visit any notion page.
3. Click on the Notion Boost icon in the toolbar. Don't see it? Click the puzzle-piece Extensions icon and pin Notion Boost.
4. A popup menu will appear, you can toggle features from there. They apply right away.

#### Microsoft Edge

1. Visit [Notion Boost Chrome extension](https://chromewebstore.google.com/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd).
2. Allow Edge to add extensions from the Chrome Web Store.
3. Install Notion Boost extension.
4. Visit any notion page.
5. Click on the Notion Boost icon in the toolbar (or in the Extensions menu).
6. A popup menu will appear, you can toggle features from there.

#### Firefox

1. Install [Notion Boost Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/notion-boost/).
2. Visit any notion page.
3. Click on the Extensions button (puzzle piece) in the toolbar, then on Notion Boost. To keep its icon in the toolbar, choose "Pin to Toolbar" from its ⚙ menu there.
4. A popup menu will appear, you can toggle features from there.

---

## 🖤 Support

<Social />

---

## Help/Feedback

Please file a new issue on [Github](https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues) in case you have any feedback or suggestions.

## Who's the maker?

I'm [Gourav Goyal](https://gourav.io), a tech founder and productivity freak who relies heavily on Notion to organize things and manage work. I made this extension to make Notion more productive (and less distracting) by filling the gaps I feel the product has. I hope you find this extension helpful :)

## Privacy Policy

Notion Boost extension is an [open-source](https://github.com/GorvGoyl/Notion-Boost-browser-extension) project and has no ads, no analytics, no trackers, and no use of cookies. Furthermore, Notion Boost extension **does not store or send any data** from your Notion account. The outline reads the open page's headings from Notion itself, inside your browser.
