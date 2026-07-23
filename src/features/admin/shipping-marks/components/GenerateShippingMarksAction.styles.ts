import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors, isDark?: boolean, accent?: string, softBg?: string) => {
  const accentColor = accent ?? colors.primary.main;
  return StyleSheet.create({
    card: { minHeight: 72, marginBottom: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: accentColor, borderRadius: 16, backgroundColor: softBg ?? (isDark ? colors.background.paper : colors.primary.light) },
    iconBox: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background.card },
    copy: { flex: 1, minWidth: 0 },
    title: { color: colors.text.primary, fontSize: 15, lineHeight: 21, fontWeight: '800' },
    subtitle: { marginTop: 2, color: colors.text.secondary, fontSize: 12, lineHeight: 17 },
    track: { height: 4, marginTop: 7, borderRadius: 2, overflow: 'hidden', backgroundColor: colors.border },
    fill: { height: '100%', borderRadius: 2, backgroundColor: accentColor },
    pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
    disabled: { opacity: 0.55 },
  });
};
