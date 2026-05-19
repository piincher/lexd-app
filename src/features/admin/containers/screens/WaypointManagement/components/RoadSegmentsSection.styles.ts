import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  segmentsContainer: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  segmentsHeader: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,
  },
  segmentsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.neutral[900],
    marginTop: Theme.spacing.md,
  },
  segmentsSubtitle: {
    fontSize: 16,
    color: colors.neutral[500],
    marginTop: Theme.spacing.sm,
  },
  segmentCard: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  segmentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.status.warning}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  segmentInfo: {
    flex: 1,
  },
  segmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  segmentVehicle: {
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },
  segmentBadge: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
  },
  segmentBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  segmentDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  detailText: {
    fontSize: 13,
    color: colors.neutral[700],
    marginLeft: Theme.spacing.md,
  },
});
