---
title: "Notion Boost - What's new?"
desc: "See what's new in the latest update of Notion Boost browser extension"
date: "09-12-2020"
desktopOutline: true
mobileOutline: false
---

import logo from "../img/logo.png";

<Title logo={logo} txt="Notion Boost" homeURL = "/notion-boost" />

## Notion Boost Extension Just Got Updated 🍾

### v3.3.0

<TagDate>Jan 2024</TagDate>

**NEW FEATURES 🎉**

**Disable AI menu when pressing space key**  
 Option to disable AI command menu when pressing space key.

**FIXED BUGS 🐞**

Fixed issues related to features such as enabling full width by default, hiding the slash menu, removing the notification badge, increasing page height, and setting small text as the default, among others.

👉 Report issues / suggest feature / provide feedback: https://github.com/GorvGoyl/Notion-Boost-browser-extension/issues

---

<Social/>

---

## Previous updates

### v3.2.0

<TagDate>Jan 2023</TagDate>

**🎉 NEW FEATURES:**

- **Hide slash command placeholder**  
  Hide placeholder "Type '/' for commands" while retaining the functionality.

- **Scroll to top from the Outline**  
  Clicking on "Outline" header will scroll the page to the top.

- **Narrow spacing between all items**  
  Earlier it was applicable only to bullet lists and checklists. Now it will reduce the spacing between all items like headings, lists, etc, to fit more content on the screen.

### v3.1.0

<TagDate>May 2022</TagDate>

**🎉 NEW FEATURES:**

- **Add frame to images**  
  Add frame around images to make them easily noticeable on page

**🐞 FIXED BUGS :**

- fix: full width causing layout issues in inline databases and tables
- fix: some features not working on dark mode
- fix: some settings not turning on

### v3.0.8

<TagDate>Feb 2022</TagDate>

**🎉 NEW FEATURES:**

- `Left align media` will also align videos along with images

**💪 IMPROVEMENTS:**

- Outline improvements

  - wrap outline to show full text
  - smaller text and wider outline to fit more content

- better performance

**🐞 FIXED BUGS :**

- fix: full width not working
- fix: Removed flicker from slash command
- fix: Add more height to page no longer hides icons and has different padding/spacing.
- fix: Issue with slash command
- fix: slash menu not working in tables
- fix: Small Text Default does not work on page title

### v3.0

<TagDate>Sep 2021</TagDate>

- ✔ **Add indentation lines to lists**  
  Add vertical indentation lines to bullet and to-do lists.

- ✔ **Make Rollup URLs clickable**  
  Make URLs in Rollup property clickable. Works for both: table and as page properties.

- ✔ **Support for \*.notion.site domain**  
  Notion Boost is now supported on all _\*.notion.site_ URLs.

- 🐞 Fixed bug where `Add more height to page` wasn't working properly.
- 🐞 Fixed bug where headings with links were not shown in the `outline`.
- 🐞 Fixed bug where `Show full text on hover` wasn't working for URL types in table.
- 🐞 Fixed bug where `Full width for all pages` wasn't working on inline tables.
- 🐞 Fixed bug where `Full width for all pages` feature wasn't working with Grammarly extension.

### v2.2

<TagDate>June 2021</TagDate>

- ✔ **Added search box**  
  The features list is growing, and finding a particular feature could be PITA, so I added a search box to find features quickly.

- ✔ **Open full pages instead of preview**  
  Long awaited feature is finally here! Now you can bypass preview and open full pages of a table, board, etc. by default.

- ✔ **Handy button to quickly hide Outline on current page**  
  Sometimes we need to hide the outline for just the current page, and for that, we need to go to the extension settings and then disable the outline feature.  
  Now, there is a new `outline` button shown on pages which will temporarily hide the outline on the current page (until the page refresh). And of course, You can permanently disable the outline feature for all pages from the extension settings.

- ✔ **Narrow spacing between list items** `pro`  
  Fit more content on screen by reducing space between items in a list, i.e., bullet, checkbox, toggle list, etc.

- 🐞 Fixed bug where emojis 👀 weren't showing in outline view.
- 🐞 Fixed bug where the outline wasn't working for the Korean language.
- 🐞 'Disable popup menu when pasting external links' will now work for preview pages also.

### v2.0

I added many features ✔ and fixed bugs 🐞 in this release:

- ✔ **You can now install Notion Boost on Microsoft Edge**  
  More details: https://gourav.io/notion-boost#microsoft-edge

- ✔ **Show code line numbers**  
  Added option to show line numbers for code blocks.

- ✔ **Enable spellcheck inside code blocks**  
  Added option to show squiggly red lines for any spelling mistakes inside code blocks.

- ✔ **Disable popup when pasting external links**  
  Added option to disable popup which comes when pasting any external URL into Notion page.

- ✔ **Hide backlinks for all pages**  
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

### [Announcement]

<TagDate>May 2021</TagDate>

I've been working on this extension since last year (2020), and I realized that building and maintaining a high-quality extension on top of an ever-changing product (Notion) requires a lot of skill and time.  
Having said that, I will continue to work on this extension, and I need your support.  
All the existing features will remain free to use. Going forward, there will be two types of new features that come to this extension: the first ones, which will be completely free, and others that will come under the `pro` tag.  
**You can unlock all `pro` features for a lifetime by making a one-time payment.** Please consider this as a means to support your developer. It will encourage me to maintain this extension further and introduce new features.

**You can make payment from inside the Notion Boost extension to use all `pro` features.** You don't need to pay again for `pro` features even when you use this extension on different browsers or uninstall/reinstall this extension later.

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
