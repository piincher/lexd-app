import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { ShippingMode, SHIPPING_MODE_ICONS, SHIPPING_MODE_COLORS, SHIPPING_MODE_LABELS } from '../../../types';

const SHIPPING_MODES: ShippingMode[] = ['SEA', 'AIR'];

interface ShippingModeSelectorProps {
  selectedMode: ShippingMode | '';
  error?: string;
  onSelectMode: (mode: ShippingMode) => void;
}

export const ShippingModeSelector: React.FC<ShippingModeSelectorProps> = ({
  selectedMode,
  error,
  onSelectMode,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Mode de Transport <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.modeSelectionContainer}>
        {SHIPPING_MODES.map((mode) => {
          const isSelected = selectedMode === mode;
          const modeIcon = SHIPPING_MODE_ICONS[mode];
          const modeColor = SHIPPING_MODE_COLORS[mode];
          const modeLabel = SHIPPING_MODE_LABELS[mode];

          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                isSelected && {
                  borderColor: modeColor,
                  backgroundColor: `${modeColor}10`,
                },
                error && styles.modeButtonError,
              ]}
              onPress={() => onSelectMode(mode)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={modeIcon as any}
                size={24}
                color={isSelected ? modeColor : Theme.neutral[400]}
              />
              <Text
                style={[
                  styles.modeButtonText,
                  isSelected && { color: modeColor, fontWeight: '600' },
                ]}
              >
                {mode === 'SEA' ? 'Maritime' : 'Aérien'}
              </Text>
              {isSelected && (
                <View style={[styles.modeCheckBadge, { backgroundColor: modeColor }]}>
                  <Ionicons name="checkmark" size={12} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: Theme.status.error,
  },
  modeSelectionContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  modeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    borderWidth: 2,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
    gap: Theme.spacing.sm,
  },
  modeButtonError: {
    borderColor: Theme.status.error,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[600],
  },
  modeCheckBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    width: 20,
    height: 20,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
