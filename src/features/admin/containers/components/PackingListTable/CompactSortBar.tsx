import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { SortConfig, SortField } from './usePackingListSort';
import { createCompactSortStyles } from './CompactSortBar.styles';

const OPTIONS: { field: SortField; label: string }[] = [
  { field: 'goodsId', label: 'ID' }, { field: 'description', label: 'Description' },
  { field: 'actualCBM', label: 'CBM' }, { field: 'weight', label: 'Poids' },
  { field: 'quantity', label: 'Quantité' },
];

interface CompactSortBarProps { sortConfig: SortConfig; onSort: (field: SortField) => void }

export const CompactSortBar = ({ sortConfig, onSort }: CompactSortBarProps) => {
  const { colors, isDark } = useAppTheme();
  const styles = createCompactSortStyles(colors, isDark);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Trier par</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.options}>
        {OPTIONS.map(({ field, label }) => {
          const selected = sortConfig.field === field;
          return <TouchableOpacity key={field} style={[styles.option, selected && styles.optionSelected]} onPress={() => onSort(field)} accessibilityRole="button" accessibilityState={{ selected }} accessibilityLabel={`Trier par ${label}${selected ? `, ordre ${sortConfig.direction === 'asc' ? 'croissant' : 'décroissant'}` : ''}`}>
            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
            {selected && <Ionicons name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'} size={15} color={colors.primary[700]} />}
          </TouchableOpacity>;
        })}
      </ScrollView>
    </View>
  );
};
