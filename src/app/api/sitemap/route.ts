import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://reze-ai.team-ax.top';
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          bn: `${baseUrl}/bn`,
        }
      }
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/about`,
          bn: `${baseUrl}/bn/about`,
        }
      }
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/features`,
          bn: `${baseUrl}/bn/features`,
        }
      }
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  ${staticPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.alternates ? Object.entries(page.alternates.languages).map(([lang, url]) => `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`).join('') + `
    <xhtml:link rel="alternate" hreflang="x-default" href="${page.url}" />
    ` : ''}
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>Reze AI - Advanced AI Assistant</image:title>
      <image:caption>Reze AI is your intelligent AI assistant from Team AX Inc. supporting multiple languages</image:caption>
    </image:image>
  </url>`).join('')}
  
  <!-- External reference URLs for better indexing -->
  <url>
    <loc>https://team-ax.top</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://portfolio.team-ax.top</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}