'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { GlobalLink, StrapiMedia } from '@/types/strapi';

/** Props for EnhancedHeader component */
interface EnhancedHeaderProps {
  headerLinks: GlobalLink[];
  logo: StrapiMedia | null;
  siteName: string;
}

/**
 * Enhanced site header with navigation and dropdown support for links with children
 */
const EnhancedHeader = ({ headerLinks, logo, siteName }: EnhancedHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logo ? (
              <Image
                src={logo.url}
                alt={logo.alternativeText || siteName}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-xl font-bold text-blue-600">{siteName}</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {headerLinks.map((link) => (
              <NavItem key={link.id} link={link} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2">
            {headerLinks.map((link) => (
              <MobileNavItem
                key={link.id}
                link={link}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

/** Props for NavItem component */
interface NavItemProps {
  link: GlobalLink;
}

/**
 * Desktop navigation item - renders as link or dropdown if has children
 */
const NavItem = ({ link }: NavItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  if (!hasChildren) {
    return <NavLink label={link.label} url={link.url} openInNewTab={link.openInNewTab} />;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {link.label}
        <svg
          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
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

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {link.children.map((child) => (
            <DropdownLink key={child.id} link={child} />
          ))}
        </div>
      )}
    </div>
  );
};

/** Props for DropdownLink */
interface DropdownLinkProps {
  link: GlobalLink;
}

/**
 * Dropdown menu link item
 */
const DropdownLink = ({ link }: DropdownLinkProps) => {
  if (link.openInNewTab) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link
      href={link.url}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    >
      {link.label}
    </Link>
  );
};

/** Props for NavLink component */
interface NavLinkProps {
  label: string;
  url: string;
  openInNewTab: boolean;
}

/**
 * Desktop navigation link (no children)
 */
const NavLink = ({ label, url, openInNewTab }: NavLinkProps) => {
  if (openInNewTab) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
      >
        {label}
      </a>
    );
  }
  return (
    <Link
      href={url}
      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
    >
      {label}
    </Link>
  );
};

/** Props for MobileNavItem component */
interface MobileNavItemProps {
  link: GlobalLink;
  onNavigate: () => void;
}

/**
 * Mobile navigation item - expands to show children if available
 */
const MobileNavItem = ({ link, onNavigate }: MobileNavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  if (!hasChildren) {
    return (
      <MobileNavLink
        label={link.label}
        url={link.url}
        openInNewTab={link.openInNewTab}
        onClick={onNavigate}
      />
    );
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {link.label}
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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

      {/* Expanded Children */}
      {isExpanded && (
        <div className="pl-4 space-y-1">
          {link.children.map((child) => (
            <MobileNavLink
              key={child.id}
              label={child.label}
              url={child.url}
              openInNewTab={child.openInNewTab}
              onClick={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/** Props for MobileNavLink component */
interface MobileNavLinkProps {
  label: string;
  url: string;
  openInNewTab: boolean;
  onClick: () => void;
}

/**
 * Mobile navigation link
 */
const MobileNavLink = ({ label, url, openInNewTab, onClick }: MobileNavLinkProps) => {
  if (openInNewTab) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
        onClick={onClick}
      >
        {label}
      </a>
    );
  }
  return (
    <Link
      href={url}
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default EnhancedHeader;
