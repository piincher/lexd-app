/**
 * useThemedToasts — Theme-aware toast notifications
 * Wraps react-native-flash-message with colors from the app's theme system.
 * Automatically adapts toast backgrounds to light/dark mode.
 */

import { useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useAppTheme } from '@src/providers/ThemeProvider';

export interface ToastOptions {
  duration?: number;
  icon?: 'success' | 'danger' | 'warning' | 'info';
}

export const useThemedToasts = () => {
  const { colors, isDark } = useAppTheme();

  const getColors = useCallback(
    (type: 'success' | 'danger' | 'warning' | 'info') => {
      switch (type) {
        case 'success':
          return {
            backgroundColor: isDark ? colors.primary.dark : colors.primary.main,
            color: '#FFFFFF',
          };
        case 'danger':
          return {
            backgroundColor: isDark ? colors.accent.redDark : colors.accent.red,
            color: '#FFFFFF',
          };
        case 'warning':
          return {
            backgroundColor: isDark ? '#B45309' : '#F59E0B',
            color: '#FFFFFF',
          };
        case 'info':
          return {
            backgroundColor: isDark ? '#1E40AF' : '#3B82F6',
            color: '#FFFFFF',
          };
      }
    },
    [colors, isDark]
  );

  const showToast = useCallback(
    (message: string, description: string, type: ToastOptions['icon'] = 'info', duration = 3000) => {
      const themeColors = getColors(type ?? 'info');
      showMessage({
        message,
        description,
        type,
        duration,
        icon: type,
        ...themeColors,
      });
    },
    [getColors]
  );

  const showError = useCallback(
    (message: string, duration = 3000) => {
      showToast('Erreur', message, 'danger', duration);
    },
    [showToast]
  );

  const showSuccess = useCallback(
    (message: string, duration = 3000) => {
      showToast('Succès', message, 'success', duration);
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration = 3000) => {
      showToast('Attention', message, 'warning', duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration = 3000) => {
      showToast('Information', message, 'info', duration);
    },
    [showToast]
  );

  return {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };
};
