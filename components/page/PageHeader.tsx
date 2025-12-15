/**
 * Page Header Component
 * Displays page title, excerpt, author info, and featured image
 */

import Image from 'next/image';
import Link from 'next/link';
import { Page, getStrapiMediaUrl, getOptimizedImageUrl } from '@/lib/api/strapi';
import { formatDate } from '@/lib/utils/date';

interface PageHeaderProps {
  page: Page;
}

/**
 * Page header with metadata, author info, and featured image
 */
const PageHeader = ({ page }: PageHeaderProps) => {
  const showMeta = ['blog', 'guide', 'resource'].includes(page.pageType);

  return (
    <header className="mb-8">
      {/* Page Type Badge */}
      {/* {page.pageType !== 'standard' && (
        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-600 bg-blue-50 rounded-full mb-4">
          {page.pageType}
        </span>
      )} */}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {page.title}
      </h1>

      {/* Excerpt */}
      {page.excerpt && (
        <p className="text-xl text-gray-600 mb-6">{page.excerpt}</p>
      )}

      {/* Meta Info */}
      {showMeta && (
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          {/* Author */}
          {page.author && (
            <div className="flex items-center gap-2">
              {page.author.avatar && (
                <Image
                  src={getStrapiMediaUrl(page.author.avatar.url)}
                  alt={page.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium text-gray-700">{page.author.name}</span>
            </div>
          )}

          {/* Date */}
          {page.publishedAt && (
            <time dateTime={page.publishedAt} className="text-gray-500">
              {formatDate(page.publishedAt)}
            </time>
          )}

          {/* Reading Time */}
          {page.readingTime && (
            <span className="text-gray-500">{page.readingTime} min read</span>
          )}
        </div>
      )}

      {/* Featured Image */}
      {page.featuredImage && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src={getOptimizedImageUrl(page.featuredImage, 'large')}
            alt={page.featuredImage.alternativeText || page.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
};

export default PageHeader;

