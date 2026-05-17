import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
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
  const theme = useTheme();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.totalsContainer, { backgroundColor: colors.background.paper }]}>
      <View style={styles.totalItem}>
        <MaterialCommunityIcons name="cube-outline" size={20} color={theme.colors.primary} />
        <Text style={[styles.totalValue, { color: colors.text.secondary }]}>
          {totalCBM?.toFixed(2) || '0.00'}
        </Text>
        <Text style={[styles.totalLabel, { color: colors.status.success }]}>CBM</Text>
      </View>
      <View style={styles.totalItem}>
        <MaterialCommunityIcons name="weight-kilogram" size={20} color={theme.colors.primary} />
        <Text style={[styles.totalValue, { color: colors.text.secondary }]}>
          {totalWeight?.toFixed(0) || '0'}
        </Text>
        <Text style={[styles.totalLabel, { color: colors.status.success }]}>kg</Text>
      </View>
      <View style={styles.totalItem}>
        <MaterialCommunityIcons name="package-variant" size={20} color={theme.colors.primary} />
        <Text style={[styles.totalValue, { color: colors.text.secondary }]}>
          {totalPackages || '0'}
        </Text>
        <Text style={[styles.totalLabel, { color: colors.status.success }]}>Colis</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  totalItem: {
    alignItems: 'center',
  },
  totalValue: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginTop: 4,
  },
  totalLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
});
