/**
 * Button - Simplified wrapper around react-native-paper Button
 */

import React from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { ButtonProps as PaperButtonProps } from 'react-native-paper';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<PaperButtonProps, 'style' | 'mode' | 'children'> {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const sizeMap = {
  small: { paddingVertical: 4, fontSize: 14 },
  medium: { paddingVertical: 8, fontSize: 16 },
  large: { paddingVertical: 12, fontSize: 18 },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...paperButtonProps
}) => {
  const isDisabled = disabled || loading;
  
  // Map variants to react-native-paper modes
  const mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' = 
    variant === 'outline' ? 'outlined' :
    variant === 'ghost' ? 'text' :
    variant === 'secondary' ? 'contained-tonal' :
    'contained';

  // Map button colors for danger variant
  const buttonColor = variant === 'danger' ? '#dc3545' : undefined;
  const textColor = variant === 'ghost' || variant === 'outline' ? undefined : undefined;

  const sizeConfig = sizeMap[size];

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={isDisabled}
      loading={loading}
      buttonColor={buttonColor}
      textColor={textColor}
      style={[
        {
          paddingVertical: sizeConfig.paddingVertical,
          width: fullWidth ? '100%' : undefined,
          borderRadius: 12,
        },
        style,
      ]}
      labelStyle={[
        {
          fontSize: sizeConfig.fontSize,
          fontWeight: '600',
        },
        textStyle,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      {...paperButtonProps}
    >
      {title}
    </PaperButton>
  );
};

export default Button;
