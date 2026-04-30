/**
 * SearchFiltersSummary - Displays active filter summary
 * Replicates original SearchFilters inline behavior
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { SearchFilters } from '../../api/searchApi';

interface SearchFiltersSummaryProps {
  filters: SearchFilters;
  onRemove: (key: keyof SearchFilters) => void;
}

export const SearchFiltersSummary: React.FC<SearchFiltersSummaryProps> = ({
  filters,
  onRemove,
}) => {
  const entries = Object.entries(filters).filter(([, value]) => !!value);

  if (entries.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtres actifs</Text>
      <View style={styles.chipsContainer}>
        {entries.map(([key, value]) => (
          <Chip
            key={key}
            onClose={() => onRemove(key as keyof SearchFilters)}
            style={styles.chip}
          >
            {key}: {Array.isArray(value) ? value.join(', ') : value.toString()}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[200],
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[500],
    marginBottom: Theme.spacing.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  chip: {
    backgroundColor: Theme.primary[50],
  },
});
