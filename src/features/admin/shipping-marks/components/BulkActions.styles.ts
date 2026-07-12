import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  container: {
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 44,
    height: 48,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.feedback.successBg,
  },
  clearButton: {
    width: 44,
    height: 48,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.paper,
  },
  summary: { flex: 1, minWidth: 0, gap: 1 },
  title: { color: colors.text.primary, fontSize: 14, lineHeight: 19, fontWeight: '700' },
  subtitle: { color: colors.text.secondary, fontSize: 12, lineHeight: 17, fontVariant: ['tabular-nums'] },
  sendButton: { minWidth: 132, paddingHorizontal: 14 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
