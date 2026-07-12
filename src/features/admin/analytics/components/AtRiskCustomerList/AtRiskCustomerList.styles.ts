import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  list: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingVertical: 8, paddingBottom: 24 },
  pagination: { paddingHorizontal: 16, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  pageButton: { flex: 1, paddingHorizontal: 8 },
  pageInfo: { minWidth: 76, alignItems: 'center', gap: 2 },
  pageValue: { color: colors.text.primary, fontSize: 15, lineHeight: 20, fontWeight: '800', fontVariant: ['tabular-nums'] },
  pageLabel: { color: colors.text.secondary, fontSize: 11, lineHeight: 15, textAlign: 'center' },
});
