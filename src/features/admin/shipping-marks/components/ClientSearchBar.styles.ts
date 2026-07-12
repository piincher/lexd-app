import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  container: {
    minHeight: 56,
    paddingLeft: 16,
    paddingRight: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  iconButton: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 48,
    height: 48,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
