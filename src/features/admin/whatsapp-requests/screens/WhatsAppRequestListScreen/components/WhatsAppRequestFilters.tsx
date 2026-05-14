/**
 * WhatsAppRequestFilters - Status filter pills
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { WhatsAppRequestStatus } from '../../../api/whatsappRequestApi';
import { STATUS_FILTERS } from '../constants';

interface WhatsAppRequestFiltersProps {
  selectedStatus: WhatsAppRequestStatus | 'all';
  pendingCount: number;
  onSelectStatus: (status: WhatsAppRequestStatus | 'all') => void;
}

export const WhatsAppRequestFilters: React.FC<WhatsAppRequestFiltersProps> = ({
  selectedStatus,
  pendingCount,
  onSelectStatus,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.filterWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
        {STATUS_FILTERS.map((filter) => {
          const isSelected = selectedStatus === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.filterPill, isSelected && { backgroundColor: filter.color }]}
              onPress={() => onSelectStatus(filter.key)}
            >
              <Text style={[styles.filterText, isSelected && { color: colors.text.inverse }]}>{filter.label}</Text>
              {filter.key === 'PENDING' && pendingCount > 0 && (
                <View style={[styles.badge, { backgroundColor: isSelected ? colors.background.card : filter.color }]}>
                  <Text style={[styles.badgeText, { color: isSelected ? filter.color : colors.text.inverse }]}>{pendingCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterWrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filterList: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.background.card,
    ...Theme.shadows.sm,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  filterTextActive: {
    color: Theme.colors.text.inverse,
  },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default WhatsAppRequestFilters;
