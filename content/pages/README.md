# Static Pages

This directory contains static page content managed as markdown files with frontmatter.

## Architecture

**App Router Routes + Markdown Content**

- Static pages have **dedicated routes** in `/app/` (e.g., `/app/about-us/page.tsx`)
- Content is stored as **markdown files** in `/content/pages/` (e.g., `/content/pages/about-us.md`)
- Each route reads its corresponding markdown file at build time
- Pages are **statically generated** with ISR (revalidate every hour)

## Structure

```
app/
├── about-us/page.tsx          → /about-us (reads about-us.md)
├── contact-us/page.tsx        → /contact-us (reads contact-us.md)
├── privacy-policy/page.tsx    → /privacy-policy (reads privacy-policy.md)
└── terms-of-service/page.tsx  → /terms-of-service (reads terms-of-service.md)

content/pages/
├── about-us.md               # Content for /about-us
├── contact-us.md            # Content for /contact-us
├── privacy-policy.md        # Content for /privacy-policy
└── terms-of-service.md      # Content for /terms-of-service
```

## File Format

Each markdown file should have frontmatter metadata followed by markdown content:

```markdown
---
title: "Page Title"
slug: "page-slug"  # Should match filename
seo:
  metaTitle: "SEO Title | WeCredit"
  metaDescription: "Page description for search engines"
  keywords: "keyword1, keyword2"
---

# Page Title

Your markdown content here...
```

## Adding a New Static Page

### Step 1: Create the markdown file

```bash
touch content/pages/faq.md
```

```markdown
---
title: "Frequently Asked Questions"
slug: "faq"
seo:
  metaTitle: "FAQ | WeCredit"
  metaDescription: "Find answers to common questions"
---

# FAQ

Your content here...
```

### Step 2: Create the App Router route

```bash
mkdir app/faq
touch app/faq/page.tsx
```

```typescript
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStaticPageBySlug } from '@/lib/content';
import StaticPageContent from '@/components/shared/StaticPageContent';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStaticPageBySlug('faq');
  
  if (!page) {
    return { title: 'FAQ' };
  }
  
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    keywords: page.seo?.keywords,
  };
}

const FAQPage = async () => {
  const page = await getStaticPageBySlug('faq');
  
  if (!page) {
    notFound();
  }
  
  return <StaticPageContent page={page} />;
};

export default FAQPage;
```

### Step 3: Update the manifest

Update `/lib/content/manifest.ts`:

```typescript
export const STATIC_PAGE_SLUGS = [
  'about-us',
  'contact-us', 
  'privacy-policy',
  'terms-of-service',
  'faq', // Add your new page
] as const;
```

## Important Notes

- **Filename = slug**: The markdown filename must match the route folder name
- **Static generation**: Pages are pre-rendered at build time with ISR (1 hour revalidate)
- **No API calls**: Content is read from local files during build
- **Blog posts**: Dynamic blog posts are handled by `/app/[slug]/page.tsx` and come from Strapi
- **Performance**: Static pages load instantly (pre-rendered)

## Updating Content

To update page content:

1. Edit the markdown file in `/content/pages/`
2. Commit and push changes
3. On next deployment, pages will be regenerated
4. Or wait for ISR revalidation (1 hour)

## Development

- Run `npm run dev` to start the dev server
- Visit `/about-us`, `/contact-us`, etc.
- Changes to markdown files trigger hot reload in dev mode

## Benefits of This Approach

✅ **Explicit routes** - Clear folder structure in `/app/`  
✅ **Markdown content** - Easy to edit without code changes  
✅ **Static generation** - Fast page loads (pre-rendered)  
✅ **ISR** - Content updates without full rebuild  
✅ **Type-safe** - Full TypeScript support  
✅ **SEO-friendly** - Proper metadata and static HTML  

