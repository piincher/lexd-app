import { StyleSheet } from 'react-native';

type Colors = {
  background: { paper: string; card: string };
  text: { primary: string };
  border: string;
};

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.paper },
    keyboardView: { flex: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: { fontSize: 18, fontWeight: '800', color: colors.text.primary },
    scrollContent: { padding: 16, paddingBottom: 220 },
    footer: {
      padding: 16,
      backgroundColor: colors.background.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
  });
