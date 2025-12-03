/**
 * Strapi API Query Functions
 * Functions to fetch and normalize data from Strapi CMS
 * Note: Static pages are now managed locally via /content/pages/
 */

import { fetchStrapi, getStrapiMediaUrl } from './client';
import { getStaticPageBySlug as getLocalStaticPageBySlug } from '@/lib/content';
import type {
  StrapiResponse,
  StrapiBlogPost,
  StrapiStaticPage,
  StrapiHeader,
  StrapiFooter,
  BlogPost,
  StaticPage,
  PageData,
  Header,
  Footer,
} from './types';

/**
 * Fetches all published blog posts from Strapi
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchStrapi<StrapiResponse<StrapiBlogPost[]>>(
    '/blog-posts',
    {
      params: {
        'populate': '*',
        'sort': 'publishedAt:desc',
      },
    }
  );
  return response.data.map(normalizeBlogPost);
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetchStrapi<StrapiResponse<StrapiBlogPost[]>>(
    '/blog-posts',
    {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*',
      },
    }
  );
  if (!response.data || response.data.length === 0) {
    return null;
  }
  return normalizeBlogPost(response.data[0]);
}

/**
 * Fetches all static pages from local markdown files
 * @deprecated Static pages are now managed locally. Use getAllStaticPages from @/lib/content instead.
 */
export async function getStaticPages(): Promise<StaticPage[]> {
  // This function is deprecated - static pages are now local
  // If needed, import getAllStaticPages from @/lib/content
  console.warn('getStaticPages is deprecated. Static pages are now managed locally.');
  return [];
}

/**
 * Fetches a single static page by slug from local markdown files
 * Static pages are now stored locally in /content/pages/
 */
export async function getStaticPageBySlug(slug: string): Promise<StaticPage | null> {
  // Read from local markdown files instead of Strapi API
  return getLocalStaticPageBySlug(slug);
}

/**
 * Fetches page data by slug (tries blog post first, then static page)
 * @deprecated Use getBlogPostBySlug directly. Static pages now have dedicated routes.
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  // Try blog post first
  const blogPost = await getBlogPostBySlug(slug);
  if (blogPost) {
    return blogPost;
  }
  
  // Try static page (from local markdown files)
  const staticPage = await getStaticPageBySlug(slug);
  if (staticPage) {
    return staticPage;
  }
  
  return null;
}

/**
 * Fetches header data from Strapi single type
 */
export async function getHeader(): Promise<Header> {
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiHeader>>(
      '/header',
      {
        params: {
          'populate': '*',
        },
      }
    );
    return normalizeHeader(response.data);
  } catch {
    return getDefaultHeader();
  }
}

/**
 * Fetches footer data from Strapi single type
 */
export async function getFooter(): Promise<Footer> {
  try {
    const response = await fetchStrapi<StrapiResponse<StrapiFooter>>(
      '/footer',
      {
        params: {
          'populate[columns][populate]': '*',
          'populate[socialLinks][populate]': '*',
          'populate[logo][populate]': '*',
        },
      }
    );
    return normalizeFooter(response.data);
  } catch {
    return getDefaultFooter();
  }
}

/**
 * Normalizes blog post data from Strapi v5 format
 */
function normalizeBlogPost(data: StrapiBlogPost): BlogPost {
  return {
    id: data.id,
    documentId: data.documentId,
    type: 'blog-post',
    title: data.title,
    slug: data.slug,
    content: data.content_markdown || '',
    description: data.description || undefined,
    featuredImage: data.featuredImage ? {
      url: getStrapiMediaUrl(data.featuredImage.url),
      alt: data.featuredImage.alternativeText || data.title,
      width: data.featuredImage.width,
      height: data.featuredImage.height,
    } : undefined,
    category: data.blog_guide_category ? {
      name: data.blog_guide_category.name,
      slug: data.blog_guide_category.slug,
    } : undefined,
    seo: data.seo,
    publishedAt: data.publishedAt,
  };
}

/**
 * Normalizes static page data from Strapi v5 format
 */
function normalizeStaticPage(data: StrapiStaticPage): StaticPage {
  return {
    id: data.id,
    documentId: data.documentId,
    type: 'static-page',
    title: data.title,
    slug: data.slug,
    content: data.content_markdown || '',
    seo: data.seo,
  };
}

/**
 * Normalizes header data from Strapi v5 format
 */
function normalizeHeader(data: StrapiHeader): Header {
  return {
    logo: data.logo ? {
      url: getStrapiMediaUrl(data.logo.url),
      alt: data.logo.alternativeText || 'Logo',
    } : undefined,
    navigation: data.navigation || [],
    ctaButton: data.ctaButton,
  };
}

/**
 * Normalizes footer data from Strapi v5 format
 */
function normalizeFooter(data: StrapiFooter): Footer {
  return {
    logo: data.logo ? {
      url: getStrapiMediaUrl(data.logo.url),
      alt: data.logo.alternativeText || 'Logo',
    } : undefined,
    columns: data.columns || [],
    copyright: data.copyright || '',
    socialLinks: data.socialLinks || [],
  };
}

/**
 * Returns default header when Strapi is unavailable
 */
function getDefaultHeader(): Header {
  return {
    navigation: [
      { id: 1, label: 'Home', url: '/', isExternal: false },
      { id: 2, label: 'About Us', url: '/about-us', isExternal: false },
    ],
    ctaButton: {
      label: 'Apply Now',
      url: '/apply',
    },
  };
}

/**
 * Returns default footer when Strapi is unavailable
 */
function getDefaultFooter(): Footer {
  return {
    columns: [],
    copyright: `© ${new Date().getFullYear()} WeCredit. All rights reserved.`,
    socialLinks: [],
  };
}
