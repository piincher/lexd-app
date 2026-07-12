import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.feedback.successBg,
  },
  heading: { flex: 1, gap: 2 },
  eyebrow: {
    color: colors.primary.main,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text.primary,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
  description: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: isDark ? '500' : '400',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: colors.background.card,
  },
  stat: { flex: 1, gap: 2, paddingHorizontal: 4 },
  statValue: {
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  statLabel: { color: colors.text.secondary, fontSize: 12, lineHeight: 17 },
  statDivider: { width: 1, height: 34, backgroundColor: colors.divider, marginHorizontal: 10 },
});
