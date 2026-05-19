/**
 * RouteCard Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  routeCard: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.radius.xl,
    backgroundColor: colors.background.card,
    ...Theme.shadows.sm,
  },
  routeCardContent: {
    padding: Theme.spacing.lg,
  },
  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  routeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modeIndicator: {
    width: 24,
    height: 24,
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.neutral[400],
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  routeArrow: {
    paddingHorizontal: Theme.spacing.sm,
  },
  routeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
    paddingTop: Theme.spacing.md,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[500],
    marginLeft: Theme.spacing.xs,
  },
});
