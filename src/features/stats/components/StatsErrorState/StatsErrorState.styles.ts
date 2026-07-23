import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { RADIUS } from '@src/shared/ui/designLanguage';

export const styles = (colors: any) =>
  StyleSheet.create({
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      gap: 8,
    },
    errorTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.primary,
      textAlign: 'center',
      marginTop: 8,
    },
    errorSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    retryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.primary.main,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: RADIUS.control,
      marginTop: 12,
    },
    retryText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      fontWeight: '700',
      color: colors.text.inverse,
    },
  });
