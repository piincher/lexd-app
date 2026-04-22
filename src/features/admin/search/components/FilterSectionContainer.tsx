/**
 * FilterSectionContainer - Container for entity-specific filter sections
 * Renders appropriate filter section based on entity type
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { FilterCategorySection } from './FilterCategorySection';
import { FilterChipGroup } from './FilterChipGroup';
import { FilterSummaryChips } from './FilterSummaryChips';
import { SearchFilters } from '../api/searchApi';

// Filter options
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
  { value: 'SEA', label: 'Maritime', icon: 'boat' },
  { value: 'AIR', label: 'Aérien', icon: 'airplane' },
];

const SHIPPING_LINES = [
  { value: 'MSC', label: 'MSC' },
  { value: 'MAERSK', label: 'Maersk' },
  { value: 'CMA_CGM', label: 'CMA CGM' },
  { value: 'HAPAG_LLOYD', label: 'Hapag-Lloyd' },
];

interface FilterSectionContainerProps {
  entity: 'goods' | 'containers' | 'clients';
  filters: SearchFilters;
  hasActiveFilters: boolean;
  onToggleStatus: (status: string) => void;
  onTogglePaymentStatus: (status: string) => void;
  onSetShippingMode: (mode: string) => void;
  onSetShippingLine: (line: string) => void;
  onClearFilter: (key: keyof SearchFilters) => void;
  onReset: () => void;
}

export const FilterSectionContainer: React.FC<FilterSectionContainerProps> = ({
  entity,
  filters,
  hasActiveFilters,
  onToggleStatus,
  onTogglePaymentStatus,
  onSetShippingMode,
  onSetShippingLine,
  onClearFilter,
  onReset,
}) => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {entity === 'goods' && (
          <>
            <FilterCategorySection title="Statut">
              <FilterChipGroup
                options={GOODS_STATUSES}
                selectedValues={filters.status || []}
                onToggle={onToggleStatus}
              />
            </FilterCategorySection>
            <FilterCategorySection title="Statut de paiement">
              <FilterChipGroup
                options={GOODS_PAYMENT_STATUSES}
                selectedValues={filters.paymentStatus || []}
                onToggle={onTogglePaymentStatus}
              />
            </FilterCategorySection>
          </>
        )}

        {entity === 'containers' && (
          <>
            <FilterCategorySection title="Statut">
              <FilterChipGroup
                options={CONTAINER_STATUSES}
                selectedValues={filters.status || []}
                onToggle={onToggleStatus}
              />
            </FilterCategorySection>
            <FilterCategorySection title="Mode de transport">
              <FilterChipGroup
                options={SHIPPING_MODES}
                selectedValues={filters.shippingMode || ''}
                onToggle={onSetShippingMode}
                multiSelect={false}
              />
            </FilterCategorySection>
            {filters.shippingMode !== 'AIR' && (
              <FilterCategorySection title="Compagnie maritime">
                <FilterChipGroup
                  options={SHIPPING_LINES}
                  selectedValues={filters.shippingLine || ''}
                  onToggle={onSetShippingLine}
                  multiSelect={false}
                />
              </FilterCategorySection>
            )}
          </>
        )}

        {hasActiveFilters && (
          <FilterSummaryChips filters={filters} onRemove={onClearFilter} />
        )}
      </ScrollView>

      <LinearGradient colors={['transparent', '#FFFFFF']} style={styles.footer}>
        <Button mode="contained" onPress={() => {}} style={styles.applyButton} buttonColor={Theme.primary[500]}>
          Appliquer les filtres
        </Button>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  footer: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
  },
  applyButton: {
    borderRadius: Theme.radius.lg,
  },
});
