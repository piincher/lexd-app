import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './FinancialSummaryCards.styles';

interface MetricCardProps {
  icon: string;
  value: string;
  label: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <Text style={[styles.metricValue, { color: colors.text.primary }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );
};
