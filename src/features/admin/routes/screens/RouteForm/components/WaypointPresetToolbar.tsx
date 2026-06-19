import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import type { ShippingLine } from '@src/features/admin/routes/types';
import { ROUTE_PRESETS } from './routeWaypointOptions';

interface WaypointPresetToolbarProps {
  shippingLine: ShippingLine | '';
  onGenerate: () => void;
  onApplyPreset: (labels: readonly string[]) => void;
}

export const WaypointPresetToolbar: React.FC<WaypointPresetToolbarProps> = ({
  shippingLine,
  onGenerate,
  onApplyPreset,
}) => (
  <>
    <Button
      mode="contained"
      icon="auto-fix"
      onPress={onGenerate}
      disabled={!shippingLine}
      style={styles.generateButton}
    >
      Générer les escales depuis la compagnie
    </Button>

    <View style={styles.presets}>
      {ROUTE_PRESETS.map((preset) => (
        <Button
          key={preset.label}
          mode="outlined"
          compact
          onPress={() => onApplyPreset(preset.waypoints)}
          style={styles.presetButton}
          labelStyle={styles.presetLabel}
        >
          {preset.label}
        </Button>
      ))}
    </View>
  </>
);

const styles = StyleSheet.create({
  generateButton: {
    borderRadius: Theme.radius.md,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  presetButton: {
    borderRadius: Theme.radius.md,
  },
  presetLabel: {
    marginHorizontal: Theme.spacing.sm,
    fontSize: 12,
  },
});
