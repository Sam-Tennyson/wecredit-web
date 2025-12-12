'use client';

/**
 * Form Widget Component
 * Displays form content with embedded HTML, styles, and scripts
 */

import type { FormWidgetWidget, FormWidgetComponent } from '@/types/strapi';
import MarkdownHtmlContent from '../shared/MarkdownHtmlContent';

interface FormWidgetProps {
  widget: FormWidgetWidget | FormWidgetComponent;
}

/**
 * Renders a form widget with richtext content
 * Can contain embedded forms, CTAs, or interactive content
 * Handles full HTML documents with inline styles and scripts
 */
const FormWidget = ({ widget }: FormWidgetProps) => {
  if (!widget.content) {
    return null;
  }

  return (
    <div className="form-widget">
      <MarkdownHtmlContent content={widget.content} />
    </div>
  );
};

export default FormWidget;
