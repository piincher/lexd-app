import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillStatus } from '../../types';

interface Props {
  currentStatus: AirwayBillStatus;
  statusLabels: Record<AirwayBillStatus, string>;
  statusColors: Record<AirwayBillStatus, string>;
}

const ALL_STATUSES: AirwayBillStatus[] = [
  'CREATED',
  'PACKING',
  'READY_FOR_DEPARTURE',
  'IN_TRANSIT',
  'ARRIVED',
  'READY_FOR_PICKUP',
  'DELIVERED',
];

export const AirwayBillTimeline: React.FC<Props> = ({ currentStatus, statusLabels, statusColors }) => {
  const { colors } = useAppTheme();
  const currentIndex = ALL_STATUSES.indexOf(currentStatus);
  const progress = useMemo(() => currentIndex / (ALL_STATUSES.length - 1), [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: colors.neutral[200] }]} />
      <View style={[styles.trackFill, { width: `${progress * 100}%`, backgroundColor: statusColors[currentStatus] }]} />
      <View style={styles.steps}>
        {ALL_STATUSES.map((status, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const color = isActive ? statusColors[status] : colors.neutral[200];
          return (
            <View key={status} style={styles.step}>
              <View style={[styles.dot, { backgroundColor: color }, isCurrent && [styles.dotCurrent, { borderColor: colors.background.default }]]} />
              <Text style={[styles.label, { color }]} numberOfLines={2}>
                {statusLabels[status]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    height: 56,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    top: 10,
    left: 24,
    right: 24,
    height: 2,
  },
  trackFill: {
    position: 'absolute',
    top: 10,
    left: 24,
    height: 2,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    width: 44,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 6,
  },
  dotCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
});
