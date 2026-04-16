/**
 * Input - Comprehensive reusable text input component
 * Supports multiple variants, validation states, and accessibility
 */

import React, { forwardRef } from 'react';
import { 
  View, 
  TextInput as RNTextInput,
  Text, 
  StyleSheet, 
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';

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
  const hasError = !!error;

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
  const iconColor = hasError ? COLORS.danger : COLORS.DarkGrey;

  return (
    <View style={containerStyles}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={inputContainerStyles}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={iconSize} 
            color={iconColor}
            style={styles.leftIcon}
          />
        )}
        <RNTextInput
          ref={ref}
          style={inputStyles}
          placeholderTextColor={COLORS.placeHolder}
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
        <Text style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      ) : helper ? (
        <Text style={[styles.helperText, helperStyle]}>
          {helper}
        </Text>
      ) : null}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.DarkGrey,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  // Variants
  default: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
  },
  filled: {
    backgroundColor: COLORS.Silver,
    borderRadius: 8,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
  },
  underlined: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.inputBorder,
    backgroundColor: 'transparent',
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 40,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 56,
  },
  errorBorder: {
    borderColor: COLORS.danger || '#dc3545',
  },
  disabled: {
    backgroundColor: COLORS.Silver,
    opacity: 0.7,
  },
  // Input
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  smallInput: {
    fontSize: 14,
  },
  mediumInput: {
    fontSize: 16,
  },
  largeInput: {
    fontSize: 18,
  },
  inputWithLeftIcon: {
    marginLeft: 8,
  },
  inputWithRightIcon: {
    marginRight: 8,
  },
  leftIcon: {
    marginLeft: 4,
  },
  rightIcon: {
    marginRight: 4,
  },
  // Helper/Error
  helperText: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger || '#dc3545',
    marginTop: 4,
  },
});

export default Input;
