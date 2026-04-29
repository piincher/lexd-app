import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useTrackingErrorStateStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    errorTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      marginTop: 16,
    },
    errorText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    retryButton: {
      marginTop: 24,
    },
  });
};
