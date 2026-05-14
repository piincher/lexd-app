import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background.default,
    },
    title: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 16,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    errorContainer: {
      flex: 1,
    },
    errorContent: {
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    errorTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 16,
    },
    errorDescription: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    retryButton: {
      marginTop: 24,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: colors.primary.main,
    },
    retryText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
    },
  });
