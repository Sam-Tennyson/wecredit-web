import Demo from './components/Demo';

/** Force dynamic rendering (no caching) for Pure SSR */
export const dynamic = 'force-dynamic';

/**
 * Home page component that fetches and renders the home page from Strapi
 * Falls back to blog demo if home page is not available
 */
const Home = async () => {
    return <Demo />;

};

export default Home;

