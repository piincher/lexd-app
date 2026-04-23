import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { OrderStatus } from '../../hooks/useOrderFilters';

interface OrderStatusFilterProps {
  activeStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  counts?: Record<OrderStatus, number>;
}

const STATUSES: { key: OrderStatus; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'pending', label: 'En attente' },
  { key: 'in_transit', label: 'En transit' },
  { key: 'delivered', label: 'Livrés' },
  { key: 'cancelled', label: 'Annulés' },
];

export const OrderStatusFilter: React.FC<OrderStatusFilterProps> = ({
  activeStatus,
  onStatusChange,
  counts,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {STATUSES.map((status) => (
        <TouchableOpacity
          key={status.key}
          style={[
            styles.filterButton,
            activeStatus === status.key && styles.activeFilter,
          ]}
          onPress={() => onStatusChange(status.key)}
        >
          <Text
            style={[
              styles.filterText,
              activeStatus === status.key && styles.activeFilterText,
            ]}
          >
            {status.label}
            {counts && counts[status.key] > 0 && (
              <Text style={styles.badge}> ({counts[status.key]})</Text>
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    gap: Theme.spacing.sm,
  },
  filterButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: 20,
    backgroundColor: Theme.neutral[100],
  },
  activeFilter: {
    backgroundColor: Theme.colors.primary.main,
  },
  filterText: {
    fontSize: 14,
    color: Theme.neutral[600],
  },
  activeFilterText: {
    color: Theme.neutral.white,
    fontWeight: '600',
  },
  badge: {
    fontWeight: '700',
  },
});
