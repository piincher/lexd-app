import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  expandedContent: {
    marginTop: Theme.spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.neutral[700],
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
    color: colors.neutral[500],
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  timePending: {
    color: colors.neutral[400],
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
    color: colors.neutral[500],
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: colors.neutral[800],
    fontWeight: '500',
  },
  notesContainer: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    color: colors.neutral[700],
  },
});
