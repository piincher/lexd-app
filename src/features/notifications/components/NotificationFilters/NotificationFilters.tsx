import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { NotificationFilterType } from '../../hooks/useNotificationFilters';

interface NotificationFiltersProps {
  activeFilter: NotificationFilterType;
  onFilterChange: (filter: NotificationFilterType) => void;
  unreadCount: number;
}

const FILTERS: { key: NotificationFilterType; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'unread', label: 'Non lues' },
  { key: 'system', label: 'Système' },
];

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeFilter,
  onFilterChange,
  unreadCount,
}) => {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            activeFilter === filter.key && styles.activeFilter,
          ]}
          onPress={() => onFilterChange(filter.key)}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === filter.key && styles.activeFilterText,
            ]}
          >
            {filter.label}
            {filter.key === 'unread' && unreadCount > 0 && (
              <Text style={styles.badge}> ({unreadCount})</Text>
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    backgroundColor: Theme.colors.primary.main,
  },
  filterText: {
    fontSize: 14,
    color: Theme.neutral.grey600,
  },
  activeFilterText: {
    color: Theme.neutral.white,
    fontWeight: '600',
  },
  badge: {
    fontWeight: '700',
  },
});
