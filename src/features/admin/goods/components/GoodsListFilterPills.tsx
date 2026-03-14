/**
 * GoodsListFilterPills - Horizontal status filter pills
 * SRP: Display status filter options as selectable pills
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { GoodsStatus } from '../types';

interface FilterOption {
  key: GoodsStatus | 'all';
  label: string;
  icon: string;
}

interface GoodsListFilterPillsProps {
  filters: FilterOption[];
  selectedStatus: GoodsStatus | 'all';
  onSelect: (status: GoodsStatus | 'all') => void;
}

export const GoodsListFilterPills: React.FC<GoodsListFilterPillsProps> = ({
  filters,
  selectedStatus,
  onSelect,
}) => (
  <View style={styles.wrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {filters.map((filter) => {
        const isSelected = selectedStatus === filter.key;
        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.pill, isSelected && styles.pillActive]}
            onPress={() => onSelect(filter.key)}
          >
            {isSelected && (
              <LinearGradient
                colors={Theme.gradients.primary}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={isSelected ? '#FFF' : Theme.neutral[500]}
              style={styles.icon}
            />
            <Text style={[styles.text, isSelected && styles.textActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  list: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.neutral.white,
    ...Theme.shadows.sm,
    overflow: 'hidden',
  },
  pillActive: {
    ...Theme.shadows.md,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  textActive: {
    color: '#FFF',
  },
});
