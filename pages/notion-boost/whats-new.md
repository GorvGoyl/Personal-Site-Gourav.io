---
layout: "projectLayout"
title: "Notion Boost - What's new?"
desc: "See what's new in the latest update of Notion Boost browser extension"
date: "09-12-2020"
og: "notion-boost/img/og.png"
---

import { Img, A } from "@/components/tags";
import { Title, Social,NavbarNotion } from "@/components/notionBoost";

import og from "./img/og.png";
import logo from "./img/logo.png";

<Title logo={logo} txt="Notion Boost" homeURL = "/notion-boost" />

<NavbarNotion />

## What's new in this update ✨

### v2.0

#### [Announcement]:

I've been working on this extension since last year and I realized that building and maintaining a high-quality extension on top of an ever-changing product (Notion) requires a lot of skill and time.  
Having said that, I will continue to work on this extension and I need your support.  
All the existing features will remain free to use. Going forward there will be 2 types of new features that come to this extension: the first ones which will be completely free and others that will come under the `pro` tag.  
All `pro` features can be unlocked for lifetime by paying a one-time fee ($5). Please consider this as a means to support your developer. This will encourage me to further maintain this extension and introduce new features.

Payment can be done from inside the Notion Boost extension to use `pro` features. You don't need to pay again for `pro` features even when you use this extension on different browsers or uninstall/reinstall this extension later. If you have any questions or feedback please reach out to me at hey@gourav.io.

> Update: Payment issue has been resolved. Users should be able to buy Notion Boost now.

Now back to the exciting stuff! I added many features ✔ and fixed bugs 🐞 in this release:

- ✔ **Show code line numbers**  
  Added option to show line numbers for code blocks.

- ✔ **Enable spellcheck inside code blocks**  
  Added option to show squiggly red lines for any spelling mistakes inside code blocks.

- ✔ **Disable popup when pasting links**  
  Added option to disable popup which comes when pasting any external URL into Notion page.

- ✔ **Hide backlinks**  
  Added option to hide backlinks section from all pages.

- ✔ **Hide notification icon** `pro`  
  Hide red notification icon from sidebar when it's in closed state and hide notification number from tab title.
- ✔ **Add more height to page** `pro`  
  Add more height to page by hiding top padding, image cover, & icon.

- 🐞 In outline section, when heading length is too long full heading text will be shown on mouse hover.
- 🐞 "Small text for all pages" setting will work for preview pages also.
- 🐞 "Hide comments section" setting will work for preview pages also.
- 🐞 Emoji in page headings will also reflect in "Outline" section.
- 🐞 Fixed Slash menu not hiding in some cases.

Added [privacy policy](https://gourav.io/notion-boost#privacy-policy) section.  
tldr; Notion Boost extension does not store or send any data from your Notion account.

---

<Social/>

---

## Previous updates

### v1.8

- Broke down `small text & full width` setting into 2 seperate settings `Set full width for all pages` and `Set small text for all pages`. Thanks for feedback.
- Full text on hover will trigger after some delay. Thanks for feedback.
- Full text on hover is also supported for timeline view.
- Fixed bug where NB settings were being reset after any drag-drop action in page.

### v1.7

Added new features 🎉

- **Show full text on hover:**  
   Show full text in table cells on mouse hover.
- **Hide 'Hidden columns' in board view:**  
  Truly hide 'Hidden columns' in Kanban board view.
- **Left align images:**  
   Align document images to left instead of center.

**Other info:**

- Reached 2k+ downloads within 3 months of launch in Chrome store 🙌. Thank you all!
- Fixed bug: slash menu wasn't hiding after space in some cases.

### v1.6

Added 3 new features 🎉

- 'Scroll to top' button:  
  Added button at the bottom-right corner of page for scrolling back to top. Quite useful for lengthy pages. The button will be visible only when the page has scrolled down a bit.
- Close Slash command menu after space:  
  Slash command menu which appears when pressing '/' key will be closed back by pressing the space key.
- Don't show Slash command menu when pressing '/':  
  Don't show the Slash command menu when pressing '/' key. Slash command menu will still be shown by clicking + ⁝⁝ icon. This setting can't be enabled along with 'Close Slash command menu after space' and vice-versa.
- Fixed bug where the outline wasn't visible for 2 column headings.

### v1.5

- Small text & Full width for all pages:  
  Option to set small text and full width for all pages by default. This locally adjusts the text and width without clicking on the Notion page toggles. So no page change is saved to the server.
- Hide comments section from all pages. Useful when working solo.

### v1.0

Birth of this extension 🐣

- Show Outline:  
  Show sticky outline (table of contents) for pages that have headings or sub-headings. The outline will be shown on the right side of the page. Very useful for navigating a page with lots of content.
- Hide floating help button from all pages. This button is located on the bottom-right corner of pages.
- Bolder text in dark mode:  
  Fix poorly recognizable bold text when using Notion in dark mode
