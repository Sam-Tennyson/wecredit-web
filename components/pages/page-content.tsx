import Link from 'next/link';
import Image from 'next/image';
import MarkdownHtmlContent from '@/components/shared/MarkdownHtmlContent';
import type { Page } from '@/lib/strapi/types';

/** Props for PageContent component */
interface PageContentProps {
  page: Page;
}

/**
 * Breadcrumb item interface
 */
interface BreadcrumbItem {
  title: string;
  path: string;
}

/**
 * Builds breadcrumb array from page parent chain
 */
function buildBreadcrumbs(page: Page): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];
  
  const addParentBreadcrumbs = (currentPage: Page) => {
    if (currentPage.parent) {
      addParentBreadcrumbs(currentPage.parent);
    }
    breadcrumbs.push({
      title: currentPage.title,
      path: `/${currentPage.fullPath}`,
    });
  };
  
  addParentBreadcrumbs(page);
  return breadcrumbs;
}

/**
 * Renders main page content with breadcrumbs, featured image, content and children
 */
const PageContent = ({ page }: PageContentProps) => {
  const breadcrumbs = buildBreadcrumbs(page);
  const hasChildren = page.children && page.children.length > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-gray-400">/</span>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">
                    {crumb.title}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {crumb.title}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      {/* Featured Image */}
      {page.featuredImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={page.featuredImage.url}
            alt={page.featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {page.title}
      </h1>
      
      {/* Page Content */}
      <MarkdownHtmlContent 
        content={page.content} 
        className="prose prose-lg max-w-none mb-8"
      />
      
      {/* Children Pages */}
      {hasChildren && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore {page.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {page.children.map((child) => (
              <Link
                key={child.documentId}
                href={`/${child.fullPath}`}
                className="group block p-6 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
              >
                {child.featuredImage && (
                  <div className="relative w-full h-32 mb-4 rounded overflow-hidden">
                    <Image
                      src={child.featuredImage.url}
                      alt={child.featuredImage.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-2">
                  {child.title}
                </h3>
                {child.metaDescription && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {child.metaDescription}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContent;
