import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      gap: 2,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    meta: {
      fontSize: 12,
      color: colors.text.secondary,
    },
    right: {
      alignItems: 'flex-end',
      gap: 2,
    },
    deltaPositive: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.status.success,
    },
    deltaNegative: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.status.error,
    },
    balance: {
      fontSize: 11,
      color: colors.text.disabled,
      fontWeight: '600',
    },
  });
