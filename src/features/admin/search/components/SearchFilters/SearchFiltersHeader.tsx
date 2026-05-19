/**
 * SearchFiltersHeader - Header for filter panel
 * Shows title, preset button, and reset action
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Filtres</Text>
      <View style={styles.headerActions}>
        {presetsCount > 0 && (
          <TouchableOpacity style={styles.presetButton} onPress={onPresetsPress}>
            <Ionicons name="bookmark" size={16} color={colors.primary[500]} />
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

const createStyles = (colors: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  presetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.primary[50],
    borderRadius: 6,
  },
  presetButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary[500],
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.status.error,
  },
});
