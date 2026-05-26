/**
 * PeriodSelector
 * SRP: Period filter pills for analytics data range
 * Hallmark: refined pills, tighter voice
 */

import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { PeriodFilter, PeriodOption } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import Animated, { FadeIn } from 'react-native-reanimated';

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
          marginTop: 12,
          marginBottom: 8,
          gap: 8,
        },
        pill: {
          paddingHorizontal: 14,
          paddingVertical: 7,
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
    <Animated.View entering={FadeIn.delay(180).duration(350)} style={styles.container}>
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
    </Animated.View>
  );
};
