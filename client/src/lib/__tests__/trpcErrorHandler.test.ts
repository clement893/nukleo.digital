import { describe, it, expect } from 'vitest';
import { TRPCClientError } from '@trpc/client';
import { extractValidationErrors, getErrorMessage } from '../trpcErrorHandler';

describe('extractValidationErrors', () => {
  it('should return empty object for non-TRPC errors', () => {
    const error = new Error('Some error');
    expect(extractValidationErrors(error)).toEqual({});
  });

  it('should extract errors from Format 1 (array in data)', () => {
    const error = new TRPCClientError('Validation failed', {
      data: [
        { path: ['email'], message: 'Invalid email' },
        { path: ['name'], message: 'Name is required' },
      ],
    } as any);

    const result = extractValidationErrors(error);
    expect(result).toEqual({
      email: 'Invalid email',
      name: 'Name is required',
    });
  });

  it('should extract errors from Format 2 (zodError.fieldErrors)', () => {
    const error = new TRPCClientError('Validation failed', {
      data: {
        zodError: {
          fieldErrors: {
            email: ['Invalid email'],
            name: ['Name is required'],
          },
        },
      },
    } as any);

    const result = extractValidationErrors(error);
    expect(result).toEqual({
      email: 'Invalid email',
      name: 'Name is required',
    });
  });

  it('should extract errors from Format 3 (zodError.issues)', () => {
    const error = new TRPCClientError('Validation failed', {
      data: {
        zodError: {
          issues: [
            { path: ['email'], message: 'Invalid email' },
            { path: ['name'], message: 'Name is required' },
          ],
        },
      },
    } as any);

    const result = extractValidationErrors(error);
    expect(result).toEqual({
      email: 'Invalid email',
      name: 'Name is required',
    });
  });

  it('should extract errors from Format 4 (zodError as array)', () => {
    const error = new TRPCClientError('Validation failed', {
      data: {
        zodError: [
          { path: ['email'], message: 'Invalid email' },
          { path: ['name'], message: 'Name is required' },
        ],
      },
    } as any);

    const result = extractValidationErrors(error);
    expect(result).toEqual({
      email: 'Invalid email',
      name: 'Name is required',
    });
  });

  it('should handle nested paths', () => {
    const error = new TRPCClientError('Validation failed', {
      data: {
        zodError: {
          issues: [
            { path: ['user', 'email'], message: 'Invalid email' },
            { path: ['user', 'profile', 'name'], message: 'Name is required' },
          ],
        },
      },
    } as any);

    const result = extractValidationErrors(error);
    expect(result).toEqual({
      email: 'Invalid email',
      name: 'Name is required',
    });
  });

  it('should handle errors without messages', () => {
    const error = new TRPCClientError('Validation failed', {
      data: {
        zodError: {
          issues: [
            { path: ['email'] },
          ],
        },
      },
    } as any);

    const result = extractValidationErrors(error);
    expect(result).toEqual({
      email: 'Invalid value',
    });
  });
});

describe('getErrorMessage', () => {
  it('should return default message for non-TRPC errors', () => {
    const error = new Error('Some error');
    expect(getErrorMessage(error)).toBe('An error occurred');
    expect(getErrorMessage(error, 'Custom default')).toBe('Custom default');
  });

  it('should return TRPC error message', () => {
    const error = new TRPCClientError('Custom error message');
    expect(getErrorMessage(error)).toBe('Custom error message');
  });

  it('should return generic message for validation errors', () => {
    const error = new TRPCClientError('Validation failed', {
      data: { zodError: { issues: [] } },
    } as any);
    expect(getErrorMessage(error)).toBe('Please check the form fields and try again');
  });

  it('should detect validation errors in message', () => {
    const error = new TRPCClientError('zodError: validation failed');
    expect(getErrorMessage(error)).toBe('Please check the form fields and try again');
  });
});

