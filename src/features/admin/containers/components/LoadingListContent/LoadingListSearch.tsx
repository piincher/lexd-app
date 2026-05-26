import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, type ThemeContextType } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

export type LoadingStatusFilter = 'all' | 'pending' | 'loaded';

interface LoadingListSearchProps {
  searchQuery: string;
  statusFilter: LoadingStatusFilter;
  totalItems: number;
  visibleItems: number;
  pendingItems: number;
  loadedItems: number;
  onSearchQueryChange: (query: string) => void;
  onStatusFilterChange: (filter: LoadingStatusFilter) => void;
}

const FILTERS: { key: LoadingStatusFilter; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'pending', label: 'À charger' },
  { key: 'loaded', label: 'Chargés' },
];

export const LoadingListSearch: React.FC<LoadingListSearchProps> = ({
  searchQuery,
  statusFilter,
  totalItems,
  visibleItems,
  pendingItems,
  loadedItems,
  onSearchQueryChange,
  onStatusFilterChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const getCount = (filter: LoadingStatusFilter) => {
    if (filter === 'pending') return pendingItems;
    if (filter === 'loaded') return loadedItems;
    return totalItems;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={colors.text.secondary} />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          placeholder="Rechercher ID, client, description"
          placeholderTextColor={colors.text.muted}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => onSearchQueryChange('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => {
          const isActive = statusFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => onStatusFilterChange(filter.key)}
              activeOpacity={0.85}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {filter.label}
              </Text>
              <Text style={[styles.filterCount, isActive && styles.filterTextActive]}>
                {getCount(filter.key)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {visibleItems !== totalItems && (
        <Text style={styles.resultText}>{visibleItems} résultat(s) affiché(s)</Text>
      )}
    </View>
  );
};

const createStyles = (colors: ThemeContextType['colors'], isDark?: boolean) => StyleSheet.create({
  container: { marginBottom: Theme.spacing.lg, gap: Theme.spacing.sm },
  searchBox: {
    minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md, borderRadius: Theme.radius.lg, borderWidth: 1,
    borderColor: colors.border, backgroundColor: isDark ? colors.background.elevated : colors.background.card,
  },
  searchInput: { flex: 1, minHeight: 44, color: colors.text.primary, fontSize: 14, fontWeight: '600' },
  clearButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  filterRow: { flexDirection: 'row', gap: Theme.spacing.sm },
  filterChip: {
    minHeight: 44, flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, borderRadius: Theme.radius.lg, borderWidth: 1,
    borderColor: colors.border, backgroundColor: colors.background.card,
  },
  filterChipActive: { borderColor: colors.status.warning, backgroundColor: colors.feedback.warningBg },
  filterText: { fontSize: 12, fontWeight: '700', color: colors.text.secondary },
  filterCount: { fontSize: 12, fontWeight: '800', color: colors.text.primary },
  filterTextActive: { color: colors.feedback.warningDark },
  resultText: { fontSize: 12, fontWeight: '600', color: colors.text.secondary },
});
