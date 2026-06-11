import { StyleSheet } from 'react-native';

type Colors = {
  background: { paper: string; card: string };
  text: { primary: string };
  border: string;
  primary: { main: string };
};

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.paper },
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
    listContent: { padding: 16, paddingBottom: 120 },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 32,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary.main,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
  });
