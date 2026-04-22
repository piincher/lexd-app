import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.neutral[50] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  title: { fontSize: 17, fontWeight: '700', color: Theme.neutral[800] },
  bagSelector: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.neutral[100],
  },
  bagLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  bagChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  bagChip: { borderRadius: 8 },
  bagButton: { borderRadius: 8, alignSelf: 'flex-start' },
  summary: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.primary[50],
  },
  summaryText: { fontSize: 13, fontWeight: '600', color: Theme.primary[700] },
  warningText: { fontSize: 12, fontWeight: '600', color: Theme.status.error, marginTop: 4 },
  listContent: { paddingHorizontal: Theme.spacing.lg, paddingBottom: 100 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyText: { marginTop: Theme.spacing.md, fontSize: 14, color: Theme.neutral[400] },
  footer: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: Theme.neutral[100],
  },
  assignButton: { borderRadius: Theme.radius.lg },
  loadingText: { textAlign: 'center', marginTop: 40, color: Theme.neutral[500] },
});
