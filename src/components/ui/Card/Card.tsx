/**
 * Card - Reusable card component with multiple variants
 */

import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '@src/constants/Colors';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  onPress,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}) => {
  const paddingStyles = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  };

  const cardStyles = [
    styles.base,
    styles[variant],
    paddingStyles[padding],
    disabled && styles.disabled,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={cardStyles}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View 
      style={cardStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  // Variants
  default: {
    backgroundColor: '#fff',
  },
  outlined: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  elevated: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flat: {
    backgroundColor: '#f5f5f5',
  },
  // Padding
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: 12,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Card;
