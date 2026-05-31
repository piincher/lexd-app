import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardCatalogSort } from '../api/rewardApi';
import { createStyles } from './RewardCatalogToolbar.styles';

interface RewardCatalogToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sort: RewardCatalogSort;
  onSortChange: (sort: RewardCatalogSort) => void;
  affordableOnly: boolean;
  onToggleAffordable: () => void;
}

const SORT_LABELS: Record<RewardCatalogSort, string> = {
  points_asc: 'Points croissants',
  points_desc: 'Points décroissants',
  newest: 'Nouveautés',
};

const CATEGORY_LABELS: Record<string, string> = {
  product: 'Produits',
  electronics: 'Électronique',
  voucher: 'Bons',
  service: 'Services',
};

const labelForCategory = (category: string) =>
  CATEGORY_LABELS[category.toLowerCase()] ||
  category.charAt(0).toUpperCase() + category.slice(1);

export const RewardCatalogToolbar: React.FC<RewardCatalogToolbarProps> = ({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  affordableOnly,
  onToggleAffordable,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const chips = useMemo(() => ['all', ...categories], [categories]);

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={onSearchChange}
          placeholder="Rechercher une récompense…"
          placeholderTextColor={colors.text.disabled}
          returnKeyType="search"
          autoCorrect={false}
        />
        {search.length > 0 && (
          <Pressable onPress={() => onSearchChange('')} hitSlop={8} accessibilityLabel="Effacer la recherche">
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.disabled} />
          </Pressable>
        )}
      </View>

      {/* Sort + affordability */}
      <View style={styles.controlsRow}>
        <Menu
          visible={sortMenuOpen}
          onDismiss={() => setSortMenuOpen(false)}
          anchor={
            <Pressable style={styles.sortButton} onPress={() => setSortMenuOpen(true)}>
              <MaterialCommunityIcons name="sort" size={16} color={colors.text.primary} />
              <Text style={styles.sortLabel} numberOfLines={1}>{SORT_LABELS[sort]}</Text>
              <MaterialCommunityIcons name="chevron-down" size={16} color={colors.text.secondary} />
            </Pressable>
          }
        >
          {(Object.keys(SORT_LABELS) as RewardCatalogSort[]).map((key) => (
            <Menu.Item
              key={key}
              title={SORT_LABELS[key]}
              titleStyle={key === sort ? { color: colors.primary.main, fontWeight: '700' } : undefined}
              leadingIcon={key === sort ? 'check' : undefined}
              onPress={() => {
                onSortChange(key);
                setSortMenuOpen(false);
              }}
            />
          ))}
        </Menu>

        <Pressable
          onPress={onToggleAffordable}
          style={[styles.affordChip, affordableOnly && styles.affordChipActive]}
          accessibilityRole="switch"
          accessibilityState={{ checked: affordableOnly }}
        >
          <MaterialCommunityIcons
            name={affordableOnly ? 'check-circle' : 'circle-outline'}
            size={15}
            color={affordableOnly ? colors.text.inverse : colors.primary.main}
          />
          <Text style={[styles.affordLabel, affordableOnly && styles.affordLabelActive]}>
            Échangeable
          </Text>
        </Pressable>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {chips.map((category) => {
          const active = category === activeCategory;
          return (
            <Pressable
              key={category}
              onPress={() => onCategoryChange(category)}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
            >
              <Text style={[styles.categoryLabel, active && styles.categoryLabelActive]}>
                {category === 'all' ? 'Tous' : labelForCategory(category)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
