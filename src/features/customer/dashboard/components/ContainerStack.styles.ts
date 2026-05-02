import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createContainerStackStyles = (colors: Colors, isDark: boolean) =>
  StyleSheet.create({
    container: { marginTop: 28, paddingHorizontal: 16 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    title: { fontSize: 16, fontWeight: '700', color: colors.text.primary },
    badge: {
      backgroundColor: `${colors.primary.main}12`,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    badgeText: { fontSize: 11, fontWeight: '700', color: colors.primary.main },
    stack: { gap: 10 },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 20,
      flexDirection: 'row',
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    },
    accent: { width: 4 },
    content: { flex: 1, padding: 16, gap: 10 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    modeCircle: {
      width: 42,
      height: 42,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    number: { fontSize: 15, fontWeight: '800', color: colors.text.primary },
    sub: { fontSize: 12, color: colors.text.disabled, marginTop: 1 },
    pill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
    pillText: { fontSize: 11, fontWeight: '700' },
    timeline: { flexDirection: 'row', gap: 20, marginLeft: 54 },
    tlItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    tlText: { fontSize: 11, color: colors.text.disabled },
    goodsPreview: { marginLeft: 54, fontSize: 12, color: colors.text.secondary },
  });
