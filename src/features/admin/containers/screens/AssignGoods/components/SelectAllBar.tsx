import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface SelectAllBarProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
}

export const SelectAllBar: React.FC<SelectAllBarProps> = ({
  selectedCount,
  totalCount,
  onToggleSelectAll,
}) => {
  const { colors } = useAppTheme();
  if (totalCount === 0) {
    return null;
  }

  const isAllSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <View style={styles.selectAllBar}>
      <TouchableOpacity style={styles.selectAllButton} onPress={onToggleSelectAll}>
        <View style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}>
          {isAllSelected && <Ionicons name="checkmark" size={18} color={Theme.colors.text.inverse} />}
        </View>
        <Text style={styles.selectAllText}>
          {isAllSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.resultsText}>{totalCount} résultat(s)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectAllBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: Theme.colors.primary.main,
    borderColor: Theme.colors.primary.main,
  },
  selectAllText: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
    fontWeight: '500',
  },
  resultsText: {
    fontSize: 14,
    color: Theme.colors.text.secondary,
  },
});
