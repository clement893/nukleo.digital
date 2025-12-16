/**
 * HTML sanitization utilities for security
 * Prevents XSS attacks by sanitizing user input
 */

/**
 * Escape HTML special characters to prevent XSS
 * @param text - Text to escape
 * @returns Escaped HTML string
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Sanitize HTML content by removing dangerous tags and attributes
 * Allows only safe HTML tags for display purposes
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers like onclick="..."
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '') // Remove event handlers without quotes
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:text\/html/gi, ''); // Remove data URIs with HTML

  // Allow only safe HTML tags (br, strong, em, p, span, div, h1-h6, a, ul, ol, li)
  // This is a basic sanitization - for production, consider using DOMPurify
  const allowedTags = ['br', 'strong', 'em', 'p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'ul', 'ol', 'li', 'b', 'i', 'u'];
  const tagPattern = new RegExp(`<(?!\/?(${allowedTags.join('|')})\\b)[^>]+>`, 'gi');
  sanitized = sanitized.replace(tagPattern, '');

  return sanitized;
}

/**
 * Sanitize user input for email templates
 * Escapes HTML and prevents injection
 * @param input - User input string
 * @returns Sanitized string safe for HTML email
 */
export function sanitizeForEmail(input: string): string {
  return escapeHtml(String(input || ''));
}

/**
 * Sanitize object values for email templates
 * @param data - Object with user data
 * @returns Object with sanitized values
 */
export function sanitizeObjectForEmail<T extends Record<string, any>>(data: T): T {
  const sanitized = { ...data };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeForEmail(sanitized[key]) as T[Extract<keyof T, string>];
    }
  }
  return sanitized;
}


