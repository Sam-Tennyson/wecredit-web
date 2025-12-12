import Link from 'next/link';
import { RelatedLinksWidget } from '@/types/strapi';

/** Props for RelatedLinksWidget component */
interface RelatedLinksWidgetProps {
  widget: RelatedLinksWidget;
}

/**
 * Renders a related links widget with list or card style
 */
const RelatedLinksWidgetComponent = ({ widget }: RelatedLinksWidgetProps) => {
  const { title, style, links } = widget;
  
  if (!links || links.length === 0) {
    return null;
  }
  
  const isCardStyle = style === 'card';
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
      {isCardStyle ? (
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              className="block p-3 bg-gray-50 hover:bg-blue-50 rounded-md transition-colors border border-gray-200 hover:border-blue-300"
            >
              <span className="text-sm font-medium text-gray-900 hover:text-blue-600">
                {link.label}
              </span>
              {link.openInNewTab && (
                <span className="ml-1 text-xs text-gray-500">↗</span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.url}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {link.label}
                {link.openInNewTab && (
                  <span className="ml-1 text-xs">↗</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RelatedLinksWidgetComponent;
