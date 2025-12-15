import { TextBlockWidget } from '@/types/strapi';

/** Props for TextBlockWidget component */
interface TextBlockWidgetProps {
  widget: TextBlockWidget;
}

/**
 * Renders a text block widget with optional title and richtext content
 */
const TextBlockWidgetComponent = ({ widget }: TextBlockWidgetProps) => {
  const { title, content } = widget;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      {title && (
        <h3 className="text-lg font-bold mb-3 text-gray-900">{title}</h3>
      )}
      <div 
        className="markdown-content-strapi text-sm"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TextBlockWidgetComponent;
