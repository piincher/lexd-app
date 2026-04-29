import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useMyContainersEmptyStateStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      marginTop: 16,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 24,
    },
    emptyButton: {
      marginTop: 8,
    },
  });
};
