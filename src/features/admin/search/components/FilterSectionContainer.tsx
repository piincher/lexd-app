/**
 * FilterSectionContainer - Container for entity-specific filter sections
 * Renders appropriate filter section based on entity type
 */

import React from 'react';
import { ScrollView } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SEA_SHIPPING_LINES, SHIPPING_LINE_LABELS } from '@src/shared/constants/shippingLines';
import { FilterCategorySection } from './FilterCategorySection';
import { FilterChipGroup } from './FilterChipGroup';
import { FilterSummaryChips } from './FilterSummaryChips';
import { SearchFilters } from '../api/searchApi';
import { FilterFooter } from './FilterFooter';
import { createStyles } from './FilterSectionContainer.styles';
import type { ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

const getGoodsStatuses = (colors: AppColors) => [
  { value: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', color: colors.status.info },
  { value: 'PACKED', label: 'Préparé', color: colors.primary.main },
  { value: 'ASSIGNED_TO_CONTAINER', label: 'Assigné', color: colors.accent.mint },
  { value: 'LOADED_IN_CONTAINER', label: 'Chargé', color: colors.accent.rose },
  { value: 'IN_TRANSIT', label: 'Transit', color: colors.status.warning },
  { value: 'ARRIVED_DESTINATION', label: 'Arrivé', color: colors.status.success },
  { value: 'READY_FOR_PICKUP', label: 'À récupérer', color: colors.primary.dark },
  { value: 'DELIVERED', label: 'Livré', color: colors.primary.light },
];

const getGoodsPaymentStatuses = (colors: AppColors) => [
  { value: 'UNPAID', label: 'Non payé', color: colors.status.error },
  { value: 'PARTIAL', label: 'Partiel', color: colors.status.warning },
  { value: 'PAID', label: 'Payé', color: colors.status.success },
];

const getContainerStatuses = (colors: AppColors) => [
  { value: 'BOOKED', label: 'Réservé', color: colors.status.info },
  { value: 'EMPTY_TO_WAREHOUSE', label: 'Vide → Entrepôt', color: colors.primary.main },
  { value: 'LOADING', label: 'Chargement', color: colors.accent.rose },
  { value: 'LOADED', label: 'Chargé', color: colors.status.warning },
  { value: 'IN_TRANSIT', label: 'Transit', color: colors.accent.sky },
  { value: 'ARRIVED', label: 'Arrivé', color: colors.status.success },
  { value: 'READY_FOR_PICKUP', label: 'À récupérer', color: colors.accent.mint },
];

const SHIPPING_MODES = [
  { value: 'SEA', label: 'Maritime', icon: 'boat' },
  { value: 'AIR', label: 'Aérien', icon: 'airplane' },
];

const SHIPPING_LINES = SEA_SHIPPING_LINES.map((line) => ({
  value: line,
  label: SHIPPING_LINE_LABELS[line],
}));

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
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
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
                options={getGoodsStatuses(colors)}
                selectedValues={filters.status || []}
                onToggle={onToggleStatus}
              />
            </FilterCategorySection>
            <FilterCategorySection title="Statut de paiement">
              <FilterChipGroup
                options={getGoodsPaymentStatuses(colors)}
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
                options={getContainerStatuses(colors)}
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

      <FilterFooter />
    </>
  );
};
