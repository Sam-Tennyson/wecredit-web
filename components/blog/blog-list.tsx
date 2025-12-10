import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/strapi/types';

/** Props for BlogList component */
interface BlogListProps {
  posts: BlogPost[];
}

/**
 * Renders a list of blog posts in a grid layout
 */
const BlogList = ({ posts }: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No blog posts available yet.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.documentId} post={post} />
      ))}
    </div>
  );
};

/** Props for BlogCard component */
interface BlogCardProps {
  post: BlogPost;
}

/**
 * Renders a single blog post card with image, category, title, and description
 */
const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = formatPublishedDate(post.publishedAt);
  return (
    <Link 
      href={`/${post.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {post.featuredImage && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {post.category && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
              {post.category.name}
            </span>
          )}
          <time className="text-xs text-gray-500" dateTime={post.publishedAt}>
            {formattedDate}
          </time>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
};

/**
 * Formats a date string to a human-readable format
 */
function formatPublishedDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default BlogList;
