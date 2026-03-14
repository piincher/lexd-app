/**
 * TimelineProgress - Visual progress bar/stepper
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

interface TimelineProgressProps {
  progress: number;
  completedCount: number;
  totalCount: number;
}

export const TimelineProgress: React.FC<TimelineProgressProps> = ({
  progress,
  completedCount,
  totalCount,
}) => (
  <View style={styles.container}>
    <View style={styles.background}>
      <View style={[styles.fill, { width: `${progress}%` }]} />
    </View>
    <Text style={styles.text}>{Math.round(progress)}% complété</Text>
    <Text style={styles.steps}>
      {completedCount} / {totalCount} étapes
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
  },
  background: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: Theme.radius.full,
  },
  text: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: Theme.spacing.sm,
    fontWeight: '600',
  },
  steps: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
});
