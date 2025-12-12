import WidgetRenderer from '@/components/widgets/widget-renderer';
import { SidebarWidget } from '@/types/strapi';

/** Props for PageSidebar component */
interface PageSidebarProps {
  widgets: SidebarWidget[];
  currentPageId?: string;
}

/**
 * Renders sidebar with dynamic widgets
 */
const PageSidebar = ({ widgets, currentPageId }: PageSidebarProps) => {
  if (!widgets || widgets.length === 0) {
    return null;
  }
  
  return (
    <aside className="sticky top-8 space-y-6">
      {widgets.map((widget, index) => (
        <WidgetRenderer key={`${widget.__component}-${widget.id || index}`} widget={widget} />
      ))}
    </aside>
  );
};

export default PageSidebar;
