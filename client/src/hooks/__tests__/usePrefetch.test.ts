import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePrefetch, prefetchRoute } from '../usePrefetch';
import * as useIsMobileHook from '../useIsMobile';

// Mock useIsMobile
vi.mock('../useIsMobile', () => ({
  useIsMobile: vi.fn(),
}));

// Mock document methods
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();

describe('usePrefetch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock document.head
    Object.defineProperty(document, 'head', {
      value: {
        appendChild: mockAppendChild,
        removeChild: mockRemoveChild,
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should not prefetch on mobile', () => {
    vi.mocked(useIsMobileHook.useIsMobile).mockReturnValue(true);

    renderHook(() => usePrefetch(true));

    vi.advanceTimersByTime(3000);

    expect(mockAppendChild).not.toHaveBeenCalled();
  });

  it('should prefetch routes on desktop after delay', async () => {
    vi.mocked(useIsMobileHook.useIsMobile).mockReturnValue(false);

    renderHook(() => usePrefetch(true));

    // Advance past initial delay
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockAppendChild).toHaveBeenCalled();
    });
  });

  it('should not prefetch when disabled', () => {
    vi.mocked(useIsMobileHook.useIsMobile).mockReturnValue(false);

    renderHook(() => usePrefetch(false));

    vi.advanceTimersByTime(3000);

    expect(mockAppendChild).not.toHaveBeenCalled();
  });

  it('should cleanup on unmount', () => {
    vi.mocked(useIsMobileHook.useIsMobile).mockReturnValue(false);

    const { unmount } = renderHook(() => usePrefetch(true));

    unmount();

    // Should not throw errors
    vi.advanceTimersByTime(10000);
  });
});

describe('prefetchRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(global, 'window', {
      value: {
        document: {
          head: {
            appendChild: mockAppendChild,
            removeChild: mockRemoveChild,
          },
        },
      },
      writable: true,
    });
  });

  it('should create prefetch link for route', () => {
    prefetchRoute('/test-route');

    expect(mockAppendChild).toHaveBeenCalled();
    const call = mockAppendChild.mock.calls[0][0];
    expect(call.rel).toBe('prefetch');
    expect(call.href).toBe('/test-route');
    expect(call.as).toBe('document');
  });

  it('should not prefetch if window is undefined', () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    prefetchRoute('/test-route');

    expect(mockAppendChild).not.toHaveBeenCalled();

    global.window = originalWindow;
  });
});

