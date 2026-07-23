import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    gap: 13,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 },
  iconBox: {
    width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.feedback.successBg,
  },
  heading: { flex: 1, gap: 2 },
  eyebrow: { color: colors.primary.main, fontSize: 11, lineHeight: 15, fontWeight: '800', letterSpacing: 0.7 },
  title: { color: colors.text.primary, fontSize: 17, lineHeight: 23, fontWeight: '800' },
  step: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  stepNumber: {
    width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    backgroundColor: isDark ? colors.background.card : colors.feedback.successBg,
  },
  stepNumberText: { color: colors.primary.main, fontSize: 13, fontWeight: '900' },
  stepText: { flex: 1 },
  stepTitle: { color: colors.text.primary, fontSize: 14, lineHeight: 19, fontWeight: '700' },
  stepDetail: { color: colors.text.secondary, fontSize: 12, lineHeight: 17 },
  createButton: {
    minHeight: 50, borderRadius: 14, paddingHorizontal: 14, marginTop: 2,
    flexDirection: 'row', alignItems: 'center', gap: 9,
    backgroundColor: colors.background.card, overflow: 'hidden',
  },
  createButtonText: { flex: 1, color: colors.primary.main, fontSize: 14, lineHeight: 20, fontWeight: '800' },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
});
