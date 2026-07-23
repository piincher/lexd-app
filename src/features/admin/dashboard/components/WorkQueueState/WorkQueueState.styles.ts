import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';

export const createStyles = (colors: ThemeContextType['colors']) => StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: Theme.spacing.xl, paddingVertical: 56 },
  title: { marginTop: Theme.spacing.md, fontSize: 17, fontFamily: Fonts.bold, color: colors.text.primary },
  body: { marginTop: 6, textAlign: 'center', fontSize: 13, lineHeight: 19, fontFamily: Fonts.regular, color: colors.text.secondary },
  button: { minHeight: 48, marginTop: Theme.spacing.lg, justifyContent: 'center', paddingHorizontal: 22, borderRadius: Theme.radius.full, backgroundColor: colors.primary.main },
  buttonText: { fontSize: 13, fontFamily: Fonts.bold, color: colors.text.inverse },
  pressed: { opacity: 0.78 },
});
