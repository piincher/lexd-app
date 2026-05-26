import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from './CapacityUsageBar.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CapacityUsageBarFooterProps {
  remaining: number;
  unit: string;
  percentage: number;
  fillColor: string;
}

export const CapacityUsageBarFooter: React.FC<CapacityUsageBarFooterProps> = ({
  remaining,
  unit,
  percentage,
  fillColor,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
  <View style={styles.footer}>
    <Text style={styles.remainingText}>
      {remaining.toFixed(2)} {unit} disponible
    </Text>
    <View style={[styles.statusBadge, { backgroundColor: `${fillColor}20` }]}>
      <View style={[styles.statusDot, { backgroundColor: fillColor }]} />
      <Text style={[styles.statusText, { color: fillColor }]}>
        {percentage >= 90 ? 'Critique' : percentage >= 70 ? 'Attention' : 'Optimal'}
      </Text>
    </View>
  </View>
  );
};
