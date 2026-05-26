/* Hallmark · component: quick-filter-row · genre: modern-minimal · theme: brand-aligned app theme
 * One horizontal row that combines two list-shaping controls:
 *   1. Sort menu (icon + current sort label) — anchored Paper Menu, single tap to change order.
 *   2. Quick-filter chips — toggleable saved queries (Vieux >7j / Impayés / Endommagés / Non identifiés / Cette semaine).
 * Tapping an active chip toggles it off. Sort and quick filter are independent.
 * pre-emit critique: P5 H5 E4 S5 R5 V5
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Menu, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import {
  QUICK_FILTERS,
  SORT_OPTIONS,
  type QuickFilterKey,
  type SortKey,
} from '../../../hooks/goodsListSorting';

interface GoodsQuickFilterRowProps {
  quickFilter: QuickFilterKey | null;
  onChangeQuickFilter: (key: QuickFilterKey | null) => void;
  sortBy: SortKey;
  onChangeSort: (key: SortKey) => void;
}

export const GoodsQuickFilterRow: React.FC<GoodsQuickFilterRowProps> = ({
  quickFilter,
  onChangeQuickFilter,
  sortBy,
  onChangeSort,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.key === sortBy)?.label ?? 'Trier';

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      >
        {/* Sort affordance — distinct from quick filters via icon + chevron. */}
        <Menu
          visible={sortMenuVisible}
          onDismiss={() => setSortMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.sortPill}
              activeOpacity={0.7}
              onPress={() => setSortMenuVisible(true)}
              accessibilityLabel="Changer le tri"
            >
              <Ionicons name="swap-vertical-outline" size={14} color={colors.text.secondary} />
              <Text style={styles.sortText} numberOfLines={1}>{currentSortLabel}</Text>
              <Ionicons name="chevron-down" size={13} color={colors.text.secondary} />
            </TouchableOpacity>
          }
        >
          {SORT_OPTIONS.map((opt) => (
            <Menu.Item
              key={opt.key}
              onPress={() => {
                // Close the menu first, then defer the sort change one frame.
                // The sort change re-renders the FlashList header (this component
                // lives in it). If we change sort while the menu is still open,
                // the portal can orphan and the next anchor tap becomes a no-op
                // — the "second tap doesn't work" bug.
                setSortMenuVisible(false);
                requestAnimationFrame(() => onChangeSort(opt.key));
              }}
              title={opt.label}
              leadingIcon={opt.key === sortBy ? 'check' : undefined}
            />
          ))}
        </Menu>

        {/* Visual separator between sort and filters — they're different mental models. */}
        <View style={styles.divider} />

        {QUICK_FILTERS.map((filter) => {
          const isActive = quickFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.pill, isActive && styles.pillActive]}
              activeOpacity={0.7}
              // Tapping the active chip toggles the filter off.
              onPress={() => onChangeQuickFilter(isActive ? null : filter.key)}
              accessibilityLabel={`Filtre rapide ${filter.label}`}
            >
              <Text style={[styles.text, isActive && styles.textActive]}>{filter.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginTop: Theme.spacing.sm,
      marginBottom: Theme.spacing.sm,
    },
    list: {
      paddingHorizontal: Theme.spacing.xl,
      alignItems: 'center',
      gap: Theme.spacing.sm,
    },
    // Sort pill — outlined, icon-led, paper bg so it visually distinguishes from filter pills.
    sortPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: Theme.spacing.md,
      paddingVertical: 9,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    },
    sortText: {
      fontSize: 12.5,
      fontWeight: '700',
      color: colors.text.secondary,
      maxWidth: 140,
    },
    divider: {
      width: 1,
      height: 22,
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      marginHorizontal: 2,
    },
    // Filter pills — match GoodsFilterChips voice for cohesion, but with warning-tinted
    // active state so they read as "narrow the list" not "switch the list view".
    pill: {
      paddingHorizontal: Theme.spacing.lg,
      paddingVertical: 9,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    },
    pillActive: {
      backgroundColor: colors.feedback.warningBg,
      borderColor: colors.status.warning,
    },
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    textActive: {
      color: colors.feedback.warningDark,
      fontWeight: '700',
    },
  });

export default GoodsQuickFilterRow;
