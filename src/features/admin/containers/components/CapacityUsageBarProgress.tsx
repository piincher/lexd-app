import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './CapacityUsageBar.styles';

interface CapacityUsageBarProgressProps {
  percentage: number;
  fillColors: [string, string];
  height: number;
  showPercentage: boolean;
}

export const CapacityUsageBarProgress: React.FC<CapacityUsageBarProgressProps> = ({
  percentage,
  fillColors,
  height,
  showPercentage,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={[styles.barContainer, { height }]}>
      <View style={styles.backgroundBar}>
        <LinearGradient
          colors={[colors.neutral[100], colors.neutral[200]]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      <View style={[styles.fillBar, { width: `${percentage}%` }]}>
        <LinearGradient
          colors={fillColors}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {showPercentage && (
        <View style={styles.percentageOverlay}>
          <Text style={[styles.percentageText, { textShadowColor: colors.background.card }]}>
            {percentage.toFixed(1)}%
          </Text>
        </View>
      )}
    </View>
  );
};
