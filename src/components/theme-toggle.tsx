'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="group relative w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-4 h-4 overflow-hidden">
        <Sun 
          className={`absolute inset-0 w-4 h-4 text-amber-500 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-4 h-4 text-blue-500 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`} 
        />
      </div>
      
      {/* Subtle glow effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-blue-500/10 shadow-lg shadow-blue-500/20' 
          : 'bg-amber-500/10 shadow-lg shadow-amber-500/20'
      }`} />
      
      {/* Tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </div>
    </Button>
  );
}