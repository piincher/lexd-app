import React from 'react';
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import type { createPriorityPanelStyles } from './styles';

type TileSeverity = 'neutral' | 'warning' | 'critical';

interface PriorityTileProps {
  value: string;
  label: string;
  severity: TileSeverity;
  onPress: () => void;
  styles: ReturnType<typeof createPriorityPanelStyles>;
}

export const PriorityTile: React.FC<PriorityTileProps> = ({ value, label, severity, onPress, styles }) => {
  const severityStyle = severity === 'critical' ? styles.tileCritical
    : severity === 'warning' ? styles.tileWarning : null;
  const valueStyle = severity === 'critical' ? styles.tileValueCritical
    : severity === 'warning' ? styles.tileValueWarning : styles.tileValue;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, severityStyle, pressed && styles.pressed]}
      android_ripple={{ color: '#00000012' }}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text style={valueStyle} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </Pressable>
  );
};
