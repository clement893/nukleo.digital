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

  it('should apply style prop', () => {
    const html = '<p>Test</p>';
    const style = { color: 'red', fontSize: '16px' };
    const { container } = render(<SafeHTML html={html} style={style} />);
    
    const element = container.querySelector('div');
    expect(element).toHaveStyle({ color: 'red', fontSize: '16px' });
  });

  it('should apply id prop', () => {
    const html = '<p>Test</p>';
    const { container } = render(<SafeHTML html={html} id="test-id" />);
    
    expect(container.querySelector('#test-id')).toBeTruthy();
  });

  it('should allow scripts when allowScripts is true', () => {
    const html = '<script>console.log("test")</script>';
    
    render(<SafeHTML html={html} allowScripts={true} />);
    
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      html,
      expect.objectContaining({
        ALLOWED_TAGS: expect.arrayContaining(['script']),
      })
    );
  });

  it('should handle empty html', () => {
    const { container } = render(<SafeHTML html="" />);
    
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('should handle data attributes', () => {
    const html = '<p>Test</p>';
    const { container } = render(
      <SafeHTML html={html} data-testid="test-component" />
    );
    
    const element = container.querySelector('[data-testid="test-component"]');
    expect(element).toBeTruthy();
  });

  it('should handle aria attributes', () => {
    const html = '<p>Test</p>';
    const { container } = render(
      <SafeHTML html={html} aria-label="Test label" />
    );
    
    const element = container.querySelector('[aria-label="Test label"]');
    expect(element).toBeTruthy();
  });
});

