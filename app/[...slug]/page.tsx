import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageByFullPath, getAllPagePaths } from '@/lib/api/pages';
import { generatePageMetadata, generateJsonLd } from '@/lib/utils/seo';
import PageLayout from '@/components/pages/page-layout';
import DebugData from '@/components/shared/DebugData';
import JsonLd from '@/components/seo/JsonLd';
import { ClientDebugLogger } from '@/components/shared/ClientDebugLogger';
import { PageDataProvider } from '@/providers/page-data-provider';
import type { Breadcrumb, Page } from '@/lib/api/strapi';

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
  const breadcrumbs = buildPageBreadcrumbs(page);
  const jsonLd = generateJsonLd(page);
  return (
    <PageDataProvider data={page}>
      <ClientDebugLogger data={page} label="Page Data" />
      {jsonLd && <JsonLd data={jsonLd} />}
      <PageLayout page={page} breadcrumbs={breadcrumbs} />
    </PageDataProvider>
  );
};

function buildPageBreadcrumbs(page: Page): Breadcrumb[] {
  const apiPath = page.breadcrumbPath?.path || [];
  if (apiPath.length > 0) {
    const sortedPath = [...apiPath].sort((first, second) => first.order - second.order);
    const apiBreadcrumbs = sortedPath.map((item) => ({
      title: item.label,
      path: item.url,
    }));
    const hasHome = apiBreadcrumbs.some((breadcrumb) => breadcrumb.path === '/');
    if (!hasHome) {
      apiBreadcrumbs.unshift({ title: 'Home', path: '/' });
    }
    const hasCurrentPage = apiBreadcrumbs.some((breadcrumb) => breadcrumb.path === page.fullPath);
    if (!hasCurrentPage) {
      apiBreadcrumbs.push({ title: page.title, path: page.fullPath });
    }
    return apiBreadcrumbs;
  }
  return [
    { title: 'Home', path: '/' },
    { title: page.title, path: page.fullPath },
  ];
}

export default CatchAllPage;
