import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/strapi/queries';
import PageLayout from '@/components/pages/page-layout';
import DebugData from '@/components/shared/DebugData';

/** Force dynamic rendering (no caching) for Pure SSR */
export const dynamic = 'force-dynamic';

/** Page component props */
interface PageProps {
  params: Promise<{ slug: string[] }>;
}

/**
 * Generates dynamic metadata from page SEO fields
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const page = await getPageBySlug(lastSlug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }
  
  // Verify the full path matches the requested path
  const requestedPath = slug.join('/');
  if (page.fullPath !== requestedPath) {
    return {
      title: 'Page Not Found',
    };
  }
  
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || page.metaDescription,
    keywords: page.seo?.keywords,
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || page.metaDescription,
      images: page.featuredImage ? [
        {
          url: page.featuredImage.url,
          width: page.featuredImage.width,
          height: page.featuredImage.height,
          alt: page.featuredImage.alt,
        }
      ] : undefined,
    },
  };
}

/**
 * Dynamic catch-all page component that renders pages from Strapi pages collection
 * Supports nested routes like /products/laptops/gaming-laptops
 */
const CatchAllPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];
  const page = await getPageBySlug(lastSlug);
  
  if (!page) {
    notFound();
  }
  
  // Verify the full path matches the requested path
  const requestedPath = slug.join('/');
  if (page.fullPath !== requestedPath) {
    notFound();
  }
  
  return (
    <>
      <PageLayout page={page} />
      <DebugData data={page} title={`Page: ${page.fullPath}`} />
    </>
  );
};

export default CatchAllPage;
