import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  waypointCard: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  waypointCardCurrent: {
    borderWidth: 2,
    borderColor: colors.status.info,
    ...Theme.shadows.md,
  },
  waypointCardCompleted: {
    opacity: 0.9,
  },
  waypointCardDakar: {
    borderWidth: 2,
    borderColor: colors.status.info,
    ...Theme.shadows.md,
  },
  waypointCardBorder: {
    borderWidth: 2,
    borderColor: colors.status.warning,
    ...Theme.shadows.md,
  },
  waypointCardWarehouse: {
    borderWidth: 2,
    borderColor: colors.primary.main,
    ...Theme.shadows.md,
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  statusBarDakar: {
    height: 6,
    backgroundColor: colors.status.info,
  },
  statusBarBorder: {
    height: 6,
    backgroundColor: colors.status.warning,
  },
  waypointContent: {
    padding: Theme.spacing.lg,
  },
  waypointHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  waypointNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  waypointNumberDakar: {
    backgroundColor: colors.status.info,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  waypointNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary[600],
  },
  waypointNumberTextDakar: {
    color: colors.text.inverse,
    fontSize: 18,
  },
  waypointTitleContainer: {
    flex: 1,
  },
  waypointLocation: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  waypointLocationDakar: {
    fontSize: 18,
    color: colors.status.info,
  },
  waypointCode: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 2,
  },
  waypointBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  routeDisplayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[600],
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    marginTop: Theme.spacing.xs,
    alignSelf: 'flex-start',
    gap: 4,
  },
  routeDisplayText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text.inverse,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    flexWrap: 'wrap',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  typeBadgeText: {
    fontSize: 11,
    color: colors.neutral[600],
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  currentIndicator: {
    backgroundColor: colors.status.info,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
  },
  currentIndicatorText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.neutral[600],
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
});
