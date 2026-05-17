import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useTrackingFormStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    label: {
      fontSize: 13,
      fontFamily: Fonts.meduim,
      color: colors.text.secondary,
      marginBottom: 6,
      marginLeft: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: colors.background.paper,
      paddingHorizontal: 12,
      minHeight: 52,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: Fonts.meduim,
      color: colors.text.primary,
      paddingVertical: 12,
      letterSpacing: 1,
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButton: {
      marginLeft: 8,
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary.main,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    errorText: {
      color: colors.status.error,
      fontSize: 12,
      fontFamily: Fonts.regular,
      marginTop: 6,
      marginLeft: 4,
    },
  });
};
