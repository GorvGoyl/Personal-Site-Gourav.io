---
layout: "postLayout"
title: "I received first-ever donation on my open-source side project and it felt great!"
desc: "I decided to build an extension for VSCode. That would add handy buttons for many common commands like save file, format file, show opened files etc."
date: "11-12-2020"
---

import { Img, A } from "@/components/tags.tsx";
import img from "./og.jpg";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";

I use VSCode as my go-to editor for anything code. When I first discovered it in 2016, I really liked how it can almost be fully customized as per the likes. Well, almost, because there was no way you could add or configure any buttons on the top side of the editor. FYI, this is possible in many popular IDEs like IntelliJ, Eclipse, Visual Studio, and even Notepad++. I was more of a mouse-guy back then so the lack of GUI buttons was hindering my so called _developer productivity_.

I decided to build an extension for this. That would add handy buttons for many common commands like save file, format (beautify) file, show opened files list, etc. To build this, I followed VSCode extension development docs and learned typescript along the way. I named it [Shortcut Menu Bar](https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar).

<Img src={img1} alt="" caption="Shortcut Menu Bar" />

Fast-forward to 2020, and it got over 10k+ downloads and multiple 5-star ratings. I guess I wasn't the only mouse-guy out there.  
Out of Covid boredom, I decided to put a donate button to see what happens. I explored few platforms to create donation links like buymeacoffee.com (charges 5% fee), patreon.com (more geared towards recurring donations, 5% fee), PayPal (UI sucks), Ko-Fi.com (0% fee and nice clean UI).

I made a free account on ko-fi.com, linked my PayPal account, and created a donation link. I added that link to the extension description.

<Img src={img2}  caption="Buy me a coffee" />

And guess what? someone donated 5$.

<Img src={img3} alt="" caption="donation via ko-fi.com" />

I know I know, it's not that big amount, but somebody put an effort to make that transaction means he cared about it and found it useful.
I hope it inspires people who want to contribute and build stuff in the FOSS (Free and Open-Source Software) community. It's so captivating that the whole tech industry relies (and thrives) on open source software made by people in their free time.  
You can explore the source code of `Shortcut Menu Bar` on [Github](https://github.com/GorvGoyl/Shortcut-Menu-Bar-VSCode-Extension).
