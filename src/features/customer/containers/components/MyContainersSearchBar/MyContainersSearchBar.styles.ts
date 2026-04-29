import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const useMyContainersSearchBarStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    searchContainer: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 4,
      backgroundColor: colors.background.card,
    },
    searchBar: {
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      height: 44,
    },
    searchInput: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      minHeight: 0,
      paddingVertical: 0,
    },
  });
};
