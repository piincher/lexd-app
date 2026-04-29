import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { LOGISTICS_COLORS } from './pastOrderConstants';

export const createStyles = () =>
  StyleSheet.create({
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 15,
      backgroundColor: LOGISTICS_COLORS.gray[100],
      borderRadius: 20,
      padding: 5,
    },
    toggleButton: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 15,
    },
    activeToggle: {
      backgroundColor: LOGISTICS_COLORS.primary,
    },
    toggleText: {
      fontFamily: Fonts.meduim,
      color: LOGISTICS_COLORS.gray[600],
    },
    activeToggleText: {
      color: '#FFFFFF',
    },
    toggleSeparator: {
      width: 1,
      height: 20,
      backgroundColor: LOGISTICS_COLORS.gray[300],
    },
  });
