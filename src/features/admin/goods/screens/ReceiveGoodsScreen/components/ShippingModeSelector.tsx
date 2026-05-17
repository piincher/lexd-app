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
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors } = useAppTheme();

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
                isSelected && [styles.optionSelected, { backgroundColor: colors.primary.main, borderColor: colors.primary.main }],
                error && !isSelected && [styles.optionError, { borderColor: colors.status.error }],
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
                    ? colors.text.inverse
                    : colors.primary.main
                }
              />
              <Text
                style={[
                  styles.optionLabel,
                  !isSelected && { color: colors.text.secondary },
                  isSelected && [styles.optionLabelSelected, { color: colors.text.inverse }],
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.status.error }]}>{error}</Text>
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
    gap: 12,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionSelected: {
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  optionError: {
    borderWidth: 2,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  optionLabelSelected: {
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    fontSize: 13,
  },
});

export default ShippingModeSelector;
