/**
 * GoodsFilters - Filter sections for goods entity
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { FilterChipGroup } from '../FilterChipGroup';
import { SearchFilters as SearchFiltersType } from '../../api/searchApi';

const getGoodsStatuses = (colors: any) => [
  { value: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', color: colors.status.info },
  { value: 'PACKED', label: 'Préparé', color: colors.primary.main },
  { value: 'ASSIGNED_TO_CONTAINER', label: 'Assigné', color: colors.accent.mint },
  { value: 'LOADED_IN_CONTAINER', label: 'Chargé', color: colors.accent.rose },
  { value: 'IN_TRANSIT', label: 'Transit', color: colors.status.warning },
  { value: 'ARRIVED_DESTINATION', label: 'Arrivé', color: colors.status.success },
  { value: 'READY_FOR_PICKUP', label: 'À récupérer', color: colors.primary.dark },
  { value: 'DELIVERED', label: 'Livré', color: colors.primary.light },
];

const getGoodsPaymentStatuses = (colors: any) => [
  { value: 'UNPAID', label: 'Non payé', color: colors.status.error },
  { value: 'PARTIAL', label: 'Partiel', color: colors.status.warning },
  { value: 'PAID', label: 'Payé', color: colors.status.success },
];

interface GoodsFiltersProps {
  filters: SearchFiltersType;
  onToggleStatus: (status: string) => void;
  onTogglePaymentStatus: (status: string) => void;
}

export const GoodsFilters: React.FC<GoodsFiltersProps> = ({
  filters,
  onToggleStatus,
  onTogglePaymentStatus,
}) => {
  const { colors } = useAppTheme();
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>Statut</Text>
        <FilterChipGroup
          options={getGoodsStatuses(colors)}
          selectedValues={filters.status ?? []}
          onToggle={onToggleStatus}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Statut de paiement</Text>
        <FilterChipGroup
          options={getGoodsPaymentStatuses(colors)}
          selectedValues={filters.paymentStatus ?? []}
          onToggle={onTogglePaymentStatus}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
});
