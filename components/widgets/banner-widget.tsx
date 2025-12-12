import Link from 'next/link';
import { BannerWidget } from '@/types/strapi';

/** Props for BannerWidget component */
interface BannerWidgetProps {
  widget: BannerWidget;
}

/**
 * Renders a banner widget with title, subtitle, button and custom background color
 */
const BannerWidgetComponent = ({ widget }: BannerWidgetProps) => {
  const { title, subtitle, buttonText, buttonUrl, backgroundColor } = widget;
  
  return (
    <div
      className="rounded-lg p-6 text-white shadow-md"
      style={{ backgroundColor }}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {subtitle && <p className="text-sm mb-4 opacity-90">{subtitle}</p>}
      {buttonText && buttonUrl && (
        <Link
          href={buttonUrl}
          className="inline-block bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default BannerWidgetComponent;
