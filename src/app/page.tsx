'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Menu,
  X,
  Star,
  TrendingUp,
  ExternalLink,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import SEOHead from '@/components/seo-head';
import Link from 'next/link';
import FloatingChatButton from '@/components/floating-chat-button';

const RezeAILanding = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'bn'>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const content = {
    bn: {
      nav: {
        home: 'হোম',
        features: 'বৈশিষ্ট্য',
        about: 'সম্পর্কে',
        contact: 'যোগাযোগ',
        portfolio: 'পোর্টফোলিও',
        team: 'টিম AX'
      },
      hero: {
        badge: 'এআই-পাওয়ার্ড চ্যাটবট',
        title: 'রেজে AI-র সাথে কথা বলুন',
        tagline1: 'স্মার্ট কথোপকথন',
        tagline2: 'তাৎক্ষণিক উত্তর',
        tagline3: 'সব প্রশ্নের সমাধান',
        subtitle: 'আপনার বুদ্ধিমান AI সহকারী - Team AX Inc. থেকে। আমাদের পোর্টফোলিও দেখুন portfolio.team-ax.top এবং আরও জানুন team-ax.top এ',
        cta: 'Chat With Reze',
        ctaSecondary: 'আরও জানুন'
      },
      features: {
        title: 'কেন রেজে AI?',
        subtitle: 'প্রযুক্তি এবং বুদ্ধিমত্তার সম্মিলন',
        items: [
          {
            icon: Brain,
            title: 'বুদ্ধিমান AI',
            description: 'উন্নত এআই প্রযুক্তি দিয়ে তৈরি, যে কোনো প্রশ্নের সঠিক উত্তর দিতে সক্ষম'
          },
          {
            icon: Zap,
            title: 'তাৎক্ষণিক প্রতিক্রিয়া',
            description: 'কোনো ওয়েটিং ছাড়াই সেকেন্ডের মধ্যে পেয়ে যান আপনার প্রশ্নের উত্তর'
          },
          {
            icon: Users,
            title: 'বহুভাষী সমর্থন',
            description: 'বাংলা, ইংরেজিসহ একাধিক ভাষায় নির্বিঘ্নে কথা বলুন'
          },
          {
            icon: Shield,
            title: 'নিরাপদ এবং ব্যক্তিগত',
            description: 'আপনার সকল তথ্য সম্পূর্ণ নিরাপদে সংরক্ষিত এবং গোপনীয়'
          },
          {
            icon: Clock,
            title: '২৪/৭ উপলব্ধ',
            description: 'দিন-রাত যেকোনো সময় রেজে AI আপনার সেবায় প্রস্তুত'
          },
          {
            icon: CheckCircle,
            title: 'ব্যবহারকারী বান্ধব',
            description: 'সহজ এবং সরল ইন্টারফেসে যে কেউ ব্যবহার করতে পারে'
          }
        ]
      },
      stats: [
        { number: '১০০,০০০+', label: 'সন্তুষ্ট ব্যবহারকারী' },
        { number: '২৪/৭', label: 'সেবা উপলব্ধ' },
        { number: '৪.৯/৫', label: 'রেটিং' },
        { number: '১০+', label: 'ভাষা সমর্থন' }
      ],
      about: {
        title: 'রেজে AI সম্পর্কে',
        description1: 'রেজে AI হলো Team AX Inc. এর একটি অত্যাধুনিক এআই চ্যাটবট।',
        description2: 'আমরা কৃত্রিম বুদ্ধিমত্তার শক্তি কাজে লাগিয়ে এমন একটি সিস্টেম তৈরি করেছি যা আপনার সকল প্রশ্নের উত্তর দিতে পারে।',
        description3: 'শিক্ষা, কাজ, বা দৈনন্দিন জীবনের যেকোনো ক্ষেত্রে রেজে AI আপনার সহায়ক হতে প্রস্তুত। আমাদের কাজ দেখতে ভিজিট করুন portfolio.team-ax.top এবং team-ax.top এ।'
      },
      cta: {
        title: 'আজই শুরু করুন',
        subtitle: 'হাজারো মানুষের মতো আপনিও যোগ দিন রেজে AI পরিবারে',
        button: 'রেজে AI-র সাথে কথা বলুন'
      },
      footer: {
        description: 'রেজে AI - আপনার বুদ্ধিমান AI সহকারী | Team AX Inc.',
        copyright: '© ২০২৫ Team AX Inc. সর্বস্বত্ব সংরক্ষিত। | team-ax.top | portfolio.team-ax.top'
      }
    },
    en: {
      nav: {
        home: 'Home',
        features: 'Features',
        about: 'About',
        contact: 'Contact',
        portfolio: 'Portfolio',
        team: 'Team AX'
      },
      hero: {
        badge: 'AI-POWERED CHATBOT',
        title: 'Chat with Reze AI',
        tagline1: 'Smart Conversations',
        tagline2: 'Instant Responses',
        tagline3: 'Solutions for All Questions',
        subtitle: 'Your Intelligent AI Assistant from Team AX Inc. Visit our portfolio at portfolio.team-ax.top and learn more at team-ax.top',
        cta: 'Chat With Reze',
        ctaSecondary: 'Learn More'
      },
      features: {
        title: 'Why Reze AI?',
        subtitle: 'Where Technology Meets Intelligence',
        items: [
          {
            icon: Brain,
            title: 'Intelligent AI',
            description: 'Powered by advanced AI technology capable of answering any question accurately'
          },
          {
            icon: Zap,
            title: 'Instant Response',
            description: 'Get answers to your questions within seconds without any waiting'
          },
          {
            icon: Users,
            title: 'Multilingual Support',
            description: 'Communicate seamlessly in multiple languages including Bengali and English'
          },
          {
            icon: Shield,
            title: 'Safe & Private',
            description: 'All your information is completely secure and kept confidential'
          },
          {
            icon: Clock,
            title: '24/7 Available',
            description: 'Reze AI is ready to assist you anytime, day or night'
          },
          {
            icon: CheckCircle,
            title: 'User Friendly',
            description: 'Simple and intuitive interface that anyone can use easily'
          }
        ]
      },
      stats: [
        { number: '100,000+', label: 'Satisfied Users' },
        { number: '24/7', label: 'Service Available' },
        { number: '4.9/5', label: 'Rating' },
        { number: '10+', label: 'Language Support' }
      ],
      about: {
        title: 'About Reze AI',
        description1: 'Reze AI is an advanced AI chatbot from Team AX Inc.',
        description2: 'We have harnessed the power of artificial intelligence to create a system that can answer all your questions.',
        description3: 'Whether in education, work, or daily life, Reze AI is ready to assist you in any field. Check out our work at portfolio.team-ax.top and learn more about us at team-ax.top'
      },
      cta: {
        title: 'Get Started Today',
        subtitle: 'Join thousands of users in the Reze AI family',
        button: 'Chat with Reze AI'
      },
      footer: {
        description: 'Reze AI - Your Intelligent AI Assistant | Team AX Inc.',
        copyright: '© 2025 Team AX Inc. All rights reserved. | team-ax.top | portfolio.team-ax.top'
      }
    }
  };

  const t = content[currentLanguage];

  return (
    <>
      <SEOHead 
        currentLanguage={currentLanguage}
        title={t.hero.title}
        description={t.hero.subtitle}
        canonical="https://reze-ai.team-ax.top"
        ogImage="https://reze-ai.team-ax.top/og-image.jpg"
        keywords={[
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
          'AI technology',
          'natural language processing',
          'machine learning',
          'conversational AI',
          '24/7 AI support',
          'free AI assistant',
          'advanced AI chatbot'
        ]}
        author="Team AX Inc."
        publishedTime={new Date().toISOString()}
        modifiedTime={new Date().toISOString()}
        articleSection="Technology"
        tags={['AI', 'Chatbot', 'Assistant', 'Multilingual', 'Team AX']}
      />
      
      <div className="min-h-screen bg-warm text-warm overflow-hidden">
        {/* Enhanced Background with creamy gradient and animated elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-creamy via-warm to-creamy-secondary" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-brand/10 animate-pulse-slow" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand/5 to-brand/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>
        
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-creamy/90 dark:bg-card/90 backdrop-blur-xl shadow-creamy border-b border-brand/10' 
            : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-4 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'
              }`}>
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-light rounded-2xl flex items-center justify-center overflow-hidden shadow-creamy group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                    <Bot className="w-7 h-7 text-white animate-pulse-slow" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand to-brand-light rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-warm bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                    {currentLanguage === 'bn' ? 'রেজে AI' : 'Reze AI'}
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">
                    {currentLanguage === 'bn' ? 'বুদ্ধিমান AI সহকারী' : 'Intelligent AI Assistant'}
                  </p>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center space-x-8">
                {Object.entries(t.nav).map(([key, value], index) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === 'portfolio') {
                        window.open('https://portfolio.team-ax.top', '_blank', 'noopener,noreferrer');
                      } else if (key === 'team') {
                        window.open('https://team-ax.top', '_blank', 'noopener,noreferrer');
                      } else {
                        scrollToSection(key);
                      }
                    }}
                    className={`text-warm hover:text-brand transition-all duration-300 font-medium relative group flex items-center space-x-1 ${
                      isVisible ? `animate-slide-up opacity-100` : 'opacity-0 translate-y-10'
                    }`}
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    <span>{value}</span>
                    {(key === 'portfolio' || key === 'team') && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand to-brand-light group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
              </div>
              
              {/* Mobile Menu Button */}
              <div className={`lg:hidden transition-all duration-700 ${
                isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'
              }`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="hover:bg-creamy-accent transition-all duration-300 rounded-xl"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-warm" />
                  ) : (
                    <Menu className="w-5 h-5 text-warm" />
                  )}
                </Button>
              </div>
              
              <div className={`flex items-center space-x-3 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'
              }`} style={{ animationDelay: '300ms' }}>
                <LanguageToggle 
                  currentLanguage={currentLanguage} 
                  onLanguageChange={setCurrentLanguage} 
                />
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-creamy/95 dark:bg-card/95 backdrop-blur-xl border-t border-brand/10 animate-slide-up">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col space-y-4">
                  {Object.entries(t.nav).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (key === 'portfolio') {
                          window.open('https://portfolio.team-ax.top', '_blank', 'noopener,noreferrer');
                        } else if (key === 'team') {
                          window.open('https://team-ax.top', '_blank', 'noopener,noreferrer');
                        } else {
                          scrollToSection(key);
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-warm hover:text-brand transition-colors font-medium text-left py-3 px-4 rounded-lg hover:bg-creamy-accent flex items-center justify-between"
                    >
                      <span>{value}</span>
                      {(key === 'portfolio' || key === 'team') && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto text-center relative z-10">
            <div className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <div className="inline-flex items-center bg-creamy-accent border border-brand/20 text-gold px-6 py-3 rounded-full text-sm font-medium shadow-creamy hover:shadow-glow transition-all duration-500 animate-bounce-gentle">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse-slow" />
                {t.hero.badge}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-warm leading-tight">
                <span className="bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  {t.hero.title}
                </span>
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl text-muted-foreground space-y-3 max-w-4xl mx-auto">
                <p className="animate-slide-up" style={{ animationDelay: '200ms' }}>{t.hero.tagline1}</p>
                <p className="animate-slide-up" style={{ animationDelay: '400ms' }}>{t.hero.tagline2}</p>
                <p className="animate-slide-up" style={{ animationDelay: '600ms' }}>{t.hero.tagline3}</p>
              </div>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '800ms' }}>
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '1000ms' }}>
                <Link href="/chat">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-brand to-brand-light hover:from-brand-dark hover:to-brand text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-creamy hover:shadow-glow transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {t.hero.cta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-brand/30 text-brand hover:bg-brand hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-creamy hover:shadow-glow transition-all duration-500 hover:scale-105 hover:border-brand"
                  onClick={() => scrollToSection('features')}
                >
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-brand/20 to-brand/10 rounded-2xl animate-float" />
          <div className="absolute top-40 right-10 w-16 h-16 bg-gradient-to-br from-brand/15 to-brand/5 rounded-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-brand/10 to-transparent rounded-lg animate-float" style={{ animationDelay: '2s' }} />
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 bg-creamy/50 backdrop-blur-sm border-y border-brand/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
              {t.stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center group transition-all duration-700 hover:scale-110 ${
                    isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ animationDelay: `${index * 100 + 1200}ms` }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent mb-2 group-hover:animate-pulse-slow">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-warm">
          <div className="container mx-auto">
            <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-20'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm mb-6">
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  {t.features.title}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.features.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {t.features.items.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`group bg-creamy/50 border border-brand/10 hover:border-brand/30 transition-all duration-700 hover:shadow-creamy hover:shadow-glow hover:-translate-y-2 overflow-hidden ${
                    isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ animationDelay: `${index * 150 + 1600}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand/20 to-brand/10 rounded-2xl flex items-center justify-center group-hover:from-brand/30 group-hover:to-brand/20 transition-all duration-500 group-hover:scale-110">
                        <feature.icon className="w-8 h-8 text-brand group-hover:animate-pulse-slow" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-brand/10 to-brand/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-warm mb-4 group-hover:text-brand transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-creamy/30">
          <div className="container mx-auto max-w-4xl text-center">
            <div className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-20'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm">
                <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                  {t.about.title}
                </span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                <p className="animate-slide-up" style={{ animationDelay: '200ms' }}>{t.about.description1}</p>
                <p className="animate-slide-up" style={{ animationDelay: '400ms' }}>{t.about.description2}</p>
                <p className="animate-slide-up" style={{ animationDelay: '600ms' }}>{t.about.description3}</p>
              </div>
              
              {/* External Links for SEO */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '800ms' }}>
                <a 
                  href="https://team-ax.top" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-brand hover:text-brand-dark transition-colors duration-300 font-medium"
                >
                  <Globe className="w-4 h-4" />
                  <span>team-ax.top</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://portfolio.team-ax.top" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-brand hover:text-brand-dark transition-colors duration-300 font-medium"
                >
                  <Star className="w-4 h-4" />
                  <span>portfolio.team-ax.top</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-light to-brand opacity-90" />
          <div className="absolute inset-0 opacity-10 animate-pulse-slow" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto text-center relative z-10">
            <div className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 ${
              isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-90'
            }`}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                {t.cta.title}
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                {t.cta.subtitle}
              </p>
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-white text-brand hover:bg-creamy px-10 py-5 text-xl font-bold rounded-2xl shadow-warm hover:shadow-glow transition-all duration-500 hover:scale-105 group"
                >
                  <span className="flex items-center">
                    {t.cta.button}
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Floating elements in CTA */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </section>

        {/* Footer */}
        <footer className="bg-creamy/80 border-t border-brand/20 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className={`flex items-center space-x-4 transition-all duration-700 ${
                isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'
              }`}>
                <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center shadow-creamy">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                    {currentLanguage === 'bn' ? 'রেজে AI' : 'Reze AI'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.footer.description}
                  </p>
                </div>
              </div>
              
              <div className={`flex flex-col items-center space-y-2 transition-all duration-700 ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 scale-90'
              }`}>
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://team-ax.top" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand transition-colors duration-300 text-sm"
                  >
                    team-ax.top
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a 
                    href="https://portfolio.team-ax.top" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand transition-colors duration-300 text-sm"
                  >
                    portfolio.team-ax.top
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.footer.copyright}
                </p>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Floating Chat Button */}
        <FloatingChatButton />
      </div>
    </>
  );
};

export default RezeAILanding;