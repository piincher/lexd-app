import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const title = clientCount === 1 ? 'Marchandises du client' : 'Marchandises par client';
  const meta =
    typeof clientCount === 'number' && typeof totalItems === 'number'
      ? `${clientCount} client${clientCount > 1 ? 's' : ''} • ${totalItems} colis • ${totalQuantity || 0} articles`
      : null;

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderLeft}>
        <Ionicons name="people" size={18} color={colors.text.secondary} />
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
        accessibilityLabel={allExpanded ? 'Réduire toutes les sections client' : 'Déplier toutes les sections client'}
        accessibilityState={{ expanded: allExpanded }}
      >
        <Text style={styles.expandAllText}>
          {allExpanded ? 'Tout réduire' : 'Tout déplier'}
        </Text>
        <Ionicons
          name={allExpanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.primary[600]}
        />
      </TouchableOpacity>
    </View>
  );
};

type AppColors = ReturnType<typeof useAppTheme>['colors'];

const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
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
    color: colors.text.primary,
  },
  sectionHeaderMeta: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  expandAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.xs,
    minHeight: 48,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    backgroundColor: isDark ? colors.neutral[200] : colors.primary[50],
  },
  expandAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary[600],
  },
});
