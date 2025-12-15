'use client';

import { useEffect, useRef, useMemo } from 'react';
import MarkdownIt from 'markdown-it';

/** Props for MarkdownHtmlContent component */
interface MarkdownHtmlContentProps {
  content: string;
  className?: string;
}

/**
 * Extracts body content and styles from full HTML documents
 */
const extractHtmlContent = (htmlString: string): { styles: string; bodyContent: string } => {
  // Check if it's a full HTML document
  const isFullHtmlDoc = htmlString.includes('<!DOCTYPE') || 
                        htmlString.includes('<html') || 
                        htmlString.includes('<head');
  
  if (!isFullHtmlDoc) {
    return { styles: '', bodyContent: htmlString };
  }

  // Parse as full HTML document
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Extract styles from head
  const styleElements = doc.querySelectorAll('style');
  const styles = Array.from(styleElements)
    .map(style => style.textContent || '')
    .join('\n');
  
  // Extract body content only (no meta tags, no head content)
  const body = doc.querySelector('body');
  const bodyContent = body ? body.innerHTML : htmlString;
  
  return { styles, bodyContent };
};

/**
 * Renders markdown and HTML content with script execution support
 * Uses markdown-it to parse markdown and passthrough HTML
 * Executes inline and external scripts after render
 * Works for both markdown files and raw HTML from Strapi
 * Applies comprehensive typography styling via markdown-content-strapi class
 */
const MarkdownHtmlContent = ({ content, className }: MarkdownHtmlContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract HTML content or parse markdown
  const { styles, bodyContent } = useMemo(() => {
    // First check if it's a full HTML document
    const extracted = extractHtmlContent(content);
    
    // If we extracted body content from a full HTML doc, return it as-is
    if (extracted.styles || content.includes('<html') || content.includes('<head')) {
      return extracted;
    }
    
    // Otherwise, parse as markdown
    const md = new MarkdownIt({
      html: true,        // Enable HTML tags in source
      linkify: true,     // Auto-convert URLs to links
      typographer: true, // Smart quotes and typographic replacements
      breaks: false,     // Convert \n to <br> (set to true if needed)
    });

    return { styles: '', bodyContent: md.render(content) };
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
  }, [bodyContent]);

  return (
    <>
      {/* Inject extracted styles if present */}
      {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
      
      {/* Render content */}
      <div
        ref={containerRef}
        // className={`markdown-content-strapi ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: bodyContent }}
      />
    </>
  );
};

export default MarkdownHtmlContent;
