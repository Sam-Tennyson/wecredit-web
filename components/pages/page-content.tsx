import Link from 'next/link';
import Image from 'next/image';
import MarkdownHtmlContent from '@/components/shared/MarkdownHtmlContent';
import PageHeader from '@/components/page/PageHeader';
import { Page, PageSummary, Breadcrumb, getStrapiMediaUrl } from '@/lib/api/strapi';
import { getBreadcrumbs } from '@/lib/api/pages';

/** Child page with required display fields */
interface ChildPage extends PageSummary {
  fullPath: string;
  documentId: string;
}

/** Props for PageContent component */
interface PageContentProps {
  page: Page;
  breadcrumbs?: Breadcrumb[];
}

/**
 * Type guard to check if children are PageSummary with required fields
 */
function isChildPage(child: unknown): child is ChildPage {
  return (
    typeof child === 'object' &&
    child !== null &&
    'documentId' in child &&
    'fullPath' in child &&
    'title' in child
  );
}

function buildBreadcrumbsFromPath(page: Page): Breadcrumb[] | null {
  const pathItems = page.breadcrumbPath?.path || [];
  if (pathItems.length === 0) {
    return null;
  }
  const sortedPath = [...pathItems].sort((first, second) => first.order - second.order);
  const breadcrumbs = sortedPath.map((item) => ({
    title: item.label,
    path: item.url,
  }));
  const hasHome = breadcrumbs.some((breadcrumb) => breadcrumb.path === '/');
  if (!hasHome) {
    breadcrumbs.unshift({ title: 'Home', path: '/' });
  }
  const hasCurrentPage = breadcrumbs.some((breadcrumb) => breadcrumb.path === page.fullPath);
  if (!hasCurrentPage) {
    breadcrumbs.push({ title: page.title, path: page.fullPath });
  }
  return breadcrumbs;
}

/**
 * Renders main page content with breadcrumbs, header, content and children
 */
const PageContent = async ({ page, breadcrumbs: providedBreadcrumbs }: PageContentProps) => {
  const apiBreadcrumbs = buildBreadcrumbsFromPath(page);
  const breadcrumbs = providedBreadcrumbs ?? apiBreadcrumbs ?? await getBreadcrumbs(page);
  const childPages = page.children?.filter(isChildPage) || [];
  const hasChildren = childPages.length > 0;
  
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
      
      {/* Page Header */}
      <PageHeader page={page} />
      
      {/* Page Content */}
      {page.content && (
        <MarkdownHtmlContent 
          content={page.content} 
          className="mb-8"
        />
      )}
      
      {/* Children Pages */}
      {hasChildren && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Explore {page.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {childPages.map((child) => (
              <Link
                key={child.documentId}
                href={child.fullPath || '/'}
                className="group block p-6 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
              >
                {child.featuredImage && (
                  <div className="relative w-full h-32 mb-4 rounded overflow-hidden">
                    <Image
                      src={getStrapiMediaUrl(child.featuredImage.url)}
                      alt={child.featuredImage.alternativeText || child.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-2">
                  {child.title}
                </h3>
                {child.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {child.excerpt}
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
