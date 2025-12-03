import type { StaticPage } from '@/lib/strapi/types';
import MarkdownHtmlContent from '@/components/shared/MarkdownHtmlContent';

/** Props for StaticPageContent component */
interface StaticPageContentProps {
  page: StaticPage;
}

/**
 * Renders static page content from Strapi
 */
const StaticPageContent = ({ page }: StaticPageContentProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {page.title}
        </h1>
      </header>
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-gray-900">
        <MarkdownHtmlContent content={page.content} />
      </div>
    </div>
  );
};

export default StaticPageContent;
