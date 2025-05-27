'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Handle case where hook is called outside provider or during SSR
    if (typeof window === 'undefined') {
      // During SSR, return a minimal context to prevent errors
      return {
        theme: 'light' as Theme,
        setTheme: () => {},
        toggleTheme: () => {},
      };
    }
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    // Only access browser APIs on client side
    if (typeof window !== 'undefined') {
      // Apply theme to document
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Store preference in localStorage
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Get current theme from DOM and localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const currentDomTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    // Determine the actual current theme
    let initialTheme: Theme = 'light';
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      initialTheme = savedTheme;
    } else {
      initialTheme = currentDomTheme;
    }
    
    // Set the state without triggering DOM changes if they're already correct
    setThemeState(initialTheme);
    
    // Ensure localStorage and DOM are in sync
    if (!savedTheme) {
      localStorage.setItem('theme', initialTheme);
    }
    
    // Make sure DOM matches the theme
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 