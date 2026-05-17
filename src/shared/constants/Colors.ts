/**
 * ChinaLink Express Theme System
 * Color palette objects and legacy color exports
 */
import { getAppThemeMode } from './themeState';

// ============================================
// Color Palette - Light Theme
// ============================================
export const lightColors = {
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
    successDark: '#166534',
    warningBg: '#FEF9C3',
    warningDark: '#92400E',
    errorBg: '#FEF2F2',
    errorDark: '#991B1B',
    infoBg: '#EFF6FF',
    infoDark: '#1E40AF',
  },
};

// ============================================
// Color Palette - Dark Theme
// ============================================
export const darkColors = {
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
    successDark: '#BBF7D0',
    warningBg: '#713F12',
    warningDark: '#FDE68A',
    errorBg: '#7F1D1D',
    errorDark: '#FECACA',
    infoBg: '#1E3A8A',
    infoDark: '#BFDBFE',
  },
};

// ============================================
// Legacy Colors Export (for backward compatibility)
// ============================================
const lightCOLORS = {
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
  shadow: '#000000',
  dark: '#1F2937',
} as const;

const darkCOLORS = {
  inputBorder: '#374151',
  placeHolder: '#9CA3AF',
  success: '#4ADE80',
  danger: '#EF4444',
  heading: '#86EFAC',
  text: '#BBF7D0',
  link: '#F4D03F',
  black: '#F9FAFB',
  lightergray: '#1F2937',
  Crimson: '#4ADE80',
  lightCrimson: '#14532D',
  DarkGrey: '#E5E7EB',
  DimGray: '#D1D5DB',
  SlateGray: '#15803D',
  Silver: '#374151',
  FeatherWhite: '#0F172A',
  lightyellow: '#F4D03F',
  white: '#0F172A',
  yellow: '#F4D03F',
  orange: '#F7DC6F',
  grey: '#9CA3AF',
  navy: '#86EFAC',
  influencercardcolor: '#1E293B',
  lightGray: '#D1D5DB',
  lightBackground: '#14532D',
  border: '#15803D',
  extra1: '#14532D',
  extra2: '#1E293B',
  terms: '#4ADE80',
  green: '#4ADE80',
  terms2: '#86EFAC',
  blueTransparent: 'rgba(134, 239, 172, 0.5)',
  dont: '#BBF7D0',
  blueShade: '#4ADE80',
  blue: '#4ADE80',
  purpleShade: '#D4AF37',
  orangeShade: '#F7DC6F',
  redShade: '#EF4444',
  gold: '#F4D03F',
  goldLight: '#F7DC6F',
  goldDark: '#D4AF37',
  redLight: '#F87171',
  shadow: '#000000',
  dark: '#F9FAFB',
} as unknown as typeof lightCOLORS;

// ============================================
// Reactive COLORS proxy (syncs with app theme toggle)
// ============================================
export const COLORS = new Proxy({} as typeof lightCOLORS, {
  get(_, prop) {
    if (typeof prop !== 'string') return undefined;
    const scheme = getAppThemeMode();
    const source = scheme === 'dark' ? darkCOLORS : lightCOLORS;
    return source[prop as keyof typeof lightCOLORS];
  },
});
