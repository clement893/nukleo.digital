import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  locale?: string;
  alternateLanguages?: Array<{ lang: string; url: string }>;
}

const DEFAULT_SEO = {
  title: 'Nukleo Digital | AI Transformation Agency | Agentic AI Solutions',
  description: 'Transform your business with AI-powered solutions. We help startups, SMBs, enterprises, and governments unlock the power of artificial intelligence through strategic consulting, intelligent platforms, and automated operations.',
  keywords: 'AI transformation, artificial intelligence consulting, agentic AI, AI strategy, machine learning, AI automation, digital transformation, AI agency, enterprise AI, AI solutions',
  ogImage: 'https://nukleo.digital/og-image.jpg',
  siteUrl: 'https://nukleo.digital',
  siteName: 'Nukleo Digital',
  twitterHandle: '@nukleodigital',
};

export default function SEO({
  title,
  description = DEFAULT_SEO.description,
  keywords = DEFAULT_SEO.keywords,
  ogImage = DEFAULT_SEO.ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = 'website',
  article,
  noindex = false,
  locale,
  alternateLanguages,
}: SEOProps) {
  const [location] = useLocation();
  const { language } = useLanguage();
  
  // Auto-detect locale from language
  const detectedLocale = locale || (language === 'fr' ? 'fr_FR' : 'en_US');
  
  const fullTitle = title ? `${title} | Nukleo Digital` : DEFAULT_SEO.title;
  const canonicalUrl = `${DEFAULT_SEO.siteUrl}${location}`;
  
  // Auto-generate alternate languages if not provided
  const autoAlternateLanguages = alternateLanguages || [
    { lang: 'fr', url: `${DEFAULT_SEO.siteUrl}${location.replace(/^\/(en|fr)/, '/fr') || '/fr'}` },
    { lang: 'en', url: `${DEFAULT_SEO.siteUrl}${location.replace(/^\/(en|fr)/, '') || '/'}` },
  ];

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', ogImageWidth.toString(), true);
    updateMetaTag('og:image:height', ogImageHeight.toString(), true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', DEFAULT_SEO.siteName, true);
    updateMetaTag('og:locale', detectedLocale, true);

    // Article-specific OG tags
    if (article && ogType === 'article') {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, true);
      }
      if (article.modifiedTime) {
        updateMetaTag('article:modified_time', article.modifiedTime, true);
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
      }
      if (article.section) {
        updateMetaTag('article:section', article.section, true);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          updateMetaTag('article:tag', tag, true);
        });
      }
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', DEFAULT_SEO.twitterHandle);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Hreflang tags for alternate languages
    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    autoAlternateLanguages.forEach(({ lang, url }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', lang);
      link.href = url;
      document.head.appendChild(link);
    });
    
    // Add x-default
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.href = canonicalUrl;
    document.head.appendChild(defaultLink);

    // Update HTML lang attribute
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', language);
    htmlElement.setAttribute('dir', 'ltr');

  }, [fullTitle, description, keywords, ogImage, ogImageWidth, ogImageHeight, ogType, canonicalUrl, article, noindex, detectedLocale, autoAlternateLanguages, language]);

  return null;
}
