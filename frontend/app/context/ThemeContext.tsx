import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }
  const currentTheme = document.documentElement.getAttribute('data-theme') as Theme | null;
  if (currentTheme === 'light' || currentTheme === 'dark') {
    return currentTheme;
  }
  const stored = localStorage.getItem('theme') as Theme | null;
  return stored || 'dark';
}


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Apply theme changes
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.documentElement.style.display = 'none';
    document.documentElement.offsetHeight;
    document.documentElement.style.display = '';
  }, [theme, isHydrated]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isHydrated }}>
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
