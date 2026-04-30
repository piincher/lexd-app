import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

const STATUS_COLORS = {
  completed: Theme.status.success,
  current: Theme.primary[500],
  pending: Theme.neutral[300],
};

export const styles = StyleSheet.create({
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
    backgroundColor: Theme.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineDotCompleted: {
    backgroundColor: STATUS_COLORS.completed,
  },
  timelineDotCurrent: {
    backgroundColor: STATUS_COLORS.current,
    borderWidth: 3,
    borderColor: `${STATUS_COLORS.current}40`,
  },
  timelineDotPending: {
    backgroundColor: Theme.neutral[100],
    borderWidth: 2,
    borderColor: Theme.neutral[300],
  },
  timelineDotPulse: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: STATUS_COLORS.current,
    zIndex: 1,
  },
  currentDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.background.card,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.neutral[200],
    marginTop: 4,
    marginBottom: -Theme.spacing.lg,
    minHeight: 40,
  },
  timelineConnectorCompleted: {
    backgroundColor: STATUS_COLORS.completed,
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
    color: Theme.neutral[500],
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusLabelCompleted: {
    color: STATUS_COLORS.completed,
  },
  statusLabelCurrent: {
    color: STATUS_COLORS.current,
    fontWeight: '700',
  },
  statusLabelPending: {
    color: Theme.neutral[400],
  },
  waypointName: {
    fontSize: 15,
    color: Theme.neutral[800],
    fontWeight: '600',
  },
  countryName: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: Theme.neutral[400],
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
    color: Theme.neutral[400],
  },
  emptyContainer: {
    padding: Theme.spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: Theme.spacing.md,
    fontSize: 14,
    color: Theme.neutral[400],
    textAlign: 'center',
  },
});
