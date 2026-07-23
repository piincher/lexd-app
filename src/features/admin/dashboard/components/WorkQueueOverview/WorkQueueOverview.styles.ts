import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

export const createStyles = (colors: ThemeContextType['colors'], isDark: boolean) => StyleSheet.create({
  container: { padding: Theme.spacing.md, gap: Theme.spacing.md },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Theme.spacing.md },
  eyebrow: { fontSize: 10, fontFamily: Fonts.bold, letterSpacing: 1.1, color: colors.text.secondary },
  title: { marginTop: 3, fontSize: 21, fontFamily: Fonts.bold, color: colors.text.primary },
  totalChip: { minWidth: 64, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 7, borderRadius: Theme.radius.md, backgroundColor: colors.background.paper },
  totalValue: { fontSize: 17, fontFamily: Fonts.bold, color: colors.text.primary, fontVariant: ['tabular-nums'] },
  totalLabel: { fontSize: 9.5, fontFamily: Fonts.medium, color: colors.text.secondary },
  summaryRow: { flexDirection: 'row', minHeight: 70, alignItems: 'center', borderRadius: Theme.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background.card },
  summaryCell: { flex: 1, minHeight: 56, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
  summaryValue: { fontSize: 19, fontFamily: Fonts.bold, color: colors.text.primary, fontVariant: ['tabular-nums'] },
  summaryLabel: { marginTop: 2, fontSize: 10.5, fontFamily: Fonts.medium, color: colors.text.secondary },
  summaryLink: { marginTop: 2, fontSize: 10.5, fontFamily: Fonts.bold, color: colors.primary.main },
  divider: { width: 1, height: 48, backgroundColor: colors.border },
  pressed: { opacity: 0.78 },
  notice: { flexDirection: 'row', gap: 8, padding: 10, borderRadius: Theme.radius.md, backgroundColor: isDark ? 'rgba(245,158,11,0.10)' : colors.feedback.warningBg },
  noticeText: { flex: 1, fontSize: 11.5, lineHeight: 16, fontFamily: Fonts.medium, color: colors.text.secondary },
});
