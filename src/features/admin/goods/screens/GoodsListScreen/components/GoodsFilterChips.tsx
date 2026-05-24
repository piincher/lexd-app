/* Hallmark · component: filter-chips · genre: modern-minimal · theme: brand-aligned app theme
 * Cohesion pass: flat, hairline-bordered, text-only pills; selected = tinted accent (not gradient).
 * states: default · selected · pressed
 * pre-emit critique: P4 H5 E4 S4 R5 V4
 */
import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { GoodsStatus } from '../../../types';
import { Theme } from '@src/constants/Theme';

const STATUS_FILTERS: { key: GoodsStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'RECEIVED_AT_WAREHOUSE', label: 'Entrepôt' },
  { key: 'PACKED', label: 'Préparé' },
  { key: 'ASSIGNED_TO_CONTAINER', label: 'Container' },
  { key: 'LOADED_IN_CONTAINER', label: 'Chargé' },
  { key: 'IN_TRANSIT', label: 'Transit' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrivé' },
  { key: 'READY_FOR_PICKUP', label: 'Prêt' },
  { key: 'DELIVERED', label: 'Livré' },
];

interface GoodsFilterChipsProps {
  selectedStatus: GoodsStatus | 'all';
  onSelect: (status: GoodsStatus | 'all') => void;
}

export const GoodsFilterChips: React.FC<GoodsFilterChipsProps> = ({
  selectedStatus,
  onSelect,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
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
              activeOpacity={0.7}
              onPress={() => onSelect(filter.key)}
            >
              <Text style={[styles.text, isSelected && styles.textActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    wrapper: {
      marginTop: Theme.spacing.lg,
      marginBottom: Theme.spacing.sm,
    },
    list: {
      paddingHorizontal: Theme.spacing.xl,
      gap: Theme.spacing.sm,
    },
    pill: {
      paddingHorizontal: Theme.spacing.lg,
      paddingVertical: 9,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    },
    pillActive: {
      backgroundColor: colors.primary[100],
      borderColor: colors.primary.main,
    },
    text: {
      fontSize: 13.5,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    textActive: {
      color: colors.primary[700],
      fontWeight: '700',
    },
  });

export default GoodsFilterChips;
