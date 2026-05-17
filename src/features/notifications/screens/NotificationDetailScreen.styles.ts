import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useNotificationDetailScreenStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    scrollView: {
      flex: 1,
    },
    bottomSpacer: {
      height: 32,
    },
  });
};
