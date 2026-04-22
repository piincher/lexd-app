import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { CapacityUsageBar } from '../../../components/CapacityUsageBar';
import { Theme } from '@src/constants/Theme';
import { ContainerSummary } from '../../../types/packingList';
const MAX_CBM = 67;

interface CapacityCardProps {
  summary: ContainerSummary;
}

export const CapacityCard: React.FC<CapacityCardProps> = ({ summary }) => {
  return (
    <Animated.View entering={FadeInUp.delay(100)}>
      <View style={styles.capacityCard}>
        <View style={styles.capacityHeader}>
          <Ionicons name="speedometer" size={20} color={Theme.primary[600]} />
          <Text style={styles.capacityTitle}>Utilisation du Container</Text>
        </View>
        <CapacityUsageBar
          used={summary.totalCBM}
          max={MAX_CBM}
          unit="m³"
          showPercentage
          showLabels
          height={28}
          variant="cbm"
        />
        <View style={styles.capacityStats}>
          <View style={styles.capacityStat}>
            <Text style={styles.capacityStatValue}>{summary.totalItems}</Text>
            <Text style={styles.capacityStatLabel}>Colis</Text>
          </View>
          <View style={styles.capacityStatDivider} />
          <View style={styles.capacityStat}>
            <Text style={styles.capacityStatValue}>{summary.totalPackages}</Text>
            <Text style={styles.capacityStatLabel}>Articles</Text>
          </View>
          <View style={styles.capacityStatDivider} />
          <View style={styles.capacityStat}>
            <Text style={styles.capacityStatValue}>{summary.totalWeight.toFixed(0)}</Text>
            <Text style={styles.capacityStatLabel}>Kg</Text>
          </View>
        </View>
      </View>
    </Animated.View>
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
  capacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  capacityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  capacityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Theme.spacing.lg,
  },
  capacityStat: {
    alignItems: 'center',
  },
  capacityStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  capacityStatLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  capacityStatDivider: {
    width: 1,
    backgroundColor: Theme.neutral[200],
  },
});
