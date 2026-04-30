import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createNotificationEventListStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      minHeight: 56,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconButton: {
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    title: {
      flex: 1,
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: '800',
    },
    listContent: {
      padding: 16,
      paddingBottom: 32,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    stateText: {
      color: colors.text.secondary,
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
    },
    retryButton: {
      minHeight: 48,
      marginTop: 14,
      paddingHorizontal: 18,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.main,
    },
    retryText: {
      color: '#fff',
      fontWeight: '800',
    },
  });
