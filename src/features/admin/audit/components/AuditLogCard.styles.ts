import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createAuditLogCardStyles = (colors: AppColors) =>
  StyleSheet.create({
    card: {
      minHeight: 112,
      padding: 14,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    action: {
      flex: 1,
      color: colors.text.primary,
      fontSize: 15,
      fontWeight: '800',
    },
    status: {
      minHeight: 28,
      paddingHorizontal: 10,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusText: {
      color: colors.text.inverse,
      fontSize: 11,
      fontWeight: '800',
    },
    description: {
      color: colors.text.secondary,
      fontSize: 13,
      marginTop: 8,
      lineHeight: 18,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 12,
    },
    metaText: {
      flex: 1,
      color: colors.text.muted,
      fontSize: 12,
    },
  });
