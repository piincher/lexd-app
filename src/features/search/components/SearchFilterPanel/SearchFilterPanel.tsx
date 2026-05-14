import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
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
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
          <Ionicons name="close" size={24} color={colors.text.secondary} />
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

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      padding: 20,
      borderRadius: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text.primary,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
    categories: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
    },
    activeCategory: {
      backgroundColor: colors.primary.main,
    },
    categoryText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    activeCategoryText: {
      color: colors.text.inverse,
      fontWeight: '600',
    },
    priceInputs: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    priceInput: {
      flex: 1,
    },
    priceSeparator: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
  });
