import Link from 'next/link';
import { Breadcrumb } from '@/types/strapi';
import { cn } from '@/lib/utils';

const TEXT_COLOR = 'text-muted-foreground';

/** Props for Breadcrumbs component */
interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
}

/** Chevron separator component */
const Separator = ({ className }: { className?: string }) => (
  <svg
    className={cn(`${TEXT_COLOR} size-2.5 mx-1 sm:mx-2`, className)}
    fill="currentColor"
    viewBox="0 0 320 512"
    aria-hidden="true"
    style={{ display: 'inline', verticalAlign: 'middle' }}
  >
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
  </svg>
);

/**
 * Responsive breadcrumb navigation
 * Desktop: flex layout with wrapping
 * Mobile: inline text flow for natural wrapping
 */
const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (items.length <= 1) {
    return null;
  }

  const linkClass = `${TEXT_COLOR} text-xs hover:underline transition-colors duration-200`;
  const activeClass = `${TEXT_COLOR} text-xs font-medium`;

  return (
    <nav className={cn('mb-6', className)} aria-label="Breadcrumb">
      {/* Desktop View */}
      <p className="hidden sm:flex items-center gap-1 flex-wrap text-xs">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={crumb.path} className="inline-flex items-center">
              {isLast ? (
                <span className={activeClass}>{crumb.title}</span>
              ) : (
                <Link href={crumb.path} className={linkClass}>{crumb.title}</Link>
              )}
              {!isLast && <Separator />}
            </span>
          );
        })}
      </p>

      {/* Mobile View - pure inline text flow for natural wrapping */}
      <p className="sm:hidden text-xs leading-relaxed">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={crumb.path} style={{ display: 'inline' }}>
              {isLast ? (
                <span className={activeClass}>{crumb.title}</span>
              ) : (
                <>
                  <Link href={crumb.path} className={linkClass}>{crumb.title}</Link>
                  <Separator />
                </>
              )}
            </span>
          );
        })}
      </p>
    </nav>
  );
};

export default Breadcrumbs;

