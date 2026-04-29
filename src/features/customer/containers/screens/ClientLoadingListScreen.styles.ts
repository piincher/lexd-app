import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useClientLoadingListScreenStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    content: {
      flex: 1,
      padding: 16,
    },
  });
};
