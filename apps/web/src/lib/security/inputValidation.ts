/**
 * Input Validation Utilities
 * 
 * Provides comprehensive input validation and sanitization
 * Prevents injection attacks, XSS, and other input-based vulnerabilities
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Maximum input lengths for different field types
 */
export const MAX_LENGTHS = {
  email: 254,
  username: 50,
  password: 128,
  name: 100,
  title: 200,
  description: 5000,
  url: 2048,
  text: 10000,
  comment: 1000,
  search: 200,
} as const;

/**
 * Minimum input lengths
 */
export const MIN_LENGTHS = {
  password: 8,
  username: 3,
  name: 1,
} as const;

/**
 * Validate input length
 */
export function validateLength(
  value: string,
  min: number,
  max: number,
  fieldName: string = 'Field'
): { valid: boolean; error?: string } {
  if (value.length < min) {
    return {
      valid: false,
      error: `${fieldName} must be at least ${min} characters`,
    };
  }

  if (value.length > max) {
    return {
      valid: false,
      error: `${fieldName} must be no more than ${max} characters`,
    };
  }

  return { valid: true };
}

/**
 * Sanitize HTML input (XSS protection)
 */
export function sanitizeHtml(html: string, allowedTags?: string[]): string {
  const defaultTags = [
    'p', 'br', 'strong', 'em', 'u', 'b', 'i',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'blockquote',
    'code', 'pre', 'span', 'div',
  ];

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags || defaultTags,
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize plain text (remove HTML)
 */
export function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Validate email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  const lengthCheck = validateLength(email, 1, MAX_LENGTHS.email, 'Email');
  if (!lengthCheck.valid) {
    return lengthCheck;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): { valid: boolean; error?: string } {
  if (!url || url.length === 0) {
    return { valid: false, error: 'URL is required' };
  }

  const lengthCheck = validateLength(url, 1, MAX_LENGTHS.url, 'URL');
  if (!lengthCheck.valid) {
    return lengthCheck;
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; error?: string; strength?: 'weak' | 'medium' | 'strong' } {
  if (!password || password.length === 0) {
    return { valid: false, error: 'Password is required' };
  }

  const lengthCheck = validateLength(password, MIN_LENGTHS.password, MAX_LENGTHS.password, 'Password');
  if (!lengthCheck.valid) {
    return lengthCheck;
  }

  // Check password strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let score = 0;

  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  if (score < 3) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase, number, and special character',
      strength,
    };
  }

  return { valid: true, strength };
}

/**
 * Sanitize and validate input based on type
 */
export function sanitizeAndValidate(
  value: string,
  type: 'text' | 'email' | 'url' | 'html' | 'password',
  fieldName?: string
): { valid: boolean; sanitized: string; error?: string } {
  let sanitized = value;
  let validation: { valid: boolean; error?: string } = { valid: true };

  switch (type) {
    case 'email':
      sanitized = sanitizeText(value.trim().toLowerCase());
      validation = validateEmail(sanitized);
      break;

    case 'url':
      sanitized = sanitizeText(value.trim());
      validation = validateUrl(sanitized);
      break;

    case 'html':
      sanitized = sanitizeHtml(value);
      // HTML validation - check length
      validation = validateLength(sanitized, 0, MAX_LENGTHS.text, fieldName || 'HTML');
      break;

    case 'password':
      sanitized = value; // Don't sanitize passwords
      validation = validatePassword(sanitized);
      break;

    case 'text':
    default:
      sanitized = sanitizeText(value.trim());
      const maxLength = fieldName && MAX_LENGTHS[fieldName as keyof typeof MAX_LENGTHS]
        ? MAX_LENGTHS[fieldName as keyof typeof MAX_LENGTHS]
        : MAX_LENGTHS.text;
      validation = validateLength(sanitized, 0, maxLength, fieldName || 'Text');
      break;
  }

  return {
    valid: validation.valid,
    sanitized,
    error: validation.error,
  };
}

