import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { SearchFilters } from '../../types';

interface SearchFilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClose: () => void;
  onClear: () => void;
}

const CATEGORIES = [
  { key: 'order', label: 'Commandes' },
  { key: 'goods', label: 'Marchandises' },
  { key: 'container', label: 'Conteneurs' },
  { key: 'invoice', label: 'Factures' },
];

export const SearchFilterPanel: React.FC<SearchFilterPanelProps> = ({
  filters,
  onFilterChange,
  onClose,
  onClear,
}) => {
  const toggleCategory = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filtres</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={Theme.neutral[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégorie</Text>
        <View style={styles.categories}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryButton,
                filters.category === cat.key && styles.activeCategory,
              ]}
              onPress={() => toggleCategory(cat.key)}
            >
              <Text
                style={[
                  styles.categoryText,
                  filters.category === cat.key && styles.activeCategoryText,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prix</Text>
        <View style={styles.priceInputs}>
          <Input
            placeholder="Min"
            keyboardType="numeric"
            value={filters.minPrice?.toString() || ''}
            onChangeText={(v) =>
              onFilterChange({ ...filters, minPrice: v ? parseFloat(v) : undefined })
            }
            containerStyle={styles.priceInput}
          />
          <Text style={styles.priceSeparator}>-</Text>
          <Input
            placeholder="Max"
            keyboardType="numeric"
            value={filters.maxPrice?.toString() || ''}
            onChangeText={(v) =>
              onFilterChange({ ...filters, maxPrice: v ? parseFloat(v) : undefined })
            }
            containerStyle={styles.priceInput}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button variant="ghost" onPress={onClear}>
          Effacer
        </Button>
        <Button variant="primary" onPress={onClose}>
          Appliquer
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    padding: Theme.spacing.lg,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[900],
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: Theme.neutral[100],
  },
  activeCategory: {
    backgroundColor: Theme.colors.primary.main,
  },
  categoryText: {
    fontSize: 14,
    color: Theme.neutral[600],
  },
  activeCategoryText: {
    color: Theme.neutral.white,
    fontWeight: '600',
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  priceInput: {
    flex: 1,
  },
  priceSeparator: {
    fontSize: 16,
    color: Theme.neutral[600],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Theme.spacing.md,
  },
});
