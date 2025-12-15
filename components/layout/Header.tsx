'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Header as HeaderType, GlobalLink } from '@/lib/strapi/types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

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
    <header className="bg-background border-b border-border sticky top-0 z-50">
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
              <span className="text-xl font-bold text-primary">WeCredit</span>
            )}
          </Link>
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {data.navigation.map((link) => (
                <NavItem key={link.id} link={link} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* CTA Button */}
          {data.ctaButton && (
            <div className="hidden md:block">
              <Link
                href={data.ctaButton.url}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                {data.ctaButton.label}
              </Link>
            </div>
          )}
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent"
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
        <div className="md:hidden border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {data.navigation.map((link) => (
              <MobileNavItem
                key={link.id}
                link={link}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            ))}
            {data.ctaButton && (
              <Link
                href={data.ctaButton.url}
                className="block w-full text-center px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors mt-4"
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

/** Props for NavItem component */
interface NavItemProps {
  link: GlobalLink;
}

/**
 * Desktop navigation item - handles both simple links and dropdowns
 */
const NavItem = ({ link }: NavItemProps) => {
  const hasChildren = link.children && link.children.length > 0;
  if (hasChildren) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-1 p-2">
            {link.children.map((child) => (
              <li key={child.id}>
                <NavigationMenuLink asChild>
                  <Link
                    href={child.url}
                    target={child.openInNewTab ? '_blank' : undefined}
                    rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors',
                      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                    )}
                  >
                    <span className="text-sm font-medium">{child.label}</span>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={link.url}
          target={link.openInNewTab ? '_blank' : undefined}
          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
          className={navigationMenuTriggerStyle()}
        >
          {link.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

/** Props for MobileNavItem component */
interface MobileNavItemProps {
  link: GlobalLink;
  onClose: () => void;
}

/**
 * Mobile navigation item - handles both simple links and expandable sections
 */
const MobileNavItem = ({ link, onClose }: MobileNavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = link.children && link.children.length > 0;
  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-2 text-foreground hover:bg-accent rounded-lg font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {link.label}
          <svg
            className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <div className="pl-4 mt-1 space-y-1">
            {link.children.map((child) => (
              <Link
                key={child.id}
                href={child.url}
                target={child.openInNewTab ? '_blank' : undefined}
                rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                className="block px-4 py-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg"
                onClick={onClose}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <Link
      href={link.url}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg font-medium"
      onClick={onClose}
    >
      {link.label}
    </Link>
  );
};

export default Header;
