import React, { useMemo } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { WorkQueueFilter } from '../../types';
import { createStyles } from './WorkQueueFilters.styles';

interface WorkQueueFiltersProps {
  selected: WorkQueueFilter;
  counts: Record<WorkQueueFilter, number>;
  onChange: (filter: WorkQueueFilter) => void;
}

const filters: Array<{ id: WorkQueueFilter; label: string }> = [
  { id: 'all', label: 'Toutes' },
  { id: 'critical', label: 'Critiques' },
  { id: 'goods', label: 'Marchandises' },
  { id: 'payment', label: 'Paiements' },
];

export const WorkQueueFilters: React.FC<WorkQueueFiltersProps> = ({ selected, counts, onChange }) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {filters.map((filter) => {
        const active = selected === filter.id;
        return (
          <Pressable
            key={filter.id}
            onPress={() => onChange(filter.id)}
            style={({ pressed }) => [styles.chip, active && styles.chipActive, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${filter.label}, ${counts[filter.id]}`}
            android_ripple={{ color: colors.primary.main + '18' }}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{filter.label}</Text>
            <Text style={[styles.count, active && styles.countActive]}>{counts[filter.id]}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
