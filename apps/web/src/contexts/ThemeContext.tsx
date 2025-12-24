'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store';
import { getThemePreference, updateThemePreference } from '@/lib/api/userSettings';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    
    // Load theme from database if user is authenticated
    const loadThemeFromDB = async () => {
      if (isAuthenticated() && token) {
        try {
          const response = await getThemePreference(token);
          if (response.theme) {
            setThemeState(response.theme as Theme);
          }
        } catch (error) {
          console.error('Failed to load theme from database:', error);
          // Fallback to localStorage if DB fails
          const savedTheme = localStorage.getItem('theme') as Theme | null;
          if (savedTheme) {
            setThemeState(savedTheme);
          }
        }
      } else {
        // Fallback to localStorage if not authenticated
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
          setThemeState(savedTheme);
        }
      }
    };

    loadThemeFromDB();
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Déterminer le thème résolu
    let resolved: 'light' | 'dark' = 'light';
    
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = theme;
    }

    setResolvedTheme(resolved);

    // Appliquer le thème au document
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);

    // Sauvegarder dans la base de données si authentifié, sinon localStorage
    const saveTheme = async () => {
      if (isAuthenticated() && token) {
        try {
          await updateThemePreference(theme, token);
        } catch (error) {
          console.error('Failed to save theme to database:', error);
          // Fallback to localStorage if DB fails
          localStorage.setItem('theme', theme);
        }
      } else {
        // Fallback to localStorage if not authenticated
        localStorage.setItem('theme', theme);
      }
    };

    saveTheme();
  }, [theme, mounted, isAuthenticated, token]);

  useEffect(() => {
    if (!mounted) return;

    // Écouter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const resolved = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(resolved);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolved);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((current) => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

