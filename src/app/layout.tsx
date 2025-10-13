import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Reze AI - Advanced AI Assistant | Team AX Inc.",
    template: "%s | Reze AI"
  },
  description: "Reze AI is your intelligent AI assistant from Team AX Inc. Experience smart conversations, instant responses, and multilingual support in both Bangla and English. Powered by advanced AI technology for all your questions.",
  keywords: [
    "Reze AI",
    "Team AX Inc",
    "AI assistant",
    "chatbot",
    "artificial intelligence",
    "Bangla AI",
    "Bengali AI",
    "smart conversations",
    "multilingual AI",
    "AI chat",
    "intelligent assistant",
    "Bangla chatbot",
    "English AI",
    "Team AX",
    "reze-ai.team-ax.top",
    "team-ax.top",
    "portfolio.team-ax.top",
    "AI technology",
    "natural language processing",
    "machine learning",
    "conversational AI",
    "24/7 AI support",
    "free AI assistant",
    "advanced AI chatbot"
  ],
  authors: [{ name: "Team AX Inc.", url: "https://team-ax.top" }],
  creator: "Team AX Inc.",
  publisher: "Team AX Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://reze-ai.team-ax.top"),
  alternates: {
    canonical: "https://reze-ai.team-ax.top",
    languages: {
      'en': 'https://reze-ai.team-ax.top/en',
      'bn': 'https://reze-ai.team-ax.top/bn',
      'x-default': 'https://reze-ai.team-ax.top',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bn_BD', 'hi_IN', 'es_ES', 'fr_FR', 'de_DE', 'zh_CN', 'ja_JP'],
    url: 'https://reze-ai.team-ax.top',
    title: 'Reze AI - Advanced AI Assistant | Team AX Inc.',
    description: 'Experience smart conversations and instant responses with Reze AI from Team AX Inc. Multilingual AI assistant supporting Bangla, English, and 10+ languages. Powered by advanced AI technology.',
    siteName: 'Reze AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reze AI - Advanced AI Assistant',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 800,
        height: 800,
        alt: 'Reze AI Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reze AI - Advanced AI Assistant | Team AX Inc.',
    description: 'Experience smart conversations and instant responses with Reze AI from Team AX Inc. Multilingual AI assistant supporting Bangla and English.',
    site: '@teamaxinc',
    creator: '@teamaxinc',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#d4a574' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#d4a574',
    'theme-color': '#d4a574',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Reze AI',
    'application-name': 'Reze AI',
    'mobile-web-app-capable': 'yes',
    'referrer': 'strict-origin-when-cross-origin',
  },
  category: 'technology',
  classification: 'Artificial Intelligence',
  distribution: 'global',
  rating: 'general',
  language: ['en', 'bn', 'hi', 'es', 'fr', 'de', 'zh', 'ja'],
  geographicArea: ['Bangladesh', 'India', 'United States', 'United Kingdom', 'Canada', 'Australia'],
  targetAudience: ['General Public', 'Students', 'Professionals', 'Businesses', 'Developers'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#d4a574',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://team-ax.top" />
        <link rel="preconnect" href="https://portfolio.team-ax.top" />
        <link rel="dns-prefetch" href="//team-ax.top" />
        <link rel="dns-prefetch" href="//portfolio.team-ax.top" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Bangladesh" />
        <meta name="ICBM" content="23.6850,90.3563" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://team-ax.top/#organization",
              "name": "Team AX Inc.",
              "url": "https://team-ax.top",
              "logo": {
                "@type": "ImageObject",
                "url": "https://reze-ai.team-ax.top/logo.png"
              },
              "sameAs": [
                "https://portfolio.team-ax.top",
                "https://reze-ai.team-ax.top"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Bengali", "Hindi", "Spanish", "French", "German", "Chinese", "Japanese"]
              }
            })
          }}
        />
        
        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://reze-ai.team-ax.top/#website",
              "url": "https://reze-ai.team-ax.top",
              "name": "Reze AI - Advanced AI Assistant",
              "description": "Reze AI is your intelligent AI assistant from Team AX Inc. Experience smart conversations, instant responses, and multilingual support.",
              "publisher": {
                "@id": "https://team-ax.top/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://reze-ai.team-ax.top/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${hindSiliguri.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
