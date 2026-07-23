import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

export const createStyles = (colors: ThemeContextType['colors']) => StyleSheet.create({
  row: { paddingHorizontal: Theme.spacing.md, paddingBottom: Theme.spacing.md, gap: Theme.spacing.sm },
  chip: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, borderRadius: Theme.radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background.card },
  chipActive: { borderColor: colors.primary.main, backgroundColor: colors.primary.main },
  label: { fontSize: 12.5, fontFamily: Fonts.medium, color: colors.text.secondary },
  labelActive: { fontFamily: Fonts.bold, color: colors.text.inverse },
  count: { fontSize: 11, fontFamily: Fonts.bold, color: colors.text.secondary, fontVariant: ['tabular-nums'] },
  countActive: { color: colors.text.inverse },
  pressed: { opacity: 0.78 },
});
