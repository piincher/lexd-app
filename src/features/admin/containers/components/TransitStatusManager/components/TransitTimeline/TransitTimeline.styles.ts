import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => {
  const statusColors = {
    completed: colors.status.success,
    current: colors.primary[500],
    pending: colors.neutral[300],
  };

  return StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
  },
  timelineContainer: {
    paddingVertical: Theme.spacing.sm,
  },
  timelineItemRow: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.lg,
  },
  timelineDotContainer: {
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineDotCompleted: {
    backgroundColor: statusColors.completed,
  },
  timelineDotCurrent: {
    backgroundColor: statusColors.current,
    borderWidth: 3,
    borderColor: `${statusColors.current}40`,
  },
  timelineDotPending: {
    backgroundColor: colors.neutral[100],
    borderWidth: 2,
    borderColor: colors.neutral[300],
  },
  timelineDotPulse: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: statusColors.current,
    zIndex: 1,
  },
  currentDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.background.card,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.neutral[200],
    marginTop: 4,
    marginBottom: -Theme.spacing.lg,
    minHeight: 40,
  },
  timelineConnectorCompleted: {
    backgroundColor: statusColors.completed,
  },
  statusContentContainer: {
    flex: 1,
    paddingTop: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusIconContainer: {
    width: 36,
    height: 36,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.sm,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral[500],
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusLabelCompleted: {
    color: statusColors.completed,
  },
  statusLabelCurrent: {
    color: statusColors.current,
    fontWeight: '700',
  },
  statusLabelPending: {
    color: colors.neutral[400],
  },
  waypointName: {
    fontSize: 15,
    color: colors.neutral[800],
    fontWeight: '600',
  },
  countryName: {
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: colors.neutral[400],
    marginTop: Theme.spacing.xs,
    fontStyle: 'italic',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
    gap: Theme.spacing.xs,
  },
  timestamp: {
    fontSize: 12,
    color: colors.neutral[400],
  },
  emptyContainer: {
    padding: Theme.spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: Theme.spacing.md,
    fontSize: 14,
    color: colors.neutral[400],
    textAlign: 'center',
  },
  });
};
