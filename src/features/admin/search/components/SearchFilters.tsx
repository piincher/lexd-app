/**
 * SearchFilters - Advanced filter panel for search results
 * Composes entity-specific filter sections
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SearchFilters as SearchFiltersType, FilterPreset } from '../api/searchApi';
import { useSearchFilterHandlers } from '../hooks/useSearchFilterHandlers';
import { FilterPresetsModal } from './FilterPresetsModal';
import { SearchFiltersHeader } from './SearchFilters/SearchFiltersHeader';
import { GoodsFilters } from './SearchFilters/GoodsFilters';
import { ContainerFilters } from './SearchFilters/ContainerFilters';
import { ClientFilters } from './SearchFilters/ClientFilters';
import { SearchFiltersSummary } from './SearchFilters/SearchFiltersSummary';
import { SearchFiltersFooter } from './SearchFilters/SearchFiltersFooter';

interface SearchFiltersProps {
  entity: 'goods' | 'containers' | 'clients';
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onReset: () => void;
  presets?: FilterPreset[];
  onPresetSelect?: (preset: FilterPreset) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  entity,
  filters,
  onFiltersChange,
  onReset,
  presets = [],
  onPresetSelect,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [showPresets, setShowPresets] = useState(false);
  const {
    toggleStatus,
    togglePaymentStatus,
    setShippingMode,
    setShippingLine,
    toggleRole,
    setIsActive,
    setHasBalance,
    hasActiveFilters,
  } = useSearchFilterHandlers(filters, onFiltersChange);

  const handleRemoveFilter = (key: keyof SearchFiltersType) => {
    const next = { ...filters };
    delete next[key];
    onFiltersChange(next);
  };

  return (
    <View style={styles.container}>
      <SearchFiltersHeader
        presetsCount={presets.length}
        hasActiveFilters={hasActiveFilters}
        onPresetsPress={() => setShowPresets(true)}
        onReset={onReset}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {entity === 'goods' && (
          <GoodsFilters
            filters={filters}
            onToggleStatus={toggleStatus}
            onTogglePaymentStatus={togglePaymentStatus}
          />
        )}
        {entity === 'containers' && (
          <ContainerFilters
            filters={filters}
            onToggleStatus={toggleStatus}
            onSetShippingMode={setShippingMode}
            onSetShippingLine={setShippingLine}
          />
        )}
        {entity === 'clients' && (
          <ClientFilters
            filters={filters}
            onSetIsActive={setIsActive}
            onSetHasBalance={setHasBalance}
            onToggleRole={toggleRole}
          />
        )}

        <SearchFiltersSummary filters={filters} onRemove={handleRemoveFilter} />
      </ScrollView>

      <SearchFiltersFooter />

      <FilterPresetsModal
        visible={showPresets}
        entity={entity}
        presets={presets}
        onSelect={(preset) => onPresetSelect?.(preset)}
        onClose={() => setShowPresets(false)}
      />
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card,
  },
  scrollContent: {
    padding: 16,
  },
});

export default SearchFilters;
