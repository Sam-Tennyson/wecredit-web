/**
 * Pages API Functions
 * Query functions for fetching and managing page data from Strapi
 */

import {
  fetchFromStrapi,
  Page,
  PageSummary,
  PageType,
  Breadcrumb,
  StrapiResponse,
  PageBase,
} from '@/lib/api/strapi';

// Export types for convenience
export type { Page, PageSummary, PageType, Breadcrumb };

// ============================================
// POPULATE CONFIGURATIONS
// ============================================

/**
 * Complete populate configuration for Pages with Strapi v5 dynamic zones
 * Uses the 'on' syntax for proper dynamic zone population
 */
const PAGE_POPULATE_CONFIG = {
  featuredImage: true,
  sidebar: {
    on: {
      'widgets.related-links': {
        populate: '*',
      },
      'widgets.recent-pages': {
        populate: '*',
      },
      'widgets.text-block': {
        populate: '*',
      },
      'widgets.banner': {
        populate: '*',
      },
      'widgets.form-widget': {
        populate: '*',
      },
    },
  },
  seo: {
    populate: {
      metaImage: true,
    },
  },
  author: {
    populate: {
      avatar: true,
      socialLinks: true,
    },
  },
  formWidget: true,
  parent: true,
  children: true,
};

// ============================================
// SINGLE PAGE FETCHERS
// ============================================

/**
 * Fetch a single page by fullPath (primary method for routing)
 * Uses complete populate configuration for Strapi v5
 */
export async function getPageByFullPath(fullPath: string): Promise<Page | null> {
  const normalizedPath = fullPath.startsWith('/') ? fullPath : `/${fullPath}`;

  const response = await fetchFromStrapi<StrapiResponse<Page[]>>('pages', {
    filters: {
      fullPath: { $eq: normalizedPath },
    },
    populate: PAGE_POPULATE_CONFIG,
    tags: [`page-${normalizedPath}`],
  });

  return response.data[0] || null;
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const response = await fetchFromStrapi<StrapiResponse<Page[]>>('pages', {
    filters: {
      slug: { $eq: slug },
    },
    populate: PAGE_POPULATE_CONFIG,
  });

  return response.data[0] || null;
}

/**
 * Fetch a single page by documentId
 */
export async function getPageById(documentId: string): Promise<Page | null> {
  const response = await fetchFromStrapi<StrapiResponse<Page[]>>('pages', {
    filters: {
      documentId: { $eq: documentId },
    },
    populate: PAGE_POPULATE_CONFIG,
    tags: [`page-${documentId}`],
  });

  return response.data[0] || null;
}

// ============================================
// MULTIPLE PAGES FETCHERS
// ============================================

/**
 * Fetch all pages with full data
 */
export async function getAllPages(): Promise<Page[]> {
  const response = await fetchFromStrapi<StrapiResponse<Page[]>>('pages', {
    populate: PAGE_POPULATE_CONFIG,
    sort: ['pageType:asc', 'order:asc', 'title:asc'],
    pagination: { pageSize: 1000 },
    revalidate: 60,
  });

  return response.data;
}

/**
 * Fetch all page paths for static generation
 */
export async function getAllPagePaths(): Promise<string[]> {
  const response = await fetchFromStrapi<StrapiResponse<{ fullPath: string }[]>>('pages', {
    fields: ['fullPath'],
    pagination: { pageSize: 1000 },
    revalidate: 3600, // 1 hour
  });

  return response.data
    .map((page) => page.fullPath)
    .filter((path): path is string => Boolean(path));
}

/**
 * Fetch pages by type with pagination
 */
export async function getPagesByType(
  pageType: PageType,
  options?: {
    limit?: number;
    page?: number;
    featured?: boolean;
    excludeId?: string;
  }
): Promise<StrapiResponse<PageSummary[]>> {
  const filters: Record<string, unknown> = {
    pageType: { $eq: pageType },
  };

  if (options?.featured !== undefined) {
    filters.isFeatured = { $eq: options.featured };
  }

  if (options?.excludeId) {
    filters.documentId = { $ne: options.excludeId };
  }

  return fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters,
    populate: PAGE_POPULATE_CONFIG,
    sort: ['order:asc', 'publishedAt:desc'],
    pagination: {
      page: options?.page || 1,
      pageSize: options?.limit || 10,
    },
  });
}

/**
 * Fetch child pages of a parent
 */
export async function getChildPages(
  parentDocumentId: string,
  options?: { limit?: number }
): Promise<PageSummary[]> {
  const response = await fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters: {
      parent: { documentId: { $eq: parentDocumentId } },
    },
    populate: PAGE_POPULATE_CONFIG,
    sort: ['order:asc', 'title:asc'],
    pagination: options?.limit ? { pageSize: options.limit } : undefined,
  });

  return response.data;
}

/**
 * Fetch sibling pages (same parent)
 */
export async function getSiblingPages(
  page: Page,
  options?: { limit?: number; excludeSelf?: boolean }
): Promise<PageSummary[]> {
  const filters: Record<string, unknown> = page.parent
    ? { parent: { documentId: { $eq: (page.parent as PageBase).documentId } } }
    : { parent: { $null: true } };

  if (options?.excludeSelf) {
    filters.documentId = { $ne: page.documentId };
  }

  const response = await fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters,
    populate: PAGE_POPULATE_CONFIG,
    sort: ['order:asc', 'title:asc'],
    pagination: options?.limit ? { pageSize: options.limit } : undefined,
  });

  return response.data;
}

/**
 * Fetch recent pages for widgets
 */
export async function getRecentPages(
  count: number = 5,
  pageTypes?: PageType[]
): Promise<PageSummary[]> {
  const filters: Record<string, unknown> = {};

  if (pageTypes && pageTypes.length > 0) {
    filters.pageType = { $in: pageTypes };
  }

  const response = await fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters,
    populate: PAGE_POPULATE_CONFIG,
    sort: ['publishedAt:desc'],
    pagination: { pageSize: count },
  });

  return response.data;
}

/**
 * Fetch featured pages
 */
export async function getFeaturedPages(
  limit: number = 6,
  pageTypes?: PageType[]
): Promise<PageSummary[]> {
  const filters: Record<string, unknown> = {
    isFeatured: { $eq: true },
  };

  if (pageTypes && pageTypes.length > 0) {
    filters.pageType = { $in: pageTypes };
  }

  const response = await fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters,
    populate: PAGE_POPULATE_CONFIG,
    sort: ['order:asc', 'publishedAt:desc'],
    pagination: { pageSize: limit },
  });

  return response.data;
}

/**
 * Search pages by title/content
 */
export async function searchPages(
  query: string,
  options?: { limit?: number; page?: number }
): Promise<StrapiResponse<PageSummary[]>> {
  return fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters: {
      $or: [
        { title: { $containsi: query } },
        { excerpt: { $containsi: query } },
        { metaDescription: { $containsi: query } },
      ],
    },
    populate: PAGE_POPULATE_CONFIG,
    sort: ['publishedAt:desc'],
    pagination: {
      page: options?.page || 1,
      pageSize: options?.limit || 10,
    },
  });
}

// ============================================
// NAVIGATION & BREADCRUMBS
// ============================================

/**
 * Build breadcrumb trail from page hierarchy
 */
export async function getBreadcrumbs(page: Page): Promise<Breadcrumb[]> {
  const breadcrumbs: Breadcrumb[] = [];
  let currentPage: Page | null = page;

  while (currentPage) {
    breadcrumbs.unshift({
      title: currentPage.title,
      path: currentPage.fullPath,
    });

    if (currentPage.parent && (currentPage.parent as PageBase).fullPath) {
      currentPage = await getPageByFullPath((currentPage.parent as PageBase).fullPath);
    } else {
      currentPage = null;
    }
  }

  // Add home at the beginning
  breadcrumbs.unshift({ title: 'Home', path: '/' });

  return breadcrumbs;
}

/**
 * Get navigation tree (for menus)
 */
export async function getNavigationTree(
  rootPageType?: PageType
): Promise<PageSummary[]> {
  const filters: Record<string, unknown> = {
    parent: { $null: true },
  };

  if (rootPageType) {
    filters.pageType = { $eq: rootPageType };
  }

  const response = await fetchFromStrapi<StrapiResponse<PageSummary[]>>('pages', {
    filters,
    fields: ['id', 'documentId', 'title', 'slug', 'fullPath', 'pageType', 'order'],
    sort: ['order:asc', 'title:asc'],
  });

  return response.data;
}

