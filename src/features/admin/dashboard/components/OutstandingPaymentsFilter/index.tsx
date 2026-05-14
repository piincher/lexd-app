import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OutstandingPaymentsFilter.styles';

interface OutstandingPaymentsFilterProps {
  status?: string;
  onChange: (status?: string) => void;
}

const FILTERS = [
  { key: undefined as string | undefined, label: 'Tous' },
  { key: 'UNPAID' as string | undefined, label: 'Impayés' },
  { key: 'PARTIAL' as string | undefined, label: 'Partiels' },
];

export const OutstandingPaymentsFilter: React.FC<OutstandingPaymentsFilterProps> = ({
  status,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.filterRow}>
      {FILTERS.map((filter) => {
        const isActive = status === filter.key;
        return (
          <TouchableOpacity
            key={filter.label}
            style={[styles.filterChip, isActive && styles.filterChipActive]}
            onPress={() => onChange(filter.key)}
          >
            <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
