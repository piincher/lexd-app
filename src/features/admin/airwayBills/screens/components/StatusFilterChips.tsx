/**
 * StatusFilterChips - Horizontal scrollable status filter pills
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AirwayBillStatus } from '../../types';

export type StatusFilter = AirwayBillStatus | 'ALL';

interface FilterOption {
  label: string;
  value: StatusFilter;
  count?: number;
}

interface StatusFilterChipsProps {
  options: FilterOption[];
  activeFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

export const StatusFilterChips: React.FC<StatusFilterChipsProps> = ({
  options,
  activeFilter,
  onFilterChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {options.map((option) => {
        const isActive = activeFilter === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.8}
            onPress={() => onFilterChange(option.value)}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? colors.primary.main : colors.background.card,
                borderColor: isActive ? colors.primary.main : colors.border,
              },
            ]}
            accessibilityLabel={`Filtre ${option.label}`}
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.chipLabel,
                { color: isActive ? colors.text.inverse : colors.text.secondary },
              ]}
            >
              {option.label}
            </Text>
            {option.count !== undefined && (
              <View
                style={[
                  styles.countBadge,
                  { backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : colors.background.paper },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    { color: isActive ? colors.text.inverse : colors.text.secondary },
                  ]}
                >
                  {option.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  countBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default StatusFilterChips;
