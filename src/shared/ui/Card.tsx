/**
 * Card - Simplified wrapper around react-native-paper Card
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

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

  return (
    <PaperCard
      mode={isFlat ? 'elevated' : mode}
      onPress={onPress}
      disabled={disabled}
      style={[{ margin: 0, padding: paddingValue }, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </PaperCard>
  );
};

export default Card;
