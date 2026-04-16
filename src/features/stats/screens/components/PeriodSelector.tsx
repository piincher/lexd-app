/**
 * PeriodSelector
 * SRP: Period filter pills for analytics data range
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { PeriodFilter, PeriodOption } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface PeriodSelectorProps {
  selected: PeriodFilter;
  onSelect: (period: PeriodFilter) => void;
}

const PERIODS: PeriodOption[] = [
  { key: '7d', label: '7 jours' },
  { key: '30d', label: '30 jours' },
  { key: '90d', label: '3 mois' },
  { key: '1y', label: '1 an' },
];

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selected, onSelect }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          paddingHorizontal: 20,
          gap: 8,
        },
        pill: {
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: colors.background.card,
          borderWidth: 1,
          borderColor: colors.border,
        },
        pillActive: {
          backgroundColor: colors.primary.main,
          borderColor: colors.primary.main,
        },
        pillText: {
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        pillTextActive: {
          color: colors.text.inverse,
          fontFamily: Fonts.bold,
          fontWeight: '700',
        },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      {PERIODS.map((p) => {
        const isActive = p.key === selected;
        return (
          <TouchableOpacity
            key={p.key}
            onPress={() => onSelect(p.key)}
            style={[styles.pill, isActive && styles.pillActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
