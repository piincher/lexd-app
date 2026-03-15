/**
 * Checkbox Component
 * Touchable checkbox with optional label
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme } from '@src/constants/Theme';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: CheckboxSize;
  disabled?: boolean;
  label?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

const sizeMap = {
  small: 18,
  medium: 24,
  large: 32,
};

const checkmarkSizeMap = {
  small: 12,
  medium: 16,
  large: 20,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  size = 'medium',
  disabled = false,
  label,
  style,
  labelStyle,
  testID,
  accessibilityLabel,
}) => {
  const boxSize = sizeMap[size];
  const checkmarkSize = checkmarkSizeMap[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, disabled && styles.disabled, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.box,
          {
            width: boxSize,
            height: boxSize,
            borderRadius: boxSize * 0.25,
          },
          checked && styles.checkedBox,
          disabled && styles.disabledBox,
        ]}
      >
        {checked && (
          <Text
            style={[
              styles.checkmark,
              {
                fontSize: checkmarkSize,
                lineHeight: checkmarkSize * 1.2,
              },
            ]}
          >
            ✓
          </Text>
        )}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
            },
            disabled && styles.disabledLabel,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  box: {
    borderWidth: 2,
    borderColor: Theme.neutral[400],
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: Theme.primary.main,
    borderColor: Theme.primary.main,
  },
  disabledBox: {
    borderColor: Theme.neutral[300],
  },
  checkmark: {
    color: Theme.neutral.white,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: Theme.spacing.sm,
    color: Theme.neutral[800],
  },
  disabledLabel: {
    color: Theme.neutral[400],
  },
});

export default Checkbox;
