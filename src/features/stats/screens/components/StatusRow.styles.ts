import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStatusRowStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      marginBottom: 12,
    },
    rowHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statusDot: {
      width: 22,
      height: 22,
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusLabel: {
      fontSize: 13,
      fontFamily: Fonts.medium,
    },
    rowRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statusCount: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    statusPercentage: {
      fontSize: 11,
      fontFamily: Fonts.medium,
      minWidth: 30,
      textAlign: 'right',
    },
    barBg: {
      height: 5,
      borderRadius: 3,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: 3,
    },
  });
