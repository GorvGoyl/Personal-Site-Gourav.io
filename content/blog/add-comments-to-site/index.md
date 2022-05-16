---
title: "Add free privacy-friendly comment-box to any site in 5 minutes"
desc: "Add free privacy-friendly comment-box to any site in 5 minutes (powered by Github discussions)"
date: "2022-05-13"
toc: true
mobileToc: true
---

import giscus_demo from "./giscus_demo.mp4";
import giscus_commentbox_on_site from "./giscus_commentbox_on_site.jpg";
import github_discussions from "./github_discussions.jpg";

We'll be using [Giscus](https://giscus.app/) to add a comment-box to a site.

- 100% free
- No tracking, no ads
- No database needed. All data is stored in GitHub Discussions
- no backend server required
- Supports custom themes
- Supports multiple languages
- [open-source](https://github.com/giscus/giscus)

## How does Giscus work?

Comments are stored in [Github discussions](https://docs.github.com/en/discussions), so no database is required. Any comment added by a visitor to your site page is added to the particular Github discussion for that post. You need not create any Github discussion for each page/blogpost, if a matching discussion cannot be found, the Giscus bot will automatically create a discussion the first time someone leaves a comment or reaction.

## How does it look?

In this video demo, I'm first authorizing using my Github account and then adding a comment.

<Video disableZoom={true} src={giscus_demo} />

Comments added to the post are mirrored in the Github discussions:

<Img src={giscus_commentbox_on_site} type="ss" caption="comment-box on site" />

<Img src={github_discussions} type="ss" caption="comments are mirrored to Github discussion" />

# Implementation

- Make sure your site repository is public or create an empty new repository just for storing comments.
- Make sure [Discussions feature](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) is turned on for your repository.

1.  Install Giscus app on Github: https://github.com/apps/giscus
2.  Go to https://giscus.app/

    1. Enter your repository name in the field ex: `GorvGoyl/Personal-Site-Gourav.io`
    2. In `Page ↔️ Discussions Mapping` field: select _Discussion title contains page pathname_
    3. `Discussion Category` : _Announcements_
    4. Copy the script provided. It should look something like this:

    ```js
    <script
      src="https://giscus.app/client.js"
      data-repo="GorvGoyl/Personal-Site-Gourav.io"
      data-repo-id="MDEwOlJlcG9zaXRvcnkyOTAyNjQ4MTU="
      data-category="Announcements"
      data-category-id="DIC_kwDOEU0W784CAvcn"
      data-mapping="pathname"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="light"
      data-lang="en"
      crossorigin="anonymous"
      async
    ></script>
    ```

3.  For vanilla javascript sites, you can paste the script on pages you want to enable comment-box
4.  For React sites, you can create a component out of it and render that component in jsx/tsx page:

        ```jsx
        // create comment-box component
        const Comments = () => {
          return (
            <div>
              <Script
                src="https://giscus.app/client.js"
                data-repo="GorvGoyl/Personal-Site-Gourav.io"
                data-repo-id="MDEwOlJlcG9zaXRvcnkyOTAyNjQ4MTU="
                data-category="Announcements"
                data-category-id="DIC_kwDOEU0W784CAvcn"
                data-mapping="pathname"
                data-reactions-enabled="0"
                data-emit-metadata="0"
                data-theme="light"
                data-lang="en"
                crossOrigin="anonymous"
                async
                strategy="lazyOnload"
                onError={(e) => {
                  console.error("giscus script failed to load", e);
                }}
              ></Script>
            </div>
          );
        };

        // render comment-box component
        <Comments></Comments>;
        ```

    Alternatively, you can use [giscus-component package](https://github.com/giscus/giscus-component) for React, Vue, or Svelte sites.
