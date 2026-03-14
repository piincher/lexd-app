/**
 * Badge Component
 * A customizable badge component for displaying status labels
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

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

const VARIANT_STYLES: Record<
  Exclude<BadgeVariant, 'custom'>,
  { backgroundColor: string; textColor: string }
> = {
  default: { backgroundColor: '#E5E7EB', textColor: '#374151' },
  primary: { backgroundColor: '#DBEAFE', textColor: '#2563EB' },
  success: { backgroundColor: '#D1FAE5', textColor: '#059669' },
  warning: { backgroundColor: '#FEF3C7', textColor: '#D97706' },
  error: { backgroundColor: '#FEE2E2', textColor: '#DC2626' },
  info: { backgroundColor: '#E0F2FE', textColor: '#0284C7' },
};

/**
 * Badge Component
 * 
 * @example
 * <Badge label="Pending" variant="warning" />
 * <Badge label="Custom" variant="custom" backgroundColor="#F0F0F0" textColor="#333" />
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  backgroundColor,
  textColor,
  style,
  textStyle,
}) => {
  const colors =
    variant === 'custom'
      ? {
          backgroundColor: backgroundColor || VARIANT_STYLES.default.backgroundColor,
          textColor: textColor || VARIANT_STYLES.default.textColor,
        }
      : VARIANT_STYLES[variant];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.textColor }, textStyle]}>
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
