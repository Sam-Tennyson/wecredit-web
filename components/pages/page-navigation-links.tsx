import Link from 'next/link';
import type { Page, RelatedLinksWidget, Link as LinkType } from '@/types/strapi';

/** Props for PageNavigationLinks component */
interface PageNavigationLinksProps {
  page: Page;
}

/**
 * Displays all available navigation links from a page
 * Includes child pages, sidebar widget links, and related links
 */
const PageNavigationLinks = ({ page }: PageNavigationLinksProps) => {
  const hasChildren = page.children && page.children.length > 0;
  const sidebarLinks = extractSidebarLinks(page);
  const hasAnyLinks = hasChildren || sidebarLinks.length > 0;

  if (!hasAnyLinks) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Quick Navigation
      </h2>

      {/* Child Pages Navigation */}
      {hasChildren && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Main Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {page.children?.map((child) => (
              <Link
                key={child.documentId}
                href={child.fullPath}
                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 hover:border-blue-400 transition-all group"
              >
                <svg
                  className="w-5 h-5 text-blue-600 group-hover:text-blue-700 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900 group-hover:text-blue-700 block truncate">
                    {child.title}
                  </span>
                  <span className="text-xs text-gray-600 block truncate">
                    {child.fullPath}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar Widget Links */}
      {sidebarLinks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sidebarLinks.map((widget, index) => (
              <div
                key={`widget-${index}`}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-3">
                  {widget.title}
                </h4>
                <ul className="space-y-2">
                  {widget.links.map((link) => (
                    <li key={link.id}>
                      {link.openInNewTab ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <svg
                            className="w-4 h-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          <span>{link.label}</span>
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                          <span>{link.label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Extracts all links from sidebar widgets (RelatedLinksWidget)
 */
function extractSidebarLinks(page: Page): Array<{ title: string; links: LinkType[] }> {
  if (!page.sidebar || page.sidebar.length === 0) {
    return [];
  }

  return page.sidebar
    .filter((widget): widget is RelatedLinksWidget => 
      widget.__component === 'widgets.related-links' && widget.links.length > 0
    )
    .map(widget => ({
      title: widget.title,
      links: widget.links,
    }));
}

export default PageNavigationLinks;


