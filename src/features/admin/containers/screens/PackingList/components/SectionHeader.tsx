import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface SectionHeaderProps {
  allExpanded: boolean;
  clientCount?: number;
  totalItems?: number;
  totalQuantity?: number;
  onToggleAll: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  allExpanded,
  clientCount,
  totalItems,
  totalQuantity,
  onToggleAll,
}) => {
  const title = clientCount === 1 ? 'Marchandises du client' : 'Marchandises par client';
  const meta =
    typeof clientCount === 'number' && typeof totalItems === 'number'
      ? `${clientCount} client${clientCount > 1 ? 's' : ''} • ${totalItems} colis • ${totalQuantity || 0} articles`
      : null;

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        <Ionicons name="people" size={18} color={Theme.neutral[600]} />
        <View style={styles.sectionTitleBlock}>
          <Text style={styles.sectionHeaderTitle} numberOfLines={1}>
            {title}
          </Text>
          {!!meta && <Text style={styles.sectionHeaderMeta}>{meta}</Text>}
        </View>
      </View>
      <TouchableOpacity
        onPress={onToggleAll}
        style={styles.expandAllButton}
        accessibilityRole="button"
      >
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
    gap: Theme.spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  sectionTitleBlock: {
    flex: 1,
    minWidth: 0,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  sectionHeaderMeta: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  expandAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.xs,
    minHeight: 44,
    paddingHorizontal: Theme.spacing.sm,
  },
  expandAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.primary[600],
  },
});
