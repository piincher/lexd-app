/**
 * SearchFiltersHeader - Header for filter panel
 * Shows title, preset button, and reset action
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface SearchFiltersHeaderProps {
  presetsCount: number;
  hasActiveFilters: boolean;
  onPresetsPress: () => void;
  onReset: () => void;
}

export const SearchFiltersHeader: React.FC<SearchFiltersHeaderProps> = ({
  presetsCount,
  hasActiveFilters,
  onPresetsPress,
  onReset,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Filtres</Text>
      <View style={styles.headerActions}>
        {presetsCount > 0 && (
          <TouchableOpacity style={styles.presetButton} onPress={onPresetsPress}>
            <Ionicons name="bookmark" size={16} color={Theme.primary[500]} />
            <Text style={styles.presetButtonText}>Préréglages</Text>
          </TouchableOpacity>
        )}
        {hasActiveFilters && (
          <TouchableOpacity onPress={onReset}>
            <Text style={styles.resetText}>Réinitialiser</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[200],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  presetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: Theme.primary[50],
    borderRadius: Theme.radius.md,
  },
  presetButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.primary[500],
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.status.error,
  },
});
