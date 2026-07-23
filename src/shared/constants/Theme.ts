/**
 * LEXD Theme System
 * Complete dark/light mode theme configuration.
 * Primary: LEXD green (#007757) | Accent: amber (#F5A524)
 *
 * Raw color values live in ./brand and are shaped into palettes by ./Colors.
 * This file only composes those palettes into Paper, Navigation, and
 * status-bar themes plus the shared elevation/spacing/type scales.
 *
 * Previously this file duplicated the entire palette inline, which is how the
 * app accumulated 240+ drifting hardcoded hex values. Keep it derived.
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { Theme as NavigationTheme } from '@react-navigation/native';
import { getAppThemeMode } from './themeState';
import { lightColors, darkColors, COLORS } from './Colors';
import { green as brandGreen, amber, ink, darkSurface } from './brand';

// Re-exported so the many `import { COLORS } from '.../Theme'` call sites keep
// working against the single definition in ./Colors.
export { COLORS };

// ============================================
// Shared scales (identical across both themes)
// ============================================
const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

const spacing = {
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
} as const;

const typography = {
  h1: { fontSize: 36, fontWeight: '800', letterSpacing: -0.5, lineHeight: 44 },
  h2: { fontSize: 28, fontWeight: '700', letterSpacing: -0.3, lineHeight: 36 },
  h3: { fontSize: 22, fontWeight: '700', letterSpacing: -0.2, lineHeight: 30 },
  h4: { fontSize: 18, fontWeight: '600', letterSpacing: -0.1, lineHeight: 26 },
  body: { fontSize: 16, fontWeight: '400', letterSpacing: 0, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400', letterSpacing: 0, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500', letterSpacing: 0.2, lineHeight: 16 },
  button: { fontSize: 15, fontWeight: '600', letterSpacing: 0.3, lineHeight: 22 },
  overline: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, lineHeight: 16 },
} as const;

const animation = {
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
} as const;

/** Elevation ramp. `tint` is the color the shadow is cast in. */
const buildShadows = (tint: string, opacities: number[], coloredTint: string) =>
  ({
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: tint,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: opacities[0],
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: tint,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: opacities[1],
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: tint,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: opacities[2],
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: tint,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: opacities[3],
      shadowRadius: 32,
      elevation: 12,
    },
    colored: {
      shadowColor: coloredTint,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4,
    },
  }) as const;

// ============================================
// Light Theme
// ============================================
export const lightTheme = {
  colors: lightColors,

  gradients: {
    primary: [brandGreen[500], brandGreen[600], brandGreen[700]] as const,
    // `gold` is the legacy name for the amber accent gradient.
    gold: [amber[300], amber[500], amber[700]] as const,
    amber: [amber[300], amber[500], amber[700]] as const,
    sunset: [amber[500], '#F08A3C', '#D92D20'] as const,
    ocean: [brandGreen[300], brandGreen[500], brandGreen[700]] as const,
    forest: [brandGreen[400], brandGreen[600], brandGreen[800]] as const,
    dawn: [amber[200], brandGreen[300], brandGreen[500]] as const,
    // Deprecated hue-named aliases kept for existing admin screens. They no
    // longer render purple/pink/cyan — each maps onto the LEXD palette.
    purple: [brandGreen[400], brandGreen[600], brandGreen[800]] as const,
    pink: [amber[300], amber[500], amber[700]] as const,
    cyan: [brandGreen[300], brandGreen[500], brandGreen[600]] as const,
    card: [ink[0], ink[50]] as const,
    glass: ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)'] as const,
    dark: [darkSurface.card, darkSurface.paper, darkSurface.default] as const,
  },

  shadows: buildShadows(ink[900], [0.05, 0.08, 0.12, 0.15], brandGreen[500]),

  borderRadius,
  spacing,
  typography,
  animation,
};

// ============================================
// Dark Theme
// ============================================
export const darkTheme = {
  colors: darkColors,

  gradients: {
    primary: [brandGreen[600], brandGreen[500], brandGreen[400]] as const,
    gold: [amber[700], amber[500], amber[300]] as const,
    amber: [amber[700], amber[500], amber[300]] as const,
    sunset: ['#912018', '#D92D20', amber[500]] as const,
    ocean: [brandGreen[700], brandGreen[500], brandGreen[300]] as const,
    forest: [brandGreen[800], brandGreen[600], brandGreen[400]] as const,
    dawn: [brandGreen[700], brandGreen[500], amber[500]] as const,
    // Deprecated hue-named aliases — see light theme note above.
    purple: [brandGreen[800], brandGreen[600], brandGreen[400]] as const,
    pink: [amber[700], amber[500], amber[300]] as const,
    cyan: [brandGreen[600], brandGreen[500], brandGreen[300]] as const,
    card: [darkSurface.card, darkSurface.elevated] as const,
    glass: ['rgba(22,48,41,0.9)', 'rgba(29,59,51,0.7)'] as const,
    dark: [darkSurface.default, darkSurface.paper, darkSurface.card] as const,
  },

  // Shadows read stronger in dark mode to stay visible on dark surfaces.
  shadows: buildShadows('#000000', [0.2, 0.3, 0.4, 0.5], brandGreen[300]),

  borderRadius,
  spacing,
  typography,
  animation,
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
    secondary: lightTheme.colors.accent.amber,
    secondaryContainer: lightTheme.colors.accent.amberLight,
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
    secondary: darkTheme.colors.accent.amber,
    secondaryContainer: darkTheme.colors.accent.amberDark,
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
  statusBarTheme: typeof statusBarLightTheme | typeof statusBarDarkTheme;
}

export type AppTheme = typeof lightTheme;

// ============================================
// Reactive Theme Export (syncs with app theme toggle)
// ============================================
function getCurrentTheme() {
  const scheme = getAppThemeMode();
  return scheme === 'dark' ? darkTheme : lightTheme;
}

export const Theme = new Proxy(
  {} as {
    neutral: typeof lightTheme.colors.neutral;
    primary: typeof lightTheme.colors.primary;
    accent: typeof lightTheme.colors.accent;
    status: typeof lightTheme.colors.status;
    shadows: typeof lightTheme.shadows;
    gradients: typeof lightTheme.gradients;
    radius: typeof lightTheme.borderRadius;
    spacing: typeof lightTheme.spacing;
    typography: typeof lightTheme.typography;
    feedback: typeof lightTheme.colors.feedback;
    colors: {
      primary: typeof lightTheme.colors.primary;
      secondary: { main: string; light: string; dark: string };
      error: { main: string; light: string; dark: string };
      warning: { main: string; light: string; dark: string };
      success: { main: string; light: string; dark: string };
      info: { main: string; light: string; dark: string };
      accent: typeof lightTheme.colors.accent;
      status: typeof lightTheme.colors.status;
      background: typeof lightTheme.colors.background;
      text: typeof lightTheme.colors.text;
      neutral: typeof lightTheme.colors.neutral;
      feedback: typeof lightTheme.colors.feedback;
      border: typeof lightTheme.colors.border;
      divider: typeof lightTheme.colors.divider;
    };
  },
  {
    get(_, prop) {
      const t = getCurrentTheme();
      switch (prop) {
        case 'neutral':
          return t.colors.neutral;
        case 'primary':
          return t.colors.primary;
        case 'accent':
          return t.colors.accent;
        case 'status':
          return t.colors.status;
        case 'shadows':
          return t.shadows;
        case 'gradients':
          return t.gradients;
        case 'radius':
          return t.borderRadius;
        case 'spacing':
          return t.spacing;
        case 'typography':
          return t.typography;
        case 'feedback':
          return t.colors.feedback;
        case 'colors':
          return {
            primary: t.colors.primary,
            secondary: {
              main: t.colors.accent.amber,
              light: t.colors.accent.amberLight,
              dark: t.colors.accent.amberDark,
            },
            error: {
              main: t.colors.status.error,
              light: t.colors.feedback.errorBg,
              dark: t.colors.feedback.errorDark,
            },
            warning: {
              main: t.colors.status.warning,
              light: t.colors.feedback.warningBg,
              dark: t.colors.feedback.warningDark,
            },
            success: {
              main: t.colors.status.success,
              light: t.colors.feedback.successBg,
              dark: t.colors.feedback.successDark,
            },
            info: {
              main: t.colors.status.info,
              light: t.colors.feedback.infoBg,
              dark: t.colors.feedback.infoDark,
            },
            accent: t.colors.accent,
            status: t.colors.status,
            background: t.colors.background,
            text: t.colors.text,
            neutral: t.colors.neutral,
            feedback: t.colors.feedback,
            border: t.colors.border,
            divider: t.colors.divider,
          };
        default:
          return undefined;
      }
    },
  }
);

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
