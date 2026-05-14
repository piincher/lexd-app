import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface PaymentMetricsHeaderProps {
  collectionRate: number;
}

export const PaymentMetricsHeader: React.FC<PaymentMetricsHeaderProps> = ({ collectionRate }) => {
  const { colors } = useAppTheme();
  return (
  <View style={styles.header}>
    <Text style={styles.title}>Métriques de Paiement</Text>
    <View style={[styles.collectionBadge, { backgroundColor: colors.status.success + '18' }]}>
      <MaterialCommunityIcons name="cash-check" size={14} color={colors.status.success} />
      <Text style={[styles.collectionText, { color: colors.status.success }]}>
        {collectionRate.toFixed(1)}% collecté
      </Text>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  collectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  collectionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
