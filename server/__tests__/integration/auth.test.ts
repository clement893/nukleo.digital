import { describe, it, expect, beforeEach, vi } from 'vitest';
import { appRouter } from '../../routers';
import { createContext } from '../../_core/context';

describe('tRPC Integration - auth', () => {
  it('should return user from context', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'user' as const,
    };

    const mockContext = {
      req: {} as any,
      res: {} as any,
      user: mockUser,
    };

    const caller = appRouter.createCaller(mockContext);
    const result = await caller.auth.me();
    
    expect(result).toEqual(mockUser);
  });

  it('should return null if user not authenticated', async () => {
    const mockContext = {
      req: {} as any,
      res: {} as any,
      user: null,
    };

    const caller = appRouter.createCaller(mockContext);
    const result = await caller.auth.me();
    
    expect(result).toBeNull();
  });

  it('should clear cookie on logout', async () => {
    const mockRes = {
      clearCookie: vi.fn(),
    };

    const mockContext = {
      req: {} as any,
      res: mockRes as any,
      user: null,
    };

    const caller = appRouter.createCaller(mockContext);
    const result = await caller.auth.logout();
    
    expect(result.success).toBe(true);
    expect(mockRes.clearCookie).toHaveBeenCalled();
  });
});

