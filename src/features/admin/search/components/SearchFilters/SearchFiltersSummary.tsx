/**
 * SearchFiltersSummary - Displays active filter summary
 * Replicates original SearchFilters inline behavior
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SearchFilters } from '../../api/searchApi';

interface SearchFiltersSummaryProps {
  filters: SearchFilters;
  onRemove: (key: keyof SearchFilters) => void;
}

export const SearchFiltersSummary: React.FC<SearchFiltersSummaryProps> = ({
  filters,
  onRemove,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
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

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[500],
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.primary[50],
  },
});
