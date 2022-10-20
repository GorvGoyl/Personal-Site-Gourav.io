![gourav.io](./public/og.png)

# Personal site and blog - Gourav Goyal

### Homepage

https://gourav.io

### Blog posts

https://gourav.io/blog

### Tech Stack

Made with React (NextJS), Typescript, Tailwind CSS, MDX, Notion as CMS.  
Deployed on Vercel.

<!-- <a href="https://vercel.com?utm_source=gorv&utm_campaign=oss">
<img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg">
</a> -->

## How I render blog posts

I use Notion as CMS. I store all my drafts and published posts in a Notion table. I run a script that automates the blog posts fetching and generating pre-rendered pages at build time for better performance.

## How I render project pages

I use local Markdown (MDX) files (./content) to render project pages like https://gourav.io/notion-boost , https://gourav.io/clone-wars.

### File names and public URLs mapping

Markdown file should be named as `index.md` inside the respective md folder

For projects:

```
folder: ./content/misc/clone-wars
file: ./content/misc/clone-wars/index.md
url: https://gourav.io/clone-wars

folder: ./content/misc/notion-boost
file: ./content/misc/notion-boost/index.md
url: https://gourav.io/notion-boost
```

It also works with sub-paths:

```
folder: ./content/misc/notion-boost/whats-new
file: ./content/misc/notion-boost/whats-new/index.md
url: https://gourav.io/notion-boost/whats-new
```

### Open graph image

Store open graph image inside respective md folder as `og.jpg` or `og.png`, else site default `og.png` file will be picked e.g. https://gourav.io/og.png

```
folder: ./content/misc/notion-boost
og image: ./content/misc/notion-boost/og.jpg or ./content/misc/notion-boost/og.png
```

### Images

Store all related images inside its md folder.

```

folder: ./content/misc/notion-boost
images:
./content/misc/notion-boost/img1.png
./content/misc/notion-boost/img2.gif
```

in the case of md sub-folders: store images (including og image) in the base markdown folder

```
folder: ./content/misc/notion-boost/whats-new
images:
./content/misc/notion-boost/og.png
./content/misc/notion-boost/img_a.png
./content/misc/notion-boost/img_b.jpg
```
