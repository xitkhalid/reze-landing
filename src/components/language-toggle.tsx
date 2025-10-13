'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'bn';
  onLanguageChange: (lang: 'en' | 'bn') => void;
}

export function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-gray-100 transition-all duration-300"
        disabled
      >
        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onLanguageChange(currentLanguage === 'en' ? 'bn' : 'en')}
      className="group relative w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-110"
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Bangla' : 'English'}`}
    >
      <Globe className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Language indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-[8px] text-white font-bold">
          {currentLanguage === 'en' ? 'E' : 'B'}
        </span>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-green-500/10 shadow-lg shadow-green-500/20 transition-all duration-300 group-hover:bg-green-500/20" />
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {currentLanguage === 'en' ? 'বাংলায় সুইচ করুন' : 'Switch to English'}
      </div>
    </Button>
  );
}