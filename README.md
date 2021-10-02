![gourav.io](./public/og.png)

# Personal Site - Gourav Goyal

## My personal site & blog made with NextJS, MDX, Tailwind and deployed on Vercel

### https://gourav.io

## MDX Structure for Blog and Projects

#### File names and public urls mapping

markdown file should be named as `index.md` inside respective md folder

for blog:

folder: ./content/blog/first-donation-on-open-source-side-project
file: ./content/blog/first-donation-on-open-source-side-project/index.md
url: https://gourav.io/blog/first-donation-on-open-source-side-project

for projects:

folder: ./content/misc/clone-wars
file: ./content/misc/clone-wars/index.md
url: https://gourav.io/clone-wars

folder: ./content/misc/notion-boost
file: ./content/misc/notion-boost/index.md
url: https://gourav.io/notion-boost

it also works with sub paths:
folder: ./content/misc/notion-boost/whats-new
file: ./content/misc/notion-boost/whats-new/index.md
url: https://gourav.io/notion-boost/whats-new

#### Open graph image

store open graph image inside respective md folder as `og.jpg` or `og.png`, else site default `og.png` file will be picked e.g. https://gourav.io/og.png

folder: ./content/misc/notion-boost
og image: ./content/misc/notion-boost/og.jpg or ./content/misc/notion-boost/og.png

folder: ./content/blog/first-donation-on-open-source-side-project
og image: ./content/blog/first-donation-on-open-source-side-project/og.jpg or ./content/blog/first-donation-on-open-source-side-project/og.png

#### Images

store all related images inside its md folder.

folder: ./content/blog/first-donation-on-open-source-side-project
images:
./content/blog/first-donation-on-open-source-side-project/img1.png
./content/blog/first-donation-on-open-source-side-project/img2.gif

folder: ./content/misc/notion-boost
images:
./content/misc/notion-boost/img1.png
./content/misc/notion-boost/img2.gif

in case of md sub-folders: store images (including og image) to the base markdown folder

folder: ./content/misc/notion-boost/whats-new
images:
./content/misc/notion-boost/og.png
./content/misc/notion-boost/img_a.png
./content/misc/notion-boost/img_b.jpg
