import type { PageWidget } from '@/lib/strapi/types';
import BannerWidgetComponent from './banner-widget';
import TextBlockWidgetComponent from './text-block-widget';
import RelatedLinksWidgetComponent from './related-links-widget';
import RecentPagesWidgetComponent from './recent-pages-widget';

/** Props for WidgetRenderer component */
interface WidgetRendererProps {
  widget: PageWidget;
}

/**
 * Renders a widget based on its __component type
 * Provides type-safe widget rendering with proper TypeScript discrimination
 */
const WidgetRenderer = ({ widget }: WidgetRendererProps) => {
  switch (widget.__component) {
    case 'widgets.banner':
      return <BannerWidgetComponent widget={widget} />;
    
    case 'widgets.text-block':
      return <TextBlockWidgetComponent widget={widget} />;
    
    case 'widgets.related-links':
      return <RelatedLinksWidgetComponent widget={widget} />;
    
    case 'widgets.recent-pages':
      return <RecentPagesWidgetComponent widget={widget} />;
    
    default:
      console.warn(`Unknown widget component: ${(widget as PageWidget).__component}`);
      return null;
  }
};

export default WidgetRenderer;
