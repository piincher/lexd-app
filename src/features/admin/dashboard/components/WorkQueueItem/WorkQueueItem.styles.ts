import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

export const createStyles = (colors: ThemeContextType['colors'], isDark: boolean) => StyleSheet.create({
  card: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.card,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.78 },
  severityBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? colors.neutral[800] : colors.background.paper,
  },
  content: { flex: 1, minWidth: 0 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  goodsId: { fontSize: 12, fontFamily: Fonts.bold, color: colors.text.secondary, letterSpacing: 0.4 },
  ageChip: { minHeight: 24, justifyContent: 'center', paddingHorizontal: 8, borderRadius: Theme.radius.full, backgroundColor: colors.background.paper },
  ageText: { fontSize: 11, fontFamily: Fonts.bold, fontVariant: ['tabular-nums'] },
  title: { marginTop: 2, fontSize: 15, fontFamily: Fonts.bold, color: colors.text.primary },
  description: { marginTop: 2, fontSize: 12.5, fontFamily: Fonts.regular, color: colors.text.secondary },
  metaRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center', minWidth: 0 },
  kind: { fontSize: 11.5, fontFamily: Fonts.medium, color: colors.text.secondary },
  client: { flex: 1, fontSize: 11.5, fontFamily: Fonts.regular, color: colors.text.secondary },
  amount: { marginLeft: 8, fontSize: 12, fontFamily: Fonts.bold, color: colors.status.error, fontVariant: ['tabular-nums'] },
});
