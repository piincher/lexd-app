import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      padding: 16,
      alignItems: 'center',
    },
    loaderContainer: {
      padding: 24,
      alignItems: 'center',
    },
    loader: {
      marginTop: 8,
    },
    loadMoreContainer: {
      padding: 16,
      alignItems: 'center',
    },
    loadMoreButton: {
      backgroundColor: colors.primary.main,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loadMoreText: {
      color: colors.text.inverse,
      fontFamily: Fonts.bold,
      marginRight: 8,
    },
    endText: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
  });
