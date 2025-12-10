import WidgetRenderer from '@/components/widgets/widget-renderer';
import type { PageWidget } from '@/lib/strapi/types';

/** Props for PageSidebar component */
interface PageSidebarProps {
  widgets: PageWidget[];
}

/**
 * Renders sidebar with widgets
 */
const PageSidebar = ({ widgets }: PageSidebarProps) => {
  if (!widgets || widgets.length === 0) {
    return null;
  }
  
  return (
    <aside className="space-y-6">
      {widgets.map((widget, index) => (
        <WidgetRenderer key={`${widget.__component}-${widget.id || index}`} widget={widget} />
      ))}
    </aside>
  );
};

export default PageSidebar;
