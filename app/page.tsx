import { getPageBySlug, getAllPages } from '@/lib/api/pages';
import PageLayout from '@/components/pages/page-layout';
import PageNavigationLinks from '@/components/pages/page-navigation-links';
import DebugData from '@/components/shared/DebugData';
import Demo from './components/Demo';
import Link from 'next/link';

/** Force dynamic rendering (no caching) for Pure SSR */
export const dynamic = 'force-dynamic';

/**
 * Home page component that fetches and renders the home page from Strapi
 * Falls back to blog demo if home page is not available
 */
const Home = async () => {
  const [homePage, allPages] = await Promise.all([
    getPageBySlug('home'),
    getAllPages(),
  ]);
  
  if (!homePage) {
    // Fallback to blog demo if home page not found
    return <Demo />;
  }
  
  const totalPages = allPages.length;
  
  return (
    <>
      {/* Quick Navigation Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Navigation
                </h2>
                <p className="text-sm text-gray-600">
                  {totalPages} pages available from Strapi API
                </p>
              </div>
            </div>
            <Link
              href="/all-links"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All {totalPages} Pages & Links
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageNavigationLinks page={homePage} />
      </div>

      <PageLayout page={homePage} />
      <DebugData data={homePage} title="Home Page" />
    </>
  );
};

export default Home;

