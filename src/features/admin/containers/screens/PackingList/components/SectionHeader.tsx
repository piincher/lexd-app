import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface SectionHeaderProps {
  allExpanded: boolean;
  onToggleAll: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  allExpanded,
  onToggleAll,
}) => {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        <Ionicons name="people" size={18} color={Theme.neutral[600]} />
        <Text style={styles.sectionHeaderTitle}>Marchandises par Client</Text>
      </View>
      <TouchableOpacity onPress={onToggleAll} style={styles.expandAllButton}>
        <Text style={styles.expandAllText}>
          {allExpanded ? 'Tout réduire' : 'Tout déplier'}
        </Text>
        <Ionicons
          name={allExpanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={Theme.primary[600]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  expandAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  expandAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.primary[600],
  },
});
