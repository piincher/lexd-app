import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.neutral[800],
  },

  // StatusCard styles
  statusCard: {
    backgroundColor: colors.neutral[50],
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  statusIconContainer: {
    width: 56,
    height: 56,
    borderRadius: Theme.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  statusIcon: {
    width: 28,
    height: 28,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  statusDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[500],
    marginBottom: Theme.spacing.md,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  timestampLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[400],
  },
  timestampValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  notesContainer: {
    backgroundColor: colors.neutral[100],
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  notesText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[600],
    lineHeight: 20,
  },

  // Timeline styles
  timelineContainer: {
    paddingVertical: Theme.spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    paddingBottom: Theme.spacing.lg,
  },
  timelineItemCompleted: {
    opacity: 1,
  },
  timelineItemCurrent: {
    opacity: 1,
  },
  timelineItemPending: {
    opacity: 0.6,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: Theme.radius.full,
    marginRight: Theme.spacing.md,
    marginTop: 2,
  },
  timelineDotCompleted: {
    backgroundColor: colors.status.success,
  },
  timelineDotCurrent: {
    backgroundColor: colors.primary[500],
    transform: [{ scale: 1.2 }],
    ...Theme.shadows.md,
  },
  timelineDotPending: {
    backgroundColor: colors.neutral[300],
  },
  timelineConnector: {
    position: 'absolute',
    left: 7,
    top: 18,
    width: 2,
    height: '100%',
    backgroundColor: colors.neutral[200],
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Theme.spacing.md,
  },
  timelineStatusLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: Theme.spacing.xs,
  },
  timelineWaypointName: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.neutral[500],
    marginBottom: Theme.spacing.xs,
  },
  timelineTimestamp: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.neutral[400],
  },

  // ActionButtons styles
  actionsContainer: {
    gap: Theme.spacing.md,
  },
  primaryActionsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    gap: Theme.spacing.sm,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary[500],
    ...Theme.shadows.md,
  },
  actionButtonSecondary: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  moreActionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    backgroundColor: colors.neutral[50],
    marginTop: Theme.spacing.sm,
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: Theme.radius['3xl'],
    borderTopRightRadius: Theme.radius['3xl'],
    padding: Theme.spacing['2xl'],
    paddingBottom: Theme.spacing['4xl'],
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: Theme.spacing['2xl'],
  },
  statusTransition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing['2xl'],
    gap: Theme.spacing.lg,
  },
  statusBox: {
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    minWidth: 120,
  },
  statusBoxCurrent: {
    backgroundColor: colors.neutral[100],
  },
  statusBoxNew: {
    backgroundColor: colors.primary[50],
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: colors.neutral[400],
  },
  notesInput: {
    backgroundColor: colors.neutral[50],
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 15,
    fontWeight: '500',
    color: colors.neutral[800],
    marginBottom: Theme.spacing['2xl'],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    ...Theme.shadows.md,
  },
});
