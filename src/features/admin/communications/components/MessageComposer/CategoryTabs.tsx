import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { CATEGORY_TABS, TemplateCategory } from './composerConstants';
import { createStyles } from './MessageComposer.styles';

interface CategoryTabsProps {
  activeCategory: TemplateCategory;
  onCategoryChange: (category: TemplateCategory) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
      {CATEGORY_TABS.map((cat) => {
        const isActive = activeCategory === cat.key;
        return (
          <TouchableOpacity
            key={cat.key}
            onPress={() => onCategoryChange(cat.key)}
            style={[styles.categoryTab, isActive && styles.categoryTabActive]}
            activeOpacity={0.7}
          >
            <Ionicons name={cat.icon as any} size={13} color={isActive ? colors.text.inverse : colors.neutral[500]} />
            <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{cat.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
