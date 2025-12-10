import { getPageBySlug } from '@/lib/strapi/queries';
import PageLayout from '@/components/pages/page-layout';
import DebugData from '@/components/shared/DebugData';
import Demo from './components/Demo';

/** Force dynamic rendering (no caching) for Pure SSR */
export const dynamic = 'force-dynamic';

/**
 * Home page component that fetches and renders the home page from Strapi
 * Falls back to blog demo if home page is not available
 */
const Home = async () => {
  const homePage = await getPageBySlug('home');
  
  if (!homePage) {
    // Fallback to blog demo if home page not found
    return <Demo />;
  }
  
  return (
    <>
      <PageLayout page={homePage} />
      <DebugData data={homePage} title="Home Page" />
    </>
  );
};

export default Home;
