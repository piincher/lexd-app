/**
 * useTheme Hook
 * Convenient access to theme values and utilities
 */

import { useAppTheme, useThemeStyles } from '@src/providers/ThemeProvider';
import { lightTheme, darkTheme } from '@src/constants/Theme';

// Re-export from providers
export { useAppTheme, useThemeStyles };

/**
 * Hook for accessing theme colors directly
 */
export const useThemeColors = () => {
  const { colors } = useAppTheme();
  return colors;
};

/**
 * Hook for checking if dark mode is active
 */
export const useIsDarkMode = () => {
  const { isDark } = useAppTheme();
  return isDark;
};

/**
 * Hook for getting theme-aware color values
 * Returns different colors based on current theme
 */
export const useThemeColor = (
  lightColor: string,
  darkColor: string
): string => {
  const { isDark } = useAppTheme();
  return isDark ? darkColor : lightColor;
};

/**
 * Hook for creating dynamic styles based on theme
 * Usage:
 * const styles = useThemedStyles((colors, isDark) => ({
 *   container: {
 *     backgroundColor: colors.background.default,
 *     padding: 16,
 *   },
 * }));
 */
export const useThemedStyles = <T extends Record<string, any>>(
  styleCreator: (colors: typeof lightTheme.colors, isDark: boolean) => T
): T => {
  return useThemeStyles(styleCreator);
};

/**
 * Hook for theme toggling functionality
 */
export const useThemeToggle = () => {
  const { theme, setTheme, isDark, toggleTheme } = useAppTheme();
  
  return {
    theme,
    setTheme,
    isDark,
    toggleTheme,
    /**
     * Set theme to light
     */
    setLight: () => setTheme('light'),
    /**
     * Set theme to dark
     */
    setDark: () => setTheme('dark'),
    /**
     * Set theme to system
     */
    setSystem: () => setTheme('system'),
  };
};

/**
 * Hook for accessing shadow styles
 */
export const useShadowStyles = (size: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'colored' = 'md') => {
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  return theme.shadows[size];
};

/**
 * Hook for accessing border radius values
 */
export const useBorderRadius = () => {
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  return theme.borderRadius;
};

/**
 * Hook for accessing spacing values
 */
export const useSpacing = () => {
  const { isDark } = useAppTheme();
  const theme = isDark ? darkTheme : lightTheme;
  return theme.spacing;
};

/**
 * Hook for creating card styles
 */
export const useCardStyles = (elevated = true) => {
  const { colors, isDark } = useAppTheme();
  const shadows = useShadowStyles(elevated ? 'md' : 'none');
  
  return {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows,
  };
};

/**
 * Hook for creating text styles
 */
export const useTextStyles = (variant: 'primary' | 'secondary' | 'disabled' | 'inverse' = 'primary') => {
  const { colors } = useAppTheme();
  
  const colorMap = {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    disabled: colors.text.disabled,
    inverse: colors.text.inverse,
  };
  
  return {
    color: colorMap[variant],
  };
};

export default useAppTheme;
