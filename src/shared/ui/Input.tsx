/**
 * Input - Simplified wrapper around react-native-paper TextInput
 */

import React, { forwardRef } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import type { TextInputProps as PaperTextInputProps } from 'react-native-paper';

export type InputVariant = 'default' | 'filled' | 'outlined' | 'underlined';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<PaperTextInputProps, 'style' | 'mode'> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: InputVariant;
  size?: InputSize;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperStyle?: TextStyle;
  errorStyle?: TextStyle;
  fullWidth?: boolean;
}

const sizeMap = {
  small: { height: 40, fontSize: 14 },
  medium: { height: 48, fontSize: 16 },
  large: { height: 56, fontSize: 18 },
};

export const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(({
  label,
  error,
  helper,
  variant = 'outlined',
  size = 'medium',
  containerStyle,
  inputStyle,
  style,
  fullWidth = false,
  ...textInputProps
}, ref) => {
  const hasError = !!error;

  // Map variant to react-native-paper mode
  const mode = variant === 'filled' ? 'flat' : 'outlined';

  const sizeConfig = sizeMap[size];

  return (
    <TextInput
      ref={ref}
      label={label}
      mode={mode}
      error={hasError}
      style={[
        {
          height: sizeConfig.height,
          fontSize: sizeConfig.fontSize,
          width: fullWidth ? '100%' : undefined,
        },
        inputStyle,
        style,
      ]}
      {...textInputProps}
    />
  );
});

Input.displayName = 'Input';

export default Input;
