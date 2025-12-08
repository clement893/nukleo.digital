import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import type { Context } from './_core/context';

describe('Contact Router', () => {
  const createMockContext = (): Context => ({
    req: {} as any,
    res: {} as any,
    user: null,
  });

  it('should validate contact form with valid data', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      company: 'Test Company',
      message: 'This is a test message with enough characters.',
    };

    const result = await caller.contact.send(validData);
    expect(result.success).toBe(true);
  });

  it('should reject contact form with invalid email', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      company: 'Test Company',
      message: 'This is a test message.',
    };

    await expect(caller.contact.send(invalidData)).rejects.toThrow();
  });

  it('should reject contact form with short message', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const invalidData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      company: 'Test Company',
      message: 'Short',
    };

    await expect(caller.contact.send(invalidData)).rejects.toThrow();
  });

  it('should validate newsletter subscription with valid email', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    const result = await caller.contact.subscribe({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });

  it('should reject newsletter subscription with invalid email', async () => {
    const caller = appRouter.createCaller(createMockContext());
    
    await expect(
      caller.contact.subscribe({ email: 'invalid-email' })
    ).rejects.toThrow();
  });
});
