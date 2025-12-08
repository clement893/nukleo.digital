import { Router } from 'express';
import { allTerms } from '../client/src/data/glossary';

const router = Router();

// Generate sitemap.xml
router.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://nukleo.digital';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/expertise', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.7', changefreq: 'weekly' },
    { url: '/resources', priority: '0.9', changefreq: 'weekly' },
    { url: '/glossary', priority: '0.9', changefreq: 'weekly' },
    { url: '/radar', priority: '0.8', changefreq: 'monthly' },
    { url: '/ai-readiness', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/manifesto', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/services/ai-strategy-marketing', priority: '0.8', changefreq: 'monthly' },
    { url: '/services/digital-platforms', priority: '0.8', changefreq: 'monthly' },
    { url: '/services/intelligent-operations', priority: '0.8', changefreq: 'monthly' },
  ];

  // Glossary term pages
  const glossaryPages = allTerms.map(term => ({
    url: `/glossary/${term.id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...glossaryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Generate robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = 'https://nukleo.digital';
  
  const robots = `# Nukleo Digital - Robots.txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for bots
User-agent: *
Crawl-delay: 1

# Block specific bots if needed
# User-agent: BadBot
# Disallow: /
`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

export default router;
