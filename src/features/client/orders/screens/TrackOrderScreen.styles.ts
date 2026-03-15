/**
 * TrackOrderScreen Styles
 */

import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  inputCard: {
    marginBottom: Theme.spacing.lg,
  },
  trackButton: {
    marginTop: Theme.spacing.md,
  },
  loadingState: {
    marginTop: Theme.spacing.xl,
  },
  errorState: {
    marginTop: Theme.spacing.xl,
  },
  resultsContainer: {
    flex: 1,
  },
  resultCard: {
    marginBottom: Theme.spacing.md,
  },
  statusLabel: {
    fontSize: 14,
    color: Theme.neutral[500],
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  detailLabel: {
    fontSize: 14,
    color: Theme.neutral[500],
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[800],
  },
  timelineItem: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.sm,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.neutral[400],
    marginTop: 4,
    marginRight: Theme.spacing.md,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  timelineLocation: {
    fontSize: 13,
    color: Theme.neutral[600],
    marginTop: 2,
  },
  timelineDate: {
    fontSize: 12,
    color: Theme.neutral[400],
    marginTop: 2,
  },
});
