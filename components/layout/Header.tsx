'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Header as HeaderType } from '@/lib/strapi/types';

/** Props for Header component */
interface HeaderProps {
  data: HeaderType;
}

/**
 * Site header with navigation and CTA button
 */
const Header = ({ data }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {data.logo ? (
              <Image
                src={data.logo.url}
                alt={data.logo.alt}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            ) : (
              <span className="text-xl font-bold text-blue-600">WeCredit</span>
            )}
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {data.navigation.map((link) => (
              <NavLink key={link.id} {...link} />
            ))}
          </nav>
          {/* CTA Button */}
          {data.ctaButton && (
            <div className="hidden md:block">
              <Link
                href={data.ctaButton.url}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {data.ctaButton.label}
              </Link>
            </div>
          )}
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
            {data.navigation.map((link) => (
              <MobileNavLink
                key={link.id}
                {...link}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
            {data.ctaButton && (
              <Link
                href={data.ctaButton.url}
                className="block w-full text-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {data.ctaButton.label}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

/** Props for NavLink component */
interface NavLinkProps {
  label: string;
  url: string;
  isExternal: boolean;
}

/**
 * Desktop navigation link
 */
const NavLink = ({ label, url, isExternal }: NavLinkProps) => {
  if (isExternal) {
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

/** Props for MobileNavLink component */
interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

/**
 * Mobile navigation link
 */
const MobileNavLink = ({ label, url, isExternal, onClick }: MobileNavLinkProps) => {
  if (isExternal) {
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

export default Header;

