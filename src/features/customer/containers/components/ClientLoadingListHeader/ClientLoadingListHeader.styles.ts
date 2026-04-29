import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useClientLoadingListHeaderStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    header: {
      backgroundColor: colors.primary.dark,
    },
    title: {
      color: colors.text.inverse,
    },
    backAction: {
      color: colors.text.inverse,
    },
    notification: {
      color: colors.text.inverse,
    },
  });
};
