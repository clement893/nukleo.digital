import { describe, it, expect, beforeEach, vi } from 'vitest';
import { appRouter } from '../../routers';
import { createContext } from '../../_core/context';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

// Mock database
vi.mock('../../db', () => ({
  getDb: vi.fn(),
}));

// Mock drizzle schema
vi.mock('../../../drizzle/schema', () => ({
  pageVisibility: {
    select: vi.fn(),
    from: vi.fn(),
    orderBy: vi.fn(),
    where: vi.fn(),
    eq: vi.fn(),
    limit: vi.fn(),
  },
  eq: vi.fn(),
  desc: vi.fn(),
}));

describe('tRPC Integration - pageVisibility', () => {
  let mockContext: Awaited<ReturnType<typeof createContext>>;

  beforeEach(() => {
    mockContext = {
      req: {} as any,
      res: {} as any,
      user: null,
    };
  });

  it('should get all page visibilities', async () => {
    const caller = appRouter.createCaller(mockContext);
    
    // Mock database response
    const { getDb } = await import('../../db');
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockResolvedValue([
        { path: '/about', isVisible: true },
        { path: '/services', isVisible: true },
      ]),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const result = await caller.pageVisibility.getAll();
    
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get visibility for specific path', async () => {
    const caller = appRouter.createCaller(mockContext);
    
    const { getDb } = await import('../../db');
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([
        { path: '/about', isVisible: true },
      ]),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const result = await caller.pageVisibility.getByPath({ path: '/about' });
    
    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('isVisible');
  });

  it('should return default visibility if page not found', async () => {
    const caller = appRouter.createCaller(mockContext);
    
    const { getDb } = await import('../../db');
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const result = await caller.pageVisibility.getByPath({ path: '/unknown' });
    
    expect(result.path).toBe('/unknown');
    expect(result.isVisible).toBe(true); // Default to visible
  });

  it('should handle database connection errors gracefully', async () => {
    const caller = appRouter.createCaller(mockContext);
    
    const { getDb } = await import('../../db');
    vi.mocked(getDb).mockRejectedValue(new Error('ECONNREFUSED'));

    const result = await caller.pageVisibility.getAll();
    
    // Should return empty array instead of throwing
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

