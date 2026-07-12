import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background.default },
  flex: { flex: 1 },
  header: {
    minHeight: 72,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: { flex: 1, gap: 2 },
  title: { color: colors.text.primary, fontSize: 19, lineHeight: 25, fontWeight: '800' },
  subtitle: { color: colors.text.secondary, fontSize: 12, lineHeight: 17 },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: colors.background.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 16, paddingBottom: 32 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
