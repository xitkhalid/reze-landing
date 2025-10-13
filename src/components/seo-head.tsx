interface SEOHeadProps {
  currentLanguage?: 'en' | 'bn';
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  currentLanguage = 'en',
  title,
  description,
  canonical = 'https://reze-ai.team-ax.top',
  ogImage = 'https://reze-ai.team-ax.top/og-image.jpg',
  keywords = [],
  author = 'Team AX Inc.',
  publishedTime,
  modifiedTime,
  articleSection,
  tags = []
}) => {
  const siteTitle = currentLanguage === 'bn' 
    ? 'রেজে AI - উন্নত AI সহকারী | Team AX Inc.'
    : 'Reze AI - Advanced AI Assistant | Team AX Inc.';
    
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://team-ax.top/#organization",
        "name": "Team AX Inc.",
        "url": "https://team-ax.top",
        "logo": {
          "@type": "ImageObject",
          "url": "https://reze-ai.team-ax.top/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://portfolio.team-ax.top",
          "https://team-ax.top"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["English", "Bengali", "Hindi", "Spanish", "French", "German", "Chinese", "Japanese"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://reze-ai.team-ax.top/#website",
        "url": "https://reze-ai.team-ax.top",
        "name": siteTitle,
        "description": description,
        "publisher": {
          "@id": "https://team-ax.top/#organization"
        },
        "inLanguage": currentLanguage === 'bn' ? 'bn-BD' : 'en-US',
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://reze-ai.team-ax.top/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": fullTitle,
        "description": description,
        "isPartOf": {
          "@id": "https://reze-ai.team-ax.top/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Reze AI - Advanced AI Assistant"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": ogImage,
          "width": 1200,
          "height": 630
        },
        "datePublished": publishedTime || new Date().toISOString(),
        "dateModified": modifiedTime || new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "@id": "https://team-ax.top/#organization"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": currentLanguage === 'bn' ? 'হোম' : 'Home',
              "item": "https://reze-ai.team-ax.top"
            }
          ]
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://reze-ai.team-ax.top/#software",
        "name": "Reze AI",
        "description": description,
        "url": "https://reze-ai.team-ax.top",
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
          "@id": "https://team-ax.top/#organization"
        },
        "featureList": [
          "AI-powered conversations",
          "Multilingual support",
          "24/7 availability",
          "Instant responses",
          "Privacy protection",
          "User-friendly interface"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": currentLanguage === 'bn' ? 'রেজে AI কি?' : 'What is Reze AI?',
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLanguage === 'bn' 
                ? 'রেজে AI হলো Team AX Inc. এর একটি অত্যাধুনিক এআই চ্যাটবট যা বাংলা, ইংরেজিসহ একাধিক ভাষায় স্মার্ট কথোপকথন প্রদান করে।'
                : 'Reze AI is an advanced AI chatbot from Team AX Inc. that provides smart conversations in multiple languages including Bengali and English.'
            }
          },
          {
            "@type": "Question",
            "name": currentLanguage === 'bn' ? 'রেজে AI কি ভাষা সমর্থন করে?' : 'What languages does Reze AI support?',
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLanguage === 'bn'
                ? 'রেজে AI বাংলা, ইংরেজি, হিন্দি, স্প্যানিশ, ফরাসি, জার্মান, চাইনিজ, জাপানিসহ ১০+ ভাষা সমর্থন করে।'
                : 'Reze AI supports 10+ languages including Bengali, English, Hindi, Spanish, French, German, Chinese, Japanese, and more.'
            }
          },
          {
            "@type": "Question",
            "name": currentLanguage === 'bn' ? 'রেজে AI ব্যবহার কি বিনামূল্যে?' : 'Is Reze AI free to use?',
            "acceptedAnswer": {
              "@type": "Answer",
              "text": currentLanguage === 'bn'
                ? 'হ্যাঁ, রেজে AI সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়।'
                : 'Yes, Reze AI is completely free to use.'
            }
          }
        ]
      }
    ]
  };

  const metaKeywords = [
    'Reze AI',
    'Team AX Inc',
    'AI assistant',
    'chatbot',
    'artificial intelligence',
    'Bangla AI',
    'Bengali AI',
    'smart conversations',
    'multilingual AI',
    'AI chat',
    'intelligent assistant',
    'Bangla chatbot',
    'English AI',
    'Team AX',
    'reze-ai.team-ax.top',
    'team-ax.top',
    'portfolio.team-ax.top',
    ...keywords
  ];

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content={currentLanguage === 'bn' ? 'bn-BD' : 'en-US'} />
      <meta name="geo.region" content="BD" />
      <meta name="geo.placename" content="Bangladesh" />
      <meta name="ICBM" content="23.6850,90.3563" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Alternate Language URLs */}
      <link rel="alternate" hrefLang="en" href="https://reze-ai.team-ax.top/en" />
      <link rel="alternate" hrefLang="bn" href="https://reze-ai.team-ax.top/bn" />
      <link rel="alternate" hrefLang="x-default" href="https://reze-ai.team-ax.top" />
      
      {/* External Site References */}
      <link rel="dns-prefetch" href="//team-ax.top" />
      <link rel="dns-prefetch" href="//portfolio.team-ax.top" />
      <link rel="preconnect" href="https://team-ax.top" />
      <link rel="preconnect" href="https://portfolio.team-ax.top" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content={currentLanguage === 'bn' ? 'bn_BD' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@teamaxinc" />
      <meta name="twitter:creator" content="@teamaxinc" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#d4a574" />
      <meta name="msapplication-TileColor" content="#d4a574" />
      <meta name="application-name" content="Reze AI" />
      <meta name="apple-mobile-web-app-title" content="Reze AI" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* Article Specific Meta (if applicable) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}
      {tags.length > 0 && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
      
      {/* Additional SEO Links */}
      <link rel="home" href="https://reze-ai.team-ax.top" />
      <link rel="search" type="application/opensearchdescription+xml" href="/search.xml" title="Reze AI Search" />
      <link rel="author" href="https://team-ax.top" />
      <link rel="publisher" href="https://team-ax.top" />
      
      {/* Performance and Security */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: team-ax.top portfolio.team-ax.top" />
    </>
  );
};

export default SEOHead;