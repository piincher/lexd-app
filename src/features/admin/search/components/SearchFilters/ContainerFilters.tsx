/**
 * ContainerFilters - Filter sections for containers entity
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { FilterChipGroup } from '../FilterChipGroup';
import { SearchFilters as SearchFiltersType } from '../../api/searchApi';

const CONTAINER_STATUSES = [
  { value: 'BOOKED', label: 'Réservé', color: '#6366F1' },
  { value: 'EMPTY_TO_WAREHOUSE', label: 'Vide → Entrepôt', color: '#8B5CF6' },
  { value: 'LOADING', label: 'Chargement', color: '#EC4899' },
  { value: 'LOADED', label: 'Chargé', color: '#F59E0B' },
  { value: 'IN_TRANSIT', label: 'Transit', color: '#3B82F6' },
  { value: 'ARRIVED', label: 'Arrivé', color: '#10B981' },
  { value: 'READY_FOR_PICKUP', label: 'À récupérer', color: '#14B8A6' },
];

const SHIPPING_MODES = [
  { value: 'SEA', label: 'Maritime', icon: 'ferry' },
  { value: 'AIR', label: 'Aérien', icon: 'airplane' },
];

const SHIPPING_LINES = [
  { value: 'MSC', label: 'MSC' },
  { value: 'MAERSK', label: 'Maersk' },
  { value: 'CMA_CGM', label: 'CMA CGM' },
  { value: 'HAPAG_LLOYD', label: 'Hapag-Lloyd' },
];

interface ContainerFiltersProps {
  filters: SearchFiltersType;
  onToggleStatus: (status: string) => void;
  onSetShippingMode: (mode: string) => void;
  onSetShippingLine: (line: string) => void;
}

export const ContainerFilters: React.FC<ContainerFiltersProps> = ({
  filters,
  onToggleStatus,
  onSetShippingMode,
  onSetShippingLine,
}) => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>Statut</Text>
        <FilterChipGroup
          options={CONTAINER_STATUSES}
          selectedValues={filters.status ?? []}
          onToggle={onToggleStatus}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Mode de transport</Text>
        <FilterChipGroup
          options={SHIPPING_MODES}
          selectedValues={filters.shippingMode ?? ''}
          onToggle={onSetShippingMode}
          multiSelect={false}
        />
      </View>

      {filters.shippingMode !== 'AIR' && (
        <View style={styles.section}>
          <Text style={styles.label}>Compagnie maritime</Text>
          <FilterChipGroup
            options={SHIPPING_LINES}
            selectedValues={filters.shippingLine ?? ''}
            onToggle={onSetShippingLine}
            multiSelect={false}
          />
        </View>
      )}
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
