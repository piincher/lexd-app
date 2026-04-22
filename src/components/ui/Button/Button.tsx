/**
 * Button - Comprehensive reusable button component
 * Supports multiple variants, sizes, states, and accessibility
 */

import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { hapticLight } from '@src/shared/lib/haptics';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { colors } = useAppTheme();
  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (variant === 'primary' || variant === 'danger') {
      hapticLight();
    }
    onPress();
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        base: {
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        primary: { backgroundColor: colors.primary.main },
        secondary: { backgroundColor: colors.background.paper },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary.main,
        },
        ghost: { backgroundColor: 'transparent' },
        danger: { backgroundColor: colors.status.error },
        small: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
        medium: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 48 },
        large: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 56 },
        fullWidth: { width: '100%' },
        disabled: { opacity: 0.5 },
        textBase: { fontWeight: '600' },
        primaryText: { color: colors.text.inverse },
        secondaryText: { color: colors.text.primary },
        outlineText: { color: colors.primary.main },
        ghostText: { color: colors.primary.main },
        dangerText: { color: colors.text.inverse },
        smallText: { fontSize: 14 },
        mediumText: { fontSize: 16 },
        largeText: { fontSize: 18 },
        disabledText: { color: colors.text.disabled },
        iconLeft: { marginRight: 8 },
        iconRight: { marginLeft: 8 },
      }),
    [colors]
  );

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.textBase,
    styles[`${variant}Text` as const],
    styles[`${size}Text` as const],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  const iconColor =
    variant === 'primary' || variant === 'danger'
      ? colors.text.inverse
      : variant === 'outline' || variant === 'ghost'
      ? colors.primary.main
      : colors.text.primary;

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      style={buttonStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'danger'
              ? colors.text.inverse
              : colors.primary.main
          }
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={isDisabled ? colors.text.disabled : iconColor}
              style={styles.iconLeft}
            />
          )}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={isDisabled ? colors.text.disabled : iconColor}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
