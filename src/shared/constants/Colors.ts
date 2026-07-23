/**
 * LEXD Theme System
 * Color palette objects and legacy color exports.
 *
 * Every value here derives from ./brand — never hardcode a hex in this file.
 */
import { getAppThemeMode } from './themeState';
import { green as brandGreen, amber, ink, semantic, darkSurface } from './brand';

// ============================================
// Color Palette - Light Theme
// ============================================
export const lightColors = {
  // Primary Colors - LEXD green (from logo mark)
  primary: {
    main: brandGreen[500],
    light: brandGreen[400],
    dark: brandGreen[700],
    ...brandGreen,
  },

  // Accent Colors - amber signal color
  accent: {
    amber: amber[500],
    amberLight: amber[300],
    amberDark: amber[700],
    // Legacy gold aliases, retained so existing consumers keep compiling.
    gold: amber[500],
    goldLight: amber[300],
    goldDark: amber[700],
    red: semantic.error,
    redLight: '#F04438',
    coral: '#FF7A5A',
    mint: brandGreen[300],
    rose: '#F4A8C0',
    sky: '#5EA9F5',
  },

  // Background Colors
  background: {
    default: ink[0],
    paper: ink[50],
    card: ink[0],
    elevated: ink[50],
    overlay: 'rgba(10, 24, 21, 0.55)',
  },

  // Text Colors
  text: {
    primary: ink[900],
    secondary: ink[600],
    disabled: ink[400],
    inverse: ink[0],
    muted: ink[400],
  },

  // Neutral Colors (Gray Scale)
  neutral: {
    white: ink[0],
    ...ink,
  },

  // Border & Divider
  border: ink[200],
  divider: ink[200],

  // Semantic Colors
  status: {
    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
    info: semantic.info,
  },

  // Action Colors
  action: {
    active: 'rgba(19, 26, 23, 0.54)',
    hover: 'rgba(19, 26, 23, 0.04)',
    selected: 'rgba(0, 119, 87, 0.08)',
    disabled: 'rgba(19, 26, 23, 0.26)',
    disabledBackground: 'rgba(19, 26, 23, 0.12)',
  },

  // Feedback Colors
  feedback: {
    successBg: semantic.successLight,
    successDark: semantic.successDark,
    warningBg: semantic.warningLight,
    warningDark: semantic.warningDark,
    errorBg: semantic.errorLight,
    errorDark: semantic.errorDark,
    infoBg: semantic.infoLight,
    infoDark: semantic.infoDark,
  },
};

// ============================================
// Color Palette - Dark Theme
//
// The primary ramp inverts so `primary.500` stays the "most prominent"
// step in both themes; consumers referencing a numeric step keep working.
// ============================================
export const darkColors = {
  primary: {
    main: brandGreen[300],
    light: brandGreen[200],
    dark: brandGreen[400],
    50: brandGreen[900],
    100: brandGreen[800],
    200: brandGreen[700],
    300: brandGreen[600],
    400: brandGreen[500],
    500: brandGreen[300],
    600: brandGreen[200],
    700: brandGreen[100],
    800: brandGreen[100],
    900: brandGreen[50],
  },

  accent: {
    amber: amber[300],
    amberLight: amber[200],
    amberDark: amber[500],
    gold: amber[300],
    goldLight: amber[200],
    goldDark: amber[500],
    red: '#F97066',
    redLight: '#FDA29B',
    coral: '#FF9B80',
    mint: brandGreen[200],
    rose: '#F8C4D6',
    sky: '#84C5FF',
  },

  background: {
    default: darkSurface.default,
    paper: darkSurface.paper,
    card: darkSurface.card,
    elevated: darkSurface.elevated,
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  text: {
    primary: '#F2F6F4',
    secondary: '#B9C5C0',
    disabled: '#64756E',
    inverse: ink[900],
    muted: '#8B9B95',
  },

  // Neutral scale inverts so `neutral[900]` is the lightest step in dark mode.
  neutral: {
    white: ink[0],
    0: ink[900],
    50: ink[900],
    100: ink[800],
    200: ink[700],
    300: ink[600],
    400: ink[500],
    500: ink[400],
    600: ink[300],
    700: ink[200],
    800: ink[100],
    900: ink[50],
  },

  border: darkSurface.border,
  divider: darkSurface.border,

  status: {
    success: brandGreen[300],
    warning: '#F79009',
    error: '#F97066',
    info: '#53B1FD',
  },

  action: {
    active: 'rgba(255, 255, 255, 0.7)',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(116, 192, 167, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },

  feedback: {
    successBg: brandGreen[900],
    successDark: brandGreen[200],
    warningBg: amber[900],
    warningDark: amber[200],
    errorBg: '#55160C',
    errorDark: '#FDA29B',
    infoBg: '#102A56',
    infoDark: '#B2DDFF',
  },
};

// ============================================
// Legacy Colors Export (for backward compatibility)
//
// These keys predate the token system and carry misleading names (`blue`,
// `navy`, `Crimson` are all green). They are kept so existing screens compile;
// new code should use `lightColors`/`darkColors` or the theme hook instead.
// ============================================
const lightCOLORS = {
  inputBorder: ink[200],
  placeHolder: ink[400],
  success: semantic.success,
  danger: semantic.error,
  heading: brandGreen[700],
  text: brandGreen[800],
  link: amber[700],
  black: '#000000',
  lightergray: ink[100],
  Crimson: brandGreen[500],
  lightCrimson: brandGreen[100],
  DarkGrey: ink[900],
  DimGray: ink[600],
  SlateGray: brandGreen[300],
  Silver: ink[100],
  FeatherWhite: ink[50],
  lightyellow: amber[300],
  white: '#ffffff',
  yellow: amber[500],
  orange: amber[700],
  grey: ink[400],
  navy: brandGreen[900],
  influencercardcolor: ink[50],
  lightGray: ink[400],
  lightBackground: brandGreen[50],
  border: ink[200],
  extra1: brandGreen[50],
  extra2: ink[50],
  terms: brandGreen[600],
  green: brandGreen[500],
  terms2: brandGreen[700],
  blueTransparent: 'rgba(0, 119, 87, 0.5)',
  dont: brandGreen[800],
  blueShade: brandGreen[600],
  blue: brandGreen[500],
  purpleShade: amber[500],
  orangeShade: amber[700],
  redShade: semantic.error,
  gold: amber[500],
  goldLight: amber[300],
  goldDark: amber[700],
  redLight: '#F04438',
  shadow: '#000000',
  dark: ink[900],
} as const;

const darkCOLORS = {
  inputBorder: darkSurface.border,
  placeHolder: ink[400],
  success: brandGreen[300],
  danger: '#F97066',
  heading: brandGreen[200],
  text: brandGreen[100],
  link: amber[300],
  black: '#F2F6F4',
  lightergray: darkSurface.card,
  Crimson: brandGreen[300],
  lightCrimson: brandGreen[900],
  DarkGrey: ink[200],
  DimGray: ink[300],
  SlateGray: brandGreen[600],
  Silver: darkSurface.border,
  FeatherWhite: darkSurface.default,
  lightyellow: amber[300],
  white: darkSurface.default,
  yellow: amber[300],
  orange: amber[200],
  grey: ink[400],
  navy: brandGreen[200],
  influencercardcolor: darkSurface.paper,
  lightGray: ink[300],
  lightBackground: brandGreen[900],
  border: darkSurface.border,
  extra1: brandGreen[900],
  extra2: darkSurface.paper,
  terms: brandGreen[300],
  green: brandGreen[300],
  terms2: brandGreen[200],
  blueTransparent: 'rgba(116, 192, 167, 0.5)',
  dont: brandGreen[100],
  blueShade: brandGreen[300],
  blue: brandGreen[300],
  purpleShade: amber[300],
  orangeShade: amber[200],
  redShade: '#F97066',
  gold: amber[300],
  goldLight: amber[200],
  goldDark: amber[500],
  redLight: '#FDA29B',
  shadow: '#000000',
  dark: '#F2F6F4',
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
