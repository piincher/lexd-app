import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useContactDialogStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    dialogText: {
      fontSize: 14,
      marginBottom: 8,
      fontFamily: Fonts.regular,
    },
    dialogLabel: {
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
    },
  });
};
