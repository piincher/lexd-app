/**
 * RouteFilters Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  filterWrapper: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filterList: {
    paddingHorizontal: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.background.card,
    ...Theme.shadows.sm,
    overflow: 'hidden',
  },
  filterPillActive: {
    ...Theme.shadows.md,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  filterTextActive: {
    color: colors.text.inverse,
  },
});
