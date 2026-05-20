import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    section: {
      gap: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    rowText: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
    },
    cancelButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      backgroundColor: colors.status.error + '12',
      borderWidth: 1,
      borderColor: colors.status.error + '30',
    },
    cancelText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.status.error,
    },
  });
