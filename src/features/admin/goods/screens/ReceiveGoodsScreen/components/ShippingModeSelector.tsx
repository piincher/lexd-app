/**
 * ShippingModeSelector - Component for selecting shipping mode (AIR/SEA)
 *
 * Displays two selectable options with icons:
 * - AIR (Aérien) with airplane icon
 * - SEA (Maritime) with boat/ship icon
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-paper';
// Theme constant not available, using inline colors
const themeColors = {
  neutral: {
    white: '#FFFFFF',
    200: '#E5E7EB',
    700: '#374151',
    900: '#111827',
  },
  primary: {
    main: '#22C55E',
  },
  status: {
    error: '#DC2626',
  },
};

export interface ShippingModeSelectorProps {
  value: 'AIR' | 'SEA';
  onChange: (mode: 'AIR' | 'SEA') => void;
  error?: string;
}

interface ModeOption {
  value: 'AIR' | 'SEA';
  label: string;
  icon: string;
}

const MODE_OPTIONS: ModeOption[] = [
  { value: 'AIR', label: 'Aérien', icon: 'airplane' },
  { value: 'SEA', label: 'Maritime', icon: 'ferry' },
];

export const ShippingModeSelector: React.FC<ShippingModeSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {MODE_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
                error && !isSelected && styles.optionError,
              ]}
              onPress={() => onChange(option.value)}
              activeOpacity={0.8}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={option.label}
            >
              <Icon
                source={option.icon}
                size={24}
                color={
                  isSelected
                    ? themeColors.neutral.white
                    : themeColors.primary.main
                }
              />
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12, // Theme.spacing.md
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // Theme.spacing.sm
    paddingVertical: 12, // Theme.spacing.md
    paddingHorizontal: 16, // Theme.spacing.lg
    backgroundColor: themeColors.neutral.white,
    borderWidth: 2,
    borderColor: themeColors.neutral[200],
    borderRadius: 12, // Theme.radius.lg
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionSelected: {
    backgroundColor: themeColors.primary.main,
    borderColor: themeColors.primary.main,
    elevation: 4,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  optionError: {
    borderColor: themeColors.status.error,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: themeColors.neutral[700],
  },
  optionLabelSelected: {
    color: themeColors.neutral.white,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8, // Theme.spacing.sm
    fontSize: 13,
    color: themeColors.status.error,
  },
});

export default ShippingModeSelector;
