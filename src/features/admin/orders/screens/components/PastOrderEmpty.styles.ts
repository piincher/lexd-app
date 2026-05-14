import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    emptyTitle: {
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginTop: 20,
    },
    emptyDescription: {
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 10,
      maxWidth: 300,
    },
  });
