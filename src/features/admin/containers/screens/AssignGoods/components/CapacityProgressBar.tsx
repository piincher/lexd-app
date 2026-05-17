import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

interface CapacityProgressBarProps {
  currentCBM: number;
  selectedCBM: number;
  maxCBM: number;
}

export const CapacityProgressBar: React.FC<CapacityProgressBarProps> = ({
  currentCBM,
  selectedCBM,
  maxCBM,
}) => (
  <View style={styles.progressBarBackground}>
    <View
      style={[
        styles.progressBarCurrent,
        { width: `${Math.min((currentCBM / maxCBM) * 100, 100)}%` },
      ]}
    />
    {selectedCBM > 0 && (
      <LinearGradient
        colors={[Theme.primary[400], Theme.primary[600]]}
        style={[
          styles.progressBarSelected,
          {
            width: `${Math.min((selectedCBM / maxCBM) * 100, 100)}%`,
            left: `${Math.min((currentCBM / maxCBM) * 100, 100)}%`,
          },
        ]}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 12,
    backgroundColor: Theme.neutral[200],
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarCurrent: {
    height: '100%',
    backgroundColor: Theme.neutral[400],
    borderRadius: 6,
    position: 'absolute',
    left: 0,
  },
  progressBarSelected: {
    height: '100%',
    borderRadius: 6,
    position: 'absolute',
  },
});
