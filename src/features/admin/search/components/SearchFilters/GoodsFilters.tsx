/**
 * GoodsFilters - Filter sections for goods entity
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { FilterChipGroup } from '../FilterChipGroup';
import { SearchFilters as SearchFiltersType } from '../../api/searchApi';

const GOODS_STATUSES = [
  { value: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', color: '#6366F1' },
  { value: 'PACKED', label: 'Préparé', color: '#7C4DFF' },
  { value: 'ASSIGNED_TO_CONTAINER', label: 'Assigné', color: '#8B5CF6' },
  { value: 'LOADED_IN_CONTAINER', label: 'Chargé', color: '#EC4899' },
  { value: 'IN_TRANSIT', label: 'Transit', color: '#F59E0B' },
  { value: 'ARRIVED_DESTINATION', label: 'Arrivé', color: '#10B981' },
  { value: 'READY_FOR_PICKUP', label: 'À récupérer', color: '#14B8A6' },
  { value: 'DELIVERED', label: 'Livré', color: '#22C55E' },
];

const GOODS_PAYMENT_STATUSES = [
  { value: 'UNPAID', label: 'Non payé', color: '#EF4444' },
  { value: 'PARTIAL', label: 'Partiel', color: '#F59E0B' },
  { value: 'PAID', label: 'Payé', color: '#10B981' },
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
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>Statut</Text>
        <FilterChipGroup
          options={GOODS_STATUSES}
          selectedValues={filters.status ?? []}
          onToggle={onToggleStatus}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Statut de paiement</Text>
        <FilterChipGroup
          options={GOODS_PAYMENT_STATUSES}
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
