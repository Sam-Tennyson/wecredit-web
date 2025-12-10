/**
 * Strapi API Response Types (Strapi v5 format)
 * TypeScript interfaces for Strapi CMS responses
 * 
 * Note: Static pages are now managed locally via /content/pages/ markdown files
 * with frontmatter containing: title, slug, and seo metadata
 */

/** Base Strapi response wrapper */
export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

/** Strapi pagination metadata */
export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

/** SEO Component */
export interface SeoComponent {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalUrl?: string;
}

/** Image format details */
export interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

/** Strapi Media type (v5 format) */
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

/** Blog Guide Category */
export interface BlogGuideCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Navigation Link Component */
export interface NavigationLink {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

/** CTA Button Component */
export interface CtaButton {
  label: string;
  url: string;
}

/** Footer Column Component */
export interface FooterColumn {
  id: number;
  title: string;
  links: NavigationLink[];
}

/** Social Link Component */
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
}

/** Blog Post from Strapi (v5 format - flattened) */
export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  contentMarkdown: string;
  description: string | null;
  featuredImage: StrapiMedia | null;
  blogGuideCategory: BlogGuideCategory | null;
  seo?: SeoComponent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Static Page from Strapi (v5 format) 
 * @deprecated Static pages are now managed locally via markdown files
 */
export interface StrapiStaticPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  contentMarkdown: string;
  seo?: SeoComponent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Header Single Type (v5 format) */
export interface StrapiHeader {
  id: number;
  documentId: string;
  logo: StrapiMedia | null;
  navigation: NavigationLink[];
  ctaButton?: CtaButton;
}

/** Footer Single Type (v5 format) */
export interface StrapiFooter {
  id: number;
  documentId: string;
  logo: StrapiMedia | null;
  columns: FooterColumn[];
  copyright: string;
  socialLinks: SocialLink[];
}

/** Normalized Blog Post for frontend use */
export interface BlogPost {
  id: number;
  documentId: string;
  type: 'blog-post';
  title: string;
  slug: string;
  content: string;
  description?: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  category?: {
    name: string;
    slug: string;
  };
  seo?: SeoComponent;
  publishedAt: string;
}

/**
 * Normalized Static Page for frontend use
 * Can be sourced from either Strapi (legacy) or local markdown files
 */
export interface StaticPage {
  id: number;
  documentId: string;
  type: 'static-page';
  title: string;
  slug: string;
  content: string;
  seo?: SeoComponent;
}

/** Union type for page data */
export type PageData = BlogPost | StaticPage;

/** Normalized Header for frontend use */
export interface Header {
  logo?: {
    url: string;
    alt: string;
  };
  navigation: NavigationLink[];
  ctaButton?: CtaButton;
}

/** Normalized Footer for frontend use */
export interface Footer {
  logo?: {
    url: string;
    alt: string;
  };
  columns: FooterColumn[];
  copyright: string;
  socialLinks: SocialLink[];
}

/** Page Widget Types */

/** Link for Related Links Widget */
export interface WidgetLink {
  id: number;
  label: string;
  url: string;
  openInNewTab: boolean;
}

/** Banner Widget Component */
export interface BannerWidget {
  __component: 'widgets.banner';
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor: string;
}

/** Text Block Widget Component */
export interface TextBlockWidget {
  __component: 'widgets.text-block';
  id: number;
  title: string;
  content: string;
}

/** Related Links Widget Component */
export interface RelatedLinksWidget {
  __component: 'widgets.related-links';
  id: number;
  title: string;
  style: 'list' | 'card';
  links?: WidgetLink[];
}

/** Recent Pages Widget Component */
export interface RecentPagesWidget {
  __component: 'widgets.recent-pages';
  id: number;
  title: string;
  count: number;
  showImages: boolean;
}

/** Union type for all page widgets */
export type PageWidget = BannerWidget | TextBlockWidget | RelatedLinksWidget | RecentPagesWidget;

/** Strapi Page from API (v5 format - flattened) */
export interface StrapiPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  pageType: 'home' | 'pillar' | 'category' | 'subcategory';
  level: number;
  order: number;
  content: string;
  metaDescription: string;
  sidebar: PageWidget[];
  parent: StrapiPage | null;
  children: StrapiPage[];
  featuredImage: StrapiMedia | null;
  seo?: SeoComponent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Normalized Page for frontend use */
export interface Page {
  id: number;
  documentId: string;
  type: 'page';
  title: string;
  slug: string;
  fullPath: string;
  pageType: 'home' | 'pillar' | 'category' | 'subcategory';
  level: number;
  order: number;
  content: string;
  metaDescription: string;
  sidebar: PageWidget[];
  parent: Page | null;
  children: Page[];
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  seo?: SeoComponent;
  publishedAt: string;
}
