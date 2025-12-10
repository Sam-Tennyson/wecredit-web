import Link from 'next/link';
import Image from 'next/image';
import { getAllPages } from '@/lib/strapi/queries';
import type { RecentPagesWidget } from '@/lib/strapi/types';

/** Props for RecentPagesWidget component */
interface RecentPagesWidgetProps {
  widget: RecentPagesWidget;
}

/**
 * Renders a recent pages widget with optional images
 */
const RecentPagesWidgetComponent = async ({ widget }: RecentPagesWidgetProps) => {
  const { title, count, showImages } = widget;
  
  const pages = await getAllPages();
  const recentPages = pages
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
  
  if (recentPages.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
      <ul className="space-y-3">
        {recentPages.map((page) => (
          <li key={page.documentId}>
            <Link
              href={`/${page.fullPath}`}
              className="group block hover:bg-gray-50 rounded-md p-2 transition-colors"
            >
              {showImages && page.featuredImage && (
                <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                  <Image
                    src={page.featuredImage.url}
                    alt={page.featuredImage.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {page.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPagesWidgetComponent;
