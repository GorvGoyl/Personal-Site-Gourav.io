---
title: "My simple Github project went Viral"
desc: "I made a simple project which got spread in various tech communities and social media. Github featured it in 'Trending repositories of day' section"
date: "2021-04-12"
toc: true
---

import { TweetEmbed } from "@/components/twitterEmbed.tsx";

import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import img7 from "./7.png";
import img8 from "./8.png";
import img9 from "./9.png";
import img10 from "./10.png";
import img11 from "./11.jpg";
import img12 from "./12.jpg";

Last month (Mar'21), I made a simple project which got spread in various tech communities and social media. On Github, It reached from 0 to 4k+ stars and 200+ forks within 7 days. Github featured it in _Trending repositories of day_ section for straight 5 days or so.

<Img src={img1} type="ss" className="md:w-2/3" caption="Trending on Github - 13 Mar'21" />

> **Clone Wars**  
> 70+ open-source clones or alternatives of popular sites like Airbnb, Amazon, Instagram, Netflix, Tiktok, etc. List contains source code, demo links, tech stack, and, GitHub stars count.
>
> Project link: https://gourav.io/clone-wars  
> Github link: https://github.com/gorvgoyl/clone-wars

## Motivation behind this project

I'm a techie and many a time I lurk in popular programming communities on Reddit like r/webdev, r/reactjs, etc. to see what other devs are building or if any new JS framework is popping up. I noticed many devs were making clones of popular sites like Instagram, Trello, Spotify, etc. as part of their learning purpose, and they were sharing it with others to get feedback in terms of code quality and best practices.

<Img src={img11} type="ss"  caption="devs sharing their projects in r/reactjs" />

These clones were scattered all over the communities. So, I thought why not create a single list of all these clones which people can bookmark and revisit later for whatever purpose they need it for. Honestly, I wasn't entirely sure at that time whether it would provide any good value to others or not. So, there was a way to find out that is to build it myself!

## How I built it

### 1. Scraping Reddit

I wanted to get all posts that contain the "clone" keyword. I initially did it with default reddit search _reddit.com/r/reactjs/search/?q=clone&source=recent&restrict_sr=1&sort=new_, (means _look for all posts in `reactjs` subreddit with "clone" keyword and sort by new_). It returned all posts, but that also included low-quality posts with 0 upvotes, questions on how to build a specific clone, etc. It would be a headache figuring out good clone projects from that dump. So, I used <A href="https://redditsearch.io" new={1} text="redditsearch.io"/> instead, which provides advanced Reddit filtering like return posts that have at least 10 upvotes, posted during a specific timeline, etc.

Next, I made a list of all these clones, their Github repo, demo links, tech stack. It was manual work.

Additionally, I googled "open-source alternatives" and found some fully-functional clones of Slack, Airtable, Bit.ly, Evernote, Google analytics, etc. I added these to the list.

> So, now there are 2 kinds of projects on the list. The first ones look quite similar (UI-wise) but aren't fully-functional and the other ones which are fully-functional but UI is different (to avoid copyright issues, etc).

#### Naming the project

I named my project after Star Wars 2008 TV Series: "The Clone Wars" and also kept the similar color scheme of OG image.

<div className="flex items-baseline space-x-2">
<Img src={img2} type="ss"  caption="Star Wars 2008 TV Series: The Clone Wars" />
<Img src={img3} type="ss"  caption="Clone Wars: Github project" />
</div>

### 2. Pretty view of table

I've worked with markdown before, but it was the first time I was working with markdown table and realized table view sucks on Github project page. Especially, if it's a long table with multiple columns. I needed to make it look better (sticky header) which meant I needed to deploy this project somewhere else. I still needed it to be on Github so that others can collaborate easily. I decided to host it on my personal site https://gourav.io.

My site is built using NextJS, and I was already using markdown (mdx) to write blog posts, so it was just a matter of copy-pasting markdown file from my Github project to new page https://gourav.io/clone-wars. And on top of it, I use Tailwind CSS with "typography" plugin which makes tables pleasing to read along with other text.

I thought of automating it to the next level i.e. if any change happens to the Github project or someone's PR gets merged, update the same on my site https://gourav.io/clone-wars. But, decided not to over-engineer it as changes weren't that frequent.

## Making it Viral

I posted in 2-3 subreddits and it took off 🚀

<Img src={img4} type="ss"  caption="reddit.com/r/reactjs" />
<Img src={img5} type="ss"  caption="reddit.com/r/webdev" />

## Serendipity

Once the project gained some popularity many developers started raising PR to add their clone projects to the list. When I started it had around ~75 clones, but now it's more than 120+ and I still get new PR every now and then.

I got to know from a friend that it was picked by _React Newsletter_. Such a serendipitous moment.

People were tweeting about _Clone Wars_. @nickbulljs suggested a neat idea for devs who are looking to get hired.

<TweetEmbed tweetId="1373573194846765061"/>

> I got 150+ new followers after this tweet :o

And one person donated $5 from _BuyMeACoffee_ link I put on the project. Love you stranger.

<Img src={img6} type="ss"  caption="" />

100+ developers subscribed to my newsletter.

Within 30 days of launch, 40k+ people came to my personal site and viewed my project (80k+ views).

Here are some users insights (first 30 days since launch i.e. from that Reddit post):

<div className="flex items-baseline space-x-2">
<Img src={img7} type="ss"  caption="Top referral sites" />
<Img src={img8} type="ss"  caption="Users by countries " />
</div>

<div className="flex items-baseline space-x-2">
<Img src={img9} type="ss"  caption="Users by OS" />
<Img src={img10} type="ss"  caption="Users by browsers" />
</div>

<span> Currently, this project has </span>
<a
    title="GitHub repo stars"
    href="https://github.com/gorvgoyl/clone-wars"
    target="_blank"
    rel="noopener"
    >
<Img
type="badge"
alt="GitHub repo stars"
src="https://img.shields.io/github/stars/gorvgoyl/clone-wars?style=flat-square&logo=github&color=#44cc11"
/>
</a>
<span> and </span>

<a
    title="Github repo forks"
    href="https://github.com/gorvgoyl/clone-wars"
    target="_blank"
    rel="noopener"
    >

<Img
type="badge"
alt="GitHub forks"
src="https://img.shields.io/github/forks/gorvgoyl/clone-wars?style=flat-square&logo=github&color=#44cc11"
/>
</a>

#### Update: 14 Apr'21

Someone shared this article on _Hacker News_ and it hit #1 on front page!

<Img src={img12} type="ss"  caption="Front page of HN - 14 Apr'21" />

#### Update: 24 Apr' 21

Host of Tech Podcast (_Map Reduce Filter_) found out about Clone Wars project and invited me to be his guest. It was my first-ever podcast 🙌.  
🎧 Listen here: [Clone wars with Gourav Goyal | Journey from Job to Incubator to Co Founder to Indie Hacking](https://anchor.fm/life-of-utkarsh/episodes/Clone-wars-with-Gourav-Goyal--Journey-from-Job-to-Incubator-to-Co-Founder-to-Indie-Hacking-evdr04/a-a57ms61)

<TweetEmbed tweetId="1385831470741090304"/>
