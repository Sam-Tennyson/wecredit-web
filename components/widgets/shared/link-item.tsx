import Link from 'next/link';

/** Props for LinkItem component */
interface LinkItemProps {
  url: string;
  label: string;
  openInNewTab?: boolean;
  variant?: 'list' | 'card';
  className?: string;
}

/**
 * Shared link component for widget link rendering
 * Supports list and card style variants with external link handling
 */
const LinkItem = ({ url, label, openInNewTab = false, variant = 'list', className }: LinkItemProps) => {
  const isCardStyle = variant === 'card';

  const baseStyles = isCardStyle
    ? 'block p-3 bg-gray-50 hover:bg-blue-50 rounded-md transition-colors border border-gray-200 hover:border-blue-300'
    : 'text-sm text-blue-600 hover:text-blue-800 hover:underline';

  const labelStyles = isCardStyle
    ? 'text-sm font-medium text-gray-900'
    : '';

  return (
    <Link
      href={url}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={`${baseStyles} ${className ?? ''}`}
    >
      <span className={labelStyles}>
        {label}
        {openInNewTab && <span className="ml-1 text-xs text-gray-500">↗</span>}
      </span>
    </Link>
  );
};

export default LinkItem;

