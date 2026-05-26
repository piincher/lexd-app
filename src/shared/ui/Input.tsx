/**
 * Input - Comprehensive reusable text input component
 * Supports multiple variants, validation states, and accessibility
 */

import React, { forwardRef } from 'react';
import { View, TextInput as RNTextInput, Text } from 'react-native';
import type { ViewStyle, TextStyle, TextInputProps as RNTextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './Input.styles';

export type InputVariant = 'default' | 'filled' | 'outlined' | 'underlined';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperStyle?: TextStyle;
  errorStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Input = forwardRef<RNTextInput, InputProps>(({
  label,
  error,
  helper,
  variant = 'outlined',
  size = 'medium',
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  errorStyle,
  fullWidth = false,
  editable = true,
  ...textInputProps
}, ref) => {
  const { colors } = useAppTheme();
  const hasError = !!error;
  const styles = createStyles(colors);

  const containerStyles = [
    styles.container,
    fullWidth && styles.fullWidth,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[variant],
    styles[size],
    hasError && styles.errorBorder,
    !editable && styles.disabled,
  ];

  const inputStyles = [
    styles.input,
    styles[`${size}Input`],
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    inputStyle,
  ];

  const iconSize = size === 'small' ? 18 : size === 'large' ? 24 : 20;
  const iconColor = hasError ? colors.status.error : colors.text.secondary;

  return (
    <View style={containerStyles}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={inputContainerStyles}>
        {leftIcon && (
          <Ionicons name={leftIcon} size={iconSize} color={iconColor} style={styles.leftIcon} />
        )}
        <RNTextInput
          ref={ref}
          style={inputStyles}
          placeholderTextColor={colors.text.disabled}
          editable={editable}
          {...textInputProps}
        />
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={iconSize}
            color={iconColor}
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        )}
      </View>
      {hasError ? (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      ) : helper ? (
        <Text style={[styles.helperText, helperStyle]}>{helper}</Text>
      ) : null}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;
