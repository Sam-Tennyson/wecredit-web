import { getAllPages } from '@/lib/api/pages';
import { getHeader, getFooter } from '@/lib/strapi';
import AllPagesAndLinksDisplay from '@/components/pages/all-pages-and-links-display';
import Link from 'next/link';

/** Force dynamic rendering (no caching) for Pure SSR */
export const dynamic = 'force-dynamic';

/**
 * All links display page - shows ALL pages from /api/pages and all their links
 */
const AllLinksPage = async () => {
  const [allPages, headerData, footerData] = await Promise.all([
    getAllPages(),
    getHeader(),
    getFooter(),
  ]);

  if (!allPages || allPages.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-900 mb-2">
            No Pages Found
          </h1>
          <p className="text-red-700 mb-4">
            Unable to fetch pages from Strapi API. Please check your Strapi configuration and ensure pages are published.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AllPagesAndLinksDisplay pages={allPages} header={headerData} footer={footerData} />
  );
};

export default AllLinksPage;

