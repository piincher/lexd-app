import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { LOGISTICS_COLORS } from './pastOrderConstants';

export const createStyles = () =>
  StyleSheet.create({
    loaderContainer: {
      padding: 20,
      alignItems: 'center',
    },
    loader: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: LOGISTICS_COLORS.primary,
      marginVertical: 10,
    },
    loadMoreContainer: {
      padding: 15,
      alignItems: 'center',
    },
    loadMoreText: {
      color: LOGISTICS_COLORS.primary,
      fontFamily: Fonts.meduim,
    },
  });
