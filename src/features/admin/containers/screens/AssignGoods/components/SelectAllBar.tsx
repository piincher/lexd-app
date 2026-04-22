import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Ionicons } from '@expo/vector-icons';

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
  if (totalCount === 0) {
    return null;
  }

  const isAllSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <View style={styles.selectAllBar}>
      <TouchableOpacity style={styles.selectAllButton} onPress={onToggleSelectAll}>
        <View style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}>
          {isAllSelected && <Ionicons name="checkmark" size={18} color={Theme.colors.background.card} />}
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
    backgroundColor: '#F8F9FA',
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
    borderColor: '#CED4DA',
    backgroundColor: Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  selectAllText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  resultsText: {
    fontSize: 14,
    color: '#6C757D',
  },
});
