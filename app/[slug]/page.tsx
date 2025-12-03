import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/strapi';
import ArticleContent from '@/components/articles/ArticleContent';
import DebugData from '@/components/shared/DebugData';

/** Force dynamic rendering (no caching) for Pure SSR */
export const dynamic = 'force-dynamic';

/** Page component props */
interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates dynamic metadata from Strapi SEO fields
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);
  if (!blogPost) {
    return {
      title: 'Page Not Found',
    };
  }
  return {
    title: blogPost.seo?.metaTitle || blogPost.title,
    description: blogPost.seo?.metaDescription || blogPost.description,
    keywords: blogPost.seo?.keywords,
  };
}

/**
 * Dynamic page component that renders blog posts from Strapi
 * Note: Static pages now have dedicated routes (e.g., /about-us, /contact-us)
 */
const DynamicPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);
  
  if (!blogPost) {
    notFound();
  }
  
  return (
    <>
      <ArticleContent article={blogPost} />
      <DebugData data={blogPost} title={`Blog Post: ${slug}`} />
    </>
  );
};

export default DynamicPage;
