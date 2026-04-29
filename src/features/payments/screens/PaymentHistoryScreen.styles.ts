import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const usePaymentHistoryScreenStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
  });
};
