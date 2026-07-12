import { StyleSheet } from 'react-native';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];

export const createCardStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  card: { padding: Theme.spacing.md, borderBottomWidth: 1, borderBottomColor: isDark ? colors.neutral[700] : colors.neutral[200], backgroundColor: colors.background.card, minHeight: 120 },
  pressed: { opacity: 0.78 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.sm },
  indexBadge: { width: 32, height: 32, borderRadius: Theme.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary[100] },
  indexText: { fontSize: 13, fontWeight: '800', color: colors.primary[700] },
  heading: { flex: 1, minWidth: 0 },
  goodsId: { fontSize: 14, fontWeight: '800', color: colors.text.primary },
  description: { marginTop: 3, fontSize: 14, lineHeight: 20, color: colors.text.secondary },
  photo: { width: 44, height: 44, borderRadius: Theme.radius.md, backgroundColor: colors.neutral[200] },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: Theme.spacing.sm, marginTop: Theme.spacing.md },
  metric: { flexGrow: 1, flexBasis: 88, minWidth: 88, minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: Theme.spacing.sm, borderRadius: Theme.radius.md, backgroundColor: isDark ? colors.neutral[200] : colors.neutral[50] },
  metricIcon: { color: colors.primary[600] },
  warningIcon: { color: colors.status.warning },
  metricLabel: { fontSize: 11, fontWeight: '600', color: colors.text.secondary },
  metricValue: { marginTop: 1, fontSize: 13, fontWeight: '800', color: colors.text.primary },
  warningValue: { marginTop: 1, fontSize: 12, fontWeight: '800', color: colors.status.warning },
  details: { marginTop: Theme.spacing.md, paddingTop: Theme.spacing.sm, borderTopWidth: 1, borderTopColor: isDark ? colors.neutral[700] : colors.neutral[200], gap: Theme.spacing.sm },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Theme.spacing.md },
  detailLabel: { fontSize: 13, color: colors.text.secondary },
  detailValue: { flex: 1, fontSize: 13, fontWeight: '700', color: colors.text.primary, textAlign: 'right', textTransform: 'capitalize' },
});
