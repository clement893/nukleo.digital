/**
 * HTML Sanitizer for Loader HTML Content
 * 
 * This module sanitizes HTML content to ensure:
 * 1. Only one <h1> tag exists (converts additional h1s to h2)
 * 2. All <img> tags have alt attributes
 * 3. Basic XSS protection
 */

/**
 * Sanitizes HTML content for loaders
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeLoaderHTML(html: string): string {
  if (!html || typeof html !== 'string') {
    return html;
  }

  let sanitized = html;

  // 1. Remove or convert multiple <h1> tags to <h2>
  // Count h1 tags first
  const h1Matches = sanitized.match(/<h1[^>]*>/gi);
  if (h1Matches && h1Matches.length > 1) {
    // Keep the first h1, convert others to h2
    let h1Count = 0;
    sanitized = sanitized.replace(/<h1([^>]*)>/gi, (match, attributes) => {
      h1Count++;
      if (h1Count === 1) {
        // Keep the first h1
        return match;
      } else {
        // Convert subsequent h1s to h2
        return `<h2${attributes}>`;
      }
    });
    // Also handle closing tags
    let h1CloseCount = 0;
    sanitized = sanitized.replace(/<\/h1>/gi, (match) => {
      h1CloseCount++;
      if (h1CloseCount === 1) {
        return match;
      } else {
        return '</h2>';
      }
    });
  }

  // 2. Add alt attributes to images that don't have them
  sanitized = sanitized.replace(
    /<img([^>]*?)(?:\s+alt\s*=\s*["'][^"']*["'])?([^>]*?)>/gi,
    (match, before, after) => {
      // Check if alt attribute already exists
      if (/alt\s*=/i.test(match)) {
        return match; // Already has alt, keep as is
      }
      
      // Extract src to generate meaningful alt text
      const srcMatch = match.match(/src\s*=\s*["']([^"']+)["']/i);
      const src = srcMatch ? srcMatch[1] : '';
      
      // Generate alt text based on src
      let altText = 'Décoration Nukleo Digital';
      if (src.includes('logo') || src.includes('nukleo') || src.includes('Nukleo')) {
        altText = 'Logo Nukleo Digital';
      } else if (src.includes('arrow')) {
        altText = 'Flèche décorative Nukleo Digital';
      } else if (src.includes('particle') || src.includes('shape')) {
        altText = 'Élément décoratif';
      }
      
      // Insert alt attribute before the closing >
      const beforeAlt = before || '';
      const afterAlt = after || '';
      return `<img${beforeAlt} alt="${altText}"${afterAlt}>`;
    }
  );

  // 3. Basic XSS protection - remove dangerous script tags and event handlers
  // Remove script tags
  sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  // Remove javascript: protocol in href/src
  sanitized = sanitized.replace(/javascript:/gi, '');

  return sanitized;
}

/**
 * Validates that HTML content meets accessibility requirements
 * @param html - The HTML string to validate
 * @returns Object with validation results
 */
export function validateLoaderHTML(html: string): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!html || typeof html !== 'string') {
    return { isValid: false, errors: ['HTML content is empty or invalid'], warnings: [] };
  }

  // Check for multiple h1 tags
  const h1Matches = html.match(/<h1[^>]*>/gi);
  if (h1Matches && h1Matches.length > 1) {
    errors.push(`Found ${h1Matches.length} <h1> tags. Only one is allowed.`);
  }

  // Check for images without alt attributes
  const imgMatches = html.match(/<img[^>]*>/gi);
  if (imgMatches) {
    imgMatches.forEach((img, index) => {
      if (!/alt\s*=/i.test(img)) {
        errors.push(`Image ${index + 1} is missing alt attribute: ${img.substring(0, 50)}...`);
      }
    });
  }

  // Check for script tags (security warning)
  if (/<script[^>]*>/i.test(html)) {
    warnings.push('HTML contains <script> tags which will be removed for security.');
  }

  // Check for event handlers (security warning)
  if (/\son\w+\s*=/i.test(html)) {
    warnings.push('HTML contains event handlers (onclick, etc.) which will be removed for security.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
