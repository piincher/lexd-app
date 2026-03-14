import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';

interface ProgressSummaryProps {
  currentWaypointIndex: number;
  totalWaypoints: number;
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  currentWaypointIndex,
  totalWaypoints,
}) => {
  const completionPercentage = totalWaypoints > 0
    ? Math.round(((currentWaypointIndex + 1) / totalWaypoints) * 100)
    : 0;

  return (
    <Animated.View entering={FadeInUp.delay(200)} style={styles.progressSummary}>
      <View style={styles.progressItem}>
        <Text style={styles.progressNumber}>{currentWaypointIndex + 1}</Text>
        <Text style={styles.progressLabel}>Étape Actuelle</Text>
      </View>
      <View style={styles.progressDivider} />
      <View style={styles.progressItem}>
        <Text style={styles.progressNumber}>{totalWaypoints}</Text>
        <Text style={styles.progressLabel}>Total Étapes</Text>
      </View>
      <View style={styles.progressDivider} />
      <View style={styles.progressItem}>
        <Text style={styles.progressNumber}>{completionPercentage}%</Text>
        <Text style={styles.progressLabel}>Complété</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  progressSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    marginHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    ...Theme.shadows.sm,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  progressLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.neutral[200],
  },
});
