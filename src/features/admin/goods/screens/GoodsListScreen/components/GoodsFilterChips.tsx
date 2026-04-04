/**
 * GoodsFilterChips - Horizontal status filter pills
 * SRP: Display status filter options as selectable chips
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { GoodsStatus } from '../../../types';

const STATUS_FILTERS: { key: GoodsStatus | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'Tous', icon: 'apps' },
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt', icon: 'home' },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Container', icon: 'cube' },
  { key: 'LOADED_IN_CONTAINER', label: 'Chargé', icon: 'archive' },
  { key: 'IN_TRANSIT', label: 'Transit', icon: 'airplane' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivé', icon: 'flag' },
  { key: 'READY_FOR_PICKUP', label: 'Prêt', icon: 'hand-left' },
  { key: 'DELIVERED', label: 'Livré', icon: 'checkmark-circle' },
];

interface GoodsFilterChipsProps {
  selectedStatus: GoodsStatus | 'all';
  onSelect: (status: GoodsStatus | 'all') => void;
}

export const GoodsFilterChips: React.FC<GoodsFilterChipsProps> = ({
  selectedStatus,
  onSelect,
}) => (
  <View style={styles.wrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {STATUS_FILTERS.map((filter) => {
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

export default GoodsFilterChips;
