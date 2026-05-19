import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral[50] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  title: { fontSize: 17, fontWeight: '700', color: colors.neutral[800] },
  bagSelector: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: colors.neutral[100],
  },
  bagLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  bagChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  bagChip: { borderRadius: 8 },
  bagButton: { borderRadius: 8, alignSelf: 'flex-start' },
  summary: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: colors.primary[50],
  },
  summaryText: { fontSize: 13, fontWeight: '600', color: colors.primary[700] },
  warningText: { fontSize: 12, fontWeight: '600', color: colors.status.error, marginTop: 4 },
  listContent: { paddingHorizontal: Theme.spacing.lg, paddingBottom: 100 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { marginTop: Theme.spacing.md, fontSize: 14, color: colors.neutral[400] },
  footer: {
    padding: Theme.spacing.lg,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  assignButton: { borderRadius: Theme.radius.lg },
  loadingText: { textAlign: 'center', marginTop: 40, color: colors.neutral[500] },
});
