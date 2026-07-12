import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageInfo: { minWidth: 74, alignItems: 'center', gap: 1 },
  pageValue: { color: colors.text.primary, fontSize: 16, lineHeight: 21, fontWeight: '800', fontVariant: ['tabular-nums'] },
  pageLabel: { color: colors.text.secondary, fontSize: 11, lineHeight: 15, textTransform: 'uppercase', letterSpacing: 0.7 },
  disabled: { opacity: 0.48 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
