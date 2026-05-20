/**
 * FAQCategoryFilter Component - Horizontal scrollable category chips with icons
 * Following SRP: Single purpose - category filter UI (< 100 lines)
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FAQ_CATEGORY_COLORS } from '../../types';
import { CategoryChip } from './CategoryChip';

interface FAQCategoryChip {
  id: string;
  label: string;
  icon: string;
}

interface FAQCategoryFilterProps {
  categories: FAQCategoryChip[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const FAQCategoryFilter: React.FC<FAQCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors, isDark } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          categoryColor={category.id === 'all'
            ? colors.primary.main
            : FAQ_CATEGORY_COLORS[category.id as keyof typeof FAQ_CATEGORY_COLORS]}
          onPress={() => onSelectCategory(category.id)}
          colors={colors}
          isDark={isDark}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
});

export default FAQCategoryFilter;
