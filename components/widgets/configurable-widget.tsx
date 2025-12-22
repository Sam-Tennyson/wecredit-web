import type { ConfigurableWidget } from '@/types/strapi';

/** Props for ConfigurableWidgetComponent */
interface ConfigurableWidgetComponentProps {
  widget: ConfigurableWidget;
}

/**
 * Renders a configurable widget with dynamic configuration
 * This widget type allows for flexible content based on config object
 */
const ConfigurableWidgetComponent = ({ widget }: ConfigurableWidgetComponentProps) => {
  const { title, config } = widget;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {config && (
        <div className="text-sm text-gray-600">
          {/* Render config-based content here */}
          <pre className="whitespace-pre-wrap wrap-break-word">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      )}
      {!title && !config && (
        <p className="text-gray-500 italic">Configurable widget - no content configured</p>
      )}
    </div>
  );
};

export default ConfigurableWidgetComponent;

