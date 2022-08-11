---
title: "Show Tailwind CSS color values in HEX format in dev tools"
desc: "Show Tailwind CSS color values in HEX format instead of rgba in dev tools"
date: "2022-05-29"
toc: false
mobileToc: false
---

import tailwind_color_before from "./tailwind_color_before.png";
import tailwind_color_after from "./tailwind_color_after.png";

This post is for all devs working on [Tailwind CSS](https://tailwindcss.com/).

If you inspect an element with Tailwind CSS color class, you will find an opacity CSS variable and a `rgba` color format. Few issues with this:

- no color preview, unlike the HEX format
- you can't use dev tools' built-in color picker to change the value, unlike the HEX format
- when copy-pasting, there's a dependency of a CSS variable (i.e. `--tw-text-opacity`), unlike the HEX format

That's how Tailwind CSS color values look in dev tools 👎:

<Img src={tailwind_color_before} type="ss" caption="so, what's the actual color value?" />

Let's fix this, so Tailwind always uses HEX format colors and avoids using CSS variables.

That's how it'd look 👍:

<Img src={tailwind_color_after} type="ss" caption="Easy to read and debug color value" />

Open `tailwind.config.css` file, [create one](https://tailwindcss.com/docs/configuration) if it doesn't exist:

Add `corePlugins:{...}` like below to it:

```js
module.exports = {
  theme: {
    extend: {
      // ...
    },
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [],
};
```

Note: It'll disable the feature where you could use the slash notation to change the opacity of background, text color, etc., e.g. `bg-red-500/10` for a red-500 background color with 10% alpha.
