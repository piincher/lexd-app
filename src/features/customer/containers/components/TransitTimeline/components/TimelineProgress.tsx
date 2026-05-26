/**
 * TimelineProgress - Visual progress bar/stepper
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TimelineProgressProps {
  progress: number;
  completedCount: number;
  totalCount: number;
}

export const TimelineProgress: React.FC<TimelineProgressProps> = ({
  progress,
  completedCount,
  totalCount,
}) => {
  const { colors } = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      marginTop: 24,
    },
    background: {
      height: 8,
      backgroundColor: `${colors.text.inverse}30`,
      borderRadius: 999,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: 999,
    },
    text: {
      fontSize: 12,
      color: colors.text.inverse,
      marginTop: 8,
      fontWeight: '600',
    },
    steps: {
      fontSize: 11,
      color: colors.text.inverse,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.fill, { width: `${progress}%`, backgroundColor: colors.background.card }]} />
      </View>
      <Text style={styles.text}>{Math.round(progress)}% complété</Text>
      <Text style={styles.steps}>
        {completedCount} / {totalCount} étapes
      </Text>
    </View>
  );
};
