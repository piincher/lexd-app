/**
 * ActiveFilterChips - Shows currently applied non-status filters
 * Allows quick removal of client and date filters
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { userData } from '@src/shared/types/user';

interface ActiveFilterChipsProps {
  selectedClient: userData | null;
  onClearClient: () => void;
  dateRange: { startDate: string; endDate: string } | null;
  onClearDateRange: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  selectedClient,
  onClearClient,
  dateRange,
  onClearDateRange,
}) => {
  if (!selectedClient && !dateRange) return null;

  const formatRange = (range: { startDate: string; endDate: string }) => {
    const start = new Date(range.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(range.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {selectedClient && (
          <Chip
            icon="account"
            onClose={onClearClient}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {selectedClient.firstName} {selectedClient.lastName}
          </Chip>
        )}
        {dateRange && (
          <Chip
            icon="calendar"
            onClose={onClearDateRange}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {formatRange(dateRange)}
          </Chip>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Theme.spacing.sm,
  },
  list: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.sm,
  },
  chip: {
    backgroundColor: Theme.primary[50],
    borderColor: Theme.primary[200],
    borderWidth: 1,
  },
  chipText: {
    color: Theme.primary[700],
    fontWeight: '500',
  },
});

export default ActiveFilterChips;
