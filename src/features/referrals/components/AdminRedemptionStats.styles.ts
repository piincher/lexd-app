import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    loadingBox: {
      padding: 16,
      alignItems: 'center',
    },
    card: {
      flex: 1,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      gap: 4,
    },
    value: {
      fontSize: 15,
      fontWeight: '800',
    },
    label: {
      fontSize: 10,
      color: colors.text.secondary,
      fontWeight: '600',
    },
  });
