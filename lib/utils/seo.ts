/**
 * SEO Utilities
 * Functions for generating metadata and structured data
 */

import { Metadata } from 'next';
import { Page, getStrapiMediaUrl } from '@/lib/api/strapi';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wecredit.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'WeCredit';
const DEFAULT_OG_IMAGE = '/og-default.jpg';

/**
 * Generate Next.js Metadata from Page
 */
export function generatePageMetadata(page: Page): Metadata {
  const seo = page.seo;
  const title = seo?.metaTitle || page.title;
  const description = seo?.metaDescription || page.metaDescription || page.excerpt || '';
  const canonicalUrl = seo?.canonicalUrl || `${SITE_URL}${page.fullPath}`;
  const imageUrl = getStrapiMediaUrl(seo?.metaImage?.url || page.featuredImage?.url) || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const metadata: Metadata = {
    title,
    description,
    keywords: seo?.keywords?.split(',').map((k) => k.trim()),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: getOpenGraphType(page.pageType),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(page.pageType === 'blog' && page.author && {
        authors: [page.author.name],
      }),
      ...(page.publishedAt && {
        publishedTime: page.publishedAt,
      }),
      ...(page.updatedAt && {
        modifiedTime: page.updatedAt,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  return metadata;
}

/**
 * Get OpenGraph type based on page type
 */
function getOpenGraphType(pageType: string): 'website' | 'article' {
  const articleTypes = ['blog', 'guide', 'resource'];
  return articleTypes.includes(pageType) ? 'article' : 'website';
}

/**
 * Generate JSON-LD structured data
 */
export function generateJsonLd(page: Page): Record<string, unknown> | null {
  // If custom JSON-LD is provided, use it
  if (page.seo?.scriptApplicationLdJson) {
    try {
      return typeof page.seo.scriptApplicationLdJson === 'string'
        ? JSON.parse(page.seo.scriptApplicationLdJson)
        : page.seo.scriptApplicationLdJson;
    } catch {
      console.warn('Invalid JSON-LD in page:', page.fullPath);
    }
  }

  // Generate default JSON-LD based on page type
  const baseJsonLd = {
    '@context': 'https://schema.org',
    url: `${SITE_URL}${page.fullPath}`,
    name: page.title,
    description: page.seo?.metaDescription || page.metaDescription || page.excerpt,
  };

  if (page.pageType === 'blog' || page.pageType === 'guide') {
    return {
      ...baseJsonLd,
      '@type': 'Article',
      headline: page.title,
      image: getStrapiMediaUrl(page.featuredImage?.url),
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      ...(page.author && {
        author: {
          '@type': 'Person',
          name: page.author.name,
          ...(page.author.socialLinks?.website && {
            url: page.author.socialLinks.website,
          }),
        },
      }),
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    };
  }

  return {
    ...baseJsonLd,
    '@type': 'WebPage',
  };
}

