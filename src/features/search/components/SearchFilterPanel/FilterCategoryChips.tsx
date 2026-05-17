import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSearchFilterPanelStyles } from './SearchFilterPanel.styles';

const CATEGORIES = [
  { key: 'order', label: 'Commandes' },
  { key: 'goods', label: 'Marchandises' },
  { key: 'container', label: 'Conteneurs' },
  { key: 'invoice', label: 'Factures' },
];

interface FilterCategoryChipsProps {
  selectedCategory?: string;
  onToggle: (category: string) => void;
}

export const FilterCategoryChips: React.FC<FilterCategoryChipsProps> = ({
  selectedCategory,
  onToggle,
}) => {
  const styles = useSearchFilterPanelStyles();

  return (
    <View style={styles.categories}>
      {CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.key}
          style={[
            styles.categoryButton,
            selectedCategory === cat.key && styles.activeCategory,
          ]}
          onPress={() => onToggle(cat.key)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === cat.key && styles.activeCategoryText,
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
