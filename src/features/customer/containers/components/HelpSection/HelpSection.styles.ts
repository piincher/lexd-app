import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useHelpSectionStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    helpContainer: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    helpText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 12,
    },
    helpButton: {
      borderColor: colors.status.success,
    },
  });
};
