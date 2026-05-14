import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createAuditFiltersStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background.default,
    },
    search: {
      minHeight: 48,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 14,
      color: colors.text.primary,
      backgroundColor: colors.background.card,
    },
    chipRow: {
      flexDirection: 'row',
      gap: 8,
    },
    chip: {
      minHeight: 40,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background.card,
    },
    chipActive: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    chipText: {
      color: colors.text.secondary,
      fontSize: 12,
      fontWeight: '700',
    },
    chipTextActive: {
      color: 'Theme.colors.text.inverse',
    },
  });
