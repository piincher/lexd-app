import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { StyleSheet } from 'react-native';

interface CostTotalRowProps {
  totalCost: number;
  formatCurrency: (amount: number) => string;
}

const createStyles = () => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
  },
  currency: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export const CostTotalRow: React.FC<CostTotalRowProps> = ({ totalCost, formatCurrency }) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(), []);
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.text.primary }]}>Coût total</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.status.success }]}>{formatCurrency(totalCost)}</Text>
        <Text style={[styles.currency, { color: colors.status.success }]}>FCFA</Text>
      </View>
    </View>
  );
};
