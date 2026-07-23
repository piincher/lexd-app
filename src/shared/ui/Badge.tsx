/**
 * Badge - Reusable status badge component
 * Merged legacy and shared/ui versions for backward compatibility.
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS } from './designLanguage';

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
      case 'primary':
        // Brand-tinted, so a primary badge no longer reads as plain neutral.
        return { bg: themeColors.primary.main + '18', text: themeColors.primary.dark };
      case 'success':
        return { bg: themeColors.feedback.successBg, text: themeColors.feedback.successDark };
      case 'warning':
        return { bg: themeColors.feedback.warningBg, text: themeColors.feedback.warningDark };
      case 'danger':
      case 'error':
        return { bg: themeColors.feedback.errorBg, text: themeColors.feedback.errorDark };
      case 'info':
        return { bg: themeColors.feedback.infoBg, text: themeColors.feedback.infoDark };
      case 'default':
      case 'neutral':
      default:
        return { bg: themeColors.neutral[200], text: themeColors.text.secondary };
    }
  };

  const colors = getColors();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        // Squared corners + tracked uppercase: the waybill cue, replacing the
        // previous 20px pill.
        base: {
          borderRadius: RADIUS.badge,
          alignSelf: 'flex-start',
        },
        small: {
          paddingHorizontal: 7,
          paddingVertical: 3,
        },
        medium: {
          paddingHorizontal: 10,
          paddingVertical: 5,
        },
        text: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        },
        mediumText: {
          fontSize: 12,
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
