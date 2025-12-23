import Link from 'next/link';
import { Breadcrumb } from '@/types/strapi';
import { cn } from '@/lib/utils';

/** Props for Breadcrumbs component */
interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

/**
 * Renders breadcrumb navigation with links and separators
 * Last item is displayed as plain text (current page)
 */
const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (items.length <= 1) {
    return null;
  }

  return (
    <nav className={cn('mb-6', className)} aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {isLast ? (
                <span className="text-gray-900 font-medium">
                  {crumb.title}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {crumb.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

