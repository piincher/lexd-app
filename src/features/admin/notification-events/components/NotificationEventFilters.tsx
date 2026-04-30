import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { NotificationEventFilters, NotificationEventStatus } from '../types';
import { createNotificationEventFiltersStyles } from './NotificationEventFilters.styles';

interface NotificationEventFiltersProps {
  filters: NotificationEventFilters;
  onChange: (filters: NotificationEventFilters) => void;
}

const STATUS_OPTIONS: Array<NotificationEventStatus | 'ALL'> = ['ALL', 'SENT', 'PARTIAL', 'FAILED'];

export const NotificationEventFilters: React.FC<NotificationEventFiltersProps> = ({
  filters,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = createNotificationEventFiltersStyles(colors);

  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel="Rechercher dans les événements"
        value={filters.q || ''}
        onChangeText={(q) => onChange({ ...filters, q, page: 1 })}
        placeholder="Rechercher titre, type, dispatch..."
        placeholderTextColor={colors.text.disabled}
        style={styles.search}
        returnKeyType="search"
      />
      <View style={styles.chipRow}>
        {STATUS_OPTIONS.map((status) => {
          const active = (filters.status || 'ALL') === status;
          return (
            <Pressable
              key={status}
              accessibilityRole="button"
              onPress={() => onChange({ ...filters, status, page: 1 })}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {status === 'ALL' ? 'Tous' : status}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
