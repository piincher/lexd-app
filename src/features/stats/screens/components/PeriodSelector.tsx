/**
 * PeriodSelector
 * SRP: Period filter pills for analytics data range
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { PeriodFilter, PeriodOption } from '../../types';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
  },
  pillActive: {
    backgroundColor: Theme.primary[500],
    borderColor: Theme.primary[500],
  },
  pillText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  pillTextActive: {
    color: '#FFF',
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
});
