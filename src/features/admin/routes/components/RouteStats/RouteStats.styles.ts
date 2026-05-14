/**
 * RouteStats Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  statsContainer: {
    paddingRight: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    minWidth: 140,
    ...Theme.shadows.sm,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[400],
  },
});
