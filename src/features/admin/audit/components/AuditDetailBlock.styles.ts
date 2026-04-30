import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createAuditDetailBlockStyles = (colors: AppColors) =>
  StyleSheet.create({
    block: {
      padding: 14,
      marginBottom: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background.card,
    },
    title: {
      color: colors.text.primary,
      fontSize: 14,
      fontWeight: '800',
      marginBottom: 10,
    },
    row: {
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    label: {
      color: colors.text.secondary,
      fontSize: 12,
      fontWeight: '700',
      marginBottom: 4,
    },
    value: {
      color: colors.text.primary,
      fontSize: 13,
      lineHeight: 18,
    },
    valueMuted: {
      color: colors.text.muted,
    },
  });
