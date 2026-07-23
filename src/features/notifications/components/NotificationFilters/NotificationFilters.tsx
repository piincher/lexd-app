import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RADIUS } from '@src/shared/ui/designLanguage';
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
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

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

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 8,
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: RADIUS.badge,
      backgroundColor: colors.background.paper,
    },
    activeFilter: {
      backgroundColor: colors.primary.main,
    },
    filterText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    activeFilterText: {
      color: colors.text.inverse,
      fontWeight: '600',
    },
    badge: {
      fontWeight: '700',
    },
  });
