import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 15,
    },
    title: {
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginBottom: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
    },
  });
