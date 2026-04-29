import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { LOGISTICS_COLORS } from './pastOrderConstants';

export const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: LOGISTICS_COLORS.light,
    },
    errorContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorContent: {
      alignItems: 'center',
      maxWidth: 300,
    },
    errorTitle: {
      fontFamily: Fonts.bold,
      color: LOGISTICS_COLORS.error,
      marginTop: 20,
    },
    errorDescription: {
      fontFamily: Fonts.regular,
      color: LOGISTICS_COLORS.gray[700],
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    retryButton: {
      backgroundColor: LOGISTICS_COLORS.primary,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 30,
    },
  });
