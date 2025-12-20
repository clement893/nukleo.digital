import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePageTransition } from '../usePageTransition';
import { Router } from 'wouter';

// Mock useLocation
const mockSetLocation = vi.fn();
const mockLocation = ['/', mockSetLocation];

vi.mock('wouter', async () => {
  const actual = await vi.importActual('wouter');
  return {
    ...actual,
    useLocation: () => mockLocation,
  };
});

describe('usePageTransition', () => {
  beforeEach(() => {
    document.body.className = '';
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.className = '';
    vi.useRealTimers();
  });

  it('should add loaded class to body on mount', () => {
    renderHook(() => usePageTransition(), {
      wrapper: Router,
    });
    
    expect(document.body.classList.contains('loaded')).toBe(true);
  });

  it('should add page-transitioning class on route change', () => {
    renderHook(() => usePageTransition(), {
      wrapper: Router,
    });
    
    expect(document.body.classList.contains('page-transitioning')).toBe(true);
  });

  it('should remove page-transitioning class after 300ms', () => {
    renderHook(() => usePageTransition(), {
      wrapper: Router,
    });
    
    expect(document.body.classList.contains('page-transitioning')).toBe(true);
    
    // Fast-forward 300ms
    vi.advanceTimersByTime(300);
    
    expect(document.body.classList.contains('page-transitioning')).toBe(false);
  });

  it('should trigger transition on location change', () => {
    const { rerender } = renderHook(() => usePageTransition(), {
      wrapper: Router,
    });
    
    // Change location
    mockLocation[0] = '/about';
    rerender();
    
    expect(document.body.classList.contains('page-transitioning')).toBe(true);
  });

  it('should clean up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() => usePageTransition(), {
      wrapper: Router,
    });
    
    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});

