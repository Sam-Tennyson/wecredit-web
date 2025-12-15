import { SidebarWidget } from '@/types/strapi';
import BannerWidgetComponent from './banner-widget';
import TextBlockWidgetComponent from './text-block-widget';
import RelatedLinksWidgetComponent from './related-links-widget';
import RecentPagesWidgetComponent from './recent-pages-widget';
import FormWidget from './form-widget';
import LeadCaptureFormWidget from './lead-capture-form-widget';
import AccordionMenuWidgetComponent from './accordion-menu-widget';

/** Props for WidgetRenderer component */
interface WidgetRendererProps {
  widget: SidebarWidget;
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
    
    case 'widgets.form-widget':
      return <FormWidget widget={widget} />;
    
    case 'widgets.lead-capture-form':
      return <LeadCaptureFormWidget widget={widget} />;
    
    case 'widgets.accordion-menu':
      return <AccordionMenuWidgetComponent widget={widget} />;
    
    default:
      console.warn(`Unknown widget component: ${(widget as SidebarWidget).__component}`);
      return null;
  }
};

export default WidgetRenderer;
