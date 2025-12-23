import PageContent from './page-content';
import PageSidebar from './page-sidebar';
import GroupedRelatedLinksWidget from '@/components/widgets/grouped-related-links-widget';
import type { Breadcrumb, Page } from '@/lib/api/strapi';

/** Props for PageLayout component */
interface PageLayoutProps {
  page: Page;
  breadcrumbs?: Breadcrumb[];
}

/**
 * Extracts widgets from page using categoryWidget (new) or sidebar (legacy)
 */
function getPageWidgets(page: Page) {
  return page.categoryWidget?.widgets || page.sidebar || [];
}

/**
 * Extracts grouped related links from categoryWidget
 */
function getGroupedRelatedLinks(page: Page) {
  return page.categoryWidget?.relatedLinks || [];
}

/**
 * Main page layout wrapper that combines content and sidebar
 * Adjusts layout based on page type and sidebar presence
 */
const PageLayout = ({ page, breadcrumbs }: PageLayoutProps) => {
  const widgets = getPageWidgets(page);
  const groupedRelatedLinks = getGroupedRelatedLinks(page);
  const hasSidebar = widgets.length > 0 || groupedRelatedLinks.length > 0;
  const isHomePage = page.pageType === 'home';
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Home page: full width with optional sidebar below on mobile */}
      {isHomePage && (
        <div className="space-y-8">
          <PageContent page={page} breadcrumbs={breadcrumbs} />
          
          {hasSidebar && (
            <div className="lg:hidden space-y-6">
              {widgets.length > 0 && <PageSidebar widgets={widgets} />}
              {groupedRelatedLinks.length > 0 && (
                <GroupedRelatedLinksWidget
                  links={groupedRelatedLinks}
                />
              )}
            </div>
          )}
          {hasSidebar && (
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3 space-y-6">
                  {widgets.length > 0 && <PageSidebar widgets={widgets} />}
                  {groupedRelatedLinks.length > 0 && (
                    <GroupedRelatedLinksWidget
                      links={groupedRelatedLinks}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Other page types: content with sidebar (8/4 split) */}
      {!isHomePage && (
        <div className={`grid grid-cols-1 ${hasSidebar ? 'lg:grid-cols-12' : ''} gap-8`}>
          {/* Main Content */}
          <div className={hasSidebar ? 'lg:col-span-8' : ''}>
            <PageContent page={page} breadcrumbs={breadcrumbs} />
          </div>
          
          {/* Sidebar */}
          {hasSidebar && (
            <aside className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {widgets.length > 0 && <PageSidebar widgets={widgets} />}
                {groupedRelatedLinks.length > 0 && (
                  <GroupedRelatedLinksWidget
                    links={groupedRelatedLinks}
                  />
                )}
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
};

export default PageLayout;
