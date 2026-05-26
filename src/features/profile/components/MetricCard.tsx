import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './FinancialSummaryCards.styles';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface MetricCardProps {
  icon: MaterialIconName;
  value: string;
  label: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIconBox}>
        <MaterialCommunityIcons name={icon} size={18} color={colors.primary.main} />
      </View>
      <Text style={[styles.metricValue, { color: colors.text.primary }]}>{value}</Text>
      <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>{label}</Text>
    </View>
  );
};
