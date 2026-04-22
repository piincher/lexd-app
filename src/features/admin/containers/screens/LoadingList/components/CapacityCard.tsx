import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CapacityUsageBar } from '../../../components/CapacityUsageBar';
import { Theme } from '@src/constants/Theme';

interface CapacityCardProps {
  totalCBM: number;
  maxCBM: number;
}

export const CapacityCard: React.FC<CapacityCardProps> = ({ totalCBM, maxCBM }) => {
  return (
    <View style={styles.capacityCard}>
      <CapacityUsageBar
        used={totalCBM}
        max={maxCBM}
        unit="m³"
        showPercentage
        showLabels
        height={24}
        variant="cbm"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  capacityCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
});
