import { StyleSheet } from 'react-native';
import { Theme } from '@src/shared/constants/Theme';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    section: {
      gap: Theme.spacing.sm,
      marginTop: Theme.spacing.md,
    },
    title: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '700',
    },
    row: {
      backgroundColor: colors.background.card,
      borderColor: colors.border,
      borderRadius: Theme.radius.sm,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: Theme.spacing.md,
    },
    name: {
      color: colors.text.primary,
      fontSize: 14,
      fontWeight: '700',
    },
    meta: {
      color: colors.text.secondary,
      fontSize: 12,
      marginTop: 4,
    },
    amount: {
      fontSize: 14,
      fontWeight: '800',
      textAlign: 'right',
    },
    balance: {
      color: colors.text.secondary,
      fontSize: 12,
      marginTop: 4,
      textAlign: 'right',
    },
  });
