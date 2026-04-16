/**
 * Badge - Reusable status badge component
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@src/constants/Colors';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info'
  | 'neutral';

export type BadgeSize = 'small' | 'medium';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'small',
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'default':
      case 'primary':
        return { bg: COLORS.Silver, text: COLORS.DarkGrey };
      case 'success':
        return { bg: COLORS.lightBackground, text: COLORS.heading };
      case 'warning':
        return { bg: COLORS.lightyellow + '20', text: COLORS.orange };
      case 'danger':
        return { bg: COLORS.danger + '15', text: COLORS.danger };
      case 'info':
        return { bg: COLORS.blueTransparent, text: COLORS.navy };
      case 'neutral':
        return { bg: COLORS.Silver, text: COLORS.DarkGrey };
      default:
        return { bg: COLORS.Silver, text: COLORS.DarkGrey };
    }
  };

  const colors = getColors();

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
