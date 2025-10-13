import React from 'react';

interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'Product' | 'Article';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Reze AI",
          "alternateName": "Reze AI Assistant",
          "url": "https://reze-ai.team-ax.top",
          "description": "Advanced AI assistant from Team AX Inc. supporting multilingual conversations in Bangla and English.",
          "inLanguage": ["en", "bn"],
          "isAccessibleForFree": true,
          "isFamilyFriendly": true,
          "publisher": {
            "@type": "Organization",
            "name": "Team AX Inc.",
            "url": "https://team-ax.top",
            "logo": {
              "@type": "ImageObject",
              "url": "https://reze-ai.team-ax.top/logo.png",
              "width": 512,
              "height": 512
            }
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://reze-ai.team-ax.top/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        };

      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Team AX Inc.",
          "alternateName": "Team AX",
          "url": "https://team-ax.top",
          "logo": {
            "@type": "ImageObject",
            "url": "https://team-ax.top/logo.png",
            "width": 512,
            "height": 512
          },
          "description": "Technology company specializing in AI solutions and digital innovation.",
          "foundingDate": "2024",
          "founders": [
            {
              "@type": "Person",
              "name": "Team AX Founder"
            }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["English", "Bangla"]
          },
          "sameAs": [
            "https://portfolio.team-ax.top",
            "https://reze-ai.team-ax.top"
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "Chatbot Development",
            "Multilingual AI",
            "Natural Language Processing"
          ]
        };

      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Reze AI",
          "applicationCategory": "AI Assistant",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "100000",
            "bestRating": "5",
            "worstRating": "1"
          },
          "creator": {
            "@type": "Organization",
            "name": "Team AX Inc.",
            "url": "https://team-ax.top"
          },
          "featureList": [
            "Smart Conversations",
            "Instant Responses",
            "Multilingual Support",
            "24/7 Availability",
            "Safe & Private",
            "User Friendly Interface"
          ],
          "screenshot": "https://reze-ai.team-ax.top/screenshot.jpg",
          "softwareVersion": "1.0",
          "datePublished": "2024-01-01",
          "dateModified": "2024-12-01"
        };

      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Reze AI - Advanced AI Assistant for Smart Conversations",
          "description": "Discover Reze AI, your intelligent assistant for multilingual conversations in Bangla and English.",
          "image": [
            "https://reze-ai.team-ax.top/og-image.jpg"
          ],
          "datePublished": "2024-01-01",
          "dateModified": "2024-12-01",
          "author": {
            "@type": "Organization",
            "name": "Team AX Inc.",
            "url": "https://team-ax.top"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Team AX Inc.",
            "logo": {
              "@type": "ImageObject",
              "url": "https://reze-ai.team-ax.top/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://reze-ai.team-ax.top"
          }
        };

      default:
        return {};
    }
  };

  const structuredData = { ...getStructuredData(), ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}