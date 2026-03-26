/**
 * ChinaLink Express Theme System
 * Complete dark/light mode theme configuration
 * Primary: Green | Accents: Gold, Red
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Theme as NavigationTheme } from '@react-navigation/native';

// ============================================
// Color Palette - Light Theme
// ============================================
export const lightTheme = {
  colors: {
    // Primary Colors - Green (from logo)
    primary: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#15803D',
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },

    // Accent Colors - Gold & Red (from logo swooshes)
    accent: {
      gold: '#D4AF37',
      goldLight: '#F4D03F',
      goldDark: '#B8860B',
      red: '#DC2626',
      redLight: '#EF4444',
      coral: '#FF6B6B',
      mint: '#4ECDC4',
      rose: '#FF8FAB',
      sky: '#74C0FC',
    },

    // Background Colors
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
      card: '#FFFFFF',
      elevated: '#FAFAFA',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    // Text Colors
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
      inverse: '#FFFFFF',
      muted: '#9CA3AF',
    },

    // Neutral Colors (Gray Scale)
    neutral: {
      white: '#FFFFFF',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },

    // Border & Divider
    border: '#E5E7EB',
    divider: '#E5E7EB',

    // Semantic Colors
    status: {
      success: '#16A34A',
      warning: '#D4AF37',
      error: '#DC2626',
      info: '#3B82F6',
    },

    // Action Colors
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },

    // Feedback Colors
    feedback: {
      successBg: '#F0FDF4',
      warningBg: '#FEF9C3',
      errorBg: '#FEF2F2',
      infoBg: '#EFF6FF',
    },
  },

  // Gradients
  gradients: {
    primary: ['#22C55E', '#16A34A', '#15803D'] as const,
    gold: ['#F4D03F', '#D4AF37', '#B8860B'] as const,
    sunset: ['#DC2626', '#EF4444', '#F4D03F'] as const,
    ocean: ['#4ECDC4', '#74C0FC', '#3B82F6'] as const,
    card: ['#FFFFFF', '#FAFAFA'] as const,
    glass: ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)'] as const,
    dark: ['#1a237e', '#4a148c', '#880e4f'] as const,
  },

  // Shadows
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 32,
      elevation: 12,
    },
    colored: {
      shadowColor: '#22C55E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4,
    },
  },

  // Border Radius
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  // Spacing
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 48,
    '5xl': 64,
  },

  // Typography
  typography: {
    h1: { fontSize: 36, fontWeight: '800', letterSpacing: -0.5, lineHeight: 44 },
    h2: { fontSize: 28, fontWeight: '700', letterSpacing: -0.3, lineHeight: 36 },
    h3: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2, lineHeight: 30 },
    h4: { fontSize: 18, fontWeight: '600', letterSpacing: -0.1, lineHeight: 26 },
    body: { fontSize: 16, fontWeight: '400', letterSpacing: 0, lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '400', letterSpacing: 0, lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '500', letterSpacing: 0.2, lineHeight: 16 },
    button: { fontSize: 15, fontWeight: '600', letterSpacing: 0.3, lineHeight: 22 },
    overline: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, lineHeight: 16 },
  },

  // Animation
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: 'easeIn',
      easeOut: 'easeOut',
      easeInOut: 'easeInOut',
      spring: 'spring',
    },
  },
};

// ============================================
// Color Palette - Dark Theme
// ============================================
export const darkTheme = {
  colors: {
    // Primary Colors - Green (adjusted for dark mode)
    primary: {
      main: '#4ADE80',
      light: '#86EFAC',
      dark: '#22C55E',
      50: '#14532D',
      100: '#166534',
      200: '#15803D',
      300: '#16A34A',
      400: '#22C55E',
      500: '#4ADE80',
      600: '#86EFAC',
      700: '#BBF7D0',
      800: '#DCFCE7',
      900: '#F0FDF4',
    },

    // Accent Colors - Gold & Red (adjusted for dark mode)
    accent: {
      gold: '#F4D03F',
      goldLight: '#F7DC6F',
      goldDark: '#D4AF37',
      red: '#EF4444',
      redLight: '#F87171',
      coral: '#FF8585',
      mint: '#6FE7DE',
      rose: '#FFA5C3',
      sky: '#9BD5FF',
    },

    // Background Colors
    background: {
      default: '#0F172A',
      paper: '#1E293B',
      card: '#334155',
      elevated: '#475569',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },

    // Text Colors
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#9CA3AF',
      inverse: '#1F2937',
      muted: '#9CA3AF',
    },

    // Neutral Colors (Gray Scale) - Dark Mode
    neutral: {
      white: '#FFFFFF',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },

    // Border & Divider
    border: '#374151',
    divider: '#374151',

    // Semantic Colors
    status: {
      success: '#4ADE80',
      warning: '#F4D03F',
      error: '#EF4444',
      info: '#60A5FA',
    },

    // Action Colors
    action: {
      active: 'rgba(255, 255, 255, 0.7)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },

    // Feedback Colors
    feedback: {
      successBg: '#14532D',
      warningBg: '#713F12',
      errorBg: '#7F1D1D',
      infoBg: '#1E3A8A',
    },
  },

  // Gradients - adjusted for dark mode
  gradients: {
    primary: ['#16A34A', '#22C55E', '#4ADE80'] as const,
    gold: ['#B8860B', '#D4AF37', '#F4D03F'] as const,
    sunset: ['#B91C1C', '#DC2626', '#F4D03F'] as const,
    ocean: ['#0E7490', '#0EA5E9', '#38BDF8'] as const,
    card: ['#1E293B', '#334155'] as const,
    glass: ['rgba(30,41,59,0.9)', 'rgba(51,65,85,0.7)'] as const,
    dark: ['#0F172A', '#1E293B', '#334155'] as const,
  },

  // Shadows - more subtle in dark mode
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.5,
      shadowRadius: 32,
      elevation: 12,
    },
    colored: {
      shadowColor: '#4ADE80',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 4,
    },
  },

  // Same structure as light theme
  borderRadius: lightTheme.borderRadius,
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  animation: lightTheme.animation,
};

// ============================================
// React Native Paper Themes
// ============================================
export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: lightTheme.colors.primary.main,
    primaryContainer: lightTheme.colors.primary.light,
    secondary: lightTheme.colors.accent.gold,
    secondaryContainer: lightTheme.colors.accent.goldLight,
    background: lightTheme.colors.background.default,
    surface: lightTheme.colors.background.card,
    surfaceVariant: lightTheme.colors.background.paper,
    error: lightTheme.colors.status.error,
    onPrimary: lightTheme.colors.text.inverse,
    onSecondary: lightTheme.colors.text.primary,
    onBackground: lightTheme.colors.text.primary,
    onSurface: lightTheme.colors.text.primary,
    onSurfaceVariant: lightTheme.colors.text.secondary,
    onError: lightTheme.colors.text.inverse,
    outline: lightTheme.colors.border,
    outlineVariant: lightTheme.colors.divider,
    shadow: lightTheme.colors.primary.dark,
    scrim: lightTheme.colors.background.overlay,
    inverseSurface: darkTheme.colors.background.default,
    inverseOnSurface: darkTheme.colors.text.primary,
    inversePrimary: darkTheme.colors.primary.main,
  },
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: darkTheme.colors.primary.main,
    primaryContainer: darkTheme.colors.primary.dark,
    secondary: darkTheme.colors.accent.gold,
    secondaryContainer: darkTheme.colors.accent.goldDark,
    background: darkTheme.colors.background.default,
    surface: darkTheme.colors.background.card,
    surfaceVariant: darkTheme.colors.background.paper,
    error: darkTheme.colors.status.error,
    onPrimary: darkTheme.colors.text.inverse,
    onSecondary: darkTheme.colors.text.primary,
    onBackground: darkTheme.colors.text.primary,
    onSurface: darkTheme.colors.text.primary,
    onSurfaceVariant: darkTheme.colors.text.secondary,
    onError: darkTheme.colors.text.inverse,
    outline: darkTheme.colors.border,
    outlineVariant: darkTheme.colors.divider,
    shadow: darkTheme.colors.primary.light,
    scrim: darkTheme.colors.background.overlay,
    inverseSurface: lightTheme.colors.background.default,
    inverseOnSurface: lightTheme.colors.text.primary,
    inversePrimary: lightTheme.colors.primary.main,
  },
};

// ============================================
// React Navigation Themes
// ============================================
export const navigationLightTheme: NavigationTheme = {
  dark: false,
  colors: {
    primary: lightTheme.colors.primary.main,
    background: lightTheme.colors.background.default,
    card: lightTheme.colors.background.card,
    text: lightTheme.colors.text.primary,
    border: lightTheme.colors.border,
    notification: lightTheme.colors.status.error,
  },
};

export const navigationDarkTheme: NavigationTheme = {
  dark: true,
  colors: {
    primary: darkTheme.colors.primary.main,
    background: darkTheme.colors.background.default,
    card: darkTheme.colors.background.card,
    text: darkTheme.colors.text.primary,
    border: darkTheme.colors.border,
    notification: darkTheme.colors.status.error,
  },
};

// ============================================
// Status Bar Themes
// ============================================
export const statusBarLightTheme = {
  style: 'dark' as const,
  backgroundColor: lightTheme.colors.background.default,
  translucent: false,
};

export const statusBarDarkTheme = {
  style: 'light' as const,
  backgroundColor: darkTheme.colors.background.default,
  translucent: false,
};

// ============================================
// Theme Types
// ============================================
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightTheme.colors;
  paperTheme: typeof paperLightTheme;
  navigationTheme: NavigationTheme;
  statusBarTheme: typeof statusBarLightTheme;
}

export type AppTheme = typeof lightTheme;

// ============================================
// Legacy Colors Export (for backward compatibility)
// ============================================
export const COLORS = {
  // colors used in signup form,
  inputBorder: '#c4d7e7',
  placeHolder: '#839fc0',
  success: '#16A34A',
  danger: '#DC2626',
  heading: '#15803D',
  text: '#166534',
  link: '#D4AF37',
  black: '#000000',
  lightergray: '#E8EFF5',
  Crimson: '#16A34A',
  lightCrimson: '#DCFCE7',
  DarkGrey: '#14532D',
  DimGray: '#166534',
  SlateGray: '#86EFAC',
  Silver: '#e8eff5',
  FeatherWhite: '#f7f9ff',
  lightyellow: '#F4D03F',
  white: '#ffffff',
  yellow: '#D4AF37',
  orange: '#B8860B',
  grey: '#8E8E8F',
  navy: '#14532D',
  influencercardcolor: '#f6f9ff',
  lightGray: '#898989',
  lightBackground: '#F0FDF4',
  border: '#BBF7D0',
  extra1: '#F0FDF4',
  extra2: '#FAFCFF',
  terms: '#16A34A',
  green: '#22C55E',
  terms2: '#15803D',
  blueTransparent: 'rgba(20, 83, 45, 0.5)',
  dont: '#166534',
  blueShade: '#16A34A',
  blue: '#22C55E',
  purpleShade: '#D4AF37',
  orangeShade: '#B8860B',
  redShade: '#DC2626',
  gold: '#D4AF37',
  goldLight: '#F4D03F',
  goldDark: '#B8860B',
  redLight: '#EF4444',
};

// ============================================
// Static Theme Export (for direct color access)
// ============================================
export const Theme = {
  neutral: lightTheme.colors.neutral,
  primary: lightTheme.colors.primary,
  accent: lightTheme.colors.accent,
  status: lightTheme.colors.status,
  shadows: lightTheme.shadows,
  gradients: lightTheme.gradients,
  radius: lightTheme.borderRadius,
  spacing: lightTheme.spacing,
  colors: {
    primary: lightTheme.colors.primary,
    secondary: {
      main: lightTheme.colors.accent.gold,
      light: lightTheme.colors.accent.goldLight,
      dark: lightTheme.colors.accent.goldDark,
    },
    error: {
      main: lightTheme.colors.status.error,
      light: '#FEE2E2',
      dark: '#991B1B',
    },
    warning: {
      main: lightTheme.colors.status.warning,
      light: '#FEF9C3',
      dark: '#92400E',
    },
    success: {
      main: lightTheme.colors.status.success,
      light: '#F0FDF4',
      dark: '#166534',
    },
    info: {
      main: lightTheme.colors.status.info,
      light: '#EFF6FF',
      dark: '#1E40AF',
    },
    accent: lightTheme.colors.accent,
    status: lightTheme.colors.status,
    background: lightTheme.colors.background,
    text: lightTheme.colors.text,
    neutral: lightTheme.colors.neutral,
  },
};

export default {
  light: lightTheme,
  dark: darkTheme,
  paperLight: paperLightTheme,
  paperDark: paperDarkTheme,
  navigationLight: navigationLightTheme,
  navigationDark: navigationDarkTheme,
  statusBarLight: statusBarLightTheme,
  statusBarDark: statusBarDarkTheme,
  COLORS,
};
