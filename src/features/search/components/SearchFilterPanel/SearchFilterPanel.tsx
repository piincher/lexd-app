import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SearchFilters } from '../../types';
import { useSearchFilterPanelStyles } from './SearchFilterPanel.styles';
import { FilterCategoryChips } from './FilterCategoryChips';
import { PriceRangeInputs } from './PriceRangeInputs';
import { FilterPanelActions } from './FilterPanelActions';

interface SearchFilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClose: () => void;
  onClear: () => void;
}

export const SearchFilterPanel: React.FC<SearchFilterPanelProps> = ({
  filters,
  onFilterChange,
  onClose,
  onClear,
}) => {
  const { colors } = useAppTheme();
  const styles = useSearchFilterPanelStyles();

  const toggleCategory = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handlePriceChange = (minPrice?: number, maxPrice?: number) => {
    onFilterChange({ ...filters, minPrice, maxPrice });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filtres</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégorie</Text>
        <FilterCategoryChips
          selectedCategory={filters.category}
          onToggle={toggleCategory}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prix</Text>
        <PriceRangeInputs
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={handlePriceChange}
        />
      </View>

      <FilterPanelActions onClear={onClear} onApply={onClose} />
    </View>
  );
};
