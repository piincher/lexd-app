/**
 * Badge - Reusable status badge component
 * Merged legacy and shared/ui versions for backward compatibility.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'neutral'
  | 'custom';

export type BadgeSize = 'small' | 'medium';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'small',
  backgroundColor,
  textColor,
  style,
  textStyle,
}) => {
  const { colors: themeColors } = useAppTheme();

  const getColors = () => {
    if (variant === 'custom') {
      return {
        bg: backgroundColor || themeColors.neutral[200],
        text: textColor || themeColors.text.secondary,
      };
    }

    switch (variant) {
      case 'default':
      case 'primary':
        return { bg: themeColors.neutral[200], text: themeColors.text.secondary };
      case 'success':
        return { bg: themeColors.background.paper, text: themeColors.text.primary };
      case 'warning':
        return { bg: themeColors.accent.goldLight + '20', text: themeColors.accent.goldDark };
      case 'danger':
      case 'error':
        return { bg: themeColors.status.error + '15', text: themeColors.status.error };
      case 'info':
        return { bg: themeColors.primary.main + '15', text: themeColors.primary.dark };
      case 'neutral':
        return { bg: themeColors.neutral[200], text: themeColors.text.secondary };
      default:
        return { bg: themeColors.neutral[200], text: themeColors.text.secondary };
    }
  };

  const colors = getColors();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        base: {
          borderRadius: 20,
          alignSelf: 'flex-start',
        },
        small: {
          paddingHorizontal: 10,
          paddingVertical: 4,
        },
        medium: {
          paddingHorizontal: 14,
          paddingVertical: 6,
        },
        text: {
          fontSize: 12,
          fontWeight: '600',
        },
        mediumText: {
          fontSize: 14,
        },
      }),
    [themeColors],
  );

  return (
    <View
      style={[
        styles.base,
        size === 'small' && styles.small,
        size === 'medium' && styles.medium,
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }, size === 'medium' && styles.mediumText, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

export default Badge;
