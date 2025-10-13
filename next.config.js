/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['reze-ai.team-ax.top', 'team-ax.top', 'portfolio.team-ax.top'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  compress: true,
  poweredByHeader: false,
  // Allow cross-origin requests for preview URLs
  allowedDevOrigins: ['preview-chat-5340af89-a3f0-410b-b08c-db5995d7131a.space.z.ai'],
};

module.exports = nextConfig;