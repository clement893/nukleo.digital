/**
 * Client-side HTML Sanitizer for Loader HTML Content
 * 
 * This module sanitizes HTML content on the client side to ensure:
 * 1. Only one <h1> tag exists (converts additional h1s to h2)
 * 2. All <img> tags have alt attributes
 * 3. Basic accessibility improvements
 */

/**
 * Sanitizes HTML content for loaders on the client side
 * This is a fallback in case server-side sanitization wasn't applied
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

  return sanitized;
}

/**
 * Sanitizes HTML content in a DOM element
 * This function processes the DOM directly and modifies it in place
 * @param container - The DOM element containing the HTML to sanitize
 */
export function sanitizeLoaderDOM(container: HTMLElement): void {
  if (!container) return;

  // 1. Find and handle multiple h1 tags
  const h1Elements = container.querySelectorAll('h1');
  if (h1Elements.length > 1) {
    // Keep the first h1, convert others to h2
    for (let i = 1; i < h1Elements.length; i++) {
      const h1 = h1Elements[i];
      const h2 = document.createElement('h2');
      h2.innerHTML = h1.innerHTML;
      // Copy attributes
      Array.from(h1.attributes).forEach(attr => {
        h2.setAttribute(attr.name, attr.value);
      });
      h1.parentNode?.replaceChild(h2, h1);
    }
  }

  // 2. Add alt attributes to images that don't have them
  const images = container.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.hasAttribute('alt')) {
      const src = img.getAttribute('src') || '';
      let altText = 'Décoration Nukleo Digital';
      
      if (src.includes('logo') || src.includes('nukleo') || src.includes('Nukleo')) {
        altText = 'Logo Nukleo Digital';
      } else if (src.includes('arrow')) {
        altText = 'Flèche décorative Nukleo Digital';
      } else if (src.includes('particle') || src.includes('shape')) {
        altText = 'Élément décoratif';
      }
      
      img.setAttribute('alt', altText);
    }
  });
}
