import React, { useEffect, useRef, CSSProperties } from 'react';
import DOMPurify from 'dompurify';

interface SafeHTMLProps {
  html: string;
  className?: string;
  style?: CSSProperties;
  tag?: keyof JSX.IntrinsicElements;
  allowScripts?: boolean;
  id?: string;
  [key: string]: unknown; // Allow additional props for HTML attributes
}

/**
 * SafeHTML component - Safely renders HTML content by sanitizing it with DOMPurify
 * 
 * This component prevents XSS attacks by sanitizing HTML content before rendering.
 * Use this instead of dangerouslySetInnerHTML for any user-generated or untrusted content.
 * 
 * @param html - The HTML string to render (will be sanitized)
 * @param className - Optional CSS classes to apply
 * @param tag - HTML tag to use as wrapper (default: 'div')
 * @param allowScripts - Whether to allow script tags (default: false, strongly discouraged)
 * 
 * @example
 * <SafeHTML html={articleContent} className="prose" />
 * <SafeHTML html={userComment} tag="p" />
 */
export default function SafeHTML({ 
  html, 
  className,
  style,
  tag = 'div',
  allowScripts = false,
  id,
  ...restProps
}: SafeHTMLProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    // Configure DOMPurify options
    const config: DOMPurify.Config = {
      // Allow common HTML tags and attributes
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'span', 'div',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'code', 'pre', 'hr'
      ],
      ALLOWED_ATTR: [
        'href', 'title', 'alt', 'src', 'class', 'id', 'style',
        'colspan', 'rowspan', 'target', 'rel'
      ],
      // Allow data attributes for styling (e.g., data-testid)
      ALLOW_DATA_ATTR: true,
      // Never allow scripts unless explicitly requested (strongly discouraged)
      ALLOW_UNKNOWN_PROTOCOLS: false,
      // Return DOM instead of string for better performance
      RETURN_DOM: false,
      // Return DOM fragment instead of single node
      RETURN_DOM_FRAGMENT: false,
      // Sanitize style attributes
      SANITIZE_DOM: true,
      // Keep relative URLs
      KEEP_CONTENT: true,
    };

    // If scripts are explicitly allowed (not recommended), add script tag
    if (allowScripts) {
      config.ALLOWED_TAGS?.push('script');
      config.ALLOWED_ATTR?.push('async', 'defer', 'type');
    }

    // Sanitize the HTML
    const sanitized = DOMPurify.sanitize(html, config) as string;

    // Set the sanitized HTML
    containerRef.current.innerHTML = sanitized;
  }, [html, allowScripts]);

  // Create the wrapper element dynamically
  const Tag = tag as keyof JSX.IntrinsicElements;
  
  // Filter out non-HTML props and keep only valid HTML attributes
  const htmlProps: Record<string, unknown> = {};
  Object.keys(restProps).forEach((key: string) => {
    // Allow data-*, aria-*, and key attributes
    if (key.startsWith('data-') || key.startsWith('aria-') || key === 'key') {
      htmlProps[key] = (restProps as Record<string, unknown>)[key];
    }
  });
  
  // Type assertion needed because ref types vary by tag
  const TagComponent = Tag as React.ElementType;
  return <TagComponent ref={containerRef} id={id} className={className} style={style} {...htmlProps} />;
}

