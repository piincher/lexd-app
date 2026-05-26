import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ContainerAssistFilter, ContainerFilterCounts } from '../hooks/containerAssistTypes';

interface ContainerSmartFiltersProps {
  searchQuery: string;
  activeFilter: ContainerAssistFilter;
  counts: ContainerFilterCounts;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: ContainerAssistFilter) => void;
}

const FILTERS: { key: ContainerAssistFilter; label: string }[] = [
  { key: 'ALL', label: 'Tout' },
  { key: 'ISSUES', label: 'Alertes' },
  { key: 'UNPAID', label: 'Impayés' },
  { key: 'UNIDENTIFIED', label: 'Inconnus' },
  { key: 'DAMAGED', label: 'Endommagés' },
  { key: 'READY', label: 'Prêts' },
  { key: 'DELIVERED', label: 'Livrés' },
  { key: 'MISSING_LOCATION', label: 'Sans emplacement' },
];

export const ContainerSmartFilters: React.FC<ContainerSmartFiltersProps> = ({
  searchQuery,
  activeFilter,
  counts,
  onSearchChange,
  onFilterChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Searchbar
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholder="Rechercher client, colis, suivi, emplacement"
        style={[styles.search, { backgroundColor: colors.background.card }]}
        inputStyle={styles.searchInput}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {FILTERS.map((filter) => {
          const selected = activeFilter === filter.key;
          return (
            <Pressable
              key={filter.key}
              onPress={() => onFilterChange(filter.key)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.primary[600] : colors.background.card,
                  borderColor: selected ? colors.primary[600] : colors.border,
                },
              ]}
            >
              <Text style={[styles.chipText, { color: selected ? colors.text.inverse : colors.text.secondary }]}>
                {filter.label}
              </Text>
              <Text style={[styles.chipCount, { color: selected ? colors.text.inverse : colors.text.disabled }]}>
                {counts[filter.key]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginBottom: 12 },
  search: { height: 46, borderRadius: 8, marginBottom: 10 },
  searchInput: { minHeight: 44, fontSize: 13 },
  chips: { gap: 8, paddingRight: 16 },
  chip: { minHeight: 40, borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  chipText: { fontSize: 12, fontWeight: '800' },
  chipCount: { fontSize: 11, fontWeight: '900' },
});

export default ContainerSmartFilters;
