/**
 * React Navigation and Status Bar themes
 */
import type { Theme as NavigationTheme } from '@react-navigation/native';
import { lightColors, darkColors } from './Colors';

// ============================================
// React Navigation Themes
// ============================================
export const navigationLightTheme: NavigationTheme = {
  dark: false,
  colors: {
    primary: lightColors.primary.main,
    background: lightColors.background.default,
    card: lightColors.background.card,
    text: lightColors.text.primary,
    border: lightColors.border,
    notification: lightColors.status.error,
  },
};

export const navigationDarkTheme: NavigationTheme = {
  dark: true,
  colors: {
    primary: darkColors.primary.main,
    background: darkColors.background.default,
    card: darkColors.background.card,
    text: darkColors.text.primary,
    border: darkColors.border,
    notification: darkColors.status.error,
  },
};

// ============================================
// Status Bar Themes
// ============================================
export const statusBarLightTheme = {
  style: 'dark' as const,
  backgroundColor: lightColors.background.default,
  translucent: false,
};

export const statusBarDarkTheme = {
  style: 'light' as const,
  backgroundColor: darkColors.background.default,
  translucent: false,
};
