import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useMyContainersScreenStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    headerTitle: {
      fontFamily: Fonts.bold,
    },
  });
};
