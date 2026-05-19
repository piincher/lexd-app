import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      marginTop: 8,
      paddingBottom: 24,
    },
    pageButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background.card,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    pageButtonDisabled: {
      backgroundColor: colors.background.paper,
    },
    pageText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.secondary,
      minWidth: 80,
      textAlign: 'center',
    },
  });
