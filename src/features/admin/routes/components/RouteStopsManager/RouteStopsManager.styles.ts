import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  inputWrapper: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  stopCard: {
    marginBottom: Theme.spacing.sm,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Theme.spacing.sm,
  },
  stopNumber: {
    width: 28,
    height: 28,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.primary[100],
    color: Theme.primary.main,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: '600',
  },
  stopName: {
    flex: 1,
    fontSize: 16,
    color: Theme.neutral[800],
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing['3xl'],
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
    borderWidth: 2,
    borderColor: Theme.neutral[200],
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: Theme.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  emptySubtext: {
    marginTop: Theme.spacing.xs,
    fontSize: 14,
    color: Theme.neutral[400],
  },
});
