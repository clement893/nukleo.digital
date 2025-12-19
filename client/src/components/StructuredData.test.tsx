import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import StructuredData from './StructuredData';
import { createFAQSchema, createArticleSchema, createVideoObjectSchema } from './StructuredData';

describe('StructuredData', () => {
  beforeEach(() => {
    // Clear any existing scripts
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should inject structured data script', () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test',
    };

    render(<StructuredData data={data} />);

    const script = document.head.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    expect(script?.textContent).toBe(JSON.stringify(data));
  });

  it('should clean up script on unmount', () => {
    const data = { '@context': 'https://schema.org', '@type': 'Organization' };
    const { unmount } = render(<StructuredData data={data} />);

    const script = document.head.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    unmount();

    const scriptAfterUnmount = document.head.querySelector('script[type="application/ld+json"]');
    expect(scriptAfterUnmount).toBeFalsy();
  });
});

describe('createFAQSchema', () => {
  it('should create valid FAQPage schema', () => {
    const faqs = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];

    const schema = createFAQSchema(faqs);

    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]['@type']).toBe('Question');
    expect(schema.mainEntity[0].name).toBe('Q1');
  });
});

describe('createArticleSchema', () => {
  it('should create valid Article schema', () => {
    const article = {
      headline: 'Test Article',
      description: 'Test description',
      datePublished: '2024-01-01',
      author: 'Test Author',
    };

    const schema = createArticleSchema(article);

    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Test Article');
    expect(schema.author['@type']).toBe('Person');
  });
});

describe('createVideoObjectSchema', () => {
  it('should create valid VideoObject schema', () => {
    const video = {
      name: 'Test Video',
      description: 'Test description',
      thumbnailUrl: 'https://example.com/thumb.jpg',
      uploadDate: '2024-01-01',
      contentUrl: 'https://example.com/video.mp4',
    };

    const schema = createVideoObjectSchema(video);

    expect(schema['@type']).toBe('VideoObject');
    expect(schema.name).toBe('Test Video');
    expect(schema.publisher['@type']).toBe('Organization');
  });
});

