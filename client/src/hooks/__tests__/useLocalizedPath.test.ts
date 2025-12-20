import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLocalizedPath } from '../useLocalizedPath';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock useLanguage
const mockUseLanguage = vi.fn();

vi.mock('../../contexts/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
  useLanguage: () => mockUseLanguage(),
}));

describe('useLocalizedPath', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return English path without prefix when language is en', () => {
    mockUseLanguage.mockReturnValue({ language: 'en' });
    
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: LanguageProvider,
    });
    
    const getLocalizedPath = result.current;
    expect(getLocalizedPath('/about')).toBe('/about');
    expect(getLocalizedPath('/services')).toBe('/services');
    expect(getLocalizedPath('/')).toBe('/');
  });

  it('should return French path with /fr prefix when language is fr', () => {
    mockUseLanguage.mockReturnValue({ language: 'fr' });
    
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: LanguageProvider,
    });
    
    const getLocalizedPath = result.current;
    expect(getLocalizedPath('/about')).toBe('/fr/about');
    expect(getLocalizedPath('/services')).toBe('/fr/services');
    expect(getLocalizedPath('/')).toBe('/fr');
  });

  it('should not add prefix for admin routes', () => {
    mockUseLanguage.mockReturnValue({ language: 'fr' });
    
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: LanguageProvider,
    });
    
    const getLocalizedPath = result.current;
    expect(getLocalizedPath('/admin/dashboard')).toBe('/admin/dashboard');
    expect(getLocalizedPath('/admin/users')).toBe('/admin/users');
  });

  it('should default to English if language is undefined', () => {
    mockUseLanguage.mockReturnValue({ language: undefined });
    
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: LanguageProvider,
    });
    
    const getLocalizedPath = result.current;
    expect(getLocalizedPath('/about')).toBe('/about');
  });

  it('should handle paths without leading slash', () => {
    mockUseLanguage.mockReturnValue({ language: 'fr' });
    
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: LanguageProvider,
    });
    
    const getLocalizedPath = result.current;
    expect(getLocalizedPath('about')).toBe('/fr/about');
    expect(getLocalizedPath('services')).toBe('/fr/services');
  });
});

