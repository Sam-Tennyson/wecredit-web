/**
 * Static Pages Manifest
 * Defines all available static page slugs for reference
 * These correspond to markdown files in /content/pages/
 */

/** Available static page slugs */
export const STATIC_PAGE_SLUGS = [
  'about-us',
  'contact-us',
  'privacy-policy',
  'terms-of-service',
] as const;

/** Type for static page slugs */
export type StaticPageSlug = typeof STATIC_PAGE_SLUGS[number];

/**
 * Checks if a slug is a valid static page slug
 */
export function isStaticPageSlug(slug: string): slug is StaticPageSlug {
  return STATIC_PAGE_SLUGS.includes(slug as StaticPageSlug);
}

/**
 * Gets the full URL path for a static page
 */
export function getStaticPagePath(slug: StaticPageSlug): string {
  return `/${slug}`;
}
