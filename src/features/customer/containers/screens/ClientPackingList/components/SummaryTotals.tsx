import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummaryTotalsProps {
  totalCBM?: number;
  totalWeight?: number;
  totalPackages?: number;
}

export const SummaryTotals: React.FC<SummaryTotalsProps> = ({
  totalCBM,
  totalWeight,
  totalPackages,
}) => {
  const { colors } = useAppTheme();

  const metrics = [
    {
      icon: 'cube-outline' as const,
      value: totalCBM?.toFixed(2) || '0.00',
      label: 'CBM',
    },
    {
      icon: 'weight-kilogram' as const,
      value: totalWeight?.toFixed(0) || '0',
      label: 'kg',
    },
    {
      icon: 'package-variant' as const,
      value: totalPackages?.toString() || '0',
      label: 'Colis',
    },
  ];

  return (
    <View style={styles.totalsContainer}>
      {metrics.map((m, i) => (
        <View key={m.label} style={styles.totalItem}>
          <MaterialCommunityIcons name={m.icon} size={18} color={colors.text.muted} />
          <Text style={[styles.totalValue, { color: colors.text.primary }]}>
            {m.value}
          </Text>
          <Text style={[styles.totalLabel, { color: colors.text.muted }]}>
            {m.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 4,
  },
  totalItem: {
    alignItems: 'center',
    gap: 4,
  },
  totalValue: {
    fontFamily: Fonts.black,
    fontSize: 22,
    marginTop: 2,
  },
  totalLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
