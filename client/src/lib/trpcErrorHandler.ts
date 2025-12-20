/**
 * Utility functions for handling tRPC errors
 * Provides type-safe error extraction from tRPC error responses
 */

import { TRPCClientError } from '@trpc/client';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Extract validation errors from a tRPC error
 * Handles multiple tRPC error formats
 */
export function extractValidationErrors(error: unknown): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  if (!(error instanceof TRPCClientError)) {
    return formattedErrors;
  }

  const trpcError = error as TRPCClientError<unknown>;

  // Format 1: error.data is directly an array of Zod errors
  if (Array.isArray(trpcError.data)) {
    trpcError.data.forEach((err: { path?: (string | number)[]; message?: string }) => {
      if (err.path && Array.isArray(err.path) && err.path.length > 0) {
        const field = String(err.path[err.path.length - 1]);
        formattedErrors[field] = err.message || 'Invalid value';
      }
    });
  }
  // Format 2: error.data.zodError.fieldErrors
  else if (trpcError.data?.zodError?.fieldErrors) {
    const fieldErrors = trpcError.data.zodError.fieldErrors;
    Object.keys(fieldErrors).forEach((key) => {
      if (fieldErrors[key] && Array.isArray(fieldErrors[key]) && fieldErrors[key].length > 0) {
        formattedErrors[key] = String(fieldErrors[key][0]);
      }
    });
  }
  // Format 3: error.data.zodError.issues (array)
  else if (trpcError.data?.zodError?.issues && Array.isArray(trpcError.data.zodError.issues)) {
    trpcError.data.zodError.issues.forEach((err: { path?: (string | number)[]; message?: string }) => {
      if (err.path && Array.isArray(err.path) && err.path.length > 0) {
        const field = String(err.path[err.path.length - 1]);
        formattedErrors[field] = err.message || 'Invalid value';
      }
    });
  }
  // Format 4: error.data.zodError is directly an array
  else if (Array.isArray(trpcError.data?.zodError)) {
    trpcError.data.zodError.forEach((err: { path?: (string | number)[]; message?: string }) => {
      if (err.path && Array.isArray(err.path) && err.path.length > 0) {
        const field = String(err.path[err.path.length - 1]);
        formattedErrors[field] = err.message || 'Invalid value';
      }
    });
  }

  // Check error message format (tRPC sometimes puts errors in error.message)
  if (trpcError.message && typeof trpcError.message === 'string' && trpcError.message.includes('zodError')) {
    try {
      const parsed = JSON.parse(trpcError.message);
      if (Array.isArray(parsed)) {
        parsed.forEach((err: { path?: (string | number)[]; message?: string }) => {
          if (err.path && Array.isArray(err.path) && err.path.length > 0) {
            const field = String(err.path[err.path.length - 1]);
            formattedErrors[field] = err.message || 'Invalid value';
          }
        });
      }
    } catch {
      // Not JSON, ignore
    }
  }

  return formattedErrors;
}

/**
 * Get a user-friendly error message from a tRPC error
 */
export function getErrorMessage(error: unknown, defaultMessage: string = 'An error occurred'): string {
  if (!(error instanceof TRPCClientError)) {
    return defaultMessage;
  }

  const trpcError = error as TRPCClientError<unknown>;

  // Try to get a meaningful error message
  if (trpcError.message && typeof trpcError.message === 'string') {
    // If it's a validation error, return a generic message
    if (trpcError.message.includes('zodError') || trpcError.data?.zodError) {
      return 'Please check the form fields and try again';
    }
    return trpcError.message;
  }

  return defaultMessage;
}

