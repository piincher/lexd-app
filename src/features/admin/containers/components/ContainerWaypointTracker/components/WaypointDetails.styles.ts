import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const waypointDetailsStyles = StyleSheet.create({
  expandedContent: {
    marginTop: Theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.neutral[200],
    marginVertical: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  timeItem: {
    flex: 1,
    minWidth: '45%',
  },
  timeLabel: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  timePending: {
    color: Theme.neutral[400],
    fontStyle: 'italic',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  detailLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[800],
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[700],
  },
});
