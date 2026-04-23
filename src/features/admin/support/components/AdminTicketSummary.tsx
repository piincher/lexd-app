import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AdminTicketStatistics } from '../types';

interface AdminTicketSummaryProps {
  statistics?: AdminTicketStatistics;
}

export const AdminTicketSummary: React.FC<AdminTicketSummaryProps> = ({ statistics }) => {
  const { colors } = useAppTheme();
  const items = [
    { label: 'Total', value: statistics?.total ?? 0 },
    { label: 'Ouverts', value: statistics?.open ?? 0 },
    { label: 'Résolus', value: statistics?.resolved ?? 0 },
  ];

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View key={item.label} style={[styles.card, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.value, { color: colors.text.primary }]}>{item.value}</Text>
          <Text style={[styles.label, { color: colors.text.secondary }]}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  card: {
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
});
