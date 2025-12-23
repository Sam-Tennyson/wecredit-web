import ChildPageCard, { ChildPage } from './child-page-card';
import { cn } from '@/lib/utils';

/** Props for ChildPagesSection component */
interface ChildPagesSectionProps {
  title: string;
  pages: ChildPage[];
  className?: string;
}

/**
 * Renders a section with a grid of child page cards
 * Shows a title and responsive grid layout
 */
const ChildPagesSection = ({ title, pages, className }: ChildPagesSectionProps) => {
  if (pages.length === 0) {
    return null;
  }

  return (
    <section className={cn('mt-12 pt-8 border-t border-gray-200', className)}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Explore {title}
      </h2>
      {/* <div className="grid grid-cols-12 md:grid-cols-2 gap-6"> */}
      <div className="w-full">
        {pages.map((page) => (
          <ChildPageCard key={page.documentId} page={page} />
        ))}
      </div>
    </section>
  );
};

export default ChildPagesSection;

