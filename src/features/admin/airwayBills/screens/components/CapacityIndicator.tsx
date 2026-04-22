import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CapacityIndicatorProps {
  currentWeight: number;
  selectedWeight: number;
  capacityWeight: number;
}

export const CapacityIndicator: React.FC<CapacityIndicatorProps> = ({
  currentWeight,
  selectedWeight,
  capacityWeight,
}) => {
  const { colors } = useAppTheme();

  if (!capacityWeight || capacityWeight <= 0) return null;

  const total = currentWeight + selectedWeight;
  const percentage = (total / capacityWeight) * 100;
  const clampedPercentage = Math.min(percentage, 100);
  const remaining = capacityWeight - total;

  let barColor = colors.status.success;
  if (percentage > 100) barColor = colors.status.error;
  else if (percentage >= 80) barColor = colors.status.warning;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: colors.text.secondary }]}>
          Capacité: {total.toFixed(1)} / {capacityWeight} kg
        </Text>
        <Text
          style={[
            styles.remaining,
            { color: remaining < 0 ? colors.status.error : colors.text.secondary },
          ]}
        >
          {remaining >= 0
            ? `${remaining.toFixed(1)} kg restants`
            : `Dépassement: ${Math.abs(remaining).toFixed(1)} kg`}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.neutral[200] }]}>
        <View
          style={[
            styles.bar,
            { width: `${clampedPercentage}%`, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontSize: 12, fontWeight: '600' },
  remaining: { fontSize: 12, fontWeight: '600' },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 3 },
});

export default CapacityIndicator;
