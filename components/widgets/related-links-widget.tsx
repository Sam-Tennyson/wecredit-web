import { RelatedLinksWidget } from '@/types/strapi';
import LinkItem from './shared/link-item';

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
            <LinkItem
              key={link.id}
              url={link.url}
              label={link.label}
              openInNewTab={link.openInNewTab}
              variant="card"
            />
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id}>
              <LinkItem
                url={link.url}
                label={link.label}
                openInNewTab={link.openInNewTab}
                variant="list"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RelatedLinksWidgetComponent;
