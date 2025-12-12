import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageByFullPath, getAllPagePaths, getBreadcrumbs } from '@/lib/api/pages';
import { generatePageMetadata, generateJsonLd } from '@/lib/utils/seo';
import PageLayout from '@/components/pages/page-layout';
import DebugData from '@/components/shared/DebugData';
import JsonLd from '@/components/seo/JsonLd';

/** Page component props */
interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

/**
 * Generate static params for all pages
 */
export async function generateStaticParams() {
  const paths = await getAllPagePaths();

  return paths.map((fullPath) => ({
    slug: fullPath.split('/').filter(Boolean),
  }));
}

/**
 * Generates dynamic metadata from page SEO fields
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullPath = `/${slug?.join('/') || ''}`;
  const page = await getPageByFullPath(fullPath);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }
  
  return generatePageMetadata(page);
}

/**
 * Dynamic catch-all page component that renders pages from Strapi pages collection
 * Supports nested routes like /credit-cards/rewards/best-2024
 */
const CatchAllPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const fullPath = `/${slug?.join('/') || ''}`;
  const page = await getPageByFullPath(fullPath);
  
  if (!page) {
    notFound();
  }
  
  const jsonLd = generateJsonLd(page);
  
  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <PageLayout page={page} />
      <DebugData data={page} title={`Page: ${page.fullPath}`} />
    </>
  );
};

export default CatchAllPage;
