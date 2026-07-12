import { StyleSheet } from 'react-native';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];
export const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  panel: { backgroundColor: colors.background.card, borderRadius: Theme.radius.lg, borderWidth: 1, borderColor: isDark ? colors.neutral[700] : colors.neutral[200], padding: Theme.spacing.lg, marginBottom: Theme.spacing.lg, ...Theme.shadows.sm },
  heroRow: { flexDirection: 'row', alignItems: 'stretch', gap: Theme.spacing.md },
  heroCopy: { flex: 1, minWidth: 0 },
  eyebrow: { fontSize: 12, fontWeight: '800', color: colors.primary[600], textTransform: 'uppercase' },
  scope: { marginTop: 4, fontSize: 20, fontWeight: '900', color: colors.text.primary },
  meta: { marginTop: 4, fontSize: 13, fontWeight: '700', color: colors.text.secondary },
  articleHero: { minWidth: 92, borderRadius: Theme.radius.lg, backgroundColor: isDark ? colors.neutral[200] : colors.primary[50], alignItems: 'center', justifyContent: 'center', paddingHorizontal: Theme.spacing.sm },
  articleValue: { fontSize: 24, fontWeight: '900', color: colors.primary[700] },
  articleLabel: { fontSize: 12, fontWeight: '800', color: colors.primary[700] },
  capacityBlock: { marginTop: Theme.spacing.lg },
  capacityHeader: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.xs, marginBottom: Theme.spacing.sm },
  capacityTitle: { flex: 1, fontSize: 13, fontWeight: '800', color: colors.text.primary },
  capacityMeta: { fontSize: 13, fontWeight: '800', color: colors.text.secondary },
  capacityWarning: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.xs, marginTop: Theme.spacing.sm, padding: Theme.spacing.sm, borderRadius: Theme.radius.sm, backgroundColor: colors.feedback.errorBg },
  capacityWarningText: { flex: 1, fontSize: 13, fontWeight: '700', color: colors.status.error },
  metrics: { flexDirection: 'row', gap: Theme.spacing.sm, marginTop: Theme.spacing.md },
  metric: { flex: 1, minWidth: 0, borderRadius: Theme.radius.sm, paddingVertical: Theme.spacing.sm, backgroundColor: isDark ? colors.neutral[200] : colors.neutral[50], alignItems: 'center' },
  metricValue: { fontSize: 14, fontWeight: '900', color: colors.text.primary },
  metricLabel: { marginTop: 2, fontSize: 12, fontWeight: '700', color: colors.text.secondary },
});
