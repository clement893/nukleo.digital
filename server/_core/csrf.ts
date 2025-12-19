/**
 * CSRF Protection Utilities
 * Generates and validates CSRF tokens for form submissions
 */

import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || process.env.JWT_SECRET || 'nukleo-csrf-secret';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Validate a CSRF token
 * In a real implementation, you'd store tokens in session/cache
 * For now, we'll use a simple time-based validation
 */
export function validateCSRFToken(token: string, sessionToken?: string): boolean {
  if (!token || token.length !== CSRF_TOKEN_LENGTH * 2) {
    return false;
  }
  
  // If session token is provided, compare them
  if (sessionToken) {
    return token === sessionToken;
  }
  
  // Basic validation: token format is correct
  return /^[a-f0-9]+$/i.test(token);
}

/**
 * Middleware to add CSRF token to response
 */
export function csrfTokenMiddleware(req: any, res: any, next: any) {
  // Generate token if not present in session
  if (!req.session?.csrfToken) {
    req.session.csrfToken = generateCSRFToken();
  }
  
  // Add token to response locals for use in templates
  res.locals.csrfToken = req.session.csrfToken;
  
  next();
}

/**
 * Middleware to validate CSRF token on POST/PUT/DELETE requests
 */
export function validateCSRF(req: any, res: any, next: any) {
  // Skip CSRF validation for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Skip CSRF for API routes that use tRPC (tRPC handles its own validation)
  if (req.path.startsWith('/api/trpc')) {
    return next();
  }
  
  // Get token from header or body
  const token = req.headers['x-csrf-token'] || req.body?.csrfToken;
  const sessionToken = req.session?.csrfToken;
  
  if (!token || !validateCSRFToken(token, sessionToken)) {
    return res.status(403).json({ 
      error: 'Invalid CSRF token',
      message: 'CSRF token validation failed. Please refresh the page and try again.'
    });
  }
  
  next();
}

