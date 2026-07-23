import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import type { PaymentStatus } from '../../types';

interface PaymentHistoryFilterProps {
  selectedFilter: PaymentStatus | 'ALL';
  onFilterChange: (filter: PaymentStatus | 'ALL') => void;
}

const STATUS_FILTERS: { label: string; value: PaymentStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Failed', value: 'FAILED' },
];

export const PaymentHistoryFilter: React.FC<PaymentHistoryFilterProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.filterContainer, { borderBottomColor: colors.border }]}>
      <FlashList
        horizontal
        data={STATUS_FILTERS}
        keyExtractor={(item) => item.value}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: colors.background.paper },
              selectedFilter === item.value && { backgroundColor: colors.primary.main },
            ]}
            onPress={() => onFilterChange(item.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterButtonText,
                { color: colors.text.secondary },
                selectedFilter === item.value && { color: colors.text.inverse },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.filterList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: HAIRLINE,
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.badge,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
});
