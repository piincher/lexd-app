import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Card } from '@src/shared/ui/Card';

interface Props {
  totalPackages: number;
  totalWeight: number;
}

export const AirwayBillStatsRow: React.FC<Props> = ({ totalPackages, totalWeight }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Card style={styles.card} padding="medium">
        <View style={styles.content}>
          <Text style={[styles.value, { color: colors.primary.main }]}>{totalPackages}</Text>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Colis</Text>
        </View>
      </Card>
      <Card style={styles.card} padding="medium">
        <View style={styles.content}>
          <Text style={[styles.value, { color: colors.primary.main }]}>{totalWeight.toFixed(1)}</Text>
          <Text style={[styles.label, { color: colors.text.secondary }]}>Kg</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
