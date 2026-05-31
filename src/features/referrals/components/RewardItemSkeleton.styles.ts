import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      paddingHorizontal: 16,
    },
    card: {
      width: '47%',
      flexGrow: 1,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 120,
      backgroundColor: colors.background.paper,
    },
    body: {
      padding: 10,
      gap: 8,
    },
    line: {
      height: 10,
      borderRadius: 6,
      backgroundColor: colors.background.paper,
    },
    lineWide: {
      height: 14,
      marginTop: 2,
    },
  });
