/**
 * Badge Component
 * A customizable badge component for displaying status labels
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'custom';

export interface BadgeProps {
  /** The text label to display */
  label: string;
  /** The visual variant of the badge */
  variant?: BadgeVariant;
  /** Custom background color (only used when variant is 'custom') */
  backgroundColor?: string;
  /** Custom text color (only used when variant is 'custom') */
  textColor?: string;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  backgroundColor,
  textColor,
  style,
  textStyle,
}) => {
  const { colors } = useAppTheme();

  const getVariantStyles = (): { backgroundColor: string; textColor: string } => {
    if (variant === 'custom') {
      return {
        backgroundColor: backgroundColor || colors.neutral[200],
        textColor: textColor || colors.neutral[700],
      };
    }

    const variants: Record<Exclude<BadgeVariant, 'custom'>, { backgroundColor: string; textColor: string }> = {
      default: { backgroundColor: colors.neutral[200], textColor: colors.neutral[700] },
      primary: { backgroundColor: colors.primary[100], textColor: colors.primary[700] },
      success: { backgroundColor: colors.feedback.successBg, textColor: colors.status.success },
      warning: { backgroundColor: colors.feedback.warningBg, textColor: colors.status.warning },
      error: { backgroundColor: colors.feedback.errorBg, textColor: colors.status.error },
      info: { backgroundColor: colors.feedback.infoBg, textColor: colors.status.info },
    };

    return variants[variant];
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: variantStyles.backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color: variantStyles.textColor }, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default Badge;
