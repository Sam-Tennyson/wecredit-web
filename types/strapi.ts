/**
 * Strapi API Type Definitions (Strapi v5 format)
 * Complete TypeScript interfaces for WeCredit CMS
 */

// ============================================
// BASE STRAPI TYPES
// ============================================

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name: string;
  width: number;
  height: number;
  mime: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  name: string;
  mime: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// ============================================
// SHARED COMPONENTS
// ============================================

export interface Link {
  id: number;
  label: string;
  url: string;
  openInNewTab: boolean;
}

export interface SocialLinks {
  id: number;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaImage?: StrapiMedia;
  keywords?: string;
  canonicalUrl?: string;
  scriptApplicationLdJson?: string | Record<string, unknown>;
}

// ============================================
// WIDGET COMPONENTS (Dynamic Zone)
// ============================================

export interface RelatedLinksWidget {
  __component: 'widgets.related-links';
  id: number;
  title: string;
  links: Link[];
  style: 'card' | 'list';
}

export interface RecentPagesWidget {
  __component: 'widgets.recent-pages';
  id: number;
  title: string;
  count: number;
  showImages: boolean;
}

export interface TextBlockWidget {
  __component: 'widgets.text-block';
  id: number;
  title?: string;
  content: string;
}

export interface BannerWidget {
  __component: 'widgets.banner';
  id: number;
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor: string;
}

export interface FormWidgetWidget {
  __component: 'widgets.form-widget';
  id: number;
  content: string;
}

export interface LeadCaptureFormWidget {
  __component: 'widgets.lead-capture-form';
  id: number;
  title: string;
  highlightedAmount: string;
  countryCode: string;
  placeholder: string;
  buttonText: string;
  redirectUrl: string;
  termsText: string;
  termsLinkText: string;
  termsUrl: string | null;
  brandName: string;
}

export interface AccordionMenuItem {
  id: number;
  label: string;
  url: string;
  openInNewTab: boolean;
  order: number;
}

export interface AccordionMenuWidget {
  __component: 'widgets.accordion-menu';
  id: number;
  title: string;
  defaultExpanded: boolean;
  groups: AccordionMenuItem[];
}

export type SidebarWidget =
  | RelatedLinksWidget
  | RecentPagesWidget
  | TextBlockWidget
  | BannerWidget
  | FormWidgetWidget
  | LeadCaptureFormWidget
  | AccordionMenuWidget;

// Standalone form widget (without __component)
export interface FormWidgetComponent {
  id: number;
  content: string;
}

// ============================================
// AUTHOR
// ============================================

export interface Author {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  bio?: string;
  designation?: string;
  avatar?: StrapiMedia;
  email?: string;
  socialLinks?: SocialLinks;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============================================
// PAGE
// ============================================

export type PageType =
  | 'home'
  | 'pillar'
  | 'category'
  | 'subcategory'
  | 'guide'
  | 'blog'
  | 'resource'
  | 'tool'
  | 'standard';

export interface PageBase {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  fullPath: string;
  useCustomFullPath: boolean;
  order: number;
  pageType: PageType;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Page extends PageBase {
  metaDescription?: string;
  excerpt?: string;
  featuredImage?: StrapiMedia;
  content?: string;
  readingTime?: number;
  isFeatured: boolean;
  sidebar?: SidebarWidget[];
  seo?: SEO;
  author?: Author;
  parent?: PageBase | null;
  children?: PageBase[];
}

// For listing/card views (lighter payload)
export interface PageSummary extends PageBase {
  excerpt?: string;
  featuredImage?: StrapiMedia;
  readingTime?: number;
  isFeatured: boolean;
  author?: Pick<Author, 'id' | 'name' | 'slug' | 'avatar'>;
}

// ============================================
// BREADCRUMB
// ============================================

export interface Breadcrumb {
  title: string;
  path: string;
}

// ============================================
// LEGACY TYPES (Blog Posts, Static Pages)
// ============================================

export interface BlogGuideCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  contentMarkdown: string;
  description: string | null;
  featuredImage: StrapiMedia | null;
  blogGuideCategory: BlogGuideCategory | null;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

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
  seo?: SEO;
  publishedAt: string;
}

// ============================================
// LAYOUT SINGLE TYPES
// ============================================

export interface NavigationLink {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface CtaButton {
  label: string;
  url: string;
}

export interface FooterColumn {
  id: number;
  title: string;
  links: NavigationLink[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
}

export interface StrapiHeader {
  id: number;
  documentId: string;
  logo: StrapiMedia | null;
  navigation: NavigationLink[];
  ctaButton?: CtaButton;
}

export interface StrapiFooter {
  id: number;
  documentId: string;
  logo: StrapiMedia | null;
  columns: FooterColumn[];
  copyright: string;
  socialLinks: SocialLink[];
}

export interface Header {
  logo?: {
    url: string;
    alt: string;
  };
  navigation: NavigationLink[];
  ctaButton?: CtaButton;
}

export interface Footer {
  logo?: {
    url: string;
    alt: string;
  };
  columns: FooterColumn[];
  copyright: string;
  socialLinks: SocialLink[];
}

