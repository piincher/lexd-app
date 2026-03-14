import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { OrderDateRange } from '../../hooks/useOrderFilters';

interface OrderDateFilterProps {
  activeRange: OrderDateRange;
  onRangeChange: (range: OrderDateRange) => void;
}

const RANGES: { key: OrderDateRange; label: string }[] = [
  { key: 'all', label: 'Tout' },
  { key: 'today', label: "Aujourd'hui" },
  { key: 'week', label: 'Cette semaine' },
  { key: 'month', label: 'Ce mois' },
  { key: 'year', label: 'Cette année' },
];

export const OrderDateFilter: React.FC<OrderDateFilterProps> = ({
  activeRange,
  onRangeChange,
}) => {
  return (
    <View style={styles.container}>
      {RANGES.map((range) => (
        <TouchableOpacity
          key={range.key}
          style={[
            styles.filterButton,
            activeRange === range.key && styles.activeFilter,
          ]}
          onPress={() => onRangeChange(range.key)}
        >
          <Text
            style={[
              styles.filterText,
              activeRange === range.key && styles.activeFilterText,
            ]}
          >
            {range.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  filterButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: Theme.neutral.grey100,
  },
  activeFilter: {
    backgroundColor: Theme.colors.secondary.main,
  },
  filterText: {
    fontSize: 13,
    color: Theme.neutral.grey600,
  },
  activeFilterText: {
    color: Theme.neutral.white,
    fontWeight: '600',
  },
});
