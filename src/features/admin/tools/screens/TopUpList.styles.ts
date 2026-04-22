import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    list: {
      padding: 16,
    },
    card: {
      marginBottom: 12,
      backgroundColor: colors.background.card,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    date: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 4,
    },
    statusContainer: {
      alignItems: 'center',
    },
    status: {
      fontSize: 12,
      marginTop: 4,
      textTransform: 'capitalize',
    },
    user: {
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 8,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    empty: {
      alignItems: 'center',
      marginTop: 48,
    },
    emptyText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text.secondary,
    },
  });
