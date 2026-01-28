# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev              # Start dev server at localhost:3000
pnpm build            # Build Next.js app
pnpm start            # Build and start production server
pnpm lint             # ESLint on .ts/.tsx files
pnpm tsc              # TypeScript type checking
pnpm stylelint        # CSS/SCSS linting
```

Content generation (runs automatically in postbuild):
```bash
pnpm sitemap          # Generate sitemap.xml
pnpm feed             # Generate RSS feed
```

## Architecture Overview

### Content Sourcing (Hybrid Model)

**Blog posts** are sourced from Notion as CMS:
- Notion API fetches posts at build time (`lib/notionUtils.ts`)
- Converted to markdown via `notion-to-md`, then bundled with MDX
- Images are downloaded from Notion and saved to `public/blog/{slug}/`
- Frontmatter validated with Zod schemas (`types/types.tsx`)

**Project pages** use local markdown files:
- Located in `content/projects/{project-name}/index.md`
- Supports nested routes: `content/projects/notion-boost/whats-new/index.md`
- Images and OG images stored in the same folder as the markdown file
- For sub-paths, images go in the base project folder

### Key Directories

- `/pages` - Next.js routes including `/blog/[slug]` for dynamic blog posts
- `/lib` - Core utilities: Notion API integration, MDX bundling, caching
- `/components` - React components (no default exports, function-declaration syntax)
- `/content/projects` - Local markdown content for project pages
- `/types` - Zod schemas for frontmatter validation

### MDX Processing Pipeline

Content goes through: remark-gfm → rehype-slug → rehype-code-titles → rehype-prism-plus → rehype-autolink-headings → rehype-toc

## Code Style Requirements

From `.cursorrules`:
- TypeScript, React, Next.js, Tailwind CSS
- Function-declaration syntax for React components
- Prefer `Type` over `Interface`
- No default exports for React components
- Use Node.js built-in `fetch` (not axios)
- Use `async/await` (not `.then()`)
- No ternary operators in JSX - use early returns
- No nested components - create separate components
- No dark mode Tailwind classes
- Keep existing comments when refactoring

## Environment Variables

Required for full functionality:
- `NOTION_API_KEY` - Notion integration token
- `NOTION_BLOGPOSTS_DB` - Notion database ID for blog posts
- `BUTTONDOWN_API_KEY` - Newsletter subscription
- `GA_PROPERTY_ID`, `GA_GOOGLE_*` - Google Analytics
