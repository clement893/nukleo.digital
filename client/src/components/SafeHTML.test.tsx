import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import SafeHTML from './SafeHTML';
import DOMPurify from 'dompurify';

// Mock DOMPurify
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((html: string) => html),
  },
}));

describe('SafeHTML', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render sanitized HTML', () => {
    const html = '<p>Test content</p>';
    const { container } = render(<SafeHTML html={html} />);
    
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      html,
      expect.objectContaining({
        ALLOWED_TAGS: expect.any(Array),
        ALLOWED_ATTR: expect.any(Array),
      })
    );
    
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('should use custom tag', () => {
    const html = '<p>Test</p>';
    const { container } = render(<SafeHTML html={html} tag="section" />);
    
    expect(container.querySelector('section')).toBeTruthy();
  });

  it('should apply className', () => {
    const html = '<p>Test</p>';
    const { container } = render(<SafeHTML html={html} className="test-class" />);
    
    expect(container.querySelector('.test-class')).toBeTruthy();
  });

  it('should sanitize dangerous scripts', () => {
    const dangerousHtml = '<script>alert("xss")</script><p>Safe content</p>';
    
    render(<SafeHTML html={dangerousHtml} />);
    
    expect(DOMPurify.sanitize).toHaveBeenCalled();
  });
});

