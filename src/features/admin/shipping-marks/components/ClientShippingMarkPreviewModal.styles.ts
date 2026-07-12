import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/shared/constants/Theme';

type Colors = ThemeContextType['colors'];

export const createStyles = (colors: Colors) => StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(15, 23, 42, 0.72)' },
  card: {
    width: '92%', maxHeight: '88%', borderRadius: 20, padding: 16,
    backgroundColor: colors.background.card, borderWidth: 1, borderColor: colors.border,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  headerText: { flex: 1, minWidth: 0 },
  title: { color: colors.text.primary, fontSize: 18, lineHeight: 24, fontWeight: '800' },
  subtitle: { color: colors.text.secondary, marginTop: 3, fontSize: 13, lineHeight: 18 },
  closeButton: {
    width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.background.paper,
  },
  preview: {
    width: '100%', aspectRatio: 0.96, borderRadius: 14, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background.paper,
  },
  image: { width: '100%', height: '100%' },
  emptyText: { color: colors.text.secondary, padding: 24, textAlign: 'center', fontSize: 14, lineHeight: 21 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  actionButton: { flexGrow: 1, minWidth: '46%' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.97 }] },
});
