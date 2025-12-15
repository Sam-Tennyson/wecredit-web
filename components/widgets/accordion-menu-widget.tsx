'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AccordionMenuWidget } from '@/types/strapi';

/** Props for AccordionMenuWidget component */
interface AccordionMenuWidgetProps {
  widget: AccordionMenuWidget;
}

/**
 * Renders an accordion menu widget with expand/collapse functionality
 * Displays links sorted by order field
 */
const AccordionMenuWidgetComponent = ({ widget }: AccordionMenuWidgetProps) => {
  const { title, defaultExpanded, groups } = widget;
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!groups || groups.length === 0) {
    return null;
  }

  const sortedGroups = [...groups].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-4">
          <ul className="space-y-2">
            {sortedGroups.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                >
                  {item.label}
                  {item.openInNewTab && (
                    <span className="ml-1 text-xs">↗</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenuWidgetComponent;

