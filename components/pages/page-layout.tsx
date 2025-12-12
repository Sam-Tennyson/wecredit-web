import PageContent from './page-content';
import PageSidebar from './page-sidebar';
import FormWidget from '@/components/widgets/form-widget';
import type { Page } from '@/lib/api/strapi';

/** Props for PageLayout component */
interface PageLayoutProps {
  page: Page;
}

/**
 * Main page layout wrapper that combines content and sidebar
 * Adjusts layout based on page type and sidebar presence
 */
const PageLayout = ({ page }: PageLayoutProps) => {
  const hasSidebar = page.sidebar && page.sidebar.length > 0;
  const isHomePage = page.pageType === 'home';
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Home page: full width with optional sidebar below on mobile */}
      {isHomePage && (
        <div className="space-y-8">
          <PageContent page={page} />
          
          {/* Standalone Form Widget */}
          {page.formWidget && (
            <div className="mt-8">
              <FormWidget widget={page.formWidget} />
            </div>
          )}
          
          {hasSidebar && page.sidebar && (
            <div className="lg:hidden">
              <PageSidebar widgets={page.sidebar} />
            </div>
          )}
          {hasSidebar && page.sidebar && (
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-3">
                  <PageSidebar widgets={page.sidebar} />
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
            <PageContent page={page} />
            
            {/* Standalone Form Widget */}
            {page.formWidget && (
              <div className="mt-8">
                <FormWidget widget={page.formWidget} />
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          {hasSidebar && page.sidebar && (
            <div className="lg:col-span-4">
              <PageSidebar widgets={page.sidebar} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageLayout;
