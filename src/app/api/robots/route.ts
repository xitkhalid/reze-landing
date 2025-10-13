import { NextResponse } from 'next/server';

export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Priority pages
Allow: /$
Allow: /about$
Allow: /features$
Allow: /api/sitemap.xml

# Block unnecessary paths
Disallow: /api/
Disallow: /_next/
Disallow: /favicon.ico
Disallow: /*.json$

# Sitemap location
Sitemap: https://reze-ai.team-ax.top/api/sitemap

# External reference sitemaps for better indexing
Sitemap: https://team-ax.top/sitemap.xml
Sitemap: https://portfolio.team-ax.top/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Special instructions for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}