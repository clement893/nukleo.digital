import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = `structured-data-${Date.now()}`;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);

  return null;
}

// Predefined schemas
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nukleo Digital',
  url: 'https://nukleo.digital',
  logo: 'https://nukleo.digital/logo.png',
  description: 'AI transformation agency specializing in agentic AI solutions for startups, SMBs, enterprises, and governments.',
  sameAs: [
    'https://twitter.com/nukleodigital',
    'https://linkedin.com/company/nukleo-digital',
    'https://github.com/nukleo-digital',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'hello@nukleo.digital',
    availableLanguage: ['English', 'French'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
    addressLocality: 'Montreal',
    addressRegion: 'QC',
  },
  founder: {
    '@type': 'Person',
    name: 'Nukleo Team',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nukleo Digital',
  url: 'https://nukleo.digital',
  description: 'AI transformation agency helping organizations unlock the power of artificial intelligence',
  publisher: {
    '@type': 'Organization',
    name: 'Nukleo Digital',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nukleo.digital/logo.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nukleo.digital/glossary?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export function createArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Nukleo Digital',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nukleo Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nukleo.digital/logo.png',
      },
    },
    image: article.image || 'https://nukleo.digital/og-image.jpg',
    keywords: article.keywords?.join(', '),
  };
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Transformation Services',
  provider: {
    '@type': 'Organization',
    name: 'Nukleo Digital',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Strategy & Marketing',
          description: 'Strategic AI consulting, market research, positioning, and go-to-market planning for AI products and services.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Platforms',
          description: 'Custom web and mobile applications, API development, cloud infrastructure, and scalable digital solutions.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Intelligent Operations',
          description: 'Process automation, workflow optimization, AI-powered analytics, and operational intelligence.',
        },
      },
    ],
  },
};

export function createReviewSchema(reviews: Array<{ author: string; rating: number; text: string; date?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nukleo Digital',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviews.length.toString(),
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
      datePublished: review.date || new Date().toISOString(),
    })),
  };
}
