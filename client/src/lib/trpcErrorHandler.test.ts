import { describe, it, expect } from 'vitest';
import { extractValidationErrors, getErrorMessage } from './trpcErrorHandler';

describe('trpcErrorHandler', () => {
  describe('extractValidationErrors', () => {
    it('should extract validation errors from Zod error', () => {
      const error = {
        data: {
          zodError: {
            issues: [
              { path: ['email'], message: 'Invalid email' },
              { path: ['name'], message: 'Name is required' },
            ],
          },
        },
      };

      const result = extractValidationErrors(error as any);
      
      expect(result).toEqual({
        email: 'Invalid email',
        name: 'Name is required',
      });
    });

    it('should return empty object for non-Zod errors', () => {
      const error = {
        message: 'Generic error',
      };

      const result = extractValidationErrors(error as any);
      
      expect(result).toEqual({});
    });

    it('should handle nested paths', () => {
      const error = {
        data: {
          zodError: {
            issues: [
              { path: ['user', 'email'], message: 'Invalid email' },
            ],
          },
        },
      };

      const result = extractValidationErrors(error as any);
      
      expect(result).toEqual({
        'user.email': 'Invalid email',
      });
    });
  });

  describe('getErrorMessage', () => {
    it('should return specific field error if available', () => {
      const errors = {
        email: 'Invalid email',
      };

      const result = getErrorMessage('email', errors);
      
      expect(result).toBe('Invalid email');
    });

    it('should return generic message if no specific error', () => {
      const errors = {};

      const result = getErrorMessage('email', errors);
      
      expect(result).toBe('Une erreur est survenue. Veuillez réessayer.');
    });

    it('should return custom generic message', () => {
      const errors = {};

      const result = getErrorMessage('email', errors, 'Custom error');
      
      expect(result).toBe('Custom error');
    });
  });
});

