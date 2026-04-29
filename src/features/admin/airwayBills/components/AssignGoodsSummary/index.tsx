import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { CapacityIndicator } from '../../screens/components/CapacityIndicator';

interface Props {
  currentWeight: number;
  selectedWeight: number;
  capacityWeight: number;
  selectedCount: number;
  isOverCapacity: boolean;
}

export const AssignGoodsSummary: React.FC<Props> = ({
  currentWeight,
  selectedWeight,
  capacityWeight,
  selectedCount,
  isOverCapacity,
}) => (
  <View style={styles.container}>
    <CapacityIndicator
      currentWeight={currentWeight}
      selectedWeight={selectedWeight}
      capacityWeight={capacityWeight}
    />
    <Text style={styles.summaryText}>
      {selectedCount} sélectionné(s) · {selectedWeight.toFixed(1)} kg
    </Text>
    {isOverCapacity && (
      <Text style={styles.warningText}>
        Capacité dépassée. Retirez des marchandises pour continuer.
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.primary[50],
  },
  summaryText: { fontSize: 13, fontWeight: '600', color: Theme.primary[700] },
  warningText: { fontSize: 12, fontWeight: '600', color: Theme.status.error, marginTop: 4 },
});
