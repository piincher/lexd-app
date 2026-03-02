/**
 * Badge - Reusable status badge component
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info'
  | 'neutral';

export type BadgeSize = 'small' | 'medium';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: '#E8E4F3', text: '#6B5B95' },
  primary: { bg: '#E8E4F3', text: '#6B5B95' },
  success: { bg: '#D4EDDA', text: '#155724' },
  warning: { bg: '#FFF3CD', text: '#856404' },
  danger: { bg: '#F8D7DA', text: '#721C24' },
  info: { bg: '#D1ECF1', text: '#0C5460' },
  neutral: { bg: '#E9ECEF', text: '#495057' },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'small',
  style,
}) => {
  const colors = variantStyles[variant];

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
      <Text style={[styles.text, { color: colors.text }, size === 'medium' && styles.mediumText]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Badge;
