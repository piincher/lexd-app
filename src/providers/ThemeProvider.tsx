/**
 * Theme Provider
 * Manages dark/light mode with system detection and persistence
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ThemeMode,
  ThemeContextType,
  lightTheme,
  darkTheme,
  paperLightTheme,
  paperDarkTheme,
  navigationLightTheme,
  navigationDarkTheme,
  statusBarLightTheme,
  statusBarDarkTheme,
} from '../constants/Theme';
import { setAppThemeMode } from '../constants/themeState';

// Storage key
const THEME_STORAGE_KEY = '@chinalink_theme_mode';

// Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider Props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  // Get system color scheme
  const systemColorScheme = useColorScheme();
  
  // State
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if dark mode is active
  const isDark = (() => {
    if (theme === 'system') {
      return systemColorScheme === 'dark';
    }
    return theme === 'dark';
  })();

  // Sync reactive static exports so Theme/COLORS stay correct
  useEffect(() => {
    setAppThemeMode(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Get current theme colors
  const colors = isDark ? darkTheme.colors : lightTheme.colors;
  const paperTheme = isDark ? paperDarkTheme : paperLightTheme;
  const navigationTheme = isDark ? navigationDarkTheme : navigationLightTheme;
  const statusBarTheme = isDark ? statusBarDarkTheme : statusBarLightTheme;

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setThemeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Save theme when changed
  const setTheme = async (newTheme: ThemeMode) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    toggleTheme,
    colors,
    paperTheme,
    navigationTheme,
    statusBarTheme,
  };

  if (isLoading) {
    // Return null while loading to prevent rendering without theme context
    // This prevents flash of wrong theme and hook errors
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook for theme-aware styles
export const useThemeStyles = <T extends Record<string, any>>(
  styleCreator: (colors: typeof lightTheme.colors, isDark: boolean) => T
): T => {
  const { colors, isDark } = useAppTheme();
  return styleCreator(colors, isDark);
};

export default ThemeProvider;
