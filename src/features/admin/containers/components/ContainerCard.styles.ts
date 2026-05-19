import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius['2xl'],
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.sm,
    ...Theme.shadows.md,
    overflow: 'hidden',
  },
  statusBar: {
    height: 4,
    width: '100%',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  assignableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.status.success + '18',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    gap: 2,
  },
  assignableBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.status.success,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  containerNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.neutral[800],
    letterSpacing: -0.5,
  },
  modeBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    flexWrap: 'wrap',
  },
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    gap: Theme.spacing.xs,
  },
  modeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.neutral[100],
    gap: Theme.spacing.xs,
    flex: 1,
    maxWidth: '60%',
  },
  routeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[600],
  },
  shippingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  shippingLineText: {
    fontSize: 13,
    color: colors.neutral[500],
    marginLeft: Theme.spacing.sm,
    fontWeight: '500',
  },
  consignee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  consigneeText: {
    fontSize: 13,
    color: colors.neutral[500],
    marginLeft: Theme.spacing.sm,
    fontWeight: '500',
  },
  capacitySection: {
    marginBottom: Theme.spacing.lg,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  capacityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  capacityValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.neutral[100],
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  capacityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.sm,
  },
  capacityStatsText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[500],
  },
  goodsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary[600],
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  timelineItem: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  timelineLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.neutral[400],
  },
  timelineLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.neutral[200],
    marginHorizontal: 8,
    marginBottom: 16,
  },
});
