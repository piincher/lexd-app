import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 18,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  selectedCard: { borderColor: colors.primary.main, backgroundColor: colors.feedback.successBg },
  mainRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  selectionTarget: { width: 44, height: 48, alignItems: 'center', justifyContent: 'center' },
  previewButton: {
    width: 68,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.card,
  },
  thumb: { width: '100%', height: '100%' },
  info: { flex: 1, minWidth: 0, gap: 4 },
  name: { color: colors.text.primary, fontSize: 16, lineHeight: 21, fontWeight: '700' },
  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  clientId: { color: colors.primary.main, fontSize: 13, lineHeight: 18, fontWeight: '800', flexShrink: 1 },
  readyBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 99,
    paddingHorizontal: 7, paddingVertical: 2, backgroundColor: colors.feedback.successBg,
  },
  missingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 99,
    paddingHorizontal: 7, paddingVertical: 2, backgroundColor: colors.feedback.warningBg,
  },
  readyText: { color: colors.feedback.successDark, fontSize: 11, lineHeight: 15, fontWeight: '700' },
  missingText: { color: colors.feedback.warningDark, fontSize: 11, lineHeight: 15, fontWeight: '700' },
  phone: { color: colors.text.secondary, fontSize: 13, lineHeight: 18, fontWeight: isDark ? '500' : '400' },
  refreshButton: {
    width: 44, height: 48, alignItems: 'center', justifyContent: 'center',
    borderRadius: 12, backgroundColor: colors.background.card,
  },
  actions: { flexDirection: 'row', gap: 8 },
  action: {
    flex: 1, minWidth: 0, minHeight: 48, paddingHorizontal: 4, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5,
    backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.border,
  },
  primaryAction: { backgroundColor: colors.primary.main, borderColor: colors.primary.main },
  actionText: { color: colors.text.primary, fontSize: 12, lineHeight: 16, fontWeight: '700', flexShrink: 1 },
  primaryActionText: { color: colors.text.inverse },
  generateButton: {
    minHeight: 48, borderRadius: 12, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, backgroundColor: colors.background.card,
    borderWidth: 1, borderColor: colors.primary.main,
  },
  generateText: { color: colors.primary.main, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
