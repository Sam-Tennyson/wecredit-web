import { getBlogPosts } from '@/lib/strapi/queries';
import BlogList from '@/components/blog/blog-list';

/**
 * Demo component that displays the list of blog posts
 */
const Demo = async () => {
  const blogPosts = await getBlogPosts();
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover insights, guides, and stories to help you make informed financial decisions
        </p>
      </header>
      <BlogList posts={blogPosts} />
    </div>
  );
};

export default Demo;