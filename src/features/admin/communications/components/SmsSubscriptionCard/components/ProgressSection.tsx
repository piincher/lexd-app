import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface ProgressSectionProps {
  progressPercentage: number;
  progressColor: string;
  progressSubtext: string;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  progressPercentage,
  progressColor,
  progressSubtext,
}) => {
  return (
    <View style={styles.progressSection}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.max(2, progressPercentage)}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
      <View style={styles.progressLabels}>
        <Text style={[styles.progressText, { color: progressColor }]}>
          {progressPercentage}% restants
        </Text>
        <Text style={styles.progressSubtext}>{progressSubtext}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressSection: {
    marginBottom: 4,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.neutral[100],
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  progressSubtext: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
  },
});
