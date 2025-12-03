import Image from 'next/image';
import type { BlogPost } from '@/lib/strapi/types';
import MarkdownHtmlContent from '@/components/shared/MarkdownHtmlContent';

/** Props for ArticleContent component */
interface ArticleContentProps {
  article: BlogPost;
}

/**
 * Renders blog post content from Strapi
 */
const ArticleContent = ({ article }: ArticleContentProps) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        {article.category && (
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            {article.category.name}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <time dateTime={article.publishedAt}>{formattedDate}</time>
        </div>
        {article.description && (
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            {article.description}
          </p>
        )}
      </header>
      {article.featuredImage && (
        <figure className="mb-8">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            className="w-full h-auto rounded-lg"
            priority
          />
        </figure>
      )}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-gray-900">
        <MarkdownHtmlContent content={article.content} />
      </div>
    </article>
  );
};

export default ArticleContent;
