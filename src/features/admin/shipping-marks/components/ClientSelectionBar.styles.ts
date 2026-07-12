import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  container: {
    minHeight: 60,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: { width: 44, height: 48, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1, gap: 1 },
  title: { color: colors.text.primary, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  subtitle: { color: colors.text.secondary, fontSize: 12, lineHeight: 17, fontVariant: ['tabular-nums'] },
});
