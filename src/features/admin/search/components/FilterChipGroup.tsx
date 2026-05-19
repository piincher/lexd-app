/**
 * FilterChipGroup - Group of selectable filter chips
 * Displays options as selectable chips
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface FilterOption {
  value: string;
  label: string;
  color?: string;
  icon?: string;
}

interface FilterChipGroupProps {
  options: FilterOption[];
  selectedValues?: string | string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
}

export const FilterChipGroup: React.FC<FilterChipGroupProps> = ({
  options,
  selectedValues,
  onToggle,
  multiSelect = true,
}) => {
  const isSelected = (value: string): boolean => {
    if (multiSelect) {
      return Array.isArray(selectedValues) 
        ? selectedValues.includes(value)
        : selectedValues === value;
    }
    return selectedValues === value;
  };

  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const getChipStyle = (option: FilterOption, selected: boolean) => {
    if (!selected) return {};
    if (option.color) {
      return { backgroundColor: option.color + '20' };
    }
    return { backgroundColor: colors.primary[100] };
  };

  const getTextStyle = (option: FilterOption, selected: boolean) => {
    if (!selected) return {};
    if (option.color) {
      return { color: option.color };
    }
    return { color: colors.primary[600] };
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const selected = isSelected(option.value);
        return (
          <Chip
            key={option.value}
            selected={selected}
            onPress={() => onToggle(option.value)}
            style={[styles.chip, getChipStyle(option, selected)]}
            textStyle={[styles.chipText, getTextStyle(option, selected)]}
            icon={option.icon as any}
          >
            {option.label}
          </Chip>
        );
      })}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.neutral[100],
  },
  chipText: {
    fontSize: 12,
    color: colors.neutral[600],
  },
});
