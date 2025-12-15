import Link from 'next/link';
import type { Page, Header, Footer } from '@/types/strapi';

/** Props for AllLinksDisplay component */
interface AllLinksDisplayProps {
  page: Page;
  header: Header;
  footer: Footer;
}

/**
 * Displays all available links in the application
 * Useful for debugging and seeing complete site navigation
 */
const AllLinksDisplay = ({ page, header, footer }: AllLinksDisplayProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Navigation Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Header Navigation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {header.navigation.map((link) => (
            <NavigationLinkCard
              key={link.id}
              label={link.label}
              url={link.url}
              isExternal={link.openInNewTab}
            />
          ))}
        </div>
        {header.ctaButton && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">CTA Button</h3>
            <NavigationLinkCard
              label={header.ctaButton.label}
              url={header.ctaButton.url}
              isExternal={false}
              variant="cta"
            />
          </div>
        )}
      </div>

      {/* Page Child Links */}
      {page.children && page.children.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-green-600"
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
            Child Pages ({page.children.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {page.children.map((child) => (
              <Link
                key={child.documentId}
                href={child.fullPath}
                className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 hover:border-green-400 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 mb-1">
                      {child.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{child.fullPath}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-white rounded border border-green-300 text-green-700">
                        {child.pageType}
                      </span>
                      <span className="text-xs px-2 py-1 bg-white rounded border border-gray-300 text-gray-600">
                        Order: {child.order}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform flex-shrink-0"
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar Widget Links */}
      {page.sidebar && page.sidebar.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Sidebar Widgets
          </h2>
          <div className="space-y-4">
            {page.sidebar.map((widget) => {
              if (widget.__component === 'widgets.related-links' && widget.links.length > 0) {
                return (
                  <div
                    key={widget.id}
                    className="p-4 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-3">{widget.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {widget.links.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center gap-2 p-2 bg-white rounded border border-purple-100"
                        >
                          {link.openInNewTab ? (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              <span className="truncate">{link.label}</span>
                            </a>
                          ) : (
                            <Link
                              href={link.url}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              <span className="truncate">{link.label}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {/* Footer Links */}
      {footer.columns && footer.columns.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Footer Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {footer.columns.map((column) => (
              <div key={column.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <NavigationLinkCard
                        label={link.label}
                        url={link.url}
                        isExternal={link.isExternal}
                        compact
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {footer.socialLinks && footer.socialLinks.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Social Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {footer.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 hover:border-pink-400 transition-all"
              >
                <span className="font-medium text-gray-900 capitalize">
                  {link.platform}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Navigation Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard
            label="Header Links"
            count={header.navigation.length}
            color="blue"
          />
          <SummaryCard
            label="Child Pages"
            count={page.children?.length || 0}
            color="green"
          />
          <SummaryCard
            label="Footer Columns"
            count={footer.columns.length}
            color="orange"
          />
          <SummaryCard
            label="Social Links"
            count={footer.socialLinks?.length || 0}
            color="pink"
          />
        </div>
      </div>
    </div>
  );
};

/** Navigation link card component */
interface NavigationLinkCardProps {
  label: string;
  url: string;
  isExternal: boolean;
  variant?: 'default' | 'cta';
  compact?: boolean;
}

const NavigationLinkCard = ({ 
  label, 
  url, 
  isExternal, 
  variant = 'default',
  compact = false 
}: NavigationLinkCardProps) => {
  const baseClasses = compact
    ? 'text-blue-600 hover:text-blue-800 hover:underline text-sm'
    : `flex items-center justify-between gap-2 p-3 rounded-lg border transition-all ${
        variant === 'cta'
          ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700'
          : 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-400'
      }`;

  const content = (
    <>
      <span className={`font-medium ${compact ? '' : variant === 'cta' ? 'text-white' : 'text-gray-900'}`}>
        {label}
      </span>
      {!compact && (
        <div className="flex items-center gap-1">
          <span className={`text-xs ${variant === 'cta' ? 'text-blue-100' : 'text-gray-500'} truncate max-w-[150px]`}>
            {url}
          </span>
          {isExternal && (
            <svg className={`w-4 h-4 ${variant === 'cta' ? 'text-blue-100' : 'text-gray-400'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </div>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={url} className={baseClasses}>
      {content}
    </Link>
  );
};

/** Summary card component */
interface SummaryCardProps {
  label: string;
  count: number;
  color: 'blue' | 'green' | 'orange' | 'pink';
}

const SummaryCard = ({ label, count, color }: SummaryCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    pink: 'bg-pink-100 text-pink-800',
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className={`text-3xl font-bold mb-1 ${colorClasses[color].split(' ')[1]}`}>
        {count}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default AllLinksDisplay;


