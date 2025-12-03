'use client';

import { useEffect, useRef, useMemo } from 'react';
import MarkdownIt from 'markdown-it';

/** Props for MarkdownHtmlContent component */
interface MarkdownHtmlContentProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown and HTML content with script execution support
 * Uses markdown-it to parse markdown and passthrough HTML
 * Executes inline and external scripts after render
 * Works for both markdown files and raw HTML from Strapi
 */
const MarkdownHtmlContent = ({ content, className }: MarkdownHtmlContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse markdown/HTML with markdown-it
  const html = useMemo(() => {
    const md = new MarkdownIt({
      html: true,        // Enable HTML tags in source
      linkify: true,     // Auto-convert URLs to links
      typographer: true, // Smart quotes and typographic replacements
      breaks: false,     // Convert \n to <br> (set to true if needed)
    });

    return md.render(content);
  }, [content]);

  // Execute scripts after render
  useEffect(() => {
    if (!containerRef.current) return;

    const scriptTags = containerRef.current.querySelectorAll('script');
    const createdScripts: HTMLScriptElement[] = [];

    scriptTags.forEach((oldScript) => {
      const newScript = document.createElement('script');

      // Copy all attributes (src, type, async, etc.)
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Copy inline script content
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }

      // Replace to trigger execution
      oldScript.parentNode?.replaceChild(newScript, oldScript);
      createdScripts.push(newScript);
    });

    // Cleanup on unmount
    return () => {
      createdScripts.forEach((script) => script.remove());
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownHtmlContent;
