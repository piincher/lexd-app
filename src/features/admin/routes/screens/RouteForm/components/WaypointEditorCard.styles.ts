import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: {
    gap: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.primary[50],
  },
  indexText: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.primary[600],
  },
  headerTitle: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 34,
    height: 34,
    margin: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  input: {
    backgroundColor: Theme.colors.background.card,
  },
  twoColumn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  flexInput: {
    flex: 1,
    minWidth: 132,
    backgroundColor: Theme.colors.background.card,
  },
  dayInput: {
    width: 96,
    backgroundColor: Theme.colors.background.card,
  },
  segmented: {
    minHeight: 44,
  },
  switchRow: {
    minHeight: 44,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  switchItem: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  switchText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
});
