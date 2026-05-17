import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useEditGoodsScreenStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    saveButton: {
      marginTop: 24,
      borderRadius: 8,
    },
  });
};
