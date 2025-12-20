import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useParallax } from '../useParallax';

describe('useParallax', () => {
  beforeEach(() => {
    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => {
      setTimeout(cb, 16);
      return 1;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return 0 initially', () => {
    const { result } = renderHook(() => useParallax(0.5));
    expect(result.current).toBe(0);
  });

  it('should calculate offset based on scroll position and speed', async () => {
    const { result } = renderHook(() => useParallax(0.5));
    
    // Simulate scroll
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    
    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));
    
    await waitFor(() => {
      expect(result.current).toBe(500); // 1000 * 0.5
    });
  });

  it('should use custom speed parameter', async () => {
    const { result } = renderHook(() => useParallax(0.3));
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    
    window.dispatchEvent(new Event('scroll'));
    
    await waitFor(() => {
      expect(result.current).toBe(300); // 1000 * 0.3
    });
  });

  it('should update offset when speed changes', async () => {
    const { result, rerender } = renderHook(
      ({ speed }) => useParallax(speed),
      { initialProps: { speed: 0.5 } }
    );
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 1000,
    });
    
    window.dispatchEvent(new Event('scroll'));
    
    await waitFor(() => {
      expect(result.current).toBe(500);
    });
    
    // Change speed
    rerender({ speed: 0.7 });
    window.dispatchEvent(new Event('scroll'));
    
    await waitFor(() => {
      expect(result.current).toBe(700); // 1000 * 0.7
    });
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useParallax(0.5));
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

