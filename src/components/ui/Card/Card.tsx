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

const paddingMap = {
  none: 0,
  small: 12,
  medium: 16,
  large: 24,
};

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
  const paddingValue = paddingMap[padding];

  // Map our variants to react-native-paper modes
  const mode = variant === 'outlined' ? 'outlined' : 'elevated';
  const isFlat = variant === 'flat' || variant === 'default';

  const backgroundColor = isFlat 
    ? COLORS.Silver 
    : COLORS.white;

  const borderColor = variant === 'outlined' ? COLORS.inputBorder : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[{ 
        margin: 0, 
        padding: paddingValue,
        backgroundColor,
        borderRadius: 12,
        borderColor,
        borderWidth: variant === 'outlined' ? 1 : 0,
        shadowColor: variant === 'elevated' ? COLORS.black : 'transparent',
        shadowOffset: variant === 'elevated' ? { width: 0, height: 2 } : { width: 0, height: 0 },
        shadowOpacity: variant === 'elevated' ? 0.1 : 0,
        shadowRadius: variant === 'elevated' ? 4 : 0,
        elevation: variant === 'elevated' ? 3 : 0,
      }, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={onPress ? 0.9 : 1}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Card;
