import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

interface CapacityLegendProps {
  currentCBM: number;
  selectedCBM: number;
  unit: string;
}

export const CapacityLegend: React.FC<CapacityLegendProps> = ({
  currentCBM,
  selectedCBM,
  unit,
}) => (
  <View style={styles.capacityLegend}>
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: Theme.neutral[400] }]} />
      <Text style={styles.legendText}>
        Actuel: {(currentCBM || 0).toFixed(2)} {unit}
      </Text>
    </View>
    {selectedCBM > 0 && (
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: Theme.primary[500] }]} />
        <Text style={styles.legendText}>
          Sélection: {(selectedCBM || 0).toFixed(2)} {unit}
        </Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  capacityLegend: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: Theme.neutral[600],
  },
});
