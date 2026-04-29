import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { LOGISTICS_COLORS } from './pastOrderConstants';

export const createStyles = () =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    emptyTitle: {
      fontFamily: Fonts.bold,
      color: LOGISTICS_COLORS.dark,
      marginTop: 20,
    },
    emptyDescription: {
      fontFamily: Fonts.regular,
      color: LOGISTICS_COLORS.gray[600],
      textAlign: 'center',
      marginTop: 10,
      maxWidth: 300,
    },
  });
