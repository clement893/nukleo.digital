import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { Router } from 'wouter';
import SEO from '../SEO';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock useLocation
const mockLocation = ['/', vi.fn()];
vi.mock('wouter', async () => {
  const actual = await vi.importActual('wouter');
  return {
    ...actual,
    useLocation: () => mockLocation,
  };
});

const renderSEO = (props = {}) => {
  return render(
    <Router>
      <LanguageProvider>
        <SEO {...props} />
      </LanguageProvider>
    </Router>
  );
};

describe('SEO', () => {
  beforeEach(() => {
    // Clear document head before each test
    document.head.innerHTML = '';
    mockLocation[0] = '/';
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('should set default meta tags', () => {
    renderSEO();
    
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Nukleo Digital');
    
    const description = document.querySelector('meta[name="description"]');
    expect(description).toBeTruthy();
  });

  it('should set custom title and description', () => {
    renderSEO({
      title: 'Custom Title',
      description: 'Custom Description',
    });
    
    const title = document.querySelector('title');
    expect(title?.textContent).toContain('Custom Title');
    
    const description = document.querySelector('meta[name="description"]');
    expect(description?.getAttribute('content')).toBe('Custom Description');
  });

  it('should set Open Graph tags', () => {
    renderSEO({
      title: 'Test Page',
      ogImage: 'https://example.com/image.jpg',
    });
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeTruthy();
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://example.com/image.jpg');
  });

  it('should set noindex when specified', () => {
    renderSEO({ noindex: true });
    
    const robots = document.querySelector('meta[name="robots"]');
    expect(robots?.getAttribute('content')).toContain('noindex');
  });

  it('should set canonical URL', () => {
    mockLocation[0] = '/test-page';
    renderSEO();
    
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute('href')).toContain('/test-page');
  });

  it('should set article meta tags when article prop is provided', () => {
    renderSEO({
      ogType: 'article',
      article: {
        publishedTime: '2024-01-01T00:00:00Z',
        author: 'John Doe',
        section: 'Technology',
        tags: ['AI', 'Digital'],
      },
    });
    
    const articlePublished = document.querySelector('meta[property="article:published_time"]');
    expect(articlePublished).toBeTruthy();
    
    const articleAuthor = document.querySelector('meta[property="article:author"]');
    expect(articleAuthor).toBeTruthy();
  });
});

