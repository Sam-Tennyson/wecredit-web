'use client';

import { useState } from 'react';
import { CategoryRelatedLink, GroupedLinks } from '@/types/strapi';
import LinkItem from './shared/link-item';

/** Props for GroupedRelatedLinksWidget component */
interface GroupedRelatedLinksWidgetProps {
  links: CategoryRelatedLink[];
  defaultExpanded?: boolean;
}

/**
 * Groups links by their group field
 * Sorts groups alphabetically, links within groups by order
 */
function groupLinksByGroup(links: CategoryRelatedLink[]): GroupedLinks[] {
  const groupMap = new Map<string, CategoryRelatedLink[]>();
  for (const link of links) {
    const groupName = link.group || 'Other';
    const existing = groupMap.get(groupName) || [];
    existing.push(link);
    groupMap.set(groupName, existing);
  }
  const groups: GroupedLinks[] = [];
  for (const [groupName, groupLinks] of groupMap) {
    const sortedLinks = [...groupLinks].sort((a, b) => a.order - b.order);
    groups.push({ groupName, links: sortedLinks });
  }
  return groups.sort((a, b) => a.groupName.localeCompare(b.groupName));
}

/** Single accordion group component */
interface AccordionGroupProps {
  group: GroupedLinks;
  isExpanded: boolean;
  onToggle: () => void;
}

const AccordionGroup = ({ group, isExpanded, onToggle }: AccordionGroupProps) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-gray-800">{group.groupName}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
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
        <ul className="px-4 pb-3 space-y-1.5">
          {group.links.map((link) => (
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
      </div>
    </div>
  );
};

/**
 * Renders grouped related links with accordion sections
 * Groups links by their group field and displays each group as an expandable section
 */
const GroupedRelatedLinksWidget = ({
  links,
  defaultExpanded = true,
}: GroupedRelatedLinksWidgetProps) => {
  const groups = groupLinksByGroup(links);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    if (defaultExpanded) {
      return new Set(groups.map((g) => g.groupName));
    }
    return new Set();
  });

  if (!links || links.length === 0) {
    return null;
  }

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div>
        {groups.map((group) => (
          <AccordionGroup
            key={group.groupName}
            group={group}
            isExpanded={expandedGroups.has(group.groupName)}
            onToggle={() => toggleGroup(group.groupName)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupedRelatedLinksWidget;

