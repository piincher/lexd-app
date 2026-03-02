/**
 * PeriodSelector Component
 * Segmented control for selecting report period
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ReportPeriod } from '../types';

interface PeriodSelectorProps {
  selectedPeriod: ReportPeriod;
  onSelect: (period: ReportPeriod) => void;
  allowedPeriods?: ReportPeriod[];
  showCustom?: boolean;
}

const defaultPeriods: ReportPeriod[] = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

const periodLabels: Record<ReportPeriod, string> = {
  DAILY: 'Jour',
  WEEKLY: 'Semaine',
  MONTHLY: 'Mois',
  YEARLY: 'Année',
  CUSTOM: 'Personnalisé',
};

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onSelect,
  allowedPeriods = defaultPeriods,
  showCustom = true,
}) => {
  const theme = useTheme();

  const periods = showCustom ? [...allowedPeriods, 'CUSTOM'] : allowedPeriods;

  return (
    <View style={styles.container}>
      {periods.map((period) => {
        const isSelected = period === selectedPeriod;

        return (
          <TouchableOpacity
            key={period}
            style={[
              styles.button,
              {
                backgroundColor: isSelected ? theme.colors.primary : 'transparent',
                borderColor: isSelected ? theme.colors.primary : '#E5E7EB',
              },
            ]}
            onPress={() => onSelect(period)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.label,
                { color: isSelected ? '#FFFFFF' : '#6B7280' },
              ]}
            >
              {periodLabels[period]}
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
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PeriodSelector;
